import React, { useState } from 'react';
import { ArrowRight, Clock, Check, Crown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES, STUDIO_INFO } from '../data/mockData';

export const ServicesSection: React.FC = () => {
  const { openBooking } = useApp();
  const [activeCategory, setActiveCategory] = useState('todos');
  const categories = [
    { id: 'todos', label: 'Todas as experiências' },
    { id: 'cabelo', label: 'Cabelo & Estilo' },
    { id: 'barba', label: 'Barboterapia' },
    { id: 'combos', label: 'Experiência Executiva' },
    { id: 'visagismo', label: 'Consultoria' },
    { id: 'vip', label: 'Exclusividade' },
  ];
  const ordered = [...SERVICES].sort((a, b) => {
    const rank = (id: string) => id === 'atendimento-vip' ? 0 : id === 'corte-barba' ? 1 : id === 'old-money-hairstyle' ? 2 : 3;
    return rank(a.id) - rank(b.id);
  });
  const filtered = activeCategory === 'todos' ? ordered : ordered.filter(s => s.category === activeCategory);
  const whatsappUrl = STUDIO_INFO.whatsappUrl + '?text=' + encodeURIComponent('Olá, 13302 Studio! Gostaria de uma consultoria personalizada para escolher a experiência mais adequada ao meu perfil.');
  return (
    <section id="servicos" className="py-20 sm:py-28 bg-[#09090b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059]">13302 Studio · Cuidado masculino</span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#f4f4f5] mt-4 mb-5">Escolha Sua <span className="italic text-[#e0be77]">Experiência</span></h2>
          <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">Excelência, precisão e cuidado em cada detalhe. Serviços desenvolvidos para homens que valorizam imagem, elegância e bem-estar.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8" aria-label="Categorias de experiências">
          {categories.map(cat => (
            <button key={cat.id} type="button" aria-pressed={activeCategory === cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 text-xs tracking-wide border transition-colors rounded-sm ${activeCategory === cat.id ? 'border-[#c5a059] bg-[#c5a059] text-black' : 'border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#c5a059]'}`}>
              {cat.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(service => {
            const premium = service.id === 'old-money-hairstyle';
            return (
              <article key={service.id} id={`service-item-${service.id}`}
                className={`relative flex flex-col p-6 sm:p-9 border rounded-sm ${service.vip ? 'md:col-span-2 border-[#c5a059] bg-gradient-to-br from-[#302617] via-[#191610] to-[#121215]' : service.popular || premium ? 'border-[#c5a059]/50 bg-[#191713]' : 'border-[#27272a] bg-[#121215]'}`}>
                <div className="flex items-center gap-2 min-h-6 mb-5 text-[10px] uppercase tracking-[0.2em] text-[#e0be77]">
                  {service.vip ? <><Crown className="w-4 h-4" /><span className="border border-[#c5a059]/70 px-3 py-1">Experiência Exclusiva</span></> : service.popular ? <span>✦ Recomendado</span> : premium ? <span>✦ Experiência Premium</span> : <span>13302 Studio</span>}
                </div>
                <h3 className={`font-serif text-[#f4f4f5] mb-4 ${service.vip ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{service.name}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#b8b8bf] max-w-3xl">{service.description}</p>
                {service.highlights && <ul className="mt-6 space-y-2">
                  {service.highlights.map(item => <li key={item} className="flex items-start gap-2 text-sm text-[#d4d4d8]"><Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />{item}</li>)}
                </ul>}
                <div className="mt-auto pt-8">
                  <div className="border-t border-[#c5a059]/20 pt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-sm text-[#a1a1aa]">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#c5a059]" />{service.durationMin} min</span>
                      <span className="text-[#e0be77]">R$ {service.price}</span>
                    </div>
                    <button type="button" onClick={() => openBooking(service)} aria-label={`Reservar ${service.name}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#c5a059] text-[#e0be77] hover:bg-[#c5a059] hover:text-black text-xs uppercase tracking-wider transition-colors">
                      Reservar experiência <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <aside className="mt-12 border-t border-[#27272a] pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-serif text-3xl text-[#f4f4f5] mb-3">Precisa de orientação?</h3>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">Nossa equipe está à disposição para indicar a experiência mais adequada ao seu perfil, estilo e objetivos de imagem.</p>
            <p className="text-sm text-[#a1a1aa] mt-2">Entre em contato pelo WhatsApp para uma consultoria personalizada.</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#c5a059] hover:bg-[#e0be77] text-black text-xs font-semibold uppercase tracking-wider shrink-0">Falar no WhatsApp <ArrowRight className="w-4 h-4" /></a>
        </aside>
      </div>
    </section>
  );
};
