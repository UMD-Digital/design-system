import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { MakeSlot } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

const CARD_BODY_CONTAINER = 'umd-card-body-container';

export const BodyStyles = `
  * + .${CARD_BODY_CONTAINER} {
    margin-top: ${spacing.min};
  }
`;

export const CreateBody = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const contentSlot = MakeSlot({ type: SLOTS.BODY });

  container.classList.add(CARD_BODY_CONTAINER);
  container.appendChild(contentSlot);

  return container;
};
