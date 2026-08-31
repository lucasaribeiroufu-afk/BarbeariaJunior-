import React, { useState } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  ThumbsUp, 
  Plus, 
  MessageSquare, 
  X, 
  Calendar,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS, BARBERS, SERVICES } from '../data/mockData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const { openBooking } = useApp();

  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Review Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formBarber, setFormBarber] = useState(BARBERS[0].name);
  const [formService, setFormService] = useState(SERVICES[0].name);
  const [formCategory, setFormCategory] = useState<'visagismo' | 'corte' | 'barba' | 'vip'>('visagismo');
  const [formHighlight, setFormHighlight] = useState('');
  const [formComment, setFormComment] = useState('');

  const categories = [
    { id: 'all', label: 'Todas as Avaliações' },
    { id: 'visagismo', label: 'Visagismo & Imagem' },
    { id: 'vip', label: 'Experiência VIP' },
    { id: 'corte', label: 'Corte Clássico' },
    { id: 'barba', label: 'Barba & Toalha Quente' },
  ];

  const filteredTestimonials = testimonialsList.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const handleLike = (id: string) => {
    setLikedIds(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newTestimonial: Testimonial = {
      id: `test-custom-${Date.now()}`,
      name: formName.trim(),
      role: formRole.trim() || 'Cliente Verificado',
      companyOrTitle: 'Avaliação Recente',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      rating: formRating,
      service: formService,
      barberName: formBarber,
      date: 'Agora mesmo',
      highlight: formHighlight.trim() || 'Excelente experiência no 13302 Studio!',
      comment: formComment.trim(),
      category: formCategory,
      verified: true,
    };

    setTestimonialsList([newTestimonial, ...testimonialsList]);
    setIsReviewModalOpen(false);

    // Reset Form
    setFormName('');
    setFormRole('');
    setFormHighlight('');
    setFormComment('');
    setFormRating(5);

    // Toast
    setToastMessage('Sua avaliação foi enviada e publicada com sucesso!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <section id="avaliacoes" className="py-20 sm:py-28 bg-[#0a0a0c] border-b border-[#27272a] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#18181c] border border-[#27272a] rounded-full text-[#c5a059] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prestígio & Reconhecimento</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f4f4f5] tracking-tight leading-tight">
            O Padrão 13302 pelos Nossos Clientes
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-[#a1a1aa] font-sans leading-relaxed">
            Depoimentos de cavalheiros que confiam sua imagem pessoal ao nosso ritual de visagismo, corte clássico e atendimento de excelência.
          </p>
        </div>

        {/* Studio Prestige Metrics Banner */}
        <div className="bg-[#121215] border border-[#27272a] rounded-sm p-6 sm:p-8 mb-12 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#27272a]">
            
            {/* Metric 1: Overall Score */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0">
              <div className="w-14 h-14 rounded-sm bg-[#18181c] border border-[#c5a059]/40 flex flex-col items-center justify-center shrink-0">
                <span className="font-serif text-2xl font-semibold text-[#c5a059]">5.0</span>
                <div className="flex text-[#c5a059]">
                  <Star className="w-2.5 h-2.5 fill-[#c5a059]" />
                  <Star className="w-2.5 h-2.5 fill-[#c5a059]" />
                  <Star className="w-2.5 h-2.5 fill-[#c5a059]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#f4f4f5] font-serif text-base font-medium">
                  <span>Nota Máxima</span>
                  <Award className="w-4 h-4 text-[#c5a059]" />
                </div>
                <p className="text-xs text-[#71717a] font-sans mt-0.5">
                  Baseado em +380 avaliações de clientes
                </p>
              </div>
            </div>

            {/* Metric 2: Pontualidade */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-6">
              <div className="w-14 h-14 rounded-sm bg-[#18181c] border border-[#27272a] flex items-center justify-center shrink-0 text-[#c5a059]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[#f4f4f5] font-serif text-base font-medium">
                  100% Pontualidade
                </div>
                <p className="text-xs text-[#71717a] font-sans mt-0.5">
                  Respeito absoluto à agenda executiva
                </p>
              </div>
            </div>

            {/* Metric 3: Visagismo Exclusivo */}
            <div className="flex items-center gap-4 pt-4 sm:pt-0 lg:pl-6">
              <div className="w-14 h-14 rounded-sm bg-[#18181c] border border-[#27272a] flex items-center justify-center shrink-0 text-[#c5a059]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[#f4f4f5] font-serif text-base font-medium">
                  Visagismo Científico
                </div>
                <p className="text-xs text-[#71717a] font-sans mt-0.5">
                  Consultoria sob medida para seu formato facial
                </p>
              </div>
            </div>

            {/* Metric 4: Ação Deixar Avaliação */}
            <div className="flex items-center justify-between sm:justify-start lg:justify-end gap-3 pt-4 sm:pt-0 lg:pl-6">
              <button
                type="button"
                id="btn-open-review-modal"
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#18181c] hover:bg-[#202026] text-[#c5a059] border border-[#c5a059]/40 hover:border-[#c5a059] rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Avaliar Experiência</span>
              </button>
            </div>

          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-testimonial-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] rounded-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-[#09090b] font-semibold shadow-md'
                    : 'bg-[#121215] text-[#a1a1aa] border border-[#27272a] hover:border-[#71717a] hover:text-[#f4f4f5]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-6 p-4 bg-[#18181c] border border-[#c5a059] rounded-sm text-[#e0be77] text-xs font-medium flex items-center justify-between shadow-lg animate-fade-in max-w-lg mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-[#71717a] hover:text-[#f4f4f5]">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => {
            const currentLikes = likedIds[item.id] || 0;
            return (
              <div
                key={item.id}
                id={`testimonial-card-${item.id}`}
                className="bg-[#121215] border border-[#27272a] hover:border-[#c5a059]/50 rounded-sm p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group relative"
              >
                {/* Subtle top quotation mark */}
                <div className="absolute top-5 right-5 text-[#27272a] group-hover:text-[#c5a059]/20 transition-colors pointer-events-none">
                  <Quote className="w-9 h-9 rotate-180" />
                </div>

                <div>
                  {/* Rating Stars & Service Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-[#c5a059]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
                      ))}
                      <span className="text-[11px] font-bold text-[#e0be77] ml-1 font-sans">
                        ★ {item.rating}.0
                      </span>
                    </div>

                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#a1a1aa] bg-[#18181c] border border-[#27272a] px-2 py-0.5 rounded">
                      {item.service}
                    </span>
                  </div>

                  {/* Highlight Headline */}
                  <h3 className="font-serif text-lg sm:text-xl text-[#f4f4f5] font-normal group-hover:text-[#e0be77] transition-colors leading-snug mb-3 pr-6">
                    "{item.highlight}"
                  </h3>

                  {/* Testimonial Text */}
                  <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed font-sans font-light mb-6">
                    {item.comment}
                  </p>
                </div>

                {/* Footer: Client Info & Barber attended */}
                <div className="pt-4 border-t border-[#27272a]/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-[#c5a059]/40 shrink-0"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-xs text-[#f4f4f5] font-sans line-clamp-1">
                          {item.name}
                        </span>
                        {item.verified && (
                          <CheckCircle2 className="w-3 h-3 text-[#c5a059] shrink-0" title="Cliente Verificado" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#71717a] block font-sans">
                        {item.role} · Atendido por <strong className="text-[#a1a1aa] font-medium">{item.barberName}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    type="button"
                    onClick={() => handleLike(item.id)}
                    className="p-1.5 text-[#71717a] hover:text-[#c5a059] transition-colors rounded hover:bg-[#18181c] flex items-center gap-1 text-[10px] cursor-pointer"
                    title="Achei este depoimento útil"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {currentLikes > 0 && <span>{currentLikes}</span>}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTA Bottom Banner */}
        <div className="mt-16 text-center bg-gradient-to-b from-[#121215] to-[#09090b] border border-[#27272a] rounded-sm p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#f4f4f5] font-light">
              Pronto para elevar sua presença e estilo?
            </h3>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-sans">
              Agende sua consultoria de visagismo com <strong className="text-[#e0be77]">Ademir Siqueira</strong> ou selecione um de nossos especialistas.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openBooking()}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#c5a059] hover:bg-[#d8b56c] text-[#09090b] text-xs font-semibold uppercase tracking-[0.18em] rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 cursor-pointer"
                id="btn-testimonials-cta-agendar"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Experiência</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-[#121215] border border-[#27272a] rounded-sm max-w-lg w-full p-6 sm:p-8 shadow-2xl animate-scale">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#27272a] mb-6">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#c5a059] block font-sans">
                  Avaliação de Experiência
                </span>
                <h3 className="font-serif text-2xl text-[#f4f4f5] font-light">
                  Compartilhe seu Depoimento
                </h3>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 text-[#71717a] hover:text-[#f4f4f5] transition-colors rounded-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Star Selector */}
              <div>
                <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1.5 font-sans">
                  Sua Nota de Satisfação
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormRating(star)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formRating
                            ? 'fill-[#c5a059] text-[#c5a059]'
                            : 'text-[#3f3f46]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#e0be77] font-semibold ml-2 font-sans">
                    {formRating === 5 ? '★ 5.0 (Excelente)' : `★ ${formRating}.0`}
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1 font-sans">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: Dr. Leonardo Melo"
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] rounded-sm px-3.5 py-2 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:outline-none font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1 font-sans">
                    Profissão ou Título
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="Ex: Empresário / Advogado"
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] rounded-sm px-3.5 py-2 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:outline-none font-sans"
                  />
                </div>
              </div>

              {/* Barber & Service Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1 font-sans">
                    Barbeiro que atendeu
                  </label>
                  <select
                    value={formBarber}
                    onChange={(e) => setFormBarber(e.target.value)}
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] rounded-sm px-3 py-2 text-xs text-[#f4f4f5] focus:outline-none font-sans cursor-pointer"
                  >
                    {BARBERS.map((b) => (
                      <option key={b.id} value={b.name} className="bg-[#18181c]">
                        {b.name} ({b.role})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1 font-sans">
                    Serviço Realizado
                  </label>
                  <select
                    value={formService}
                    onChange={(e) => {
                      setFormService(e.target.value);
                      if (e.target.value.toLowerCase().includes('visagismo')) setFormCategory('visagismo');
                      else if (e.target.value.toLowerCase().includes('vip')) setFormCategory('vip');
                      else if (e.target.value.toLowerCase().includes('barba')) setFormCategory('barba');
                      else setFormCategory('corte');
                    }}
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] rounded-sm px-3 py-2 text-xs text-[#f4f4f5] focus:outline-none font-sans cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name} className="bg-[#18181c]">
                        {s.name} - R$ {s.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Highlight Headline */}
              <div>
                <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1 font-sans">
                  Título Resumo do Depoimento
                </label>
                <input
                  type="text"
                  value={formHighlight}
                  onChange={(e) => setFormHighlight(e.target.value)}
                  placeholder="Ex: Experiência impecável e visagismo de altíssimo nível"
                  className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] rounded-sm px-3.5 py-2 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:outline-none font-sans"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs uppercase font-medium text-[#a1a1aa] mb-1 font-sans">
                  Seu Comentário Detalhado *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formComment}
                  onChange={(e) => setFormComment(e.target.value)}
                  placeholder="Conte como foi sua experiência, o atendimento e o resultado obtido..."
                  className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] rounded-sm px-3.5 py-2 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:outline-none font-sans resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-[#27272a] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 border border-[#27272a] hover:border-[#71717a] text-[#a1a1aa] rounded-sm text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#c5a059] hover:bg-[#d8b56c] text-[#09090b] rounded-sm text-xs uppercase tracking-wider font-semibold transition-all shadow-md cursor-pointer"
                >
                  Publicar Avaliação
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
