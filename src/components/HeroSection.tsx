import React from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Sparkles, Scissors } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/mockData';

export const HeroSection: React.FC = () => {
  const { openBooking, scrollToSection } = useApp();

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#09090b]">
      {/* Background Image with Dark Gradient Overlay matching Image 1 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&auto=format&fit=crop&q=85"
          alt="13302 Studio Ambiente"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform duration-1000 ease-out"
        />
        {/* Multilayer Dark Gradients for perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/90" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#09090b]/60 to-[#09090b]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
        
        {/* Top Tagline with Gold Accent Bar */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="w-8 sm:w-12 h-[1px] bg-[#c5a059]" />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#c5a059] uppercase font-sans">
            {STUDIO_INFO.tagline}
          </span>
          <div className="w-8 sm:w-12 h-[1px] bg-[#c5a059]" />
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl font-light text-[#f4f4f5] leading-[1.12] tracking-tight mb-6 max-w-3xl">
          Mais que um corte,{' '}
          <span className="italic font-normal text-[#e0be77] block sm:inline">
            uma experiência única.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#a1a1aa] max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          {STUDIO_INFO.subtitle}
        </p>

        {/* Action Buttons matching Image 1 */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => openBooking()}
            className="w-full sm:w-auto min-w-[240px] px-8 py-4 bg-[#c5a059] hover:bg-[#d8b56c] text-[#09090b] font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_10px_25px_-5px_rgba(197,160,89,0.3)] flex items-center justify-center gap-3 cursor-pointer group"
            id="btn-hero-agendar"
          >
            <span>AGENDAR HORÁRIO</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#09090b]" />
          </button>

          <button
            onClick={() => scrollToSection('loja')}
            className="w-full sm:w-auto min-w-[200px] px-8 py-4 bg-[#141418]/80 hover:bg-[#1f1f26] text-[#f4f4f5] hover:text-[#c5a059] border border-[#3f3f46] hover:border-[#c5a059] font-medium text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            id="btn-hero-ver-loja"
          >
            <ShoppingBag className="w-4 h-4 text-[#c5a059]" />
            <span>VER LOJA</span>
          </button>
        </div>

        {/* Highlights Pills underneath */}
        <div className="mt-14 pt-8 border-t border-[#27272a]/60 grid grid-cols-3 gap-4 sm:gap-12 w-full max-w-2xl text-center">
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#c5a059] font-normal">5.0 ★</div>
            <div className="text-[11px] uppercase tracking-wider text-[#a1a1aa] mt-1">Avaliação Google</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#f4f4f5] font-normal">100%</div>
            <div className="text-[11px] uppercase tracking-wider text-[#a1a1aa] mt-1">Hora Marcada</div>
          </div>
          <div>
            <div className="font-serif text-2xl sm:text-3xl text-[#c5a059] font-normal">VIP</div>
            <div className="text-[11px] uppercase tracking-wider text-[#a1a1aa] mt-1">Reserva Privada</div>
          </div>
        </div>

      </div>
    </section>
  );
};
