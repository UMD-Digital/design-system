import { ElementModel } from 'model';
import { BaseProps } from '.';

interface TypeQuoteStatement extends BaseProps {}

export const CreateQuoteStatementElement = (element: TypeQuoteStatement) => {
  const container = ElementModel.createDiv({
    className: 'quote-statement',
    elementStyles: {
      element: {},
    },
  });

  console.error('To Be Completed');

  return container;
};
