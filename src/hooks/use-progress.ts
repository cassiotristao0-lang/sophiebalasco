import { useEffect, useState, useCallback } from "react";

const KEY = "sophie-progress-v1";

export interface LevelProgress {
  bestScore: number;       // % de acertos
  stars: number;           // 0..3
  completed: boolean;
}

export interface Progress {
  coins: number;
  totalStars: number;
  levels: Record<string, LevelProgress>;   // key: `${worldId}-${levelId}`
  medals: number[];                        // worldIds completados
}

const initial: Progress = { coins: 0, totalStars: 0, levels: {}, medals: [] };

function load(): Progress {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initial;
    return { ...initial, ...JSON.parse(raw) };
  } catch { return initial; }
}

function save(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(initial);

  useEffect(() => { setProgress(load()); }, []);

  const recordLevel = useCallback(
    (worldId: number, levelId: number, scorePct: number, coinsEarned: number) => {
      setProgress(prev => {
        const key = `${worldId}-${levelId}`;
        const prevLp = prev.levels[key];
        const stars = scorePct >= 90 ? 3 : scorePct >= 80 ? 2 : scorePct >= 70 ? 1 : 0;
        const completed = scorePct >= 70;
        const bestStars = Math.max(stars, prevLp?.stars ?? 0);
        const newLp: LevelProgress = {
          bestScore: Math.max(scorePct, prevLp?.bestScore ?? 0),
          stars: bestStars,
          completed: completed || (prevLp?.completed ?? false),
        };
        const totalStars =
          Object.values({ ...prev.levels, [key]: newLp })
            .reduce((s, l) => s + l.stars, 0);
        const next: Progress = {
          ...prev,
          coins: prev.coins + coinsEarned,
          totalStars,
          levels: { ...prev.levels, [key]: newLp },
        };
        save(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => { save(initial); setProgress(initial); }, []);

  return { progress, recordLevel, reset };
}

export function levelKey(w: number, l: number) { return `${w}-${l}`; }
