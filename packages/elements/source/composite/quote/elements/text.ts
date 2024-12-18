import { Typography, Layout, Tokens } from '@universityofmaryland/variables';
import { Styles, Asset } from 'utilities';

export type TypeQuoteTextContainer = {
  quote: HTMLElement | null;
  attribution: HTMLElement | null;
  attributionSubText: HTMLElement | null;
  action: HTMLElement | null;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
};

type TypeQuoteTextContainerProps = TypeQuoteTextContainer & {
  isSizeLarge?: boolean;
};

const { Spacing, Colors } = Tokens;
const { convertJSSObjectToStyles } = Styles;

const TEXT_CONTAINER_ELEMENT_NAME = 'umd-element-quote-text-container';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_SIZE = 'size';
const THEME_DARK = 'dark';
const THEME_MARYLAND = 'maryland';
const SIZE_LARGE = 'large';

const TEXT_CONTAINER = 'quote-text-container';
const TEXT_CONTAINER_WRAPPER = 'quote-text-container-wrapper';
const TEXT_CONTAINER_QUOTE_WRAPPER = 'quote-container-quote';
const TEXT_CONTAINER_ATTRIBUTION_WRAPPER = 'quote-container-attribution';
const TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER =
  'quote-container-text-attribution-sub-text';
const ELEMENTS_TEXT_CONTAINER_ACTIONS = 'quote-container-actions';

const IS_THEME_DARK = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_THEME_MARYLAND = `.${TEXT_CONTAINER}[${ATTRIBUTE_THEME}='${THEME_MARYLAND}']`;
const IS_SIZE_LARGE = `.${TEXT_CONTAINER}[${ATTRIBUTE_SIZE}='${SIZE_LARGE}']`;

// prettier-ignore
const VarationSizeLarge = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${IS_SIZE_LARGE} .${TEXT_CONTAINER_QUOTE_WRAPPER}`]: Typography.sans.extraLarge,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`${IS_SIZE_LARGE} .${TEXT_CONTAINER_QUOTE_WRAPPER} *`]: Typography.sans.extraLarge,
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

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_QUOTE_WRAPPER}`]: Typography.sans.larger,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_QUOTE_WRAPPER} *`]: Typography.sans.larger,
    },
  })}

  .${TEXT_CONTAINER_QUOTE_WRAPPER} span {
    display: none;
  }
`;

// prettier-ignore
const AttributionStyles = `
  * + .${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} {
    margin-top: ${Spacing.sm};
  }

  .${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} {
    color: ${Colors.gray.dark};
  }

  .${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} * {
    color: currentColor;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_WRAPPER}`]: Typography.sans.medium,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_WRAPPER} *`]: Typography.sans.medium,
    },
  })}
`;

// prettier-ignore
const AttributionSubTextStyles = `
  * + .${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} {
    margin-top: 2px;
  }

  .${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} {
    color: ${Colors.gray.dark};
    font-style: italic;
  }

  .${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} * {
    color: currentColor;
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER}`]: Typography.sans.small,
    },
  })}
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${TEXT_CONTAINER_ATTRIBUTION_SUB_TEXT_WRAPPER} *`]: Typography.sans.small,
    },
  })}
`;

// prettier-ignore
const ActionStyles = `
  * + .${ELEMENTS_TEXT_CONTAINER_ACTIONS} {
    margin-top: ${Spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS_TEXT_CONTAINER_ACTIONS}`]: Layout.grid.columnAndRowsMobileTablet,
    },
  })}
`;

// prettier-ignore
const STYLES_QUOTE_TEXT_CONTAINER = `
  .${TEXT_CONTAINER} {
    container: ${TEXT_CONTAINER_ELEMENT_NAME} / inline-size;
    width: 100%;
  }

  ${QuoteStyles}
  ${AttributionStyles}
  ${AttributionSubTextStyles}
  ${ActionStyles}
  ${VarationThemeDark}
  ${VarationThemeMaryland}
  ${VarationSizeLarge}
`;

const CreateQuoteTextContainer = ({
  quote,
  attribution,
  attributionSubText,
  action,
  isThemeDark,
  isThemeMaryland,
  isSizeLarge = false,
}: TypeQuoteTextContainerProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  wrapper.classList.add(TEXT_CONTAINER_WRAPPER);

  if (quote) {
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = Asset.icon.QUOTE;

    quote.appendChild(iconSpan);
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
    action.classList.add(ELEMENTS_TEXT_CONTAINER_ACTIONS);
    wrapper.appendChild(action);
  }

  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isThemeMaryland) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isSizeLarge) container.setAttribute(ATTRIBUTE_SIZE, SIZE_LARGE);

  container.classList.add(TEXT_CONTAINER);
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateQuoteTextContainer,
  Styles: STYLES_QUOTE_TEXT_CONTAINER,
  Elements: {
    container: TEXT_CONTAINER,
    quoteWrapper: TEXT_CONTAINER_QUOTE_WRAPPER,
  },
};
