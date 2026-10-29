import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Scissors, 
  CreditCard, 
  QrCode, 
  Store, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Phone, 
  Mail, 
  FileText,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES, BARBERS, STUDIO_INFO } from '../data/mockData';
import { Service, Barber, Appointment } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    closeBooking, 
    bookingPreselectedService, 
    addAppointment,
    openHistory 
  } = useApp();

  // Wizard Steps: 1: Service, 2: Barber, 3: Date & Time, 4: Details, 5: Payment, 6: Success
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [additionalServices, setAdditionalServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'local'>('pix');
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [copiedPix, setCopiedPix] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Initialize service when opened
  useEffect(() => {
    if (isBookingOpen) {
      if (bookingPreselectedService) {
        setSelectedService(bookingPreselectedService);
      }
      // Set default date to tomorrow or today
      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);
      setSelectedDate(nextDay.toISOString().split('T')[0]);
      setSelectedBarber(BARBERS[0]);
      setStep(1);
      setCreatedAppointment(null);
    }
  }, [isBookingOpen, bookingPreselectedService]);

  if (!isBookingOpen) return null;

  // Calculate total price and duration
  const totalDuration = selectedService.durationMin + additionalServices.reduce((sum, s) => sum + s.durationMin, 0);
  const totalPrice = selectedService.price + additionalServices.reduce((sum, s) => sum + s.price, 0);

  // Generate next 14 available dates
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      if (!isSunday) {
        dates.push({
          fullDate: d.toISOString().split('T')[0],
          dayName: d.toLocaleDateString('pt-BR', { weekday: 'short' }),
          dayNumber: d.getDate(),
          monthName: d.toLocaleDateString('pt-BR', { month: 'short' }),
        });
      }
    }
    return dates;
  };

  const datesList = generateDates();

  const timeSlots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '11:45', available: true },
    { time: '13:30', available: true },
    { time: '14:30', available: true },
    { time: '15:30', available: true },
    { time: '16:30', available: false },
    { time: '17:30', available: true },
    { time: '18:30', available: true },
    { time: '19:15', available: true },
  ];

  const handleToggleAddon = (service: Service) => {
    if (additionalServices.some(s => s.id === service.id)) {
      setAdditionalServices(prev => prev.filter(s => s.id !== service.id));
    } else {
      setAdditionalServices(prev => [...prev, service]);
    }
  };

  const handleFinishBooking = () => {
    if (!customerName || !customerPhone) {
      alert('Por favor, informe seu nome e telefone WhatsApp.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const barberToUse = selectedBarber || BARBERS[0];
      const newApt = addAppointment({
        service: selectedService,
        additionalServices: additionalServices.length > 0 ? additionalServices : undefined,
        barber: barberToUse,
        date: selectedDate,
        time: selectedTime || '14:30',
        customerName,
        customerPhone,
        customerEmail: customerEmail || 'contato@cliente.com',
        notes,
        totalPrice,
        paymentMethod,
      });

      setCreatedAppointment(newApt);
      setIsProcessing(false);
      setStep(6);
    }, 1000);
  };

  const mockPixCode = `00020126580014br.gov.bcb.pix013613302studio-pix-qr-55034999448588520400005303986540${totalPrice.toFixed(2)}5802BR591613302 STUDIO6009UBERLANDIA62070503***6304E8F2`;

  const copyPixToClipboard = () => {
    navigator.clipboard?.writeText(mockPixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const generateWhatsAppMessageUrl = () => {
    if (!createdAppointment) return STUDIO_INFO.whatsappUrl;
    const msg = `Olá, 13302 Studio! Acabei de realizar o agendamento *${createdAppointment.id}* pelo app:\n\n` +
      `✂️ *Serviço:* ${createdAppointment.service.name}\n` +
      `💈 *Profissional:* ${createdAppointment.barber.name}\n` +
      `📅 *Data:* ${createdAppointment.date} às ${createdAppointment.time}\n` +
      `👤 *Cliente:* ${createdAppointment.customerName} (${createdAppointment.customerPhone})\n` +
      `💳 *Pagamento:* ${createdAppointment.paymentMethod.toUpperCase()} (R$ ${createdAppointment.totalPrice})\n\n` +
      `Aguardo confirmação. Obrigado!`;
    return `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#121215] border border-[#27272a] rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header with Steps Progress */}
        <div className="p-5 sm:p-6 border-b border-[#27272a] bg-[#0c0c0e] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059] font-serif text-sm">
              13
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#f4f4f5] tracking-tight">
                Agendamento 13302 Studio
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-[#a1a1aa] font-sans">
                {step === 6 ? 'Confirmação do Ritual' : `Etapa ${step} de 5`}
              </p>
            </div>
          </div>

          <button
            onClick={closeBooking}
            className="p-2 rounded text-[#a1a1aa] hover:text-white hover:bg-[#18181c] transition-colors"
            id="btn-booking-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {step < 6 && (
          <div className="w-full bg-[#18181c] h-1">
            <div 
              className="bg-[#c5a059] h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Escolha do Serviço Principal & Adicionais */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl text-[#f4f4f5] mb-1">Escolha Sua Experiência</h3>
                <p className="text-xs text-[#a1a1aa]">Excelência, precisão e cuidado em cada detalhe. Serviços desenvolvidos para homens que valorizam imagem, elegância e bem-estar.</p>
              </div>

              <div className="space-y-3">
                {SERVICES.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => { setSelectedService(service); setAdditionalServices(prev => prev.filter(s => s.id !== service.id)); }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedService.id === service.id}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedService(service); setAdditionalServices(prev => prev.filter(s => s.id !== service.id)); } }}
                    className={`p-4 rounded-sm border transition-all cursor-pointer flex items-center justify-between ${
                      selectedService.id === service.id
                        ? 'border-[#c5a059] bg-[#1a1712]'
                        : service.vip ? 'border-[#c5a059] bg-[#241e13]' : 'border-[#27272a] bg-[#141418] hover:border-[#3f3f46]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedService.id === service.id
                          ? 'border-[#c5a059] bg-[#c5a059] text-black'
                          : 'border-[#3f3f46]'
                      }`}>
                        {selectedService.id === service.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        {(service.vip || service.popular || service.id === 'old-money-hairstyle') && <span className="block text-[10px] uppercase tracking-widest text-[#e0be77] mb-2">{service.vip ? 'Experiência Exclusiva' : service.popular ? 'Recomendado' : 'Experiência Premium'}</span>}
                        <div className="font-serif text-lg text-[#f4f4f5]">{service.name}</div>
                        <div className="text-xs text-[#a1a1aa] flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#c5a059]" /> {service.durationMin} min</span>
                          <span>•</span>
                          <span>{service.description}</span>
                        </div>
                      </div>
                    </div>

                    <div className="font-serif text-lg font-medium text-[#c5a059] shrink-0 ml-3">
                      R$ {service.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add-ons */}
              <div className="pt-4 border-t border-[#27272a]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                  Adicionar ao ritual (Opcional):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.filter(s => s.id !== selectedService.id).slice(0, 4).map((addon) => {
                    const isSelected = additionalServices.some(s => s.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleToggleAddon(addon)}
                        className={`p-3 text-left border rounded text-xs transition-colors flex items-center justify-between ${
                          isSelected 
                            ? 'border-[#c5a059] bg-[#1c1913] text-white' 
                            : 'border-[#27272a] bg-[#141418] text-[#a1a1aa] hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-[#f4f4f5]">{addon.name}</div>
                          <div className="text-[10px] text-[#71717a]">+{addon.durationMin} min</div>
                        </div>
                        <span className="text-[#c5a059] font-medium">+R$ {addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: Seleção de Barbeiro */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl text-[#f4f4f5] mb-1">Seu profissional</h3>
                <p className="text-xs text-[#a1a1aa]">Todos os cortes são realizados exclusivamente por Ademir Júnior.</p>
              </div>

              <div className="space-y-3">
                {BARBERS.map((barber) => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber)}
                    className={`p-4 rounded-sm border transition-all cursor-pointer flex items-center justify-between ${
                      selectedBarber?.id === barber.id
                        ? 'border-[#c5a059] bg-[#1a1712]'
                        : 'border-[#27272a] bg-[#141418] hover:border-[#3f3f46]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-14 h-14 rounded-full object-cover border border-[#c5a059]"
                      />
                      <div>
                        <div className="font-serif text-lg text-[#f4f4f5] flex items-center gap-2">
                          {barber.name}
                          
                        </div>
                        <div className="text-xs text-[#c5a059]">{barber.role}</div>
                        <div className="text-[11px] text-[#a1a1aa] mt-1">{barber.bio}</div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center ${
                      selectedBarber?.id === barber.id
                        ? 'border-[#c5a059] bg-[#c5a059] text-black'
                        : 'border-[#3f3f46]'
                    }`}>
                      {selectedBarber?.id === barber.id && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Data e Horário */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl text-[#f4f4f5] mb-1">Selecione data e horário</h3>
                <p className="text-xs text-[#a1a1aa]">Horários em tempo real com {selectedBarber?.name || 'nossa equipe'}.</p>
              </div>

              {/* Date Selector Carousel */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                  Datas Disponíveis:
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
                  {datesList.map((d) => (
                    <button
                      key={d.fullDate}
                      type="button"
                      onClick={() => setSelectedDate(d.fullDate)}
                      className={`min-w-[72px] p-3 rounded-sm border text-center transition-all cursor-pointer ${
                        selectedDate === d.fullDate
                          ? 'border-[#c5a059] bg-[#c5a059] text-black'
                          : 'border-[#27272a] bg-[#141418] text-[#a1a1aa] hover:border-[#3f3f46]'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-bold tracking-wider">{d.dayName}</div>
                      <div className="text-xl font-serif font-bold my-0.5">{d.dayNumber}</div>
                      <div className="text-[10px] uppercase">{d.monthName}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#c5a059] mb-3">
                  Horários Livres:
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-3 px-2 rounded text-xs font-medium transition-all ${
                        !slot.available
                          ? 'bg-[#141418]/40 text-[#52525b] border border-transparent line-through cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'bg-[#c5a059] text-black font-bold border border-[#c5a059] shadow-md'
                          : 'bg-[#141418] text-[#f4f4f5] border border-[#27272a] hover:border-[#c5a059]'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Informações do Cliente */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl text-[#f4f4f5] mb-1">Seus dados para confirmação</h3>
                <p className="text-xs text-[#a1a1aa]">Enviaremos os detalhes do agendamento para o seu WhatsApp.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#d4d4d8] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#c5a059]" />
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pedro Henrique Silveira"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3.5 py-2.5 text-sm text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#d4d4d8] mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(34) 99999-9999"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#d4d4d8] mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@exemplo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3.5 py-2.5 text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#d4d4d8] mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#c5a059]" />
                    Observações de Estilo ou Preferências (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Primeira vez no studio, gostaria de orientação de visagismo para meu formato de rosto."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#18181c] border border-[#27272a] focus:border-[#c5a059] focus:outline-none rounded px-3.5 py-2.5 text-sm text-white resize-none"
                  />
                </div>
              </div>

              {/* Order Summary box */}
              <div className="p-4 bg-[#18181c] border border-[#27272a] rounded text-xs space-y-2">
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Serviço:</span>
                  <span className="text-white font-medium">{selectedService.name}</span>
                </div>
                {additionalServices.length > 0 && (
                  <div className="flex justify-between text-[#a1a1aa]">
                    <span>Adicionais:</span>
                    <span className="text-white">{additionalServices.map(s => s.name).join(', ')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Profissional:</span>
                  <span className="text-white">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>Data & Horário:</span>
                  <span className="text-white font-medium">{selectedDate} às {selectedTime || '14:30'} ({totalDuration} min)</span>
                </div>
                <div className="pt-2 border-t border-[#27272a] flex justify-between text-sm font-serif">
                  <span className="text-[#a1a1aa]">Valor Total:</span>
                  <span className="text-[#c5a059] font-bold text-lg">R$ {totalPrice}</span>
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: Pagamento */}
          {step === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl text-[#f4f4f5] mb-1">Forma de Pagamento</h3>
                <p className="text-xs text-[#a1a1aa]">Pague online com Pix para garantir seu horário instantaneamente ou escolha no local.</p>
              </div>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-4 border rounded text-left transition-all cursor-pointer ${
                    paymentMethod === 'pix'
                      ? 'border-[#c5a059] bg-[#1a1712] text-white'
                      : 'border-[#27272a] bg-[#141418] text-[#a1a1aa]'
                  }`}
                >
                  <QrCode className="w-6 h-6 text-[#c5a059] mb-2" />
                  <div className="font-semibold text-sm text-white">Pix Instantâneo</div>
                  <div className="text-[10px] text-[#86efac] mt-1">Aprovação imediata</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cartao')}
                  className={`p-4 border rounded text-left transition-all cursor-pointer ${
                    paymentMethod === 'cartao'
                      ? 'border-[#c5a059] bg-[#1a1712] text-white'
                      : 'border-[#27272a] bg-[#141418] text-[#a1a1aa]'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-[#c5a059] mb-2" />
                  <div className="font-semibold text-sm text-white">Cartão de Crédito</div>
                  <div className="text-[10px] text-[#a1a1aa] mt-1">Em até 3x sem juros</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('local')}
                  className={`p-4 border rounded text-left transition-all cursor-pointer ${
                    paymentMethod === 'local'
                      ? 'border-[#c5a059] bg-[#1a1712] text-white'
                      : 'border-[#27272a] bg-[#141418] text-[#a1a1aa]'
                  }`}
                >
                  <Store className="w-6 h-6 text-[#c5a059] mb-2" />
                  <div className="font-semibold text-sm text-white">Pagar no Studio</div>
                  <div className="text-[10px] text-[#a1a1aa] mt-1">Dinheiro, Pix ou Cartão</div>
                </button>
              </div>

              {/* Pix Details */}
              {paymentMethod === 'pix' && (
                <div className="p-5 bg-[#18181c] border border-[#27272a] rounded-sm text-center space-y-4">
                  <div className="text-xs text-[#a1a1aa]">Escaneie o QR Code abaixo pelo app do seu banco:</div>
                  
                  {/* Generated QR visual */}
                  <div className="w-40 h-40 mx-auto bg-white p-3 rounded flex items-center justify-center shadow-lg">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(mockPixCode)}`}
                      alt="QR Code Pix"
                      className="w-full h-full"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-[#a1a1aa] mb-2">Ou copie o código Pix Copia e Cola:</div>
                    <div className="flex items-center gap-2 max-w-md mx-auto">
                      <input
                        readOnly
                        value={mockPixCode}
                        className="w-full bg-[#121215] border border-[#27272a] text-[11px] text-[#a1a1aa] px-3 py-2 rounded truncate"
                      />
                      <button
                        onClick={copyPixToClipboard}
                        className="px-3 py-2 bg-[#c5a059] hover:bg-[#e0be77] text-black text-xs font-semibold rounded flex items-center gap-1 shrink-0"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedPix ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Credit Card Details */}
              {paymentMethod === 'cartao' && (
                <div className="p-4 bg-[#18181c] border border-[#27272a] rounded space-y-3">
                  <div>
                    <label className="block text-xs text-[#a1a1aa] mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      defaultValue="4532 •••• •••• 8821"
                      className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#a1a1aa] mb-1">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        defaultValue="12/28"
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#a1a1aa] mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        defaultValue="882"
                        className="w-full bg-[#121215] border border-[#27272a] rounded px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* STEP 6: Sucesso e Confirmação */}
          {step === 6 && createdAppointment && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-[#c5a059]/20 border border-[#c5a059] rounded-full flex items-center justify-center mx-auto text-[#c5a059]">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c5a059]">
                  Agendamento Confirmado com Sucesso
                </span>
                <h3 className="font-serif text-3xl text-white mt-1">
                  Seu ritual no 13302 Studio está reservado!
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-2 max-w-md mx-auto">
                  Código de identificação: <strong className="text-white">{createdAppointment.id}</strong>
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-[#18181c] border border-[#27272a] rounded p-5 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#27272a] pb-2">
                  <span className="text-[#a1a1aa]">Cliente:</span>
                  <span className="text-white font-medium">{createdAppointment.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-2">
                  <span className="text-[#a1a1aa]">Serviço:</span>
                  <span className="text-white font-medium">{createdAppointment.service.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-2">
                  <span className="text-[#a1a1aa]">Profissional:</span>
                  <span className="text-white">{createdAppointment.barber.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#27272a] pb-2">
                  <span className="text-[#a1a1aa]">Data e Hora:</span>
                  <span className="text-[#c5a059] font-medium">{createdAppointment.date} às {createdAppointment.time}</span>
                </div>
                <div className="flex justify-between pt-1 font-serif text-sm">
                  <span className="text-[#a1a1aa]">Total:</span>
                  <span className="text-[#c5a059] font-bold">R$ {createdAppointment.totalPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto">
                <a
                  href={generateWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-[#14532d] hover:bg-[#166534] text-[#86efac] font-semibold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Confirmar via WhatsApp Studio
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      closeBooking();
                      openHistory('agendamentos');
                    }}
                    className="py-3 bg-[#18181c] hover:bg-[#222228] text-white border border-[#27272a] text-xs font-medium rounded-sm"
                  >
                    Ver Meus Agendamentos
                  </button>

                  <button
                    onClick={closeBooking}
                    className="py-3 bg-[#c5a059] hover:bg-[#e0be77] text-black font-semibold text-xs rounded-sm"
                  >
                    Concluir
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Navigation */}
        {step < 6 && (
          <div className="p-5 border-t border-[#27272a] bg-[#0c0c0e] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="px-4 py-2.5 bg-[#18181c] text-[#d4d4d8] hover:text-white border border-[#27272a] text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Voltar
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev + 1)}
                className="px-6 py-2.5 bg-[#c5a059] hover:bg-[#e0be77] text-black text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Avançar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleFinishBooking}
                className="px-8 py-3 bg-[#c5a059] hover:bg-[#e0be77] text-black text-xs font-bold uppercase tracking-widest rounded-sm flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Confirmando...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Confirmar Agendamento</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
