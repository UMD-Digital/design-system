import { Slots } from '@universityofmaryland/web-model-library';

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
