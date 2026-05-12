import AnimatedBackground from "@/components/landing/AnimatedBackground";
import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import OrbitPreviewSection from "@/components/landing/OrbitPreviewSection";
import TechStackSection from "@/components/landing/TechStackSection";
import CTASection from "@/components/landing/CTASection";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
      <AnimatedBackground />

      <div className="px-4 pt-4">
        <LandingNavbar />
      </div>

      <HeroSection />
      <FeatureSection />
      <WorkflowSection />
      <OrbitPreviewSection />
      <TechStackSection />
      <CTASection />
      <LandingFooter />
    </main>
  );
}