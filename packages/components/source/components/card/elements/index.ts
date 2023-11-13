import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { CreateImage, ImageStyles } from './image';
import { CreateContent, ContentStyles } from './content';
import { CardType } from '../component';
import { ELEMENTS } from '../globals';

const CARD_CONTAINER = 'umd-card-container';

const VariantThemeStyles = `
  .${CARD_CONTAINER}[theme="dark"] {
    background-color: ${colors.gray.darker};
  }

  .${CARD_CONTAINER}[theme="dark"] .${ELEMENTS.CONTENT_CONTAINER} {
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

  .${CARD_CONTAINER}[border="true"] .${ELEMENTS.CONTENT_CONTAINER} {
    padding: ${spacing.md};
  }
`;

export const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-card / inline-size; 
  }

  .${CARD_CONTAINER} {
    max-width: 560px;
  }

  ${ImageStyles}
  ${ContentStyles}
  ${VariantThemeStyles}
  ${VariantAlignedStyles}
  ${VariantBorderStyles}
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const image = CreateImage({ element });
  const content = CreateContent({ element });

  container.classList.add(CARD_CONTAINER);

  container.setAttribute('theme', element._theme);
  container.setAttribute('aligned', element._aligned);
  container.setAttribute('border', element._border);

  container.appendChild(image);
  container.appendChild(content);

  return container;
};
