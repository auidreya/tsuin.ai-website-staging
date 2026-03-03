import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Gridlines } from "@/components/site/Gridlines";
import { Shibasuke } from "@/components/site/Shibasuke";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-secondary/20">
      <Gridlines />
      <div className="mx-auto max-w-3xl px-4 text-center relative">
        <div className="flex justify-center mb-4">
          <Shibasuke pose="snack" size={144} />
        </div>
        <p className="text-xs uppercase tracking-widest text-primary mb-4 font-medium">
          Get started today
        </p>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          You're an engineer.
          <br />
          <span className="text-primary">Stop smashing bugs.</span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Initialize your AI Twin and get your Saturdays back.
        </p>
        <Button size="lg" className="gap-2 text-base h-12 px-8 w-full sm:w-auto">
          Try Alpha0 <ArrowRight size={18} />
        </Button>
        <p className="mt-5 text-xs text-muted-foreground">
          For solo plan · Pay once · No subscription · Lifetime access
        </p>
      </div>
    </section>
  );
}
