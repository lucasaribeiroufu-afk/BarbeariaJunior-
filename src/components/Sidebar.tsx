import React from 'react';
import { StudioLogo } from './StudioLogo';
import { 
  X, 
  Scissors, 
  ShoppingBag, 
  Camera, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO, SERVICES } from '../data/mockData';

export const Sidebar: React.FC = () => {
  const { 
    isSidebarOpen, 
    closeSidebar, 
    openBooking, 
    openHistory, 
    scrollToSection, 
    setSelectedStoreCategory,
    appointments,
    orders
  } = useApp();

  if (!isSidebarOpen) return null;

  const handleServiceSelect = (category: string) => {
    closeSidebar();
    scrollToSection('servicos');
  };

  const handleStoreCategorySelect = (category: string) => {
    setSelectedStoreCategory(category);
    closeSidebar();
    scrollToSection('loja');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="sidebar-drawer-container">
      {/* Backdrop */}
      <div 
        onClick={closeSidebar}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e11] border-l border-[#27272a] shadow-2xl flex flex-col h-full overflow-y-auto">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StudioLogo className="w-16 h-16" />
              <div>
                <h2 className="font-serif text-lg tracking-widest text-[#f4f4f5] uppercase font-semibold">
                  13302 Studio
                </h2>
                <p className="text-[10px] tracking-wider text-[#a1a1aa] uppercase font-sans">
                  Old Money Grooming & Visagismo
                </p>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md text-[#a1a1aa] hover:text-white hover:bg-[#18181b] transition-colors"
              id="btn-sidebar-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action CTA */}
          <div className="p-6 bg-gradient-to-b from-[#141418] to-transparent border-b border-[#27272a]/50">
            <button
              onClick={() => { closeSidebar(); openBooking(); }}
              className="w-full py-3.5 px-4 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold uppercase text-xs tracking-widest rounded-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              id="btn-sidebar-agendar-cta"
            >
              <Scissors className="w-4 h-4" />
              Agendar Horário Online
            </button>

            {/* Quick Status Bar */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => openHistory('agendamentos')}
                className="p-2.5 bg-[#18181c] border border-[#27272a] rounded text-left hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">Agendamentos</div>
                <div className="text-xs font-semibold text-[#f4f4f5] flex items-center justify-between mt-0.5">
                  <span>{appointments.length} registrado(s)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
              </button>

              <button
                onClick={() => openHistory('pedidos')}
                className="p-2.5 bg-[#18181c] border border-[#27272a] rounded text-left hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="text-[10px] text-[#a1a1aa] uppercase tracking-wider">Pedidos da Loja</div>
                <div className="text-xs font-semibold text-[#f4f4f5] flex items-center justify-between mt-0.5">
                  <span>{orders.length} pedido(s)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />
                </div>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-6 flex-1">
            
            {/* Categorias de Serviços */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059] mb-3 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" />
                Menu de Serviços
              </div>
              <ul className="space-y-1.5">
                <li>
                  <button
                    onClick={() => handleServiceSelect('todos')}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center justify-between"
                  >
                    <span>Todos os Serviços da Casa</span>
                    <span className="text-xs text-[#71717a]">8 opções</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { closeSidebar(); openBooking(SERVICES.find(s => s.id === 'visagismo')); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center justify-between"
                  >
                    <span>Visagismo & Consultoria</span>
                    <span className="text-xs text-[#c5a059] font-medium">R$ 180</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { closeSidebar(); openBooking(SERVICES.find(s => s.id === 'atendimento-vip')); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center justify-between"
                  >
                    <span>Atendimento VIP Reservado</span>
                    <span className="text-xs text-[#c5a059] font-medium">R$ 250</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { closeSidebar(); openBooking(SERVICES.find(s => s.id === 'old-money-hairstyle')); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center justify-between"
                  >
                    <span>Old Money Hairstyle Signature</span>
                    <span className="text-xs text-[#c5a059] font-medium">R$ 120</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Categorias da Loja Grooming */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059] mb-3 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                Categorias da Loja
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['STYLING', 'BARBA', 'CABELO', 'VESTUARIO', 'KITS'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleStoreCategorySelect(cat)}
                    className="p-2.5 bg-[#141418] border border-[#27272a] hover:border-[#c5a059] text-left text-[#d4d4d8] hover:text-white rounded transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Links rápidos */}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059] mb-3">
                Explorar o Studio
              </div>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => { closeSidebar(); scrollToSection('portfolio'); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-[#a1a1aa]" />
                    Galeria de Trabalhos & Estilos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { closeSidebar(); scrollToSection('avaliacoes'); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#c5a059]" />
                    Avaliações & Padrão 5 Estrelas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { closeSidebar(); scrollToSection('instagram'); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-4 h-4 text-[#a1a1aa]" />
                    Instagram {STUDIO_INFO.instagramHandle}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { closeSidebar(); scrollToSection('sobre'); }}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#d4d4d8] hover:text-[#c5a059] hover:bg-[#18181c] transition-colors flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#a1a1aa]" />
                    Conceito & Experiência Old-Money
                  </button>
                </li>
              </ul>
            </div>

            {/* Atendimento & Contatos Oficiais */}
            <div className="pt-4 border-t border-[#27272a] space-y-3 text-xs text-[#a1a1aa]">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a059]">
                Atendimento Rápido
              </div>
              
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#13281c] border border-[#166534]/50 rounded text-[#86efac] hover:bg-[#14532d] transition-colors"
                id="link-sidebar-whatsapp"
              >
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-[#4ade80]" />
                  <span className="font-medium">WhatsApp Studio</span>
                </div>
                <span className="text-[11px] underline">{STUDIO_INFO.phoneDisplay}</span>
              </a>

              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-[#18181c] border border-[#27272a] rounded text-[#f4f4f5] hover:border-[#c5a059] transition-colors"
                id="link-sidebar-instagram"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-[#e0be77]" />
                  <span>{STUDIO_INFO.instagramHandle}</span>
                </div>
                <span className="text-[11px] text-[#c5a059]">Seguir</span>
              </a>

              <div className="flex items-start gap-2 pt-2">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.hours}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>{STUDIO_INFO.address}</span>
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-[#27272a] bg-[#09090b] text-center text-[11px] text-[#71717a]">
            13302 Studio © 2026 · Todos os direitos reservados.
          </div>

        </div>
      </div>
    </div>
  );
};
