import { Shibasuke } from "@/components/site/Shibasuke";

const benefits = [
  {
    title: "Zero-Knowledge Onboarding",
    desc: "When a new hire joins, they don't ping you. They ask your Twin. It explains the \"why\" behind the useEffect hook you wrote in 2023.",
  },
  {
    title: "Self-Healing PRs",
    desc: "Your Twin suggests patches for recurring bugs based on your specific coding style and safety patterns.",
  },
  {
    title: "Mental Defrag",
    desc: "Offload the system state to your Twin. Go to sleep knowing the \"tribal knowledge\" is backed up and accessible.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-14 md:py-24 bg-secondary/30" id="how-it-works">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="hidden sm:block absolute -top-4 left-0 md:left-8 opacity-80">
            <Shibasuke pose="running" size={120} />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            Benefits
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Reclaim Your "Deep Work" Hours
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
            Your AI Twin is a trustable model of your own engineering intuition.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
          {benefits.map(({ title, desc }, i) => (
            <div key={title} className="relative">
              {/* Connector line — desktop only */}
              {i < benefits.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[calc(50%+2rem)] right-[-2rem] h-px bg-border" />
              )}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6" />
                <h3 className="font-semibold mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
