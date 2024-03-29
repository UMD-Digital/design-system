import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeInlineInline = {
  theme: string;
};

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-quote-inline';

const QUOTE_INLINE_CONTAINER = 'quote-inline-container';
const QUOTE_INLINE_CONTAINER_WRAPPER = 'quote-inline-container-wrapper';

// prettier-ignore
const STYLES_QUOTE_INLINE_ELEMENT = `
  .${QUOTE_INLINE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
`;

const CreateQuoteInlineElement = (element: TypeInlineInline) => {
  const container = document.createElement('div');

  return container;
};

export default {
  CreateElement: CreateQuoteInlineElement,
  Styles: STYLES_QUOTE_INLINE_ELEMENT,
};
