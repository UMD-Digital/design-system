import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type QuoteBaseProps, type QuoteVariantProps } from '../_types';

interface QuoteActionProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'includesAnimation' | 'image'> {
  action: HTMLAnchorElement;
}

export default ({
  action,
  image,
  includesAnimation,
  isTypeFeatured = false,
}: QuoteActionProps) =>
  ElementBuilder.create.element({
    element: action,
    className: 'quote-container-actions',
    elementStyles: {
      element: {
        marginTop: token.spacing.sm,

        ...(!isTypeFeatured && {
          ...layout.grid.inline.tabletRows,
        }),

        ...(includesAnimation &&
          (!isTypeFeatured || (isTypeFeatured && !image)) && {
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'opacity 1s ease, transform 0.5s ease',
          }),
      },
    },
  });
