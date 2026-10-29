import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/mockData';
import { StudioLogo } from './StudioLogo';
export const FooterSection: React.FC = () => {
  const { scrollToSection, openBooking } = useApp();
  return <footer className="studio-footer"><div className="studio-container">
    <div className="footer-top"><div className="footer-brand"><StudioLogo className="w-24 h-24" /><p>Elegância, imagem<br />e exclusividade.</p></div><button className="footer-invite" onClick={() => openBooking()}>Seu próximo<br /><em>capítulo.</em><ArrowUpRight size={42} /></button></div>
    <div className="footer-links"><nav aria-label="Navegação do rodapé">{[['hero','Início'],['servicos','Experiências'],['sobre','O Studio'],['portfolio','Inspirações'],['loja','Grooming'],['contato','Contato']].map(([id,name]) => <button key={id} onClick={() => scrollToSection(id)}>{name}</button>)}</nav><a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} /></a></div>
    <div className="footer-wordmark" aria-hidden="true">13302 STUDIO</div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} 13302 Studio</span><span>Precisão em cada detalhe.</span><button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Voltar ao topo ↑</button></div>
  </div></footer>;
};
