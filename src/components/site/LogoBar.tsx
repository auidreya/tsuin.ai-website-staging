const companies = ["Stripe", "Linear", "Vercel", "Supabase", "Raycast", "Loom"];

export function LogoBar() {
  return (
    <div className="border-y bg-secondary/40 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center">
<div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-12 gap-y-3">
          {companies.map((name) => (
            <span
              key={name}
              className="text-muted-foreground/50 font-semibold text-lg tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
