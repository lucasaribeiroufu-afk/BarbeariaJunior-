import React from 'react';
import { Product } from '../types';

/** The SVG viewport displays only the photograph area of the unmodified supplied screenshot. */
export const ProductPhoto: React.FC<{ product: Product; className?: string }> = ({ product, className = '' }) => {
  const frame = product.imageFrame;
  if (!frame) return <img src={product.image} alt={product.name} className={className} loading="lazy" />;
  return <svg viewBox={`0 0 ${frame.width} ${frame.height}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={product.name} className={className} style={{ overflow: 'hidden' }}>
    <rect width={frame.width} height={frame.height} fill="white" />
    <image href={product.image} width={frame.width} height={frame.sourceHeight} preserveAspectRatio="xMidYMin meet" />
  </svg>;
};
