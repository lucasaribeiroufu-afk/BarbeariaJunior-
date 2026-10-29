import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export const NavigationMotion: React.FC = () => {
  const reduced = useReducedMotion();
  const [label, setLabel] = useState('');
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const names: Record<string, string> = { hero: '13302 Studio', sobre: 'O Studio', servicos: 'Experiências', portfolio: 'Inspirações', avaliacoes: 'Avaliações', loja: 'Loja 13302', instagram: 'Instagram', contato: 'Contato' };
    const navigate = (event: Event) => {
      if (reduced) return;
      clearTimeout(timeout);
      const section = (event as CustomEvent<string>).detail;
      setLabel(names[section] || '13302 Studio');
      timeout = setTimeout(() => setLabel(''), 380);
    };
    window.addEventListener('studio:navigate', navigate);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!reduced) entry.target.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 650, easing: 'ease-out' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .06 });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
    // Keep links shared from the previous navigation working.
    const hash = window.location.hash.slice(1);
    if (names[hash]) document.getElementById(hash)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    return () => { clearTimeout(timeout); observer.disconnect(); window.removeEventListener('studio:navigate', navigate); };
  }, [reduced]);
  return <AnimatePresence>{label && <motion.div key="navigation-transition" className="navigation-transition" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .18 }}>
    <span>{label}</span><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .35 }} />
  </motion.div>}</AnimatePresence>;
};
