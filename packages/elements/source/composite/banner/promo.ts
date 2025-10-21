import {
  animation,
  element,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import { jssToCSS } from '@universityofmaryland/web-utilities-library/styles';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import { seal as logoSeal } from '@universityofmaryland/web-icons-library/logos';

type TypeBannerPromoProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
  includeSeal?: boolean;
};

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
    background-color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} > svg {
    fill: ${token.color.gray.darker};
  }

  ${OVERWRITE_THEME_DARK_HEADLINE} {
    color: ${token.color.white};
  }

  ${jssToCSS({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_RICH_TEXT}`]: element.text.rich.advancedDark,
    },
  })}

  ${OVERWRITE_THEME_DARK_RICH_TEXT} * {
    color: ${token.color.white};
  }
`;

// prettier-ignore
const ActionsStyles = `
  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_ACTIONS} {
      margin-top: ${token.spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_ACTIONS} {
      max-width: 30%;
      margin-left: ${token.spacing.md};
    }
  }
`;

// prettier-ignore
const TextStyles = `
  ${jssToCSS({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT}`]: element.text.rich.advanced,
    },
  })}

  ${jssToCSS({
    styleObj: {
      [`.${ELEMENT_RICH_TEXT} a`]: animation.line.fadeUnderRed,
    },
  })}

  .${ELEMENT_RICH_TEXT} {
    margin-top: ${token.spacing.min};
  }

  .${ELEMENT_RICH_TEXT} * {
    color: ${token.color.black};
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${jssToCSS({
    styleObj: {
      [`.${ELEMENT_HEADLINE}`]: typography.sans.extraLarge,
    },
  })}

  .${ELEMENT_HEADLINE} {
    text-transform: uppercase;
    color: ${token.color.black};
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
    padding: ${token.spacing.lg} ${token.spacing.lg};
    background-color: ${token.color.gold};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${ELEMENT_CONTAINER} {
      padding: ${token.spacing.xl};
    }
  }

  .${ELEMENT_CONTAINER} > img {
    position: absolute;
    right: -50px;
    top: -40px;
    height: 231px;
    width: 234px;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_CONTAINER} > img {
      display: none;
    }
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
    const { isThemeDark, includeSeal = false, actions } = props;
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
      const img = imageFromSvg({ SVG: logoSeal.white });

      img.alt = 'University of Maryland Seal';
      container.appendChild(img);
    }
    if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
    container.classList.add(ELEMENT_CONTAINER);
    container.appendChild(wrapper);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    return {
      element: declaration,
      styles: STYLES_BANNER_PROMO_ELEMENT,
    };
  })();

export default CreateBannerPromoElement;
