import { characters, type CharacterId } from "@/data/characters";
import { cn } from "@/lib/utils";

interface Props {
  id: CharacterId;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  bounce?: boolean;
  /** Mostra sem o círculo de fundo (usado em hero / dicas) */
  bare?: boolean;
}

const sizes = {
  xs: "w-8 h-8",
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
  xl: "w-44 h-44",
};

export function CharacterAvatar({ id, size = "md", showName, bounce, bare }: Props) {
  const c = characters[id];
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "relative flex items-center justify-center",
          !bare && "rounded-full bg-gradient-to-br shadow-magic border-4 border-white overflow-hidden",
          !bare && c.gradient,
          sizes[size],
          bounce && "animate-float",
        )}
        aria-label={c.name}
      >
        <img
          src={c.image}
          alt={c.name}
          loading="lazy"
          className={cn(
            "object-contain",
            bare ? "w-full h-full drop-shadow-xl" : "w-[115%] h-[115%] -mt-1",
          )}
        />
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
