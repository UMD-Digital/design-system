import { type ElementModel } from '../../../_types';
import { type QuoteBaseProps, type QuoteVariantProps } from '../_types';

interface QuoteAnimationProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'quote' | 'includesAnimation' | 'image'> {
  quoteElement: ElementModel<HTMLElement>;
}

export const quoteAnimation = ({
  image,
  includesAnimation,
  isTypeFeatured = false,
  quote,
  quoteElement,
}: QuoteAnimationProps) => {
  if (!includesAnimation || !quote) return;

  const quoteTextElement = quoteElement.element.querySelector(
    '.quote-container-quote',
  ) as HTMLElement;
  const attributionElement = quoteElement.element.querySelector(
    '.quote-container-attribution',
  ) as HTMLElement;
  const attributionSubTextElement = quoteElement.element.querySelector(
    '.quote-container-text-attribution-sub-text',
  ) as HTMLElement;
  const actionsElement = quoteElement.element.querySelector(
    '.quote-container-actions',
  ) as HTMLElement;

  const animateAction = !isTypeFeatured || (isTypeFeatured && !image);

  const applyFinalState = () => {
    const wordsList = Array.from(
      quoteTextElement.querySelectorAll('.quote-text-split-word'),
    ) as HTMLElement[];

    wordsList.forEach((word) => {
      word.style.transition = 'none';
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    });

    if (attributionElement) {
      attributionElement.style.transition = 'none';
      attributionElement.style.opacity = '1';
      attributionElement.style.transform = 'translateY(0)';
    }

    if (attributionSubTextElement) {
      attributionSubTextElement.style.transition = 'none';
      attributionSubTextElement.style.opacity = '1';
      attributionSubTextElement.style.transform = 'translateY(0)';
    }

    if (actionsElement && animateAction) {
      actionsElement.style.transition = 'none';
      actionsElement.style.opacity = '1';
      actionsElement.style.transform = 'translateY(0)';
    }
  };

  const runAnimation = () => {
    const wordsList = Array.from(
      quoteTextElement.querySelectorAll('.quote-text-split-word'),
    ) as HTMLElement[];

    let quoteAnimationLength = 50;

    wordsList.forEach((word, i) => {
      setTimeout(() => {
        word.style.opacity = '1';
        word.style.transform = 'translateY(0)';
      }, i * 50);

      quoteAnimationLength += 50;
    });

    if (attributionElement) {
      setTimeout(() => {
        attributionElement.style.opacity = '1';
        attributionElement.style.transform = 'translateY(0)';
      }, quoteAnimationLength);
    }

    if (attributionSubTextElement) {
      setTimeout(() => {
        attributionSubTextElement.style.opacity = '1';
        attributionSubTextElement.style.transform = 'translateY(0)';
      }, quoteAnimationLength);
    }

    if (actionsElement && animateAction) {
      setTimeout(() => {
        actionsElement.style.opacity = '1';
        actionsElement.style.transform = 'translateY(0)';
      }, quoteAnimationLength);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -120px 0px',
      threshold: 0,
    },
  );

  const rect = quoteTextElement.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const triggerPoint = windowHeight - 120;
  const isAlreadyPast = rect.top < triggerPoint;

  if (isAlreadyPast) {
    applyFinalState();
  } else {
    observer.observe(quoteTextElement);
  }
};
