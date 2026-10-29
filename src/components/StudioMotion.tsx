import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = '', delay = 0 }) => {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: .75, delay, ease: [.22,1,.36,1] }}>{children}</motion.div>;
};

export const StudioMotion: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer:fine)').matches) return;
    const move = (e: PointerEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced]);
  return <><motion.div className="reading-progress" style={{ scaleX }} aria-hidden="true" />{!reduced && <div ref={ref} className="studio-cursor" aria-hidden="true" />}</>;
};
