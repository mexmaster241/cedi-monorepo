import Hero from '@/components/landing/hero';
import Features from '@/components/landing/features';
import FAQs from '@/components/landing/faqs';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-cedi-beige">
      <div className="container mx-auto">
        <Hero />
        <Features />
        <FAQs />
      </div>
    </div>
  );
}
