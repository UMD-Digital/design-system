import {
  Tokens,
  Animations,
  Typography,
} from '@universityofmaryland/variables';
import { Styles } from 'utilities';

export type TypeLogoRequirements = {
  isBordered?: boolean;
  theme?: string;
  image?: HTMLElement | null;
  text?: HTMLElement | null;
};

const { Link } = Animations;
const { Colors, Spacing } = Tokens;
const { SansMin } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

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
    background-color: ${Colors.gray.darker};
    border: 1px solid ${Colors.gray.dark};
    padding: ${Spacing.xl};
  }

  ${OVERWRITE_THEME_DARK_TEXT} {
    color: ${Colors.white};
  };

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_TEXT} a`]: Link.LineSlideUnder.white,
    },
  })}
`;

// prettier-ignore
const VariantBorderStyles = `
  ${OVERWRITE_BORDER_ASSET} {
    border: 1px solid ${Colors.gray.light};
    padding: ${Spacing.xl};
    height: 100%;
  }
`;

// prettier-ignore
const TextStyles = `
  .${ELEMENT_LOGO_BLOCK_TEXT} {
    color: ${Colors.gray.darker};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LOGO_BLOCK_TEXT}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LOGO_BLOCK_TEXT} *`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_LOGO_BLOCK_TEXT} a`]: Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const STYLES_LOGO_BLOCK_ELEMENT = `
  .${ELEMENT_LOGO_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_LOGO_BLOCK_ASSET} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .${ELEMENT_LOGO_BLOCK_ASSET} + * {
    margin-top: ${Spacing.sm};
  }

  ${TextStyles}
  ${VariantBorderStyles}
  ${VariantThemeStyles}
`;

const CreateLogoBlockElement = (element: TypeLogoRequirements) => {
  const { theme, image, text, isBordered = false } = element;
  if (!image) return null;

  const elementContainer = document.createElement('div');
  const assetContainer = document.createElement('div');

  assetContainer.appendChild(image);
  assetContainer.classList.add(ELEMENT_LOGO_BLOCK_ASSET);

  elementContainer.classList.add(ELEMENT_LOGO_BLOCK_CONTAINER);
  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);
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
