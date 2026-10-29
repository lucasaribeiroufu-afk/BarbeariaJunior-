import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/mockData';
import { StudioLogo } from './StudioLogo';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar, scrollToSection, openBooking, openHistory } = useApp();
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isSidebarOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
      if (e.key === 'Tab') {
        const nodes = panel.current?.querySelectorAll<HTMLElement>('button,a[href]');
        if (!nodes?.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = before; window.removeEventListener('keydown', key); previous?.focus(); };
  }, [isSidebarOpen]);
  return <AnimatePresence>{isSidebarOpen && <div className="studio-menu-layer">
    <motion.button aria-label="Fechar menu" className="menu-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeSidebar} />
    <motion.div ref={panel} role="dialog" aria-modal="true" aria-label="Navegação 13302 Studio" className="studio-menu" initial={reduced ? false : { x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .5, ease: [.22,1,.36,1] }}>
      <div className="menu-top"><StudioLogo className="w-20 h-20" /><button aria-label="Fechar navegação" onClick={closeSidebar}><X size={25} /></button></div>
      <nav>{[['hero','Início'],['servicos','Experiências'],['sobre','O Studio'],['portfolio','Inspirações'],['loja','Grooming'],['contato','Contato']].map(([id, name], i) => <button key={id} onClick={() => scrollToSection(id)}><span>0{i+1}</span>{name}<ArrowUpRight size={22} /></button>)}</nav>
      <button className="studio-button" onClick={() => openBooking()}>Reserve sua experiência <ArrowUpRight size={18} /></button>
      <button className="text-link" onClick={() => openHistory('agendamentos')}>Meus agendamentos e pedidos <ArrowUpRight size={16} /></button>
      <a className="eyebrow" href={STUDIO_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">@13302studio</a>
    </motion.div>
  </div>}</AnimatePresence>;
};
