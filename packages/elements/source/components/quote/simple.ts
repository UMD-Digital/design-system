import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeQuoteSimple = {
  theme: string;
};

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-quote-simple';

const QUOTE_SIMPLE_CONTAINER = 'quote-simple-container';
const QUOTE_SIMPLE_CONTAINER_WRAPPER = 'quote-simple-container-wrapper';

// prettier-ignore
const STYLES_QUOTE_SIMPLE_ELEMENT = `
  .${QUOTE_SIMPLE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
`;

const CreateQuoteSimpleElement = (element: TypeQuoteSimple) => {
  const container = document.createElement('div');

  return container;
};

export default {
  CreateElement: CreateQuoteSimpleElement,
  Styles: STYLES_QUOTE_SIMPLE_ELEMENT,
};
