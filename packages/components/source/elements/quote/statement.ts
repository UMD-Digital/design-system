import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeQuoteStatement = {
  theme: string;
};

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-quote-statement';

const QUOTE_STATEMENT_CONTAINER = 'quote-statement-container';
const QUOTE_STATEMENT_CONTAINER_WRAPPER = 'quote-statement-container-wrapper';

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
