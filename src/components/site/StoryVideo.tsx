const acts = [
  {
    step: "01",
    who: "Audrey (PM)",
    bubble: "Ship the demo by Friday — the client wants to see it live. No excuses.",
    meta: "Slack · 6 months ago",
    color: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  },
  {
    step: "02",
    who: "Kai (Dev)",
    bubble: "Skipped input validation on the auth endpoint. PM is rushing us for the client demo — will fix post-launch. Definitely technical debt.",
    meta: "Told his AI Twin · same day",
    color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  {
    step: "03",
    who: "6 months later",
    bubble: "Kai left the company. New dev opens the auth module and has no idea what they're looking at.",
    meta: "Time passes",
    color: "bg-muted/30 border-border text-muted-foreground",
  },
  {
    step: "04",
    who: "New dev → AI Twin",
    bubble: '"What happened here??" — AI Twin surfaces the full story: the shortcut, the reason, the PM deadline, the debt that was never paid.',
    meta: "Answered in seconds",
    color: "bg-primary/10 border-primary/30 text-primary",
  },
];

export function StoryVideo() {
  return (
    <div className="dark">
      <section id="demo" className="py-14 md:py-24 bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
              See it in action
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
              The story your codebase can't tell.{" "}
              <span className="text-primary">Your AI Twin can.</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Code shows you what. Your AI Twin shows you why — even 6 months
              later, even after the original engineer has moved on.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* Left — story acts */}
            <div className="space-y-3">
              {acts.map(({ step, who, bubble, meta, color }) => (
                <div
                  key={step}
                  className={`rounded-xl border p-4 ${color}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                      {step}
                    </span>
                    <span className="text-xs font-semibold">{who}</span>
                    <span className="ml-auto text-[10px] opacity-50">{meta}</span>
                  </div>
                  <p className="text-sm leading-relaxed opacity-90">"{bubble}"</p>
                </div>
              ))}

              <p className="text-xs text-muted-foreground pt-2 leading-relaxed pl-1">
                Every shortcut captured. Every reason preserved. The Twin never forgets — even when the engineer does.
              </p>
            </div>

            {/* Right — YouTube embed */}
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl shadow-black/30 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/8VnxqEi80eg"
                title="Tsuin AI Twin demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
