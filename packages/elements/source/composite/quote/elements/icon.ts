import * as token from '@universityofmaryland/web-styles-library/token';
import { quote as iconQuote } from '@universityofmaryland/web-icons-library/brand';
import { ElementModel } from 'model';
import { SMALL } from '../_constants';
import { type QuoteBaseProps, type QuoteVariantProps } from '../_types';

interface QuoteIconProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'isThemeMaryland'> {
  hasImage?: boolean;
}

export default ({
  hasImage = false,
  isThemeMaryland,
  isTypeFeatured = false,
}: QuoteIconProps) => {
  const imageWithFeaturedLayout = hasImage && isTypeFeatured;
  const imageWithoutFeaturedLayout = hasImage && !isTypeFeatured;

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

        ...(imageWithFeaturedLayout && {
          display: 'none',
        }),

        ...(imageWithoutFeaturedLayout && {
          height: '20px',
          width: '29px',
          top: '-11px',
          right: '-20px',
          left: 'inherit',
        }),

        [`@container (min-width: ${SMALL}px)`]: {
          ...(!hasImage && {
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

  iconSpan.element.innerHTML = iconQuote;

  return iconSpan;
};
