import React from 'react';
import { StudioLogo } from './StudioLogo';
import { ArrowRight, Instagram, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO, SERVICES } from '../data/mockData';

export const FooterSection: React.FC = () => {
  const { openBooking, scrollToSection, setSelectedStoreCategory } = useApp();

  return (
    <footer id="contato" className="bg-[#08080a] border-t border-[#27272a] text-[#a1a1aa] relative">
      
      {/* Upper CTA Banner matching Image 9 */}
      <div className="border-b border-[#27272a]/60 bg-gradient-to-b from-[#121215] to-[#08080a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center flex flex-col items-center">
          
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a059] block mb-3 font-sans">
            EXPERIÊNCIA EXCLUSIVA
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#f4f4f5] tracking-tight leading-tight mb-4">
            13302 STUDIO<br />
            <span className="italic text-[#e0be77]">Sua próxima transformação começa aqui.</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#a1a1aa] max-w-xl mb-8 leading-relaxed">
            Reserve agora com horário marcado e viva a verdadeira experiência de visagismo e estilo old-money.
          </p>

          <button
            onClick={() => openBooking()}
            className="px-10 py-4 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold text-xs uppercase tracking-[0.25em] rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(197,160,89,0.35)] flex items-center gap-3 cursor-pointer group"
            id="btn-footer-reservar"
          >
            <span>RESERVAR MEU HORÁRIO</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Studio Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StudioLogo className="w-24 h-24" />
              <div className="font-serif text-xl font-medium tracking-widest text-[#f4f4f5]">
                13302 STUDIO
              </div>
            </div>
            
            <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
              Barbearia premium de alto padrão especializada em visagismo, corte clássico masculino e produtos seletos de grooming.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#18181c] border border-[#27272a] hover:border-[#c5a059] text-white hover:text-[#c5a059] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#18181c] border border-[#27272a] hover:border-[#22c55e] text-white hover:text-[#86efac] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Serviços & Categorias */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4f4f5] mb-4 font-sans">
              Serviços da Casa
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              {SERVICES.slice(0, 5).map(service => (
                <li key={service.id}>
                  <button
                    onClick={() => openBooking(service)}
                    className="hover:text-[#c5a059] transition-colors text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection('servicos')}
                  className="text-[#c5a059] hover:underline"
                >
                  Ver Menu Completo →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Loja 13302 E-commerce */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4f4f5] mb-4 font-sans">
              Grooming & E-Commerce
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button
                  onClick={() => {
                    setSelectedStoreCategory('STYLING');
                    scrollToSection('loja');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Pomadas & Ceras Modeladoras
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedStoreCategory('BARBA');
                    scrollToSection('loja');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Óleos & Balms para Barba
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedStoreCategory('CABELO');
                    scrollToSection('loja');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Shampoos & Tônicos Antiqueda
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedStoreCategory('KITS');
                    scrollToSection('loja');
                  }}
                  className="hover:text-[#c5a059] transition-colors"
                >
                  Kits Presente Old Money
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Localização & Atendimento */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4f4f5] mb-4 font-sans">
              Localização & Contato
            </h3>
            
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span>{STUDIO_INFO.address}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <span>{STUDIO_INFO.hours}</span>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
              <a 
                href={STUDIO_INFO.whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-[#86efac] hover:underline"
              >
                {STUDIO_INFO.phoneDisplay} (WhatsApp)
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#71717a]">
              Instagram: <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer" className="text-[#c5a059] hover:underline">@13302studio</a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-12 mt-12 border-t border-[#27272a]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div>
            © {new Date().getFullYear()} 13302 Studio. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Visagismo Masculino</span>
            <span>·</span>
            <span>Old Money Grooming</span>
            <span>·</span>
            <span>Atendimento VIP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
