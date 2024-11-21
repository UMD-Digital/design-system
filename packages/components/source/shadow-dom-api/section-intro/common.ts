import { Slots } from 'shadow-dom-model';

export const CommonIntroData = ({
  element,
  isThemeDark,
}: {
  element: HTMLElement;
  isThemeDark?: boolean;
}) => ({
  headline: Slots.SlottedHeadline({ element }),
  actions: Slots.SlottedActions({ element }),
  isThemeDark,
});
