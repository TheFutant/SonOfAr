import { useMemo } from "react";

interface Props {
  density?: number;
}

interface Ember {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  hue: number;
}

/**
 * Pure-CSS ember animation. Each ember is an absolutely positioned div that
 * runs the `rise` keyframe defined in tailwind.config.js. We use a small
 * randomised pool so the effect is interesting without being heavy.
 */
export function EmberBackground({ density = 18 }: Props) {
  const embers = useMemo<Ember[]>(() => {
    const arr: Ember[] = [];
    for (let i = 0; i < density; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 14,
        drift: (Math.random() - 0.5) * 80,
        hue: 18 + Math.random() * 20,
      });
    }
    return arr;
  }, [density]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, rgba(232,90,20,0.18) 0%, rgba(168,59,8,0.10) 22%, rgba(5,4,3,0) 60%), radial-gradient(80% 60% at 50% 0%, rgba(34,30,26,0.6) 0%, rgba(5,4,3,0) 70%), #050403",
        }}
      />
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-[-10px] block rounded-full animate-rise"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: `radial-gradient(circle, hsla(${e.hue}, 95%, 65%, 0.95) 0%, hsla(${e.hue}, 90%, 50%, 0.6) 50%, hsla(${e.hue}, 80%, 35%, 0) 100%)`,
            boxShadow: `0 0 8px 1px hsla(${e.hue}, 95%, 55%, 0.6)`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            // Custom var consumed by the @keyframes `rise` definition.
            ["--drift" as never]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
