import { WebComponents } from 'utilities';

const { Slots } = WebComponents;

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
