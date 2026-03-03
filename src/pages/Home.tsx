import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Problem } from "@/components/site/Problem";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Features } from "@/components/site/Features";
import { MultimodalInput } from "@/components/site/MultimodalInput";
import { StoryVideo } from "@/components/site/StoryVideo";
import { TrainingSteps } from "@/components/site/TrainingSteps";
import { SoloPlan } from "@/components/site/SoloPlan";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";
import { CookieCard } from "@/components/site/CookieCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <MultimodalInput />
      <StoryVideo />
      <TrainingSteps />
      <SoloPlan />
      <FinalCTA />
      <Footer />
      <CookieCard />
    </div>
  );
}
