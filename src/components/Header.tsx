import React from 'react';
import { ShoppingBag, Menu, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudioLogo } from './StudioLogo';

export const Header: React.FC = () => {
  const { openCart, cartTotalCount, toggleSidebar, openBooking, scrollToSection, activeSection } = useApp();
  return <header className="studio-header">
    <div className="header-inner">
      <button onClick={() => scrollToSection('hero')} className="brand-lockup" aria-label="13302 Studio — Início" id="btn-header-logo"><StudioLogo className="w-14 h-14 sm:w-16 sm:h-16" /><span>13302<span>STUDIO</span></span></button>
      <nav className="desktop-nav" aria-label="Navegação principal">{[['servicos','Experiências'],['sobre','O Studio'],['portfolio','Inspirações'],['loja','Grooming']].map(([id, label]) => <button key={id} aria-current={activeSection === id ? 'page' : undefined} onClick={() => scrollToSection(id)}>{label}</button>)}</nav>
      <div className="header-actions"><button className="header-book" onClick={() => openBooking()}>Reservar <ArrowUpRight size={16} /></button><button className="header-icon" onClick={openCart} aria-label="Abrir carrinho de compras"><ShoppingBag size={20} />{cartTotalCount > 0 && <span className="cart-count">{cartTotalCount}</span>}</button><button className="header-icon" onClick={toggleSidebar} aria-label="Menu principal"><Menu size={23} /></button></div>
    </div>
  </header>;
};
