import { Layout, Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import Text, { TEXT_CONTAINER, TypeQuoteTextContainer } from './elements/text';

type TypeInlineInline = TypeQuoteTextContainer & {
  theme: string;
  size: string;
  image: HTMLElement | null;
};

const { Spacing } = Tokens;
const { CampaignExtralarge, SansLarger } = Typography;
const { Lock } = Layout;

const MEDIUM = 1000;
const LARGE = 1300;

const ELEMENT_NAME = 'umd-element-quote-inline';

const QUOTE_INLINE_CONTAINER = 'quote-inline-container';
const QUOTE_INLINE_CONTAINER_WRAPPER = 'quote-inline-container-wrapper';

const IS_TEXT_CONTAINER_OVERWRITE = `.${QUOTE_INLINE_CONTAINER} .${TEXT_CONTAINER}`;

// prettier-ignore
const OverwriteTextContainer = `
  ${IS_TEXT_CONTAINER_OVERWRITE} {

  }
`;

// prettier-ignore
const STYLES_QUOTE_INLINE_ELEMENT = `
  .${QUOTE_INLINE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${OverwriteTextContainer}
`;

const CreateQuoteInlineElement = (element: TypeInlineInline) => {
  const { size } = element;
  const container = document.createElement('div');
  const isSizeLarge = size === 'large';
  const hasImage = element.image !== null;
  const textContainer = Text.CreateElement({
    ...element,
    isSizeLarge,
    isHeadlineLine: !hasImage,
  });

  container.appendChild(textContainer);

  return container;
};

export default {
  CreateElement: CreateQuoteInlineElement,
  Styles: STYLES_QUOTE_INLINE_ELEMENT,
};
