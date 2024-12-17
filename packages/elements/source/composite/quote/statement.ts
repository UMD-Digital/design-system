type TypeQuoteStatement = {
  isThemeDark?: boolean;
};

const ELEMENT_NAME = 'umd-element-quote-statement';

const QUOTE_STATEMENT_CONTAINER = 'quote-statement-container';

// prettier-ignore
const STYLES_QUOTE_STATEMENT_ELEMENT = `
  .${QUOTE_STATEMENT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
`;

const CreateQuoteStatementElement = (element: TypeQuoteStatement) => {
  const container = document.createElement('div');

  console.error('To Be Completed');

  return container;
};

export default {
  CreateElement: CreateQuoteStatementElement,
  Styles: STYLES_QUOTE_STATEMENT_ELEMENT,
};
