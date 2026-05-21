import { characters, type CharacterId } from "@/data/characters";
import { cn } from "@/lib/utils";

interface Props {
  id: CharacterId;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  bounce?: boolean;
}

const sizes = {
  sm: "w-12 h-12 text-2xl",
  md: "w-20 h-20 text-4xl",
  lg: "w-32 h-32 text-6xl",
  xl: "w-44 h-44 text-8xl",
};

export function CharacterAvatar({ id, size = "md", showName, bounce }: Props) {
  const c = characters[id];
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rounded-full bg-gradient-to-br flex items-center justify-center shadow-magic border-4 border-white",
          c.gradient,
          sizes[size],
          bounce && "animate-float",
        )}
        aria-label={c.name}
      >
        <span>{c.emoji}</span>
      </div>
      {showName && (
        <div className="text-center">
          <p className="font-display font-bold text-foreground">{c.name}</p>
          <p className="text-xs text-muted-foreground">{c.role}</p>
        </div>
      )}
    </div>
  );
}
