import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { QUOTE } from '@universityofmaryland/web-icons-library/content';
import { ElementModel } from 'model';
import { ElementVisual } from '_types';

export interface BaseProps {
  isTransparent: boolean;
  isTypeInline: boolean;
  isTypeFeatured: boolean;
  includesAnimation: boolean;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  image?: HTMLImageElement | null;
  quote: HTMLElement | null;
}

export const SMALL = 500;
export const MEDIUM = 900;

export const CreateIconSpan = ({
  image,
  isTypeFeatured,
  isTypeInline,
  isThemeMaryland,
}: BaseProps) => {
  const iconSpan = ElementModel.createSpan({
    className: 'quote-icon-span',
    elementStyles: {
      element: {
        position: 'absolute',
        left: '-24px',
        top: '-32px',
        height: '15px',
        width: '22px',
        display: 'block',

        ...(image &&
          isTypeFeatured && {
            display: 'none',
          }),

        ...(isTypeInline &&
          image && {
            height: '20px',
            width: '29px',
            top: '-11px',
            right: '-20px',
            left: 'inherit',
          }),

        [`@container (min-width: ${SMALL}px)`]: {
          ...(!image && {
            left: `-${token.spacing['4xl']}`,
            top: '0',
          }),
        },

        ['& svg']: {
          fill: token.color.red,

          ...(isThemeMaryland && {
            fill: token.color.gold,
          }),
        },
      },
    },
  });

  iconSpan.element.innerHTML = QUOTE;

  return iconSpan;
};

export const CreateAction = (
  action: HTMLElement,
  { isTypeInline, isTypeFeatured, includesAnimation, image }: BaseProps,
) => {
  return ElementModel.create({
    element: action,
    className: 'quote-container-actions',
    elementStyles: {
      element: {
        marginTop: token.spacing.sm,

        ...(isTypeInline && {
          ...layout.grid.inline.tabletRows,
        }),

        ...(includesAnimation &&
          (isTypeInline || (isTypeFeatured && !image)) && {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 1s ease, transform 0.5s ease',
          }),
      },
    },
  });
};

export const AnimateQuote = (props: BaseProps, quoteElement: ElementVisual) => {
  const { quote, includesAnimation, isTypeInline, isTypeFeatured, image } =
    props;
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
          const animateAction = isTypeInline || (isTypeFeatured && !image);

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

export { default as elements } from './elements';
export { default as featured } from './featured';
export { default as inline } from './inline';
