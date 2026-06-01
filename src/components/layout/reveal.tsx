'use client';

import {useEffect} from 'react';

export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      {threshold: 0.12, rootMargin: '0px 0px -60px 0px'}
    );
    els.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i, 6) * 0.05}s`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
