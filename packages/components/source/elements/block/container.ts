import { Tokens, Typography, Elements } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  ELEMENT_BLOCK_TEXT_CONTAINER,
  ELEMENT_BLOCK_TEXT_HEADLINE,
  ELEMENT_BLOCK_TEXT_DATE,
  ELEMENT_BLOCK_TEXT_RICH_TEXT,
} from './text';
import { ELEMENT_BLOCK_IMAGE_CONTAINER } from './image';

export type TypeBlockContainer = {
  isAligned?: boolean;
  isBordered?: boolean;
  theme?: string;
};

type TypeBlockContainerProps = TypeBlockContainer & {
  textContainer?: HTMLDivElement | null;
  imageContainer?: HTMLDivElement | null;
  personContainer?: HTMLDivElement | null;
};

const { SansExtraLarge, SansLarger, SansSmall } = Typography;
const { Colors, Spacing } = Tokens;
const { Text } = Elements;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ALIGNED = 'aligned';
const ATTRIBUTE_BORDER = 'border';
const ATTRIBUTE_WITH_IMAGE = 'image';
const THEME_DARK = 'dark';

const SMALL = 400;
const MEDIUM = 650;

const ELEMENT_NAME = 'umd-block-container';
export const ELEMENT_BLOCK_CONTAINER = 'block-container';
export const ELEMENT_BLOCK_CONTAINER_WRAPPER = 'block-container-wrapper';

const IS_THEME_DARK = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_ALIGNED = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_ALIGNED}]`;
const IS_WITH_BORDER = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_BORDER}]`;
const IS_WITH_IMAGE = `.${ELEMENT_BLOCK_CONTAINER}[${ATTRIBUTE_WITH_IMAGE}]`;

const OVERWRITE_DARK_THEME_TEXT_CONTAINER = `${IS_THEME_DARK} .${ELEMENT_BLOCK_TEXT_CONTAINER}`;
const OVERWRITE_DARK_THEME_IMAGE_CONTAINER = `${IS_THEME_DARK} .${ELEMENT_BLOCK_IMAGE_CONTAINER}`;
const OVERWRITE_DARK_THEME_RICH_TEXT = `${IS_THEME_DARK} .${ELEMENT_BLOCK_TEXT_RICH_TEXT}`;

const OVERWRITE_TYPE_BORDER_TEXT_CONTAINER = `${IS_WITH_BORDER} .${ELEMENT_BLOCK_TEXT_CONTAINER}`;
const OVERWRITE_TYPE_BORDER_IMAGE_CONTAINER = `${IS_WITH_BORDER} .${ELEMENT_BLOCK_IMAGE_CONTAINER}`;

const OVERWRITE_WITH_IMAGE_TEXT_CONTAINER = `${IS_WITH_IMAGE} .${ELEMENT_BLOCK_TEXT_CONTAINER}`;

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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_DARK_THEME_RICH_TEXT}`]: Text.RichTextDark,
    },
  })}

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

  ${OVERWRITE_TYPE_BORDER_TEXT_CONTAINER} {
    padding: ${Spacing.md};
  }

  @media (max-width: ${MEDIUM - 1}px) {
    ${OVERWRITE_TYPE_BORDER_IMAGE_CONTAINER} {
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
    ${OVERWRITE_WITH_IMAGE_TEXT_CONTAINER} {
      padding-top: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const TextContainerStyles = `
  @media (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_BLOCK_TEXT_HEADLINE} {
      max-width: calc(100% - 110px);
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_HEADLINE}`]: SansLarger,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_HEADLINE} *`]: SansLarger,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_HEADLINE}`]: SansExtraLarge,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_HEADLINE} *`]: SansExtraLarge,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_DATE}`]: SansSmall,
      },
    })}
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_DATE} *`]: SansSmall,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_BLOCK_TEXT_RICH_TEXT} *`]: Typography.SansMedium,
      },
    })}
  }
  
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_BLOCK_TEXT_RICH_TEXT} * {
      line-height: 1.375em;
    }
  }
`;

// prettier-ignore
const ImageContainerStyles = `
  @media (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_BLOCK_IMAGE_CONTAINER} {
      width: 96px;
      float: right;
      margin-bottom: 4px;
      margin-left: ${Spacing.sm};
    }
  }
`;

// prettier-ignore
const STYLES_BLOCK_CONTAINER = `
  .${ELEMENT_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    max-width: 680px;
  }

  .${ELEMENT_BLOCK_CONTAINER_WRAPPER} {
    width: 100%;
  }

  ${TextContainerStyles}
  ${ImageContainerStyles}
  ${VariantWithImageStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
`;

const CreateBlockContainer = ({
  imageContainer,
  textContainer,
  personContainer,
  theme,
  isAligned,
  isBordered,
}: TypeBlockContainerProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  container.classList.add(ELEMENT_BLOCK_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);
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

  if (personContainer) {
    wrapper.appendChild(personContainer);
  }

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateBlockContainer,
  Styles: STYLES_BLOCK_CONTAINER,
};
