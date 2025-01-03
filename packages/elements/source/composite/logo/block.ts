import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

export type TypeLogoRequirements = {
  isBordered?: boolean;
  isThemeDark?: boolean;
  image?: HTMLElement | null;
  text?: HTMLElement | null;
};

const { convertJSSObjectToStyles } = Utility.styles;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_BORDER = 'border';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-logo-block';
const ELEMENT_LOGO_BLOCK_CONTAINER = 'logo-block-container';
const ELEMENT_LOGO_BLOCK_ASSET = 'logo-block-asset';
const ELEMENT_LOGO_BLOCK_TEXT = 'logo-block-text';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_BORDER = `[${ATTRIBUTE_BORDER}]`;

const OVERWRITE_THEME_DARK_ASSET = `.${ELEMENT_LOGO_BLOCK_CONTAINER}${IS_THEME_DARK} .${ELEMENT_LOGO_BLOCK_ASSET}`;
const OVERWRITE_THEME_DARK_TEXT = `.${ELEMENT_LOGO_BLOCK_CONTAINER}${IS_THEME_DARK} .${ELEMENT_LOGO_BLOCK_TEXT}`;

const OVERWRITE_BORDER_ASSET = `.${ELEMENT_LOGO_BLOCK_CONTAINER}${IS_BORDER} .${ELEMENT_LOGO_BLOCK_ASSET}`;

// prettier-ignore
const VariantThemeStyles = `
  ${OVERWRITE_THEME_DARK_ASSET} {
    background-color: ${token.color.gray.darker};
    border: 1px solid ${token.color.gray.dark};
    padding: ${token.spacing.xl};
  }

  ${OVERWRITE_THEME_DARK_TEXT},
  ${OVERWRITE_THEME_DARK_TEXT} * {
    color: ${token.color.white};
  };
`;

// prettier-ignore
const VariantBorderStyles = `
  ${OVERWRITE_BORDER_ASSET} {
    border: 1px solid ${token.color.gray.light};
    padding: ${token.spacing.xl};
    height: 100%;
  }
`;

// prettier-ignore
const TextStyles = `
  .${ELEMENT_LOGO_BLOCK_TEXT},
  .${ELEMENT_LOGO_BLOCK_TEXT} * {
    color: ${token.color.gray.darker};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LOGO_BLOCK_TEXT}`]: typography.sans.min,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LOGO_BLOCK_TEXT} *`]: typography.sans.min,
    },
  })}

  .${ELEMENT_LOGO_BLOCK_TEXT} a:hover,
  .${ELEMENT_LOGO_BLOCK_TEXT} a:focus {
    text-decoration: underline;
   }
`;

// prettier-ignore
const STYLES_LOGO_BLOCK_ELEMENT = `
  .${ELEMENT_LOGO_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: 100%;
  }

  .${ELEMENT_LOGO_BLOCK_ASSET} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .${ELEMENT_LOGO_BLOCK_ASSET} > * {
    max-height: 50px;
    max-width: 150px;
    display: flex;
  }

  .${ELEMENT_LOGO_BLOCK_ASSET} img {
    object-fit: contain;
  }

  .${ELEMENT_LOGO_BLOCK_ASSET} + * {
    margin-top: ${token.spacing.min};
  }

  ${TextStyles}
  ${VariantBorderStyles}
  ${VariantThemeStyles}
`;

const CreateLogoBlockElement = (element: TypeLogoRequirements) => {
  const { isThemeDark, image, text, isBordered = false } = element;
  if (!image) return null;

  const elementContainer = document.createElement('div');
  const assetContainer = document.createElement('div');

  assetContainer.appendChild(image);
  assetContainer.classList.add(ELEMENT_LOGO_BLOCK_ASSET);

  elementContainer.classList.add(ELEMENT_LOGO_BLOCK_CONTAINER);
  if (isThemeDark) elementContainer.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isBordered) elementContainer.setAttribute(ATTRIBUTE_BORDER, '');
  elementContainer.appendChild(assetContainer);

  if (text) {
    text.classList.add(ELEMENT_LOGO_BLOCK_TEXT);
    elementContainer.appendChild(text);
  }

  return elementContainer;
};

export default {
  CreateElement: CreateLogoBlockElement,
  Styles: STYLES_LOGO_BLOCK_ELEMENT,
};
