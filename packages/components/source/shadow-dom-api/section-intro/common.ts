import { Slots } from 'shadow-dom-model';

export const CommonIntroData = ({
  element,
  isThemeDark,
}: {
  element: HTMLElement;
  isThemeDark?: boolean;
}) => ({
  headline: Slots.defined.headline({ element }),
  actions: Slots.defined.actions({ element }),
  isThemeDark,
});
