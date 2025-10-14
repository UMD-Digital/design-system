import { ElementModel } from 'model';
import { type QuoteStatementProps } from './_types';

export const CreateQuoteStatementElement = (element: QuoteStatementProps) => {
  const container = ElementModel.createDiv({
    className: 'quote-statement',
    elementStyles: {
      element: {},
    },
  });

  console.error('To Be Completed');

  return container;
};
