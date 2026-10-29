import React from 'react';
import { Crown, Scissors, Gem, Sparkles, CheckCircle2, Star, Award, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BARBERS } from '../data/mockData';

export const FeaturesSection: React.FC = () => {
  const { openBooking } = useApp();
  const masterBarber = BARBERS[0]; // Único responsável pelos cortes

  const features = [
    {
      id: 'feature-vip',
      icon: Crown,
      title: 'Atendimento VIP',
      description: 'Cada cliente é único. Reserva privada, ritual completo e bebida de cortesia.',
      badge: 'Ritual Exclusivo',
    },
    {
      id: 'feature-visagismo',
      icon: Scissors,
      title: 'Visagismo',
      description: 'Análise de rosto e estilo para desenhar o corte que valoriza sua identidade.',
      badge: 'Consultoria Personalizada',
    },
    {
      id: 'feature-exclusividade',
      icon: Gem,
      title: 'Exclusividade',
      description: 'Ambiente reservado, produtos premium e detalhes que fazem diferença.',
      badge: 'Padrão Old-Money',
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-[#0c0c0e] border-y border-[#27272a]/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a059] block mb-2 font-sans">
            Diferenciais 13302
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#f4f4f5] tracking-tight">
            Sobre a <span className="italic text-[#e0be77]">13302 Studio</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a1a1aa] font-sans">
            Na 13302 Studio, cada atendimento é conduzido com atenção aos detalhes, técnica apurada e compromisso com a excelência.
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">Mais do que uma barbearia, oferecemos experiências personalizadas para homens que buscam elegância, confiança e distinção.</p>
        </div>

        {/* 3 Cards Grid Matching Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-[#121215] border border-[#27272a] hover:border-[#c5a059]/50 rounded-sm p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.8)] group flex flex-col justify-between"
              >
                <div>
                  {/* Gold Outline Icon matching Image 2 */}
                  <div className="w-14 h-14 rounded-full bg-[#18181c] border border-[#3f3f46]/50 flex items-center justify-center mb-8 text-[#c5a059] group-hover:border-[#c5a059] group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 stroke-[1.5]" />
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#c5a059]/80 block mb-2">
                    {item.badge}
                  </span>

                  {/* Title in Serif */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#f4f4f5] mb-4 group-hover:text-[#e0be77] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-[#27272a]/50 flex items-center justify-between">
                  <span className="text-xs text-[#71717a] font-sans">13302 Studio Signature</span>
                  <div className="w-2 h-2 rounded-full bg-[#c5a059]/40 group-hover:bg-[#c5a059] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Master Barber & Visagista Profile Spotlight */}
        <div className="bg-[#121215] border border-[#27272a] hover:border-[#c5a059]/50 rounded-sm p-6 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12 relative z-10">
            {/* Avatar with luxury golden frame */}
            <div className="shrink-0 relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 border-2 border-[#c5a059] relative bg-[#18181c] shadow-[0_0_25px_rgba(197,160,89,0.2)]">
                <img
                  src={masterBarber.avatar}
                  alt={masterBarber.name}
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a059] block mb-1 font-sans">
                    ÚNICO RESPONSÁVEL PELOS CORTES
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f4f4f5] font-light">
                    {masterBarber.name}
                  </h3>
                </div>

                
              </div>

              {/* Role */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181c] border border-[#3f3f46]/60 rounded-sm text-[#e0be77] text-xs uppercase tracking-wider font-semibold">
                <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{masterBarber.role}</span>
              </div>

              {/* Bio description */}
              <p className="font-sans text-base sm:text-lg text-[#d4d4d8] leading-relaxed max-w-3xl">
                {masterBarber.bio}
              </p>

              {/* Specialties & CTA */}
              <div className="pt-4 border-t border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {masterBarber.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] text-[#a1a1aa] bg-[#1a1a1e] border border-[#27272a] px-2.5 py-1 rounded-sm font-sans"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="px-6 py-3 bg-[#c5a059] hover:bg-[#d8b56c] text-[#09090b] text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 cursor-pointer shrink-0"
                  id="btn-agendar-ademir"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar com Ademir Júnior</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

