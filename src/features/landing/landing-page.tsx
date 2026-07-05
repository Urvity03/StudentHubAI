import { CtaSection } from "@/features/landing/components/cta-section";
import { FaqSection } from "@/features/landing/components/faq-section";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { Footer } from "@/features/landing/components/footer";
import { HeroSection } from "@/features/landing/components/hero-section";
import { TestimonialsSection } from "@/features/landing/components/testimonials-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}
