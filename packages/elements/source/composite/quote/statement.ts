import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type QuoteStatementProps } from './_types';

export const CreateQuoteStatementElement = (element: QuoteStatementProps) => {
  const container = ElementBuilder.create.div({
    className: 'quote-statement',
    elementStyles: {
      element: {},
    },
  });

  console.error('To Be Completed');

  return container;
};
