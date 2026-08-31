import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StoreSection } from './components/StoreSection';
import { InstagramSection } from './components/InstagramSection';
import { FooterSection } from './components/FooterSection';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersAndBookingsModal } from './components/OrdersAndBookingsModal';
import { WhatsAppButton } from './components/WhatsAppButton';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans antialiased selection:bg-[#c5a059] selection:text-black">
      {/* Top Fixed Header */}
      <Header />

      {/* Side Navigation Drawer */}
      <Sidebar />

      {/* Main Sections */}
      <main>
        {/* 1. Hero Section matching Image 1 */}
        <HeroSection />

        {/* 2. Key Features / Old Money Standard matching Image 2 */}
        <FeaturesSection />

        {/* 3. Services Menu matching Image 3 & 4 */}
        <ServicesSection />

        {/* 4. Portfolio / Gallery matching Image 5 & 6 */}
        <PortfolioSection />

        {/* 5. Client Testimonials & Ratings */}
        <TestimonialsSection />

        {/* 6. E-Commerce Store matching Image 7 & 8 */}
        <StoreSection />

        {/* 7. Instagram Community Feed */}
        <InstagramSection />
      </main>

      {/* 8. Footer & Contacts matching Image 9 */}
      <FooterSection />

      {/* Overlays & Modals */}
      <BookingModal />
      <CartDrawer />
      <CheckoutModal />
      <OrdersAndBookingsModal />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
