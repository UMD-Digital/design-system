import {
  colors,
  richText,
  spacing,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CreateImage, ImageStyles } from './image';
import { CreateIntro, IntroStyles } from './intro';
import { CreateBody, BodyStyles } from './body';
import { CardType } from '../component';
import { ELEMENTS } from '../globals';

const CARD_CONTAINER = 'umd-card-container';
const CARD_TEXT_CONTAINER = 'umd-card-text-container';

const VariantThemeStyles = `
  .${CARD_CONTAINER}[theme="dark"] {
    background-color: ${colors.gray.darker};
    color: ${colors.white};
    height: 100%;
  }

  .${CARD_CONTAINER}[theme="dark"] * {
    color: ${colors.white};
  }

  .${CARD_CONTAINER}[theme="dark"] .${CARD_TEXT_CONTAINER} {
    padding: ${spacing.md};
    padding-top: 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_CONTAINER}[theme="dark"] .${ELEMENTS.CARD_BODY_TEXT_WRAPPER}`]:
        richText['.umd-rich-text-dark'],
    },
  })}
`;

const VariantAlignedStyles = `
  .${CARD_CONTAINER}[aligned="true"] img {
    aspect-ratio: 4/3;
    object-fit: cover;
    object-position: center;
  }
`;

const VariantBorderStyles = `
  .${CARD_CONTAINER}[border="true"] {
    border: 1px solid ${colors.gray.light};
    height: 100%;
  }

  .${CARD_CONTAINER}[border="true"] .${CARD_TEXT_CONTAINER} {
    padding: ${spacing.md};
    padding-top: 0;
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
    container: umd-card / inline-size;
  }
  
  ${Reset}

  :host a[slot="image"] {
    display: block;
    line-height: 0;
    overflow: hidden;
  }

  :host a[slot="image"] img {
    object-fit: cover;
    object-position: 50% 50%;
    transform: scale(1);
    transition: transform 0.5s;
    width: 100%;
  }

  :host a[slot="image"]:hover img,
  :host a[slot="image"]:focus img {
    transform: scale(1.025);
  }

  .${CARD_CONTAINER} {
    max-width: 680px;
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

  container.setAttribute('theme', element._theme);
  container.setAttribute('aligned', element._aligned);
  container.setAttribute('border', element._border);

  textContainer.classList.add(CARD_TEXT_CONTAINER);
  textContainer.appendChild(intro);
  textContainer.appendChild(body);

  container.classList.add(CARD_CONTAINER);
  container.appendChild(image);
  container.appendChild(textContainer);

  return container;
};
