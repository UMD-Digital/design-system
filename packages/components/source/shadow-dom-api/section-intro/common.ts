import { Slots } from 'shadow-dom-model';

export const CommonIntroData = ({
  element,
  theme,
}: {
  element: HTMLElement;
  theme?: string | null;
}) => ({
  headline: Slots.SlottedHeadline({ element }),
  actions: Slots.SlottedActions({ element }),
  theme,
});
