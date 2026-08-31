import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, Star, Sparkles, Filter, X, ArrowRight, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { Product, ProductCategory } from '../types';

export const StoreSection: React.FC = () => {
  const { 
    addToCart, 
    selectedStoreCategory, 
    setSelectedStoreCategory,
    openProductDetail,
    selectedProductDetail,
    closeProductDetail
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const categories: ProductCategory[] = ['TODOS', 'STYLING', 'BARBA', 'CABELO', 'VESTUARIO', 'KITS'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedStoreCategory === 'TODOS' || product.category === selectedStoreCategory;
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchesSearch = !normalizedQuery || 
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedNotice(product.name);
    setTimeout(() => {
      setAddedNotice(null);
    }, 2500);
  };

  return (
    <section id="loja" className="py-24 bg-[#09090b] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Image 7 */}
        <div className="mb-10 pb-6 border-b border-[#27272a] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a1a1aa] block mb-1.5 font-sans">
              E-COMMERCE · GROOMING PREMIUM
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f4f4f5] tracking-tight">
              Loja 13302
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] font-sans">
              Produtos selecionados para manter o ritual em casa.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                id="input-store-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos pelo nome..."
                className="w-full bg-[#121215] border border-[#27272a] focus:border-[#c5a059] rounded-sm pl-10 pr-9 py-2.5 text-xs text-[#f4f4f5] placeholder-[#71717a] focus:outline-none transition-colors font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  id="btn-clear-store-search"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 p-1 text-[#71717a] hover:text-[#f4f4f5] transition-colors cursor-pointer"
                  title="Limpar busca"
                  aria-label="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Tabs Filter matching Image 7 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedStoreCategory(cat)}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                selectedStoreCategory === cat
                  ? 'border border-[#c5a059] text-[#c5a059] bg-[#1a1712]'
                  : 'border border-[#27272a] text-[#a1a1aa] bg-[#121215] hover:text-white hover:border-[#3f3f46]'
              }`}
              id={`tab-store-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Floating Quick Added Toast */}
        {addedNotice && (
          <div className="fixed bottom-24 right-6 z-50 bg-[#121215] border border-[#c5a059] text-white px-4 py-3 rounded shadow-2xl flex items-center gap-3 animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-[#c5a059] text-black flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-[#f4f4f5] block">{addedNotice}</span>
              <span className="text-[#a1a1aa]">Adicionado ao carrinho!</span>
            </div>
          </div>
        )}

        {/* Empty state when search yields no products */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center border border-[#27272a] rounded-sm bg-[#121215] p-8 max-w-lg mx-auto">
            <Search className="w-10 h-10 text-[#71717a] mx-auto mb-3 stroke-[1.5]" />
            <h3 className="font-serif text-xl text-[#f4f4f5] font-light">Nenhum produto encontrado</h3>
            <p className="text-xs text-[#a1a1aa] mt-2 font-sans">
              {searchQuery
                ? `Não encontramos resultados para "${searchQuery}" nesta categoria.`
                : 'Não há produtos disponíveis nesta categoria no momento.'}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 px-4 py-2 border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-colors text-xs uppercase tracking-wider font-semibold rounded-sm cursor-pointer"
              >
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          /* Products Grid matching Image 7 & 8 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                onClick={() => openProductDetail(product)}
                className="group bg-[#121215] border border-[#27272a] hover:border-[#c5a059]/70 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-400 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_24px_rgba(197,160,89,0.1)] cursor-pointer relative"
              >
                {/* Product Image Area with smooth zoom and subtle ambient glow */}
                <div className="relative aspect-square w-full bg-[#0a0a0c] overflow-hidden p-6 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-60 pointer-events-none z-10" />
                  
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out relative z-0"
                    loading="lazy"
                  />
                  
                  {product.isBestSeller && (
                    <div className="absolute top-2.5 left-2.5 z-20 bg-[#c5a059] text-black text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-sm transition-transform duration-300 group-hover:scale-105">
                      Best-Seller
                    </div>
                  )}

                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 text-[10px] text-[#e0be77] bg-black/70 backdrop-blur-xs border border-[#27272a] px-2 py-0.5 rounded transition-colors duration-300 group-hover:border-[#c5a059]/40">
                    <Star className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between relative z-20">
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#a1a1aa] group-hover:text-[#c5a059] mb-1.5 font-sans transition-colors duration-300">
                      {product.category}
                    </div>
                    
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#f4f4f5] group-hover:text-[#e0be77] transition-colors duration-300 leading-tight line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-xs text-[#a1a1aa] group-hover:text-[#d4d4d8] line-clamp-2 font-sans leading-relaxed transition-colors duration-300">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Add Button */}
                  <div className="mt-6 pt-4 border-t border-[#27272a] flex items-center justify-between">
                    <div>
                      {product.originalPrice && (
                        <span className="text-[11px] text-[#71717a] line-through block font-sans">
                          R$ {product.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span className="font-serif text-xl sm:text-2xl font-medium text-[#c5a059] group-hover:text-[#e0be77] tracking-tight transition-colors duration-300">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Golden + Button with smooth hover and click effect */}
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-9 h-9 bg-[#c5a059] hover:bg-[#d8b56c] text-black rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-md group-hover:shadow-[0_0_15px_rgba(197,160,89,0.35)] cursor-pointer"
                      aria-label={`Adicionar ${product.name} ao carrinho`}
                      id={`btn-add-product-${product.id}`}
                    >
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-2xl w-full bg-[#121215] border border-[#27272a] rounded-sm overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeProductDetail}
              className="absolute top-4 right-4 z-10 p-2 bg-black/70 rounded-full text-white hover:text-[#c5a059] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="bg-[#0c0c0e] p-8 flex items-center justify-center relative">
                <img
                  src={selectedProductDetail.image}
                  alt={selectedProductDetail.name}
                  className="max-h-64 object-contain"
                />
                {selectedProductDetail.volume && (
                  <span className="absolute bottom-3 left-3 bg-[#18181c] border border-[#27272a] text-[10px] text-[#a1a1aa] px-2 py-0.5 rounded">
                    {selectedProductDetail.volume}
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                    {selectedProductDetail.category}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#f4f4f5] mt-1">
                    {selectedProductDetail.name}
                  </h3>

                  <div className="flex items-center gap-2 my-2 text-xs text-[#a1a1aa]">
                    <div className="flex items-center text-[#e0be77]">
                      <Star className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                      <span className="ml-1 font-semibold">{selectedProductDetail.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedProductDetail.reviewsCount} avaliações</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-medium">Em estoque ({selectedProductDetail.stock} un.)</span>
                  </div>

                  <p className="text-xs text-[#d4d4d8] leading-relaxed mt-3">
                    {selectedProductDetail.description}
                  </p>

                  {/* Benefits */}
                  {selectedProductDetail.benefits && (
                    <div className="mt-4 space-y-1.5">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-[#c5a059]">
                        Benefícios:
                      </div>
                      {selectedProductDetail.benefits.map((b, i) => (
                        <div key={i} className="text-xs text-[#a1a1aa] flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedProductDetail.howToUse && (
                    <div className="mt-3 p-2.5 bg-[#18181c] border border-[#27272a] rounded text-[11px] text-[#a1a1aa]">
                      <strong className="text-[#f4f4f5]">Modo de uso:</strong> {selectedProductDetail.howToUse}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#27272a] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-[#71717a] uppercase block">Preço</span>
                    <span className="font-serif text-2xl font-semibold text-[#c5a059]">
                      R$ {selectedProductDetail.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProductDetail, 1);
                      closeProductDetail();
                    }}
                    className="flex-1 py-3 px-4 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold uppercase text-xs tracking-widest rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Comprar Agora
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
