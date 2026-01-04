import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { type QuoteBaseProps, type QuoteVariantProps } from '../_types';

interface QuoteActionProps
  extends QuoteVariantProps,
    Pick<QuoteBaseProps, 'includesAnimation' | 'image'> {
  action: HTMLAnchorElement;
}

const CreateQuoteActionElement = ({
  action,
  image,
  includesAnimation,
  isTypeFeatured = false,
}: QuoteActionProps) =>
  new ElementBuilder(action)
    .withClassName('quote-container-actions')
    .withStyles({
      element: {
        marginTop: token.spacing.sm,
        display: 'block',

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
    })
    .build();

export const createCompositeQuoteAction = CreateQuoteActionElement;
