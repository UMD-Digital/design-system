import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { CardType } from '../component';
import { ELEMENTS } from '../globals';

const CARD_CONTAINER = 'umd-card-overlay-container';

export const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-card / inline-size; 
  }

  .${CARD_CONTAINER} {
    max-width: 560px;
  }
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');

  container.classList.add(CARD_CONTAINER);

  return container;
};
