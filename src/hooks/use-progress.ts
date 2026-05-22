import { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { worlds } from "@/data/worlds";
import { customItems, defaultOwnedItems, getItem } from "@/data/customization";
import { getMedal, medals } from "@/data/medals";

const BASE_KEY = "sophie-progress-v3";

export interface LevelProgress {
  bestScore: number;
  stars: number;
  goldenStar: boolean;
  completed: boolean;
  attempts: number;
  correctAnswers: number;
  wrongAnswers: number;
  usedHints: number;
  lastPlayedAt: string;
}

export interface InventoryState {
  owned: string[];
  equipped: Record<string, string>;
}

export interface MedalState {
  id: string;
  earnedAt: string;
}

export interface AchievementState {
  id: string;
  earnedAt: string;
}

export interface Progress {
  coins: number;
  totalStars: number;
  totalGoldenStars: number;
  levels: Record<string, LevelProgress>;
  medals: MedalState[];
  achievements: AchievementState[];
  inventory: InventoryState;
  stats: {
    totalCorrect: number;
    totalWrong: number;
    totalHints: number;
    totalLevelsCompleted: number;
  };
  updatedAt: string | null;
}

const initial: Progress = {
  coins: 0,
  totalStars: 0,
  totalGoldenStars: 0,
  levels: {},
  medals: [],
  achievements: [],
  inventory: {
    owned: defaultOwnedItems,
    equipped: {
      "sophie:Cabelos": "sophie-hair-pink-braids",
      "sophie:Cabeça": "sophie-head-gold-crown",
      "sophie:Roupas": "sophie-outfit-princess",
      "sophie:Cenário": "sophie-bg-castle",
      "pix:Óculos": "pix-glasses-round",
      "pix:Lenços": "pix-scarf-purple",
    },
  },
  stats: { totalCorrect: 0, totalWrong: 0, totalHints: 0, totalLevelsCompleted: 0 },
  updatedAt: null,
};

function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

function mergeWithInitial(raw: Partial<Progress>): Progress {
  const owned = unique([...(raw.inventory?.owned ?? []), ...defaultOwnedItems]);
  return {
    ...initial,
    ...raw,
    levels: raw.levels ?? {},
    medals: raw.medals ?? [],
    achievements: raw.achievements ?? [],
    inventory: {
      owned,
      equipped: { ...initial.inventory.equipped, ...(raw.inventory?.equipped ?? {}) },
    },
    stats: { ...initial.stats, ...(raw.stats ?? {}) },
  };
}

function storageKey(ownerId: string | undefined) {
  return `${BASE_KEY}:${ownerId || "guest"}`;
}

function oldGuestKey() {
  return "sophie-progress-v1";
}

function load(ownerId: string | undefined): Progress {
  if (typeof window === "undefined") return initial;
  try {
    const key = storageKey(ownerId);
    const raw = localStorage.getItem(key);
    if (raw) return mergeWithInitial(JSON.parse(raw));

    // Migração do progresso antigo do Lovable para não perder o que já foi jogado.
    const oldRaw = localStorage.getItem(oldGuestKey());
    if (!ownerId && oldRaw) {
      const migrated = mergeWithInitial(JSON.parse(oldRaw));
      save(ownerId, migrated);
      return migrated;
    }
    return initial;
  } catch {
    return initial;
  }
}

function save(ownerId: string | undefined, p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(ownerId), JSON.stringify({ ...p, updatedAt: new Date().toISOString() }));
}

function calculateTotals(levels: Record<string, LevelProgress>) {
  const values = Object.values(levels);
  return {
    totalStars: values.reduce((sum, level) => sum + level.stars, 0),
    totalGoldenStars: values.filter(level => level.goldenStar).length,
    totalLevelsCompleted: values.filter(level => level.completed).length,
  };
}

function awardMedalIfMissing(progress: Progress, medalId: string) {
  if (progress.medals.some(m => m.id === medalId)) return progress;
  const medal = getMedal(medalId);
  if (!medal) return progress;
  return {
    ...progress,
    coins: progress.coins + medal.rewardCoins,
    medals: [...progress.medals, { id: medal.id, earnedAt: new Date().toISOString() }],
  };
}

function applyAutomaticMedals(progress: Progress, worldId: number, levels: Record<string, LevelProgress>) {
  let next = progress;
  const world = worlds.find(w => w.id === worldId);
  if (world) {
    const completedWorld = world.levels.every(level => levels[levelKey(world.id, level.id)]?.completed);
    if (completedWorld) next = awardMedalIfMissing(next, `world-${world.id}`);
  }

  const totals = calculateTotals(levels);
  if (totals.totalLevelsCompleted >= 1) next = awardMedalIfMissing(next, "first-level");
  if (totals.totalLevelsCompleted >= 10) next = awardMedalIfMissing(next, "ten-levels");
  if (next.totalGoldenStars >= 1) next = awardMedalIfMissing(next, "perfect-level");
  if (next.stats.totalHints >= 10) next = awardMedalIfMissing(next, "pix-friend");
  if (next.totalStars >= 100) next = awardMedalIfMissing(next, "hundred-stars");
  return next;
}

