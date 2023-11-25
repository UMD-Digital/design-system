import { MakeSlot } from 'helpers/ui';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

export const ContentStyles = `
  .${ELEMENTS.CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }
`;

export const CreateContent = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const contentSlot = MakeSlot({ type: SLOTS.CONTENT });

  container.classList.add(ELEMENTS.CONTENT_CONTAINER);

  container.appendChild(contentSlot);

  return container;
};
