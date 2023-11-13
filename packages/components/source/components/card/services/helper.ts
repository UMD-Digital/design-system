import { CardType } from '../component';
import { SLOTS } from '../globals';

export const CheckForImageSlot = ({ element }: { element: CardType }) => {
  const imageSlot = element.querySelector(`[slot="${SLOTS.IMAGE}"]`);

  if (imageSlot) {
    const altText = imageSlot.getAttribute('alt');
    if (!altText) {
      console.error('Image elements require alt text');
      return false;
    }
  }

  return true;
};
