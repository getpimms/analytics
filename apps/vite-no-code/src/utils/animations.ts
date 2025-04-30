// Animation utility to handle intersection observer animations
export const setupAnimations = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Create intersection observer for fade-in animations
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.aosDelay
              ? parseInt(el.dataset.aosDelay)
              : 0;

            setTimeout(() => {
              el.classList.add('aos-animate');
            }, delay);

            // Once animated, no need to observe anymore
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    elements.forEach((el) => {
      observer.observe(el);
    });
  };

  // Call on initial load
  window.addEventListener('load', animateOnScroll);

  // Also call immediately in case page is already loaded
  animateOnScroll();

  return () => {
    window.removeEventListener('load', animateOnScroll);
  };
};
