import { Tokens, Typography, Elements } from '@universityofmaryland/variables';
import { Styles, AssetLogo } from 'utilities';

type TypeBannerPromoProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string | null;
  includeSeal?: boolean;
};

const { Colors, Spacing } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;
const { SansExtraLarge } = Typography;
const { Text } = Elements;

const SMALL = 650;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-element-banner-promo';
const ELEMENT_DECLARATION = 'banner-promo-declaration';
const ELEMENT_CONTAINER = 'banner-promo-container';
const ELEMENT_WRAPPER = 'banner-promo-wrapper';
const ELEMENT_TEXT_CONTAINER = 'banner-promo-text-container';
const ELEMENT_HEADLINE = 'banner-promo-headline';
const ELEMENT_RICH_TEXT = 'banner-promo-rich-text';
const ELEMENT_ACTIONS = 'banner-promo-actions';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_HEADLINE = `.${ELEMENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_HEADLINE}`;
const OVERWRITE_THEME_DARK_RICH_TEXT = `.${ELEMENT_CONTAINER}${IS_THEME_DARK} .${ELEMENT_RICH_TEXT}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${Colors.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} > svg {
    fill: ${Colors.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_HEADLINE} {
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_RICH_TEXT}`]: Text.RichTextDark,
    },
  })}

  ${OVERWRITE_THEME_DARK_RICH_TEXT} * {
    color: ${Colors.white};
  }
`;

// prettier-ignore
const ActionsStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_ACTIONS} {
      margin-top: ${Spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_ACTIONS} {
      max-width: 30%;
      margin-left: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT}`]: Text.RichText,
    },
  })}

  .${ELEMENT_RICH_TEXT} {
    margin-top: ${Spacing.min};
  }

  .${ELEMENT_RICH_TEXT} * {
    color: ${Colors.black};
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HEADLINE}`]: SansExtraLarge,
    },
  })}

  .${ELEMENT_HEADLINE} {
    text-transform: uppercase;
    color: ${Colors.black};
    font-weight: 800;
  }
`;

// prettier-ignore
const TextContainerStyles = `
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_TEXT_CONTAINER} {
      width: 70%;
    }
  }
`;

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_WRAPPER} {
    z-index: 9;
    position: relative;
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_WRAPPER} {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const STYLES_BANNER_PROMO_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: hidden;
    position: relative;
  }

  .${ELEMENT_CONTAINER} {
    padding: ${Spacing.lg} ${Spacing.lg};
    background-color: ${Colors.gold};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_CONTAINER} {
      padding: ${Spacing.xl};
    }
  }

  .${ELEMENT_CONTAINER} > svg {
    position: absolute;
    right: -${Spacing.md};
    bottom: -${Spacing.md};
    height: 100%;
    max-height: 110px;
    object-fit: cover;
  }

  ${WrapperStyles}
  ${TextContainerStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ActionsStyles}
  ${OverwriteThemeDark}
`;

const CreateTextContainer = (props: TypeBannerPromoProps) => {
  const { headline, text } = props;
  const container = document.createElement('div');

  container.classList.add(ELEMENT_TEXT_CONTAINER);

  if (headline) {
    headline.classList.add(ELEMENT_HEADLINE);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_RICH_TEXT);
    container.appendChild(text);
  }

  return container;
};

const CreateBannerPromoElement = (props: TypeBannerPromoProps) =>
  (() => {
    const { theme, includeSeal = true, actions } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const textContainer = CreateTextContainer(props);

    wrapper.classList.add(ELEMENT_WRAPPER);
    wrapper.appendChild(textContainer);

    if (actions) {
      actions.classList.add(ELEMENT_ACTIONS);
      wrapper.appendChild(actions);
    }

    if (includeSeal) {
      let seal = AssetLogo.SEAL_WHITE;

      if (theme === THEME_DARK) seal = AssetLogo.SEAL_GRAY_DARK;

      container.innerHTML = `${seal}`;
    }
    if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
    container.classList.add(ELEMENT_CONTAINER);
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    return declaration;
  })();

export default {
  CreateElement: CreateBannerPromoElement,
  Styles: STYLES_BANNER_PROMO_ELEMENT,
};
