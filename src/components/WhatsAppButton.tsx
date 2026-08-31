import React, { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/mockData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    { label: 'Agendamento e Horários', text: 'Olá! Gostaria de consultar os horários disponíveis para corte no 13302 Studio.' },
    { label: 'Dúvidas sobre Visagismo', text: 'Olá! Gostaria de mais informações sobre a consultoria de visagismo.' },
    { label: 'Informações da Loja', text: 'Olá! Tenho uma dúvida sobre um produto da loja 13302.' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#121215] border border-[#27272a] rounded-lg shadow-2xl p-4 animate-fade-in text-white">
          <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif text-sm font-medium text-white">Atendimento 13302 Studio</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[#a1a1aa] hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#a1a1aa] my-3">
            Olá! Como podemos ajudar você hoje? Escolha um assunto para iniciar no WhatsApp:
          </p>

          <div className="space-y-1.5">
            {quickMessages.map((item, idx) => (
              <a
                key={idx}
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(item.text)}`}
                target="_blank"
                rel="noreferrer"
                className="block p-2.5 bg-[#18181c] hover:bg-[#222228] border border-[#27272a] hover:border-[#22c55e]/50 rounded text-xs text-[#f4f4f5] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={STUDIO_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full py-2.5 bg-[#14532d] hover:bg-[#166534] text-[#86efac] font-semibold text-xs uppercase tracking-wider rounded text-center block transition-colors"
          >
            Abrir Conversa Direta
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25d366] hover:bg-[#20ba59] text-black rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:scale-105 cursor-pointer"
        aria-label="Atendimento rápido via WhatsApp"
        id="btn-floating-whatsapp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
        </span>
        <Phone className="w-6 h-6 text-black fill-black" />
      </button>

    </div>
  );
};
