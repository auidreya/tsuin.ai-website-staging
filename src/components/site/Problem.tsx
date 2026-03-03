import { AlertTriangle, Clock, FileWarning } from "lucide-react";
import { Card } from "@/components/ui/card";

const problems = [
  {
    icon: AlertTriangle,
    title: "The bus factor stress",
    desc: "You're the only one who knows how the auth layer works. If you take a vacation, the team is blocked.",
  },
  {
    icon: Clock,
    title: "The Bug Fixer Guy",
    desc: "You're spending 40% of your sprint fixing technical debt you didn't even create.",
  },
  {
    icon: FileWarning,
    title: "Outdated Documentation",
    desc: "Readmes are out of date the second you push to main.",
  },
];

export function Problem() {
  return (
    <section className="py-14 md:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            The problem
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Your brain isn't a database.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Every time you're pulled into a "quick sync" to explain a PR from last
            quarter, you're losing 23 minutes of deep work.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {problems.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="p-5 md:p-6 border-2">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-destructive" />
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
