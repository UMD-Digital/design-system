import { type QuoteBaseProps, type QuoteVariantProps } from '../_types';
import { type ElementVisual } from '../../../_types';

interface QuoteAnimationProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'quote' | 'includesAnimation' | 'image'> {
  quoteElement: ElementVisual;
}

export const quoteAnimation = ({
  image,
  includesAnimation,
  isTypeFeatured = false,
  quote,
  quoteElement,
}: QuoteAnimationProps) => {
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

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!quote || !includesAnimation || !quoteTextElement) {
            return;
          }

          const wordsList = Array.from(
            quoteTextElement.querySelectorAll('.quote-text-split-word'),
          ) as HTMLElement[];
          const animateAction = !isTypeFeatured || (isTypeFeatured && !image);

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
              if (attributionElement) {
                attributionElement.style.opacity = '1';
                attributionElement.style.transform = 'translateY(0)';
              }
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
        }
      });
    },
    {
      rootMargin: '0px 0px -120px 0px',
      threshold: 0,
    },
  );

  if (quoteTextElement && includesAnimation) {
    observer.observe(quoteTextElement);
  }
};
