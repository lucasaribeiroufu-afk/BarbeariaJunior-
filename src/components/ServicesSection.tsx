import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES, STUDIO_INFO } from '../data/mockData';
import { Reveal } from './StudioMotion';

const images: Record<string, string> = {
  'atendimento-vip': 'photo-1585747860715-2ba37e788b70',
  'corte-barba': 'photo-1503951914875-452162b0f3f1',
  'old-money-hairstyle': 'photo-1622286342621-4bd786c2447c',
  'barba-desenhada': 'photo-1599351431202-1e0f0137899a',
};
export const ServicesSection: React.FC = () => {
  const { openBooking } = useApp();
  const ordered = [...SERVICES].sort((a,b) => {
    const rank = (id: string) => id === 'atendimento-vip' ? 0 : id === 'corte-barba' ? 1 : id === 'old-money-hairstyle' ? 2 : 3;
    return rank(a.id) - rank(b.id);
  });
  const [selected, setSelected] = useState('atendimento-vip');
  const service = SERVICES.find(s => s.id === selected) || SERVICES[0];
  const reduced = useReducedMotion();
  return <section id="servicos" className="experience-menu section-pad">
    <div className="studio-container">
      <Reveal className="section-heading"><div className="eyebrow">02 / Menu de experiências</div><h2 className="editorial-title">Escolha Sua<br /><em>Experiência.</em></h2><p>Excelência, precisão e cuidado em cada detalhe. Serviços desenvolvidos para homens que valorizam imagem, elegância e bem-estar.</p></Reveal>
      <div className="experience-layout">
        <div className="experience-options" aria-label="Escolher experiência">
          {ordered.map((item, i) => <button key={item.id} className={`experience-option ${selected === item.id ? 'is-selected' : ''}`} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>
            <span className="option-index">0{i+1}</span><span className="option-title">{item.name}{item.vip && <small>Experiência Exclusiva</small>}{item.popular && <small>Recomendado</small>}{item.id === 'old-money-hairstyle' && <small>Premium</small>}</span><ArrowUpRight size={20} />
          </button>)}
        </div>
        <div className="experience-stage" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}><motion.article key={service.id} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .25 }} className={`experience-detail ${service.vip ? 'is-exclusive' : ''}`}>
            <div className="experience-image"><img src={`https://images.unsplash.com/${images[service.id] || 'photo-1622286342621-4bd786c2447c'}?auto=format&fit=crop&w=1000&q=80`} alt="Referência visual de barbearia e cuidado masculino" /><span>Universo 13302 · Imagem de referência</span></div>
            <div className="experience-copy">
              <span className="eyebrow">{service.vip ? '✦ Experiência Exclusiva' : service.popular ? '✦ Nossa recomendação' : service.id === 'old-money-hairstyle' ? '✦ Assinatura Premium' : '✦ Cuidado personalizado'}</span>
              <h3>{service.name}</h3><p>{service.description}</p>
              {service.highlights && <ul>{service.highlights.map(h => <li key={h}><Check size={15} />{h}</li>)}</ul>}
              <div className="experience-reserve"><div><span><Clock size={14} />{service.durationMin} min</span><strong>R$ {service.price}</strong></div><button className="studio-button" onClick={() => openBooking(service)} aria-label={`Reservar ${service.name}`}>Reservar experiência <ArrowUpRight size={18} /></button></div>
            </div>
          </motion.article></AnimatePresence>
        </div>
      </div>
      <Reveal className="experience-help"><span className="eyebrow">Uma escolha pessoal</span><h3>Precisa de orientação?</h3><p>Nossa equipe está à disposição para indicar a experiência mais adequada ao seu perfil, estilo e objetivos de imagem. Entre em contato pelo WhatsApp para uma consultoria personalizada.</p><a className="text-link" href={STUDIO_INFO.whatsappUrl + '?text=' + encodeURIComponent('Olá! Gostaria de orientação para escolher minha experiência na 13302 Studio.')} target="_blank" rel="noopener noreferrer">Converse com o Studio <ArrowUpRight size={18} /></a></Reveal>
    </div>
  </section>;
};
