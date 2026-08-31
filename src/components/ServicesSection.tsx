import React, { useState } from 'react';
import { ArrowRight, Clock, Sparkles, Check, Scissors } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES } from '../data/mockData';
import { Service, ServiceCategory } from '../types';

export const ServicesSection: React.FC = () => {
  const { openBooking } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'cabelo', label: 'Cabelo & Corte' },
    { id: 'barba', label: 'Barba & Navalha' },
    { id: 'combos', label: 'Combos Completos' },
    { id: 'visagismo', label: 'Visagismo' },
    { id: 'vip', label: 'Experiência VIP' },
  ];

  const filteredServices = activeCategory === 'todos' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="servicos" className="py-24 bg-[#09090b] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Image 3 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#27272a]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa] block mb-1.5 font-sans">
              MENU DE SERVIÇOS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f4f4f5] tracking-tight">
              Serviços da casa
            </h2>
          </div>

          <button
            onClick={() => openBooking()}
            className="self-start sm:self-auto px-5 py-2.5 bg-transparent hover:bg-[#18181c] border border-[#c5a059] hover:border-[#e0be77] text-[#e0be77] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-200 flex items-center gap-2 cursor-pointer"
            id="btn-services-agendar-header"
          >
            <span>AGENDAR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-sm whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#c5a059] text-black font-semibold shadow-md'
                  : 'bg-[#141418] text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#3f3f46]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Service Items List matching Image 3 & 4 */}
        <div className="space-y-4">
          {filteredServices.map((service: Service) => (
            <div
              key={service.id}
              id={`service-item-${service.id}`}
              onClick={() => openBooking(service)}
              className="group bg-[#121215] hover:bg-[#16161c] border border-[#27272a] hover:border-[#c5a059]/70 rounded-sm p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(197,160,89,0.08)] cursor-pointer relative overflow-hidden"
            >
              {/* Subtle luxury ambient sheen on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059]/[0.04] via-[#c5a059]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Highlight badge if popular or vip */}
              {service.popular && (
                <div className="absolute top-0 right-0 bg-[#c5a059] text-black text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-bl-sm shadow-sm transition-transform duration-300 group-hover:scale-105 origin-top-right">
                  Mais Escolhido
                </div>
              )}
              {service.vip && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#9c7b39] to-[#c5a059] text-black text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-bl-sm shadow-sm transition-transform duration-300 group-hover:scale-105 origin-top-right">
                  Exclusivo VIP
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
                <div className="flex-1 pr-4">
                  {/* Service Title & Duration */}
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f4f4f5] group-hover:text-[#e0be77] transition-colors duration-300">
                      {service.name}
                    </h3>
                    <span className="text-[11px] font-medium tracking-widest text-[#a1a1aa] group-hover:text-[#d4d4d8] uppercase font-sans flex items-center gap-1 transition-colors duration-300">
                      <Clock className="w-3 h-3 text-[#c5a059] group-hover:rotate-12 transition-transform duration-300" />
                      {service.durationMin} MIN
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] group-hover:text-[#d4d4d8] font-sans leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  {service.highlights && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#71717a] group-hover:text-[#a1a1aa] transition-colors duration-300">
                      {service.highlights.map((h, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-[#c5a059] group-hover:scale-125 transition-transform duration-300">✦</span> {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price in Gold Serif */}
                <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between pt-2 sm:pt-0 border-t sm:border-t-0 border-[#27272a]">
                  <div className="font-serif text-2xl sm:text-3xl font-medium text-[#c5a059] group-hover:text-[#e0be77] tracking-tight transition-colors duration-300">
                    R$ {service.price}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#a1a1aa] group-hover:text-[#e0be77] mt-1 flex items-center gap-1.5 font-medium transition-colors duration-300">
                    <span>Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 text-[#c5a059] transition-transform duration-300 ease-out" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#18181c] to-[#121215] border border-[#27272a] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-xl text-[#f4f4f5]">Dúvidas sobre o melhor serviço para seu perfil?</h4>
            <p className="text-xs text-[#a1a1aa] mt-1">Converse com nossos especialistas via WhatsApp e tire suas dúvidas de visagismo.</p>
          </div>
          <a
            href="https://wa.me/55034999448588?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os%20do%2013302%20Studio."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#14532d] hover:bg-[#166534] text-[#86efac] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap"
          >
            Falar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
