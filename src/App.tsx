import Footer from "./components/Footer";
import Hero from "./components/Hero";
import SkillSection from "./components/SkillSection";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { FadeIn } from "./components/FadeIn";
import { lazy, Suspense } from "react";

const ProjectSection = lazy(() => import("./components/ProjectSection"));
const BlogSection = lazy(() => import("./components/BlogSection"));
const Stats = lazy(() => import("./components/Stats"));

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <DotPattern
          glow={false}
          width={32}
          height={32}
          cr={1.5}
          className={cn(
            "mask-[radial-gradient(ellipse_at_center,white,transparent)]",
          )}
        />
      </div>
      <div className="relative z-10 flex flex-col flex-1">
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-6 pb-12 sm:gap-20 sm:pb-20 overflow-hidden">
          <Hero />
          <FadeIn>
            <SkillSection />
          </FadeIn>
          <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20 rounded-xl" />}>
            <FadeIn>
              <ProjectSection />
            </FadeIn>
          </Suspense>
          <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20 rounded-xl" />}>
            <FadeIn>
              <BlogSection />
            </FadeIn>
          </Suspense>
          <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20 rounded-xl" />}>
            <FadeIn>
              <Stats />
            </FadeIn>
          </Suspense>
          <FadeIn>
            <Footer />
          </FadeIn>
        </main>
      </div>
    </div>
  );
};

export default App;
