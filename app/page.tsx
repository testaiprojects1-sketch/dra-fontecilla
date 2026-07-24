import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroManifesto from "@/components/IntroManifesto";
import FeatureTiles from "@/components/FeatureTiles";
import TreatmentsCarousel from "@/components/TreatmentsCarousel";
import AboutDoctor from "@/components/AboutDoctor";
import ClinicSection from "@/components/ClinicSection";
import TestimonialSection from "@/components/TestimonialSection";
import CredentialsStrip from "@/components/CredentialsStrip";
import EducationCarousel from "@/components/EducationCarousel";
import BenefitsGrid from "@/components/BenefitsGrid";
import TreatmentCalculator from "@/components/TreatmentCalculator";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FadeUpObserver from "@/components/FadeUpObserver";
import ElevenLabsConvaiWidget from "@/components/ElevenLabsConvaiWidget";

export default function Home() {
  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:bg-burgundy focus:text-cream focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <IntroManifesto />
        <FeatureTiles />
        <TreatmentsCarousel />
        <AboutDoctor />
        <ClinicSection />
        <TestimonialSection />
        <CredentialsStrip />
        <EducationCarousel />
        <TreatmentCalculator />
        <BenefitsGrid />
        <FinalCTA />
      </main>
      <Footer />
      <FadeUpObserver />
      <ElevenLabsConvaiWidget />
    </>
  );
}