export function useProgress() {
  const { user } = useAuth();
  const ownerId = user?.id;
  const [progress, setProgress] = useState<Progress>(initial);

  useEffect(() => {
    setProgress(load(ownerId));
  }, [ownerId]);

  const recordLevel = useCallback(
    (worldId: number, levelId: number, scorePct: number, coinsEarned: number, details?: { correct?: number; wrong?: number; hintsUsed?: number; noHintCorrect?: number }) => {
      setProgress(prev => {
        const key = levelKey(worldId, levelId);
        const previousLevel = prev.levels[key];
        const stars = scorePct >= 90 ? 3 : scorePct >= 80 ? 2 : scorePct >= 70 ? 1 : 0;
        const completed = scorePct >= 70;
        const totalQuestions = (details?.correct ?? 0) + (details?.wrong ?? 0);
        const goldenStar = scorePct === 100 && (details?.hintsUsed ?? 0) === 0 && totalQuestions > 0;

        const newLevel: LevelProgress = {
          bestScore: Math.max(scorePct, previousLevel?.bestScore ?? 0),
          stars: Math.max(stars, previousLevel?.stars ?? 0),
          goldenStar: goldenStar || (previousLevel?.goldenStar ?? false),
          completed: completed || (previousLevel?.completed ?? false),
          attempts: (previousLevel?.attempts ?? 0) + 1,
          correctAnswers: Math.max(details?.correct ?? 0, previousLevel?.correctAnswers ?? 0),
          wrongAnswers: Math.max(details?.wrong ?? 0, previousLevel?.wrongAnswers ?? 0),
          usedHints: Math.max(details?.hintsUsed ?? 0, previousLevel?.usedHints ?? 0),
          lastPlayedAt: new Date().toISOString(),
        };

        const nextLevels = { ...prev.levels, [key]: newLevel };
        const totals = calculateTotals(nextLevels);
        let next: Progress = {
          ...prev,
          coins: prev.coins + coinsEarned,
          levels: nextLevels,
          totalStars: totals.totalStars,
          totalGoldenStars: totals.totalGoldenStars,
          stats: {
            totalCorrect: prev.stats.totalCorrect + (details?.correct ?? 0),
            totalWrong: prev.stats.totalWrong + (details?.wrong ?? 0),
            totalHints: prev.stats.totalHints + (details?.hintsUsed ?? 0),
            totalLevelsCompleted: totals.totalLevelsCompleted,
          },
          updatedAt: new Date().toISOString(),
        };

        next = applyAutomaticMedals(next, worldId, nextLevels);
        save(ownerId, next);
        console.log("[Sophie] progresso salvo", { ownerId: ownerId || "guest", worldId, levelId, scorePct, next });
        return next;
      });
    },
    [ownerId],
  );

  const buyItem = useCallback((itemId: string) => {
    let ok = false;
    setProgress(prev => {
      const item = getItem(itemId);
      if (!item || prev.inventory.owned.includes(itemId) || prev.coins < item.price) return prev;
      const next = {
        ...prev,
        coins: prev.coins - item.price,
        inventory: { ...prev.inventory, owned: unique([...prev.inventory.owned, itemId]) },
        updatedAt: new Date().toISOString(),
      };
      save(ownerId, next);
      ok = true;
      return next;
    });
    return ok;
  }, [ownerId]);

  const equipItem = useCallback((itemId: string) => {
    setProgress(prev => {
      const item = getItem(itemId);
      if (!item || !prev.inventory.owned.includes(itemId)) return prev;
      const slot = `${item.target}:${item.category}`;
      const next = {
        ...prev,
        inventory: {
          ...prev.inventory,
          equipped: { ...prev.inventory.equipped, [slot]: itemId },
        },
        updatedAt: new Date().toISOString(),
      };
      save(ownerId, next);
      return next;
    });
  }, [ownerId]);

  const reset = useCallback(() => {
    save(ownerId, initial);
    setProgress(initial);
  }, [ownerId]);

  const unlockedWorldIds = useMemo(() => {
    const unlocked = new Set<number>([1]);
    medals.forEach(medal => {
      if (!medal.worldId) return;
      if (progress.medals.some(earned => earned.id === medal.id)) unlocked.add(medal.worldId + 1);
    });
    return unlocked;
  }, [progress.medals]);

  return { progress, recordLevel, buyItem, equipItem, reset, ownerId: ownerId || "guest", unlockedWorldIds };
}

export function levelKey(w: number, l: number) { return `${w}-${l}`; }

export function isLevelUnlocked(progress: Progress, worldId: number, levelId: number) {
  if (levelId === 1) return true;
  return !!progress.levels[levelKey(worldId, levelId - 1)]?.completed;
}

export function isWorldCompleted(progress: Progress, worldId: number) {
  return progress.medals.some(medal => medal.id === `world-${worldId}`);
}
