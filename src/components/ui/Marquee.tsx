import { ReactNode } from "react";

export function Marquee({
  children,
  direction = "left",
  speed = 40,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
}) {
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div
        className="flex w-max shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animationName,
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
