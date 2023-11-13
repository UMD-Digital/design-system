import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { CreateContent, ContentStyles } from './content';
import { CreateCta, CtaStyles } from './cta';
import { CardType } from '../component';
import { ELEMENTS } from '../globals';

const CARD_CONTAINER = 'umd-card-overlay-container';

const VariantThemeStyles = `
  .${CARD_CONTAINER}[theme="dark"] {
    background-color: ${colors.gray.darker};
  }

  .${CARD_CONTAINER}[theme="dark"] .${ELEMENTS.CONTENT_CONTAINER} {

  }
`;

export const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-card / inline-size; 
  }

  .${CARD_CONTAINER} {
    max-width: 560px;
    min-height: 300px;
    position: relative;
    background-color: ${colors.gray.light};
    padding: ${spacing['4xl']} ${spacing.md};
  }

  ${ContentStyles}
  ${CtaStyles}
  ${VariantThemeStyles}
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const content = CreateContent({ element });
  const cta = CreateCta({ element });

  container.setAttribute('theme', element._theme);
  container.classList.add(CARD_CONTAINER);

  container.appendChild(content);
  container.appendChild(cta);

  return container;
};
