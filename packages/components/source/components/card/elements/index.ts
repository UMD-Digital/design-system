import {
  colors,
  richText,
  spacing,
} from '@universityofmaryland/umd-web-configuration';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  VARIABLES,
} from 'components/card/globals';
import { CardType } from 'components/card/component';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CreateImage, ImageStyles } from './image';
import { CreateIntro, IntroStyles } from './intro';
import { CreateBody, BodyStyles } from './body';

const CARD_CONTAINER = 'umd-card-container';
const CARD_TEXT_CONTAINER = 'umd-card-text-container';

// prettier-ignore
const VariantThemeStyles = `
  .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] {
    background-color: ${colors.gray.darker};
    color: ${colors.white};
    height: 100%;
  }

  .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] * {
    color: ${colors.white};
  }

  .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${CARD_TEXT_CONTAINER} {
    padding: ${spacing.md};
  }

  @media (min-width: ${BREAKPOINTS.TABLET}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${CARD_TEXT_CONTAINER} {
      padding-top: 0;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.CARD_BODY_TEXT_WRAPPER}`]:
        richText['.umd-rich-text-dark'],
    },
  })}

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.IMAGE_CONTAINER} {
     margin-top: ${spacing.md};
     margin-right: ${spacing.md};
    }
  }
`;

// prettier-ignore
const VariantAlignedStyles = `
  .${CARD_CONTAINER}[${VARIABLES.ATTR_ALIGNED}] img {
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: center;
  }
`;

// prettier-ignore
const VariantBorderStyles = `
  .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] {
    border: 1px solid ${colors.gray.light};
    height: 100%;
  }

  .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] .${CARD_TEXT_CONTAINER} {
    padding: ${spacing.md};
  }

  @media (min-width: ${BREAKPOINTS.TABLET}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] .${CARD_TEXT_CONTAINER} {
      padding-top: 0;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_BORDER}] .${ELEMENTS.IMAGE_CONTAINER} {
     margin-top: ${spacing.md};
     margin-right: ${spacing.md};
    }
  }
`;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
    container: umd-card / inline-size;
  }
  
  ${Reset}

  .${CARD_CONTAINER} {
    max-width: 680px;
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_IMAGE}] {
      display: flex;
    }
  }

  @media (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${CARD_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${CARD_TEXT_CONTAINER} {
      width: 70%;
      padding-right: ${spacing.md};
      order: 1;
    }
  }

  ${ImageStyles}
  ${IntroStyles}
  ${BodyStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const image = CreateImage({ element });
  const intro = CreateIntro({ element });
  const body = CreateBody({ element });

  container.setAttribute(VARIABLES.ATTR_THEME, element._theme);
  if (element._aligned) {
    container.setAttribute(VARIABLES.ATTR_ALIGNED, '');
  }
  if (element._border) {
    container.setAttribute(VARIABLES.ATTR_BORDER, '');
  }

  textContainer.classList.add(CARD_TEXT_CONTAINER);
  textContainer.appendChild(intro);
  textContainer.appendChild(body);

  container.classList.add(CARD_CONTAINER);

  if (image) {
    container.appendChild(image);
    container.setAttribute(VARIABLES.ATTR_IMAGE, '');
  }

  container.appendChild(textContainer);

  return container;
};
