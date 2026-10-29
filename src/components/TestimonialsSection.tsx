import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const TestimonialsSection: React.FC = () => {
  const { openBooking } = useApp();
  return <section id="avaliacoes" className="py-20 bg-[#0c0c0e] border-y border-[#27272a]/50">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059]">Sua experiência na 13302 Studio</span>
      <h2 className="font-serif text-3xl sm:text-5xl mt-3 text-[#f4f4f5]">Cuidado realizado por <span className="italic text-[#e0be77]">Ademir Júnior</span></h2>
      <p className="mt-5 text-sm leading-relaxed text-[#a1a1aa]">Todos os cortes são realizados por Ademir Júnior. Converse diretamente com o Studio para tirar dúvidas ou compartilhar como foi o seu atendimento.</p>
      <div className="mt-7 flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={() => openBooking()} className="px-6 py-3 bg-[#c5a059] text-black text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2">Agendar com Ademir Júnior <ArrowRight className="w-4 h-4" /></button>
        <a href={STUDIO_INFO.whatsappUrl + '?text=' + encodeURIComponent('Olá! Gostaria de compartilhar minha experiência na 13302 Studio.')} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-[#c5a059] text-[#e0be77] text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" />Compartilhar experiência</a>
      </div>
    </div>
  </section>;
};
