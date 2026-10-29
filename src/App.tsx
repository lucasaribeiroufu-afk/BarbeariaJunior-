import React, { useEffect } from 'react';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { StoreSection } from './components/StoreSection';
import { FooterSection } from './components/FooterSection';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersAndBookingsModal } from './components/OrdersAndBookingsModal';
import { SignatureSelection, StudioManifesto, StudioContact } from './components/StudioEditorial';
import { StudioMotion, Reveal } from './components/StudioMotion';
import { STUDIO_INFO } from './data/mockData';

export function MainLayout() {
  const { activeSection, openBooking, scrollToSection } = useApp();
  const reduced = useReducedMotion();
  const labels: Record<string,string> = { hero: 'Início', servicos: 'Experiências', sobre: 'O Studio', portfolio: 'Inspirações', loja: 'Grooming', contato: 'Contato' };
  useEffect(() => { document.title = activeSection === 'hero' ? '13302 Studio | Elegância em cada detalhe' : `${labels[activeSection] || 'Studio'} | 13302 Studio`; }, [activeSection]);
  const ready = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.getElementById('studio-main')?.focus({ preventScroll: true });
  };
  return <div className="site-modern">
    <a href="#studio-main" className="skip-link" onClick={e => { e.preventDefault(); document.getElementById('studio-main')?.focus(); }}>Pular para o conteúdo</a>
    <StudioMotion /><Header /><Sidebar />
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })}>
      <motion.main id="studio-main" tabIndex={-1} key={activeSection}
        initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
        transition={{ duration: .35, ease: [.22,1,.36,1] }} onAnimationComplete={ready}>
        {activeSection !== 'hero' && <div className="page-heading studio-container"><button onClick={() => scrollToSection('hero')}>13302 Studio</button><span>/ {labels[activeSection]}</span><h1 className="sr-only">{labels[activeSection]} — 13302 Studio</h1></div>}
        {activeSection === 'hero' && <><HeroSection /><StudioManifesto /><SignatureSelection /><FeaturesSection />
          <section className="home-gallery-tease"><Reveal><span className="eyebrow">A sua próxima inspiração</span><h2>Seu estilo.<br /><em>Novas possibilidades.</em></h2><button className="studio-button" onClick={() => scrollToSection('portfolio')}>Explore as inspirações <ArrowUpRight size={20} /></button></Reveal></section>
          <StudioContact /></>}
        {activeSection === 'servicos' && <ServicesSection />}
        {activeSection === 'sobre' && <><FeaturesSection /><StudioManifesto /><StudioContact /></>}
        {activeSection === 'portfolio' && <PortfolioSection />}
        {activeSection === 'loja' && <><div className="shop-intro studio-container"><Reveal><span className="eyebrow">04 / Curadoria de grooming</span><h2 className="editorial-title">O cuidado continua.<br /><em>Onde você estiver.</em></h2><p>Explore a seleção de produtos do Studio para o seu ritual de cuidados.</p></Reveal></div><StoreSection /></>}
        {activeSection === 'contato' && <StudioContact />}
      </motion.main>
    </AnimatePresence>
    <FooterSection />
    <div className="mobile-reserve"><button onClick={() => openBooking()}><Calendar size={17} />Reserve sua experiência</button><a href={STUDIO_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp"><ArrowUpRight size={21} /></a></div>
    <BookingModal /><CartDrawer /><CheckoutModal /><OrdersAndBookingsModal />
  </div>;
}
export default function App() {
  return <MotionConfig reducedMotion="user"><AppProvider><MainLayout /></AppProvider></MotionConfig>;
}
