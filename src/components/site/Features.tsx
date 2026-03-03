import { Code2, Lock, Sparkles, Search, GitBranch, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Shibasuke } from "@/components/site/Shibasuke";

const features = [
  {
    icon: Code2,
    title: "IDE of your preference",
    desc: "Built for where you actually work. Tsuin lives in your editor, not another tab or dashboard.",
  },
  {
    icon: Lock,
    title: "Local-first, always private",
    desc: "Your code never leaves your machine. Reasoning lives in your AI Twin, not our servers. (For solo plan)",
  },
  {
    icon: Sparkles,
    title: "Zero prompt engineering",
    desc: "No training your Twin on AI prompts. Tsuin captures your behaviour automatically as you code.",
  },
  {
    icon: Search,
    title: "Instant context search",
    desc: "Search any decision in milliseconds. Filter by author, file, date, or keyword. From inside VSCode.",
  },
  {
    icon: GitBranch,
    title: "Git-native",
    desc: "Reasoning lives alongside your commits. Check out any branch, get the full decision history.",
  },
  {
    icon: Users,
    title: "Team-wide knowledge base",
    desc: "One engineer's insight becomes the whole team's. No more repeated 'why did we do this?' conversations.",
  },
];

export function Features() {
  return (
    <section className="py-14 md:py-24 bg-background" id="product">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-16 relative">
          <div className="hidden sm:block absolute -top-2 right-0 md:right-12 opacity-80">
            <Shibasuke pose="ball" size={114} />
          </div>
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Built for how developers actually work
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto">
            No new tools to learn. No workflow changes. Just share your context,
            captured by your own AI Twin.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="p-5 md:p-6 hover:border-accent/40 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
