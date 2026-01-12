import { type QuoteStatementProps } from './_types';
import { type ElementModel } from '../../_types';
import { createStatementQuoteImage } from './elements/image';
import { createStatementQuote } from './elements/quote';
import { createStatementQuoteIcon } from './elements/icon';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { createStatementQuoteAction } from './elements/action';
import {
  createStatementQuoteHeadline,
  createStatementQuoteAttribution,
} from './elements/text';
import * as Style from '@universityofmaryland/web-styles-library';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library';

const CreateCompositeQuoteStatement = (props: QuoteStatementProps) => {
  const {
    action,
    attribution,
    attributionSubText,
    quote,
    headline,
    image,
    isThemeGold,
  } = props;

  const statementChildren: ElementModel<HTMLElement>[] = [];

  if (image) {
    const imageElement = createStatementQuoteImage({ image, isThemeGold });
    statementChildren.push(imageElement);
  }

  const iconElement = createStatementQuoteIcon({ isThemeGold });
  statementChildren.push(iconElement);

  const headlineElement = createStatementQuoteHeadline({ headline });
  if (headlineElement) {
    statementChildren.push(headlineElement);
  }

  if (quote) {
    const quoteElement = createStatementQuote({ quote });
    statementChildren.push(quoteElement);
  }

  const attributionContainerElement = createStatementQuoteAttribution({
    attribution,
    attributionSubText,
  });
  if (attributionContainerElement) {
    statementChildren.push(attributionContainerElement);
  }

  const actionElement = createStatementQuoteAction({ action });
  if (actionElement) {
    statementChildren.push(actionElement);
  }

  return new ElementBuilder()
    .withClassName('quote-statement')
    .withStyles({
      element: {
        backgroundColor: token.color.white,
        borderTop: `4px solid ${token.color.red}`,
        position: 'relative',
        textAlign: 'center',
        boxShadow:
          '0 2px 4px rgba(0, 0, 0, 0.06), 0 8px 16px rgba(0, 0, 0, 0.08), 0 24px 40px rgba(0, 0, 0, 0.10)',
        marginTop: `${token.spacing['2xl']}`,
        padding: `${token.spacing['6xl']} ${token.spacing.lg} ${token.spacing.xl}`,

        ...createMediaQuery(
          'min-width',
          token.media.breakpointValues.desktop.min,
          {
            padding: `${token.spacing['8xl']} ${token.spacing['3xl']} ${token.spacing['6xl']}`,
          },
        ),

        ...(isThemeGold && {
          borderTop: `4px solid ${token.color.gold}`,
        }),
      },
    })
    .withChildren(...statementChildren)
    .build();
};

export const createCompositeQuoteStatement = CreateCompositeQuoteStatement;
