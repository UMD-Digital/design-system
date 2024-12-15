import { Slots } from 'model';

export const CommonPathwayData = ({ element }: { element: HTMLElement }) => ({
  action: Slots.actions.default({ element }),
  eyebrow: Slots.eyebrow.default({ element }),
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
});
