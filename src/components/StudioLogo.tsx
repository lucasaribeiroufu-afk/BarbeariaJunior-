import React from 'react';
import studioLogo from '../assets/images/13302-studio-logo.png';

/** Display the original circular emblem, excluding its white canvas margins. */
export const StudioLogo: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <span className={`relative inline-block shrink-0 overflow-hidden rounded-full bg-[#09090b] ${className}`}>
    <img src={studioLogo} alt="13302 Studio — Atendimento VIP, Visagismo e Exclusividade"
      width={195} height={192}
      className="absolute max-w-none"
      style={{ width: '130%', height: '128%', left: '-20.6667%', top: '-17.3333%' }}
    />
  </span>
);
