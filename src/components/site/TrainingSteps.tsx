import { Shibasuke } from "@/components/site/Shibasuke";

const steps = [
  {
    step: "01",
    title: "The Source",
    desc: "Connect your GitHub/GitLab. Your Twin analyzes your commit history to understand your architectural preferences.",
  },
  {
    step: "02",
    title: "The Screen Recording",
    desc: "Record a quick 60-second screen share when you need something to be remembered. Your Twin extracts the reasoning that code comments miss.",
  },
  {
    step: "03",
    title: "The Thread",
    desc: "Sync Slack or Discord. Your Twin learns the \"why\" from the technical debates you've already had with your team.",
  },
];

export function TrainingSteps() {
  return (
    <section className="py-14 md:py-24 bg-secondary/30" id="training">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="hidden sm:block absolute -top-4 left-0 md:left-8 opacity-80">
            <Shibasuke pose="stretching" size={126} />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Training your own AI Twin
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
            AI Twin learns from your workflow across three dimensions.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
          {steps.map(({ step, title, desc }, i) => (
            <div key={step} className="relative">
              {/* Connector line — desktop only */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-8 left-[calc(50%+2rem)] right-[-2rem] h-px bg-border" />
              )}
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-background flex items-center justify-center mx-auto mb-6 font-semibold text-primary text-base">
                  {step}
                </div>
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
