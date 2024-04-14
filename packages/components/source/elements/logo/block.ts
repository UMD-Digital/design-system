import { Tokens } from '@universityofmaryland/variables';

export type TypeLogoRequirements = {
  isBordered?: boolean;
  theme?: string;
  image?: HTMLElement | null;
};

const { Colors, Spacing } = Tokens;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_BORDER = 'border';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-logo-block';
const ELEMENT_LOGO_BLOCK_CONTAINER = 'logo-block-container';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_BORDER = `[${ATTRIBUTE_BORDER}]`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_LOGO_BLOCK_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_BORDER_CONTAINER = `.${ELEMENT_LOGO_BLOCK_CONTAINER}${IS_BORDER}`;

// prettier-ignore
const VariantThemeStyles = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {
    background-color: ${Colors.gray.darker};
    padding: ${Spacing.xl};
  }
`;

// prettier-ignore
const VariantBorderStyles = `
  ${OVERWRITE_BORDER_CONTAINER} {
    border: 1px solid ${Colors.gray.light};
    padding: ${Spacing.xl};
    height: 100%;
  }
`;

// prettier-ignore
const STYLES_LOGO_BLOCK_ELEMENT = `
  .${ELEMENT_LOGO_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${VariantThemeStyles}
  ${VariantBorderStyles}
`;

const CreateLogoBlockElement = (element: TypeLogoRequirements) => {
  const { theme, image, isBordered = false } = element;
  if (!image) return null;

  const elementContainer = document.createElement('div');

  elementContainer.appendChild(image);

  elementContainer.classList.add(ELEMENT_LOGO_BLOCK_CONTAINER);
  if (isBordered) elementContainer.setAttribute(ATTRIBUTE_BORDER, '');
  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  return elementContainer;
};

export default {
  CreateElement: CreateLogoBlockElement,
  Styles: STYLES_LOGO_BLOCK_ELEMENT,
};
