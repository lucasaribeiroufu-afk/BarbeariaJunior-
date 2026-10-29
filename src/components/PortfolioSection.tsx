import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GALLERY_ITEMS, SERVICES, STUDIO_INFO } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Reveal } from './StudioMotion';

export const PortfolioSection: React.FC = () => {
  const [active, setActive] = useState(0);
  const { openBooking } = useApp();
  const reduced = useReducedMotion();
  const item = GALLERY_ITEMS[active];
  return <section id="portfolio" className="studio-gallery section-pad"><div className="studio-container">
    <Reveal className="selection-heading"><div><span className="eyebrow">03 / Inspirações</span><h2 className="editorial-title">Clássico na essência.<br /><em>Seu na expressão.</em></h2></div><p className="gallery-intro">Texturas, linhas e rituais para inspirar sua próxima escolha. Imagens de referência; conheça os trabalhos reais no Instagram do Studio.</p></Reveal>
    <div className="gallery-cinema">
      <AnimatePresence mode="wait" initial={false}><motion.div key={item.id} className="gallery-scene" initial={reduced ? false : { opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }}>
        <img src={item.imageUrl} alt={`Imagem de referência: ${item.title}`} />
        <div className="gallery-shade" /><div className="gallery-caption"><span className="eyebrow">{item.category} / inspiração</span><h3>{item.title}</h3><button className="text-link" onClick={() => openBooking(SERVICES.find(s => s.id === item.serviceId))}>Quero explorar este estilo <ArrowUpRight size={19} /></button></div>
      </motion.div></AnimatePresence>
      <div className="gallery-controls"><span aria-live="polite">0{active + 1} <i>/ 0{GALLERY_ITEMS.length}</i></span><div><button aria-label="Inspiração anterior" onClick={() => setActive((active - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}><ArrowLeft size={21} /></button><button aria-label="Próxima inspiração" onClick={() => setActive((active + 1) % GALLERY_ITEMS.length)}><ArrowRight size={21} /></button></div></div>
    </div>
    <div className="gallery-thumbnails" aria-label="Selecionar inspiração">{GALLERY_ITEMS.map((image, index) => <button key={image.id} aria-label={image.title} aria-pressed={active === index} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><img src={image.imageUrl} alt="" loading="lazy" /><span>0{index+1}</span></button>)}</div>
    <a className="text-link gallery-instagram" href={STUDIO_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">Os trabalhos do Studio no Instagram <ArrowUpRight size={18} /></a>
  </div></section>;
};
