import {
  Typography,
  Layout,
  Tokens,
  Elements,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

export type TypeQuoteTextContainer = {
  quote: HTMLElement | null;
  attribution: HTMLElement | null;
  attributionSubText: HTMLElement | null;
  action: HTMLElement | null;
  theme: string;
};

type TypeQuoteTextContainerProps = TypeQuoteTextContainer & {
  isSizeLarge?: boolean;
  isHeadlineLine?: boolean;
};

const { Spacing, Colors, FontSize } = Tokens;
const { Eyebrow, Text } = Elements;
const { GridColumnAndRows } = Layout;
const { SansExtraLarge, SansLargest, SansLarger, SansMedium, SansSmall } =
  Typography;

const MEDIUM = 400;

const TEXT_CONTAINER_ELEMENT_NAME = 'umd-element-quote-text-container';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_SIZE = 'size';
const ATTRIBUTE_HEADLINE_LINE = 'headline-line';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const SIZE_LARGE = 'large';

export const TEXT_CONTAINER = 'quote-text-container';
export const TEXT_CONTAINER_WRAPPER = 'quote-text-container-wrapper';
export const TEXT_CONTAINER_QUOTE_WRAPPER = 'quote-container-quote';
const TEXT_CONTAINER_ATTRIBUTION_WRAPPER = 'quote-container-attribution';
export const TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER =
  'quote-container-text-attribution-sub-text';
const TEXT_CONTAINER_ACTIONS_WRAPPER = 'quote-container-actions';

const IS_THEME_DARK = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_MARYLAND = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_SIZE_LARGE = `.${TEXT_CONTAINER}[${ATTRIBUTE_SIZE}='${SIZE_LARGE}']`;
const IS_HEADLINE_LINE = `.${TEXT_CONTAINER}[${ATTRIBUTE_HEADLINE_LINE}]`;

// prettier-ignore
const VarationHeadlineLine = `
  ${IS_HEADLINE_LINE} .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.red};
  }

  ${IS_HEADLINE_LINE}[${ATTRIBUTE_THEME}='${THEME_DARK}'] .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    border-left: 2px solid ${Colors.white};
  }

  ${IS_HEADLINE_LINE}[${ATTRIBUTE_THEME}='${THEME_MARYLAND}'] .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    border-left: 2px solid ${Colors.white};
  }
`

// prettier-ignore
const VarationSizeLarge = `
  ${IS_SIZE_LARGE} {
    max-width: 905px;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_SIZE_LARGE} .${TEXT_CONTAINER_QUOTE_WRAPPER}`]: SansExtraLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_SIZE_LARGE} .${TEXT_CONTAINER_QUOTE_WRAPPER} *`]: SansExtraLarge,
    },
  })}
`

// prettier-ignore
const VarationThemeDark = `
  ${IS_THEME_DARK} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const VarationThemeMaryland = `
  ${IS_THEME_MARYLAND} * {
    color: ${Colors.white};
  }
`

// prettier-ignore
const QuoteStyles = `
  & .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    font-weight: 700;
  }

  .${TEXT_CONTAINER_QUOTE_WRAPPER} {
    font-weight: 700;
    color: ${Colors.black};
  }

  .${TEXT_CONTAINER_QUOTE_WRAPPER} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_QUOTE_WRAPPER}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_QUOTE_WRAPPER} *`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const AttributionStyles = `
  * + .${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  .${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} {
    color: ${Colors.gray.darker};
  }

  .${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_WRAPPER}`]: SansMedium,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} *`]: SansMedium,
    },
  })}
`;

// prettier-ignore
const AttributionSubTextStyles = `
  * + .${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} {
    margin-top: 2px;
  }

  .${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} {
    color: ${Colors.gray.darker};
  }

  .${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} * {
    color: currentColor;
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER}`]: SansSmall,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} *`]: SansSmall,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${TEXT_CONTAINER_ACTIONS_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ACTIONS_WRAPPER}`]: GridColumnAndRows['.mobile-tablet'],
    },
  })}
`;

// prettier-ignore
const STYLES_QUOTE_TEXT_CONTAINER = `
  .${TEXT_CONTAINER} {
    container: ${TEXT_CONTAINER_ELEMENT_NAME} / inline-size;
    max-width: 755px;
  }

  ${QuoteStyles}
  ${AttributionStyles}
  ${AttributionSubTextStyles}
  ${ActionStyles}
  ${VarationThemeDark}
  ${VarationThemeMaryland}
  ${VarationSizeLarge}
  ${VarationHeadlineLine}
`;

export const CreateQuoteTextContainer = ({
  quote,
  attribution,
  attributionSubText,
  action,
  theme,
  isSizeLarge = false,
  isHeadlineLine = false,
}: TypeQuoteTextContainerProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  wrapper.classList.add(TEXT_CONTAINER_WRAPPER);

  if (quote) {
    quote.classList.add(TEXT_CONTAINER_QUOTE_WRAPPER);
    wrapper.appendChild(quote);
  }

  if (attribution) {
    attribution.classList.add(TEXT_CONTAINER_ATTRIBUTION_WRAPPER);
    wrapper.appendChild(attribution);
  }

  if (attributionSubText) {
    attributionSubText.classList.add(
      TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER,
    );
    wrapper.appendChild(attributionSubText);
  }

  if (action) {
    action.classList.add(TEXT_CONTAINER_ACTIONS_WRAPPER);
    wrapper.appendChild(action);
  }

  container.setAttribute(ATTRIBUTE_THEME, theme);
  if (isSizeLarge) container.setAttribute(ATTRIBUTE_SIZE, SIZE_LARGE);
  if (isHeadlineLine) container.setAttribute(ATTRIBUTE_HEADLINE_LINE, '');
  container.classList.add(TEXT_CONTAINER);
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateQuoteTextContainer,
  Styles: STYLES_QUOTE_TEXT_CONTAINER,
};
