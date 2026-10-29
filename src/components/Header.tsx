import React from 'react';
import { StudioLogo } from './StudioLogo';
import { ShoppingBag, Menu, Scissors, Clock, Instagram, MessageCircle, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/mockData';

export const Header: React.FC = () => {
  const { 
    openCart, 
    cartTotalCount, 
    toggleSidebar, 
    openBooking, 
    openHistory, 
    scrollToSection 
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button type="button" onClick={() => scrollToSection('hero')} aria-label="13302 Studio — Início" className="flex shrink-0 items-center cursor-pointer" id="btn-header-logo">
          <StudioLogo className="w-16 h-16 sm:w-[72px] sm:h-[72px]" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.15em] font-medium uppercase text-[#d4d4d8]">
          <button 
            onClick={() => scrollToSection('servicos')} 
            className="hover:text-[#c5a059] transition-colors cursor-pointer"
            id="nav-link-servicos"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('loja')} 
            className="hover:text-[#c5a059] transition-colors cursor-pointer"
            id="nav-link-loja"
          >
            Loja Grooming
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="hover:text-[#c5a059] transition-colors cursor-pointer"
            id="nav-link-portfolio"
          >
            Portfólio
          </button>
          <button 
            onClick={() => scrollToSection('avaliacoes')} 
            className="hover:text-[#c5a059] transition-colors cursor-pointer"
            id="nav-link-avaliacoes"
          >
            Avaliações
          </button>
          <button 
            onClick={() => scrollToSection('instagram')} 
            className="hover:text-[#c5a059] transition-colors cursor-pointer"
            id="nav-link-instagram"
          >
            Instagram
          </button>
          <button 
            onClick={() => openHistory('agendamentos')} 
            className="hover:text-[#c5a059] transition-colors cursor-pointer flex items-center gap-1.5"
            id="nav-link-historico"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
            Meus Pedidos
          </button>
        </nav>

        {/* Actions (Agendar, Cart, Menu) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Quick CTA button on desktop */}
          <button
            onClick={() => openBooking()}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#c5a059] text-[#09090b] rounded-sm hover:bg-[#e0be77] transition-colors cursor-pointer"
            id="btn-header-agendar"
          >
            Agendar Horário
          </button>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-full text-[#f4f4f5] hover:text-[#c5a059] hover:bg-[#18181b] transition-all cursor-pointer"
            aria-label="Abrir carrinho de compras"
            id="btn-header-cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#c5a059] text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scale">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Sidebar Drawer Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2.5 rounded-full text-[#f4f4f5] hover:text-[#c5a059] hover:bg-[#18181b] transition-all cursor-pointer"
            aria-label="Menu principal"
            id="btn-header-menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};
