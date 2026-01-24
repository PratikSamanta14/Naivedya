import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import FestivalCombos from "@/components/FestivalCombos";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import PanditSection from "@/components/PanditSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Festival Combos */}
        <FestivalCombos />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Categories */}
        <CategorySection />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Pandit Booking */}
        <PanditSection />

        {/* Trust Section */}
        <TrustSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
