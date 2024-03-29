import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

type TypeQuoteFeatured = {
  theme: string;
  size: string;
};

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-quote-featured';

const QUOTE_FEATURED_CONTAINER = 'quote-featured-container';
const QUOTE_FEATURED_CONTAINER_WRAPPER = 'quote-featured-container-wrapper';

// prettier-ignore
const STYLES_QUOTE_FEATURED_ELEMENT = `
  .${QUOTE_FEATURED_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
`;

const CreateQuoteFeaturedElement = (element: TypeQuoteFeatured) => {
  const container = document.createElement('div');

  return container;
};

export default {
  CreateElement: CreateQuoteFeaturedElement,
  Styles: STYLES_QUOTE_FEATURED_ELEMENT,
};
