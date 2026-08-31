import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShoppingBag, 
  Store, 
  Truck, 
  QrCode, 
  CreditCard, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/mockData';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    closeCheckout, 
    cartItems, 
    cartSubtotal, 
    createOrder,
    openHistory
  } = useApp();

  const [deliveryMethod, setDeliveryMethod] = useState<'retirada' | 'entrega'>('retirada');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  
  // Address
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('MG');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingFee = deliveryMethod === 'retirada' ? 0 : (cartSubtotal >= 200 ? 0 : 18.00);
  const discount = 0;
  const total = cartSubtotal - discount + shippingFee;

  const mockPixCode = `00020126580014br.gov.bcb.pix0136loja13302-pix-qr-55034999448588520400005303986540${total.toFixed(2)}5802BR591613302 STUDIO6009UBERLANDIA62070503***6304D19A`;

  const handleFinishOrder = () => {
    if (!customerName || !customerPhone) {
      alert('Por favor, informe seu nome completo e WhatsApp para contato.');
      return;
    }

    if (deliveryMethod === 'entrega' && (!street || !number || !cep)) {
      alert('Por favor, informe os dados completos do endereço de entrega.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const newOrder = createOrder({
        items: cartItems,
        subtotal: cartSubtotal,
        discount,
        shippingFee,
        total,
        customerName,
        customerPhone,
        customerEmail: customerEmail || 'contato@cliente.com',
        deliveryMethod,
        address: deliveryMethod === 'entrega' ? {
          cep,
          street,
          number,
          neighborhood,
          city,
          state,
        } : undefined,
        paymentMethod,
      });

      setCreatedOrder(newOrder);
      setIsProcessing(false);
    }, 1200);
  };

  const copyPixToClipboard = () => {
    navigator.clipboard?.writeText(mockPixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const generateWhatsAppOrderMessage = () => {
    if (!createdOrder) return STUDIO_INFO.whatsappUrl;
    const itemsText = createdOrder.items.map(i => `• ${i.quantity}x ${i.product.name} (R$ ${i.product.price.toFixed(2)})`).join('\n');
    const msg = `Olá, 13302 Studio! Realizei o pedido *${createdOrder.id}* na loja online:\n\n` +
      `📦 *Itens:*\n${itemsText}\n\n` +
      `💰 *Total:* R$ ${createdOrder.total.toFixed(2)} via ${createdOrder.paymentMethod.toUpperCase()}\n` +
      `📍 *Entrega:* ${createdOrder.deliveryMethod === 'retirada' ? 'Retirada no Studio 13302' : `Envio para ${createdOrder.address?.street}, ${createdOrder.address?.number}`}\n` +
      `👤 *Cliente:* ${createdOrder.customerName} (${createdOrder.customerPhone})\n\n` +
      `Gostaria de acompanhar meu pedido.`;
    return `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121215] border border-[#27272a] rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#27272a] bg-[#0c0c0e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#c5a059]" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#f4f4f5]">
                Checkout Seguro · Loja 13302
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-[#a1a1aa] font-sans">
                Produtos Grooming & Cuidados Pessoais
              </p>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            className="p-2 rounded text-[#a1a1aa] hover:text-white hover:bg-[#18181c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!createdOrder ? (
            <>
              {/* Delivery Method */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                  1. Método de Recebimento
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('retirada')}
                    className={`p-4 border rounded text-left transition-all ${
                      deliveryMethod === 'retirada'
                        ? 'border-[#c5a059] bg-[#1a1712]'
                        : 'border-[#27272a] bg-[#141418]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                      <Store className="w-4 h-4 text-[#c5a059]" />
                      Retirada no Studio 13302
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      {STUDIO_INFO.address}
                    </p>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-2">
                      Grátis · Pronto em até 2 horas
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('entrega')}
                    className={`p-4 border rounded text-left transition-all ${
                      deliveryMethod === 'entrega'
                        ? 'border-[#c5a059] bg-[#1a1712]'
                        : 'border-[#27272a] bg-[#141418]'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white font-medium text-sm mb-1">
                      <Truck className="w-4 h-4 text-[#c5a059]" />
                      Entrega Expressa / Sedex
                    </div>
                    <p className="text-xs text-[#a1a1aa]">
                      Receba no seu endereço com rastreamento
                    </p>
                    <span className="text-[11px] text-[#c5a059] font-medium block mt-2">
                      {cartSubtotal >= 200 ? 'Frete Grátis' : 'Frete fixo: R$ 18,00'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                  2. Dados do Comprador
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-[#d4d4d8] mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo Lima"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#d4d4d8] mb-1">WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(34) 99999-9999"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#d4d4d8] mb-1">E-mail para comprovante</label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address if delivery */}
              {deliveryMethod === 'entrega' && (
                <div className="p-4 bg-[#18181c] border border-[#27272a] rounded space-y-3">
                  <h4 className="text-xs font-semibold text-[#f4f4f5] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                    Endereço de Entrega
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#a1a1aa] mb-1">CEP</label>
                      <input
                        type="text"
                        placeholder="38400-000"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[11px] text-[#a1a1aa] mb-1">Rua / Logradouro</label>
                      <input
                        type="text"
                        placeholder="Rua das Acácias"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#a1a1aa] mb-1">Número</label>
                      <input
                        type="text"
                        placeholder="120"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#a1a1aa] mb-1">Bairro</label>
                      <input
                        type="text"
                        placeholder="Centro"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#a1a1aa] mb-1">Cidade / UF</label>
                      <input
                        type="text"
                        placeholder="Uberlândia - MG"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                  3. Pagamento
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3.5 border rounded text-left transition-all ${
                      paymentMethod === 'pix'
                        ? 'border-[#c5a059] bg-[#1a1712]'
                        : 'border-[#27272a] bg-[#141418]'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#c5a059] mb-1" />
                    <div className="font-semibold text-xs text-white">Pix Instantâneo</div>
                    <div className="text-[10px] text-emerald-400">Aprovação imediata</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cartao')}
                    className={`p-3.5 border rounded text-left transition-all ${
                      paymentMethod === 'cartao'
                        ? 'border-[#c5a059] bg-[#1a1712]'
                        : 'border-[#27272a] bg-[#141418]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#c5a059] mb-1" />
                    <div className="font-semibold text-xs text-white">Cartão de Crédito</div>
                    <div className="text-[10px] text-[#a1a1aa]">Até 3x sem juros</div>
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-[#18181c] border border-[#27272a] rounded text-xs space-y-2">
                <div className="font-semibold text-white mb-2">Resumo dos Produtos:</div>
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-[#a1a1aa]">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span className="text-white">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-[#a1a1aa] pt-2 border-t border-[#27272a]">
                  <span>Frete / Entrega:</span>
                  <span>{shippingFee === 0 ? 'Grátis' : `R$ ${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-serif text-base text-white pt-2 border-t border-[#27272a]">
                  <span>Total Final:</span>
                  <span className="text-[#c5a059] font-bold">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleFinishOrder}
                className="w-full py-4 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold uppercase text-xs tracking-widest rounded-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Processando Pedido...' : `Pagar R$ ${total.toFixed(2)}`}
              </button>
            </>
          ) : (
            /* Order Created Screen */
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-[#c5a059]/20 border border-[#c5a059] rounded-full flex items-center justify-center mx-auto text-[#c5a059]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059]">
                  Pedido Recebido com Sucesso
                </span>
                <h3 className="font-serif text-3xl text-white mt-1">
                  Obrigado por comprar no 13302 Studio!
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-2">
                  Pedido Nº <strong className="text-white">{createdOrder.id}</strong>
                </p>
              </div>

              {/* Pix QR Code if Pix chosen */}
              {createdOrder.paymentMethod === 'pix' && (
                <div className="p-5 bg-[#18181c] border border-[#27272a] rounded max-w-sm mx-auto space-y-3">
                  <div className="text-xs text-[#a1a1aa]">Escaneie para pagar com Pix:</div>
                  <div className="w-36 h-36 mx-auto bg-white p-2 rounded">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(mockPixCode)}`}
                      alt="QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <button
                    onClick={copyPixToClipboard}
                    className="w-full py-2 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold text-xs rounded flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copiedPix ? 'Código Pix Copiado!' : 'Copiar Pix Copia e Cola'}
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3 max-w-sm mx-auto">
                <a
                  href={generateWhatsAppOrderMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-[#14532d] hover:bg-[#166534] text-[#86efac] font-semibold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Notificar via WhatsApp do Studio
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      closeCheckout();
                      openHistory('pedidos');
                    }}
                    className="py-3 bg-[#18181c] hover:bg-[#222228] text-white border border-[#27272a] text-xs font-medium rounded-sm"
                  >
                    Ver Meus Pedidos
                  </button>

                  <button
                    onClick={closeCheckout}
                    className="py-3 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold text-xs rounded-sm"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
