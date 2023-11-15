import { MakeSlot } from 'helpers/ui';
import { SLOTS } from '../globals';
import { CardType } from '../component';

export const BodyStyles = ``;

export const CreateBody = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const contentSlot = MakeSlot({ type: SLOTS.BODY });

  container.appendChild(contentSlot);

  return container;
};
