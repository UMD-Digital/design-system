import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type QuoteStatementProps } from './_types';

export const CreateQuoteStatementElement = (element: QuoteStatementProps) => {
  const container = new ElementBuilder()
    .withClassName('quote-statement')
    .withStyles({
      element: {},
    })
    .build();

  console.error('To Be Completed');

  return container;
};
