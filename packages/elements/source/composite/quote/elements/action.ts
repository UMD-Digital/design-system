import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { type QuoteActionProps, type QuoteStatementProps } from '../_types';
import { type ElementModel } from '../../../_types';

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

const CreateStatementQuoteAction = ({
  action,
}: Pick<QuoteStatementProps, 'action'>): ElementModel<HTMLElement> | null => {
  if (!action) return null;
  return new ElementBuilder().withChild(action).build();
};

export const createCompositeQuoteAction = CreateQuoteActionElement;
export const createStatementQuoteAction = CreateStatementQuoteAction;
