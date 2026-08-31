import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  ShoppingBag, 
  Clock, 
  User, 
  Scissors, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  ExternalLink,
  Phone,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDIO_INFO } from '../data/mockData';

export const OrdersAndBookingsModal: React.FC = () => {
  const { 
    isHistoryOpen, 
    closeHistory, 
    historyInitialTab, 
    appointments, 
    orders, 
    cancelAppointment,
    openBooking
  } = useApp();

  const [activeTab, setActiveTab] = useState<'agendamentos' | 'pedidos'>(historyInitialTab || 'agendamentos');

  if (!isHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#121215] border border-[#27272a] rounded-sm shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#27272a] bg-[#0c0c0e] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#f4f4f5]">
              Central do Cliente · 13302 Studio
            </h2>
            <p className="text-xs text-[#a1a1aa] font-sans">
              Acompanhe seus horários agendados e pedidos da loja virtual.
            </p>
          </div>

          <button
            onClick={closeHistory}
            className="p-2 rounded text-[#a1a1aa] hover:text-white hover:bg-[#18181c] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#27272a] bg-[#141418]">
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'agendamentos'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#1a1712]'
                : 'border-transparent text-[#a1a1aa] hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Agendamentos ({appointments.length})
          </button>

          <button
            onClick={() => setActiveTab('pedidos')}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'pedidos'
                ? 'border-[#c5a059] text-[#c5a059] bg-[#1a1712]'
                : 'border-transparent text-[#a1a1aa] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Pedidos da Loja ({orders.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* AGENDAMENTOS */}
          {activeTab === 'agendamentos' && (
            appointments.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Calendar className="w-12 h-12 text-[#71717a] mx-auto" />
                <h3 className="font-serif text-xl text-white">Nenhum agendamento ativo</h3>
                <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto">
                  Agende um horário para corte clássico, barba desenhada ou consultoria de visagismo.
                </p>
                <button
                  onClick={() => { closeHistory(); openBooking(); }}
                  className="px-6 py-3 bg-[#c5a059] hover:bg-[#e0be77] text-black text-xs font-semibold uppercase tracking-widest rounded-sm"
                >
                  Agendar Novo Horário
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`p-5 bg-[#18181c] border rounded-sm transition-all ${
                      apt.status === 'cancelado'
                        ? 'border-rose-950/50 opacity-60'
                        : 'border-[#27272a] hover:border-[#c5a059]/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#27272a]">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-medium text-white">
                          {apt.service.name}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                          apt.status === 'confirmado'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {apt.status === 'confirmado' ? 'Confirmado' : 'Cancelado'}
                        </span>
                      </div>

                      <span className="text-xs text-[#a1a1aa] font-mono">
                        {apt.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs text-[#a1a1aa]">
                      <div>
                        <strong className="text-white block font-medium">Profissional:</strong>
                        <span>{apt.barber.name}</span>
                      </div>
                      <div>
                        <strong className="text-white block font-medium">Data & Horário:</strong>
                        <span className="text-[#c5a059] font-medium">{apt.date} às {apt.time}</span>
                      </div>
                      <div>
                        <strong className="text-white block font-medium">Valor:</strong>
                        <span className="font-serif text-sm text-[#c5a059] font-semibold">R$ {apt.totalPrice} ({apt.paymentMethod.toUpperCase()})</span>
                      </div>
                    </div>

                    {apt.notes && (
                      <div className="text-[11px] text-[#71717a] bg-[#121215] p-2 rounded mb-3">
                        <span className="text-[#a1a1aa]">Obs:</span> {apt.notes}
                      </div>
                    )}

                    <div className="pt-3 border-t border-[#27272a] flex items-center justify-between">
                      <a
                        href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(`Olá! Gostaria de falar sobre meu agendamento ${apt.id} para ${apt.date} às ${apt.time}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#86efac] hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Falar no WhatsApp
                      </a>

                      {apt.status === 'confirmado' && (
                        <button
                          onClick={() => {
                            if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
                              cancelAppointment(apt.id);
                            }
                          }}
                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Cancelar Horário
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* PEDIDOS DA LOJA */}
          {activeTab === 'pedidos' && (
            orders.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#71717a] mx-auto" />
                <h3 className="font-serif text-xl text-white">Nenhum pedido realizado</h3>
                <p className="text-xs text-[#a1a1aa] max-w-sm mx-auto">
                  Aproveite nossa linha de grooming premium com frete rápido ou retirada no studio.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 bg-[#18181c] border border-[#27272a] hover:border-[#c5a059]/50 rounded-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#27272a]">
                      <div className="flex items-center gap-2">
                        <PackageCheck className="w-4 h-4 text-[#c5a059]" />
                        <span className="font-serif text-lg font-medium text-white">
                          Pedido {ord.id}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {ord.status === 'pronto_retirada' ? 'Pronto para Retirada' : 'Pago & Confirmado'}
                        </span>
                      </div>

                      <span className="text-xs text-[#71717a]">
                        {new Date(ord.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    {/* Products list */}
                    <div className="py-3 space-y-2 border-b border-[#27272a]">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-[#a1a1aa]">
                          <span className="text-white">
                            {item.quantity}x {item.product.name}
                          </span>
                          <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#a1a1aa]">
                      <div>
                        <span>Entrega: </span>
                        <strong className="text-white">
                          {ord.deliveryMethod === 'retirada' ? 'Retirada no Studio 13302' : 'Envio pelos Correios'}
                        </strong>
                      </div>

                      <div className="font-serif text-sm text-white">
                        Total Pago: <strong className="text-[#c5a059]">R$ {ord.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#27272a] bg-[#0c0c0e] text-center">
          <button
            onClick={closeHistory}
            className="px-6 py-2.5 bg-[#18181c] hover:bg-[#27272a] text-xs font-semibold uppercase tracking-wider text-white rounded"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
