export function Gridlines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border) / 0.25) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border) / 0.25) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
  );
}
