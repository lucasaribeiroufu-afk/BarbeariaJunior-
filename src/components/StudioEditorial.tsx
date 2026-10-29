import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICES, STUDIO_INFO } from '../data/mockData';
import { Reveal } from './StudioMotion';

export const SignatureSelection: React.FC = () => {
  const { openBooking, scrollToSection } = useApp();
  const ids = ['corte-barba','old-money-hairstyle','atendimento-vip'];
  const photos = ['photo-1503951914875-452162b0f3f1','photo-1622286342621-4bd786c2447c','photo-1585747860715-2ba37e788b70'];
  return <section className="signature-selection section-pad"><div className="studio-container">
    <Reveal className="selection-heading"><div><span className="eyebrow">Seu próximo ritual</span><h2 className="editorial-title">Três formas de<br /><em>elevar sua presença.</em></h2></div><button className="text-link" onClick={() => scrollToSection('servicos')}>Todas as experiências <ArrowUpRight size={18} /></button></Reveal>
    <div className="signature-grid">{ids.map((id, i) => {
      const service = SERVICES.find(s => s.id === id)!;
      return <Reveal key={id} delay={i*.08} className="signature-card">
        <img loading="lazy" src={`https://images.unsplash.com/${photos[i]}?auto=format&fit=crop&w=850&q=80`} alt="Imagem de referência do universo da barbearia" />
        <div className="signature-card-shade" /><span className="signature-label">0{i+1} / {i === 0 ? 'Recomendado' : i === 1 ? 'Premium' : 'Exclusivo'}</span>
        <div className="signature-card-copy"><h3>{service.name}</h3><p>{i === 0 ? 'Corte e barboterapia. Seu visual completo.' : i === 1 ? 'Precisão clássica. Elegância atemporal.' : 'Um ritual completo. Um tempo só seu.'}</p><button onClick={() => openBooking(service)} aria-label={`Conhecer e reservar ${service.name}`}>Reserve sua experiência <ArrowUpRight size={21} /></button></div>
      </Reveal>;
    })}</div><p className="image-credit">Fotografias de referência para apresentar o universo de cada experiência.</p>
  </div></section>;
};

export const StudioManifesto: React.FC = () => {
  const { scrollToSection } = useApp();
  return <section className="manifesto-band section-pad"><div className="studio-container">
    <Reveal><span className="eyebrow">A assinatura 13302</span><h2>O seu estilo não precisa<br />de excessos.<br /><em>Precisa de intenção.</em></h2></Reveal>
    <Reveal className="manifesto-bottom"><span>Elegância que permanece.</span><p>Do primeiro contato à finalização, cada escolha existe para valorizar sua identidade.</p><button className="circle-link" aria-label="Conheça o Studio" onClick={() => scrollToSection('sobre')}><ArrowUpRight size={30} /></button></Reveal>
  </div></section>;
};

export const StudioContact: React.FC = () => <section id="contato" className="studio-contact section-pad"><div className="studio-container">
  <Reveal><span className="eyebrow">O próximo detalhe é seu.</span><h2 className="editorial-title">Uma conversa.<br /><em>Um novo olhar.</em></h2><p>Conte o que você busca. A equipe da 13302 Studio ajuda a escolher a experiência mais adequada ao seu momento.</p><a className="studio-button" href={STUDIO_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer">Iniciar conversa <ArrowUpRight size={20} /></a></Reveal>
  <Reveal className="contact-info"><div><span className="eyebrow">Encontre o Studio</span><p>{STUDIO_INFO.address}</p><a className="text-link" href={STUDIO_INFO.googleMapsLink} target="_blank" rel="noopener noreferrer">Abrir no Maps <ArrowUpRight size={17} /></a></div><div><span className="eyebrow">Nosso horário</span><p>{STUDIO_INFO.hours}</p></div><div><span className="eyebrow">WhatsApp</span><a href={STUDIO_INFO.whatsappUrl}>{STUDIO_INFO.phoneDisplay}</a></div></Reveal>
</div></section>;
