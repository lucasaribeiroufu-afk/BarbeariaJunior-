import React, { useState } from 'react';
import { ProductPhoto } from './ProductPhoto';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartTotalCount,
    openCheckout,
    scrollToSection
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'OLDMONEY10' || couponCode.trim().toUpperCase() === 'STUDIO13') {
      setDiscountApplied(true);
    } else {
      alert('Cupom inválido. Tente usar OLDMONEY10 para 10% OFF.');
    }
  };

  const discountValue = discountApplied ? cartSubtotal * 0.1 : 0;
  const freeShippingThreshold = 200;
  const shippingProgress = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e11] border-l border-[#27272a] shadow-2xl flex flex-col h-full">
          
          {/* Header */}
          <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-xl tracking-wide text-[#f4f4f5] uppercase">
                Seu Carrinho
              </h2>
              <span className="text-xs text-[#c5a059] font-medium font-sans">
                ({cartTotalCount} {cartTotalCount === 1 ? 'item' : 'itens'})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded text-[#a1a1aa] hover:text-white hover:bg-[#18181b] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-[#141418] border-b border-[#27272a]/60">
            <div className="text-xs text-[#a1a1aa] flex justify-between mb-1.5 font-sans">
              <span>
                {cartSubtotal >= freeShippingThreshold ? (
                  <strong className="text-emerald-400">Parabéns! Você ganhou Frete Grátis</strong>
                ) : (
                  <>Faltam <strong className="text-[#c5a059]">R$ {(freeShippingThreshold - cartSubtotal).toFixed(2)}</strong> para frete grátis</>
                )}
              </span>
              <span>{Math.round(shippingProgress)}%</span>
            </div>
            <div className="w-full bg-[#27272a] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#c5a059] h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#18181c] border border-[#27272a] flex items-center justify-center mx-auto text-[#71717a]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-[#f4f4f5]">Seu carrinho está vazio</h3>
                <p className="text-xs text-[#a1a1aa] max-w-xs mx-auto">
                  Conheça nossa seleção de pomadas, óleos nobres e produtos de grooming.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    scrollToSection('loja');
                  }}
                  className="px-6 py-3 bg-[#c5a059] hover:bg-[#e0be77] text-black text-xs font-semibold uppercase tracking-widest rounded-sm inline-block"
                >
                  Explorar Loja 13302
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 bg-[#141418] border border-[#27272a] rounded-sm flex items-center gap-4 transition-all"
                >
                  <ProductPhoto product={item.product} className="w-16 h-16 shrink-0 bg-white rounded p-1 border border-[#27272a]" />

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#c5a059]">
                      {item.product.category}
                    </span>
                    <h4 className="font-serif text-base text-[#f4f4f5] truncate">
                      {item.product.name}
                    </h4>
                    <div className="font-serif text-sm text-[#c5a059] font-medium mt-0.5">
                      R$ {item.product.price.toFixed(2)}
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#27272a] bg-[#18181c] rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-[#a1a1aa] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-[#a1a1aa] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#71717a] hover:text-rose-400 p-1 ml-auto transition-colors"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#27272a] bg-[#0c0c0e] space-y-4">
              {/* Cupom */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#a1a1aa] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Cupom (ex: OLDMONEY10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded pl-9 pr-3 py-2 text-xs text-white uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#18181c] hover:bg-[#27272a] text-xs font-semibold text-white border border-[#27272a] rounded"
                >
                  Aplicar
                </button>
              </form>

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs text-[#a1a1aa]">
                <div className="flex justify-between">
                  <span>Subtotal dos produtos:</span>
                  <span className="text-white">R$ {cartSubtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#86efac]">
                    <span>Desconto Cupom (10%):</span>
                    <span>-R$ {discountValue.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Retirada no Studio 13302:</span>
                  <span className="text-emerald-400 font-medium">Grátis</span>
                </div>
                <div className="pt-2 border-t border-[#27272a] flex justify-between font-serif text-lg">
                  <span className="text-white">Total:</span>
                  <span className="text-[#c5a059] font-bold">
                    R$ {(cartSubtotal - discountValue).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={openCheckout}
                className="w-full py-4 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold uppercase text-xs tracking-widest rounded-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#71717a]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Compra segura e garantia oficial 13302 Studio</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
