import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { CreateImage, ImageStyles } from './image';
import { CreateHeadline, HeadlineStyles } from './headline';
import { CreateBody, BodyStyles } from './body';
import { CardType } from '../component';

const CARD_CONTAINER = 'umd-card-container';
const CARD_TEXT_CONTAINER = 'umd-card-text-container';

const VariantThemeStyles = `
  .${CARD_CONTAINER}[theme="dark"] {
    background-color: ${colors.gray.darker};
  }

  .${CARD_CONTAINER}[theme="dark"] .${CARD_TEXT_CONTAINER} {
    padding: ${spacing.md};
  }
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
    border: 1px solid ${colors.gray.light}
  }

  .${CARD_CONTAINER}[border="true"] .${CARD_TEXT_CONTAINER} {
    padding: ${spacing.md};
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
    container: umd-card / inline-size;
  }

  :host * {
    box-sizing: border-box;
  }

  :host img {
    max-width: 100%;
  }

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
    max-width: 560px;
  }

  .${CARD_TEXT_CONTAINER} {
    padding-top: ${spacing.md};
  }

  ${ImageStyles}
  ${HeadlineStyles}
  ${BodyStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const image = CreateImage({ element });
  const headline = CreateHeadline({ element });
  const body = CreateBody({ element });

  container.setAttribute('theme', element._theme);
  container.setAttribute('aligned', element._aligned);
  container.setAttribute('border', element._border);

  textContainer.classList.add(CARD_TEXT_CONTAINER);
  textContainer.appendChild(headline);
  textContainer.appendChild(body);

  container.classList.add(CARD_CONTAINER);
  container.appendChild(image);
  container.appendChild(textContainer);

  return container;
};
