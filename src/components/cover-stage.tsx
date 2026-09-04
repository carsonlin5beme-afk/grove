import { useEffect, useState, type ComponentType } from "react";

type Bloom = "enter" | "guilds" | null;

export function CoverStage({
  bloom,
  par,
}: {
  bloom: Bloom;
  par: { x: number; y: number };
}) {
  const [Scene, setScene] = useState<ComponentType<{ bloom?: Bloom; par?: { x: number; y: number } }> | null>(
    null,
  );

  useEffect(() => {
    let live = true;
    import("./cover-grove").then((m) => {
      if (live) setScene(() => m.CoverGrove);
    });
    return () => {
      live = false;
    };
  }, []);

  if (!Scene) {
    return <div className="h-full w-full bg-paper" />;
  }
  return <Scene bloom={bloom} par={par} />;
}
