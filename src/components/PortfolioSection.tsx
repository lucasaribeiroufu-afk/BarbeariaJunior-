import React, { useState } from 'react';
import { Camera, ZoomIn, Scissors, Heart, Instagram, ArrowRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GALLERY_ITEMS, SERVICES, STUDIO_INFO } from '../data/mockData';
import { GalleryItem } from '../types';

export const PortfolioSection: React.FC = () => {
  const { openBooking } = useApp();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookStyle = (item: GalleryItem) => {
    setSelectedItem(null);
    const relatedService = SERVICES.find(s => s.id === item.serviceId) || SERVICES[0];
    openBooking(relatedService);
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0c0c0e] border-t border-[#27272a]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Image 5 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c5a059] block mb-2 font-sans">
            PORTFÓLIO
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f4f4f5] tracking-tight">
            Old Money Hairstyle
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a1a1aa] font-sans">
            Uma seleção de trabalhos que refletem o estilo assinatura do studio.
          </p>
        </div>

        {/* Masonry / Bento Photo Grid matching Image 5 & 6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => {
            const isLiked = likedMap[item.id];
            const currentLikes = item.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={() => setSelectedItem(item)}
                className={`group relative bg-[#121215] border border-[#27272a] hover:border-[#c5a059]/50 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Image Container */}
                <div className="aspect-[4/5] w-full overflow-hidden relative bg-[#18181c]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/20 opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/70 backdrop-blur-md border border-white/10 text-[#c5a059] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-sm">
                      {item.category}
                    </span>
                    
                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
                        isLiked 
                          ? 'bg-rose-950/80 text-rose-400 border border-rose-500/50' 
                          : 'bg-black/60 text-white/80 hover:text-white border border-white/10'
                      }`}
                      aria-label="Curtir foto"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9px] text-[#a1a1aa] bg-black/50 px-1.5 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f4f4f5] group-hover:text-[#e0be77] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#a1a1aa] line-clamp-2 mt-1 font-sans">
                      {item.subtitle}
                    </p>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[#c5a059] font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Ver detalhes</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      <span className="text-[11px] text-[#71717a]">
                        {currentLikes} curtidas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA underneath */}
        <div className="mt-14 text-center">
          <a
            href={STUDIO_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#141418] hover:bg-[#1e1e24] border border-[#3f3f46] hover:border-[#c5a059] text-xs font-semibold uppercase tracking-widest text-[#f4f4f5] hover:text-[#c5a059] rounded-sm transition-all"
            id="btn-portfolio-instagram"
          >
            <Instagram className="w-4 h-4 text-[#c5a059]" />
            Ver mais fotos no @13302studio
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-3xl w-full bg-[#121215] border border-[#27272a] rounded-sm overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/70 rounded-full text-white hover:text-[#c5a059] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-black aspect-square md:aspect-auto h-full max-h-[500px]">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded">
                      {selectedItem.category}
                    </span>
                    <span className="text-xs text-[#71717a]">
                      13302 Studio
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#f4f4f5] mb-3">
                    {selectedItem.title}
                  </h3>

                  <p className="text-sm text-[#a1a1aa] leading-relaxed mb-6 font-sans">
                    {selectedItem.subtitle}
                  </p>

                  <div className="p-3 bg-[#18181c] border border-[#27272a] rounded text-xs space-y-1 mb-6">
                    <div className="text-[#a1a1aa]">
                      <strong className="text-[#f4f4f5]">Serviço indicado:</strong> {selectedItem.serviceReferenceName}
                    </div>
                    <div className="text-[#a1a1aa]">
                      <strong className="text-[#f4f4f5]">Finalização:</strong> Pomada Old Money Matte + Óleo nobre
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#27272a]">
                  <button
                    onClick={() => handleBookStyle(selectedItem)}
                    className="w-full py-3.5 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold uppercase text-xs tracking-widest rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Scissors className="w-4 h-4" />
                    Quero Agendar Este Estilo
                  </button>

                  <a
                    href={`${STUDIO_INFO.whatsappUrl}?text=${encodeURIComponent(`Olá! Vi a foto "${selectedItem.title}" no app e gostaria de tirar uma dúvida sobre esse corte.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-[#18181c] hover:bg-[#202026] text-[#86efac] border border-[#27272a] font-medium text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    Conversar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
