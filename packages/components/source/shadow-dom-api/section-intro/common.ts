import { Slots } from 'shadow-dom-model';

export const CommonIntroData = ({
  element,
  isThemeDark,
}: {
  element: HTMLElement;
  isThemeDark?: boolean;
}) => ({
  headline: Slots.headline.default({ element }),
  actions: Slots.actions.default({ element }),
  isThemeDark,
});
