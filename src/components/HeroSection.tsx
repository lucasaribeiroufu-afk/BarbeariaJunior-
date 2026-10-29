import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { openBooking, scrollToSection } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const reduced = useReducedMotion();
  return <>
    <section id="hero" ref={ref} className="studio-hero">
      <motion.div className="hero-photo" style={reduced ? undefined : { y }}>
        <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=85" alt="Detalhe de um atendimento de barbearia — imagem de referência" fetchPriority="high" />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-editorial">
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow hero-eyebrow"><span className="gold-dot" />13302 Studio · Grooming & Visagismo</motion.div>
        <h1><span className="hero-line"><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: [.22,1,.36,1] }}>Presença.</motion.span></span>
          <span className="hero-line"><motion.em initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: .12, ease: [.22,1,.36,1] }}>Em cada detalhe.</motion.em></span></h1>
        <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .9 }} className="hero-bottom">
          <p>Um corte que traduz quem você é.<br />Um ritual que muda o seu tempo.</p>
          <div className="hero-actions">
            <button className="studio-button" onClick={() => openBooking()} id="btn-hero-agendar">Reserve sua experiência <ArrowUpRight size={19} /></button>
            <button className="text-link" onClick={() => scrollToSection('servicos')}>Explore o menu <ArrowDown size={16} /></button>
          </div>
        </motion.div>
      </div>
      <div className="hero-footnote"><span>Precisão. Identidade. Bem-estar.</span><span>Imagem de referência / universo 13302</span></div>
      <div className="hero-index" aria-hidden="true">01 / 13302</div>
    </section>
    <div className="signature-marquee" aria-label="13302 Studio — Elegância, precisão e identidade"><div aria-hidden="true">{Array.from({ length: 4 }, (_, i) => <span key={i}>13302 STUDIO <i>✦</i> ELEGÂNCIA <i>✦</i> PRECISÃO <i>✦</i> IDENTIDADE <i>✦</i></span>)}</div></div>
  </>;
};
