import { Tokens } from '@universityofmaryland/web-elements-styles';
import ImageContainer from './image';
import { TextLockupSmall, TextLockupSmallScaling } from 'macros';

export type TypeBlockContainer = {
  isAligned?: boolean;
  isBordered?: boolean;
  isThemeDark?: boolean;
  isTransparent?: boolean;
};

type TypeBlockContainerProps = TypeBlockContainer & {
  textContainer?: HTMLDivElement | null;
  imageContainer?: HTMLDivElement | null;
  personContainer?: HTMLDivElement | null;
};

const { Colors, Spacing, SpaceLayout } = Tokens;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TRANSPARENT = 'transparent';
const ATTRIBUTE_ALIGNED = 'aligned';
const ATTRIBUTE_BORDER = 'border';
const ATTRIBUTE_WITH_IMAGE = 'image';
const THEME_DARK = 'dark';

const MEDIUM = 650;

const ELEMENT_NAME = 'umd-block-container';
const ELEMENT_BLOCK_CONTAINER = 'block-container';
const ELEMENT_BLOCK_CONTAINER_WRAPPER = 'block-container-wrapper';

const IS_THEME_DARK = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_ALIGNED = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_ALIGNED}]`;
const IS_WITH_BORDER = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_BORDER}]`;
const IS_WITH_IMAGE = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_WITH_IMAGE}]`;
const IS_TRANSPARENT = `[${ATTRIBUTE_TRANSPARENT}="true"]`;

const OVERWRITE_SCALABLE_FONT_CONTAINER = `.${ELEMENT_BLOCK_CONTAINER} .${TextLockupSmallScaling.Elements.container}`;

const OVERWRITE_DARK_THEME_TEXT_CONTAINER = `${IS_THEME_DARK} .${TextLockupSmall.Elements.container}`;
const OVERWRITE_DARK_THEME_IMAGE_CONTAINER = `${IS_THEME_DARK} .${ImageContainer.Elements.container}`;

const OVERWRITE_TYPE_BORDER_TEXT_CONTAINER = `${IS_WITH_BORDER} .${TextLockupSmall.Elements.container}`;
const OVERWRITE_TYPE_BORDER_IMAGE_CONTAINER = `${IS_WITH_BORDER} .${ImageContainer.Elements.container}`;

const OVERWRITE_WITH_IMAGE_TEXT_CONTAINER = `${IS_WITH_IMAGE} .${TextLockupSmall.Elements.container}`;

const OVERWRITE_ALIGNED_IMAGE_CONTAINER = `${IS_ALIGNED} .${ImageContainer.Elements.container}`;

const OVERWRITE_TRANSPARENT_CONTAINER = `.${ELEMENT_BLOCK_CONTAINER}${IS_TRANSPARENT}`;
const OVERWRITE_TRANSPARENT_TEXT_CONTAINER = `${OVERWRITE_TRANSPARENT_CONTAINER} .${TextLockupSmall.Elements.container}`;

// prettier-ignore
const OverwriteTransparent = `
  ${OVERWRITE_TRANSPARENT_CONTAINER} {
    background-color: transparent;
  }

  ${OVERWRITE_TRANSPARENT_TEXT_CONTAINER} {
    padding-left: 0;
    padding-right: 0;
  }
`;

// prettier-ignore
const VariantThemeStyles = `
  ${IS_THEME_DARK} {
    background-color: ${Colors.gray.darker};
    color: ${Colors.white};
    height: 100%;
  }

  ${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_DARK_THEME_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  @media (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_DARK_THEME_IMAGE_CONTAINER} {
     margin-top: ${Spacing.md};
     margin-right: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const VariantAlignedStyles = `
  ${IS_ALIGNED} img {
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }

  @media (min-width: ${MEDIUM }px) {
    ${OVERWRITE_ALIGNED_IMAGE_CONTAINER} {
      width: 100%;
    }
  }

  @media (min-width: ${MEDIUM }px) {
    ${OVERWRITE_ALIGNED_IMAGE_CONTAINER} a {
      width: 100%;
    }
  }
`;

// prettier-ignore
const VariantBorderStyles = `
  ${IS_WITH_BORDER} {
    border: 1px solid ${Colors.gray.light};
    height: 100%;
  }

  ${OVERWRITE_TYPE_BORDER_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  @media (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TYPE_BORDER_IMAGE_CONTAINER} {
      margin: ${Spacing.md};
      margin-bottom: 0;
    }
  }

  @media (min-width: 380px) and (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TYPE_BORDER_IMAGE_CONTAINER} {
      margin-left: ${Spacing.sm};
    }
  }
`;

// prettier-ignore
const VariantWithImageStyles = `
  @media (max-width: ${MEDIUM - 1}px) {
    ${IS_WITH_IMAGE} {
      display: flex;
      width: 100%;
    }
  }

  @media (min-width: ${MEDIUM}px) {
    ${OVERWRITE_WITH_IMAGE_TEXT_CONTAINER} {
      padding-top: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const OverwriteScalabeFontContainer = `
  @media (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_SCALABLE_FONT_CONTAINER} {
      display: inline;
    }
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  @media (max-width: ${MEDIUM - 1}px) {
    .${ImageContainer.Elements.container} {
      max-width: 100%;
      margin-bottom: 4px;
      margin-bottom: ${Spacing.md};
    }
  }

  @media (min-width: 380px) and (max-width: ${MEDIUM - 1}px) {
    .${ImageContainer.Elements.container} {
      width: 120px;
      float: right;
    }
  }
`;

// prettier-ignore
const STYLES_BLOCK_CONTAINER = `
  .${ELEMENT_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: ${SpaceLayout.maxWidth.smallest};
  }

  .${ELEMENT_BLOCK_CONTAINER_WRAPPER} {
    width: 100%;
  }

  ${ImageContainerStyles}
  ${OverwriteScalabeFontContainer}
  ${VariantWithImageStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
  ${OverwriteTransparent}
`;

const CreateBlockContainer = ({
  imageContainer,
  textContainer,
  isThemeDark,
  isAligned,
  isBordered,
  isTransparent,
}: TypeBlockContainerProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ELEMENT_BLOCK_CONTAINER);
  if (isTransparent) container.setAttribute(ATTRIBUTE_TRANSPARENT, 'true');
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);
  if (isAligned) container.setAttribute(ATTRIBUTE_ALIGNED, '');
  if (isBordered) container.setAttribute(ATTRIBUTE_BORDER, '');
  wrapper.classList.add(ELEMENT_BLOCK_CONTAINER_WRAPPER);

  if (imageContainer) {
    wrapper.appendChild(imageContainer);
    container.setAttribute(ATTRIBUTE_WITH_IMAGE, '');
  }

  if (textContainer) {
    wrapper.appendChild(textContainer);
  }

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateBlockContainer,
  Styles: STYLES_BLOCK_CONTAINER,
};
