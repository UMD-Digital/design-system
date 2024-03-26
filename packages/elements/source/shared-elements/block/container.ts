import { Tokens, Typography, Fields } from '@universityofmaryland/variables';
import {
  BLOCK_TEXT_CONTAINER,
  BLOCK_TEXT_HEADLINE_WRAPPER,
  BLOCK_TEXT_DATE_WRAPPER,
  BLOCK_TEXT_CONTAINER_TEXT_WRAPPER,
} from './text';
import { BLOCK_IMAGE_CONTAINER } from './image';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

export type TypeBlockContainerAttributes = {
  isAligned?: boolean;
  isBordered?: boolean;
  theme?: string;
};

type TypeBlockContainerProps = TypeBlockContainerAttributes & {
  textContainer?: HTMLDivElement | null;
  imageContainer?: HTMLDivElement | null;
  personContainer?: HTMLDivElement | null;
};

const { SansExtraLarge, SansLarger, SansSmall } = Typography;
const { Colors, Spacing } = Tokens;
const { RichTextDark } = Fields;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ALIGNED = 'aligned';
const ATTRIBUTE_BORDER = 'border';
const ATTRIBUTE_WITH_IMAGE = 'image';
const THEME_DARK = 'dark';

const MEDIUM = 650;

const ELEMENT_NAME = 'umd-block-standard';
export const BLOCK_CONTAINER = 'block-container';
export const BLOCK_CONTAINER_WRAPPER = 'block-container-wrapper';

const IS_THEME_DARK = `.${BLOCK_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_ALIGNED = `.${BLOCK_CONTAINER}[${ATTRIBUTE_ALIGNED}]`;
const IS_WITH_BORDER = `.${BLOCK_CONTAINER}[${ATTRIBUTE_BORDER}]`;
const IS_WITH_IMAGE = `.${BLOCK_CONTAINER}[${ATTRIBUTE_WITH_IMAGE}]`;

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

  ${IS_THEME_DARK} .${BLOCK_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${IS_THEME_DARK} .${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER}`]: RichTextDark,
    },
  })}

  @media (max-width: ${MEDIUM - 1}px) {
    ${IS_THEME_DARK} .${BLOCK_IMAGE_CONTAINER} {
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

  @media (min-width: ${MEDIUM}px) {
    ${IS_ALIGNED} img {
      aspect-ratio: inherit;
    }
  }
`;

// prettier-ignore
const VariantBorderStyles = `
  ${IS_WITH_BORDER} {
    border: 1px solid ${Colors.gray.light};
    height: 100%;
  }

  ${IS_WITH_BORDER} .${BLOCK_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  @media (max-width: ${MEDIUM - 1}px) {
    ${IS_WITH_BORDER} .${BLOCK_IMAGE_CONTAINER} {
      margin-top: ${Spacing.md};
      margin-right: ${Spacing.md};
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
    ${IS_WITH_IMAGE} .${BLOCK_TEXT_CONTAINER} {
      padding-top: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const TextContainerStyles = `
  @media (max-width: ${MEDIUM - 1}px) {
    .${BLOCK_TEXT_HEADLINE_WRAPPER} {
      max-width: calc(100% - 110px);
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_HEADLINE_WRAPPER}`]: SansLarger,
      },
    })}
  
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_HEADLINE_WRAPPER} *`]: SansLarger,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_HEADLINE_WRAPPER}`]: SansExtraLarge,
      },
    })}
  
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_HEADLINE_WRAPPER} *`]: SansExtraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_DATE_WRAPPER}`]: SansSmall,
      },
    })}
  
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_DATE_WRAPPER} *`]: SansSmall,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} *`]: Typography.SansMedium,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${BLOCK_TEXT_CONTAINER_TEXT_WRAPPER} * {
      line-height: 1.375em;
    }
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  @media (max-width: ${MEDIUM - 1}px) {
    .${BLOCK_IMAGE_CONTAINER} {
      width: 96px;
      float: right;
      margin-bottom: 4px;
    }
  }
`;

// prettier-ignore
export const STYLES_BLOCK_CONTAINER = `
  .${BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: 680px;
  }

  .${BLOCK_CONTAINER_WRAPPER} {
    width: 100%;
  }

  ${TextContainerStyles}
  ${ImageContainerStyles}
  ${VariantWithImageStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
`;

export const CreatBlockContainer = ({
  imageContainer,
  textContainer,
  personContainer,
  theme,
  isAligned,
  isBordered,
}: TypeBlockContainerProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(BLOCK_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
  if (isAligned) container.setAttribute(ATTRIBUTE_ALIGNED, '');
  if (isBordered) container.setAttribute(ATTRIBUTE_BORDER, '');
  wrapper.classList.add(BLOCK_CONTAINER_WRAPPER);

  if (imageContainer) {
    wrapper.appendChild(imageContainer);
    container.setAttribute(ATTRIBUTE_WITH_IMAGE, '');
  }

  if (textContainer) {
    textContainer.classList.add(BLOCK_TEXT_CONTAINER);
    wrapper.appendChild(textContainer);
  }

  if (personContainer) {
    wrapper.appendChild(personContainer);
  }

  container.appendChild(wrapper);

  return container;
};
