import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BARBERS, SERVICES } from '../data/mockData';
import { Reveal } from './StudioMotion';

const rituals = [
  { title: 'Sua identidade, primeiro.', copy: 'A conversa vem antes da tesoura. Proporções faciais, estilo de vida e objetivos de imagem orientam uma escolha que faz sentido para você.' },
  { title: 'Técnica que se vê nos detalhes.', copy: 'Corte personalizado, desenho de barba e finalização cuidadosamente executados para um resultado equilibrado e preciso.' },
  { title: 'Um tempo reservado para você.', copy: 'Na experiência The Gentleman, corte, barboterapia e cuidados complementares se encontram em um atendimento privativo.' },
];
export const FeaturesSection: React.FC = () => {
  const { openBooking } = useApp();
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return <section id="sobre" className="studio-about section-pad">
    <div className="studio-container about-grid">
      <Reveal className="about-sticky"><div className="eyebrow">01 / O Studio</div><h2 className="editorial-title">O cuidado é pessoal.<br /><em>O estilo também.</em></h2>
        <p>Na 13302 Studio, cada atendimento é conduzido com atenção aos detalhes, técnica apurada e compromisso com a excelência.</p>
        <p>Mais do que uma barbearia, oferecemos experiências personalizadas para homens que buscam elegância, confiança e distinção.</p>
        <button className="text-link dark-link" onClick={() => openBooking(SERVICES.find(s => s.id === 'visagismo'))}>Encontre a sua assinatura <ArrowUpRight size={18} /></button>
      </Reveal>
      <div>
        <Reveal className="barber-portrait"><img src={BARBERS[0].avatar} alt={BARBERS[0].name} loading="lazy" /><div><span className="eyebrow">À frente do cuidado</span><h3>{BARBERS[0].name}</h3><span>13302 Studio</span></div></Reveal>
        <div className="ritual-accordion">{rituals.map((item, index) => <div className="ritual-row" key={item.title}>
          <button aria-expanded={active === index} aria-controls={`ritual-panel-${index}`} onClick={() => setActive(active === index ? -1 : index)}><span>0{index + 1}</span><h3>{item.title}</h3>{active === index ? <Minus size={18} /> : <Plus size={18} />}</button>
          <AnimatePresence initial={false}>{active === index && <motion.div id={`ritual-panel-${index}`} initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35 }}><p>{item.copy}</p></motion.div>}</AnimatePresence>
        </div>)}</div>
      </div>
    </div>
  </section>;
};
