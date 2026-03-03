import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Tsuin saved us 3 weeks when our lead engineer left without notice. The new hire traced every critical decision in two hours instead of two months.",
    name: "Marcus Wei",
    role: "CTO",
    company: "Orbital (YC S23)",
    avatar: "M",
  },
  {
    quote:
      "No more archaeology through old Slack threads. The reasoning is right there when I open the file. It's like having a conversation with past-me.",
    name: "Priya Nair",
    role: "Senior Engineer",
    company: "Cascade.ai",
    avatar: "P",
  },
  {
    quote:
      "I can finally leave a company without feeling guilty about institutional knowledge walking out the door with me.",
    name: "Jake Ong",
    role: "Staff Engineer",
    company: "Vertex Systems",
    avatar: "J",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary mb-3 font-medium">
            Testimonials
          </p>
          <h2 className="text-4xl font-semibold tracking-tight">
            What developers are saying
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, company, avatar }) => (
            <Card key={name} className="p-6 flex flex-col">
              <div className="text-2xl text-primary/30 font-serif mb-3 leading-none select-none">
                "
              </div>
              <p className="text-sm leading-relaxed mb-6 text-foreground/80 flex-1">
                {quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold shrink-0">
                  {avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-xs text-muted-foreground">
                    {role}, {company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
