import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

const tagName = 'umd-element-slider-events';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetDateElementsSizes(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const dataSlider = document.createElement('div');
  const dataSliderSlot = element.querySelector(
    `[slot=${Slots.name.EVENT_LIST}]`,
  );

  if (!dataSliderSlot) {
    console.error(`Slot ${Slots.name.EVENT_LIST} is required`);
    return { element: dataSlider, styles: '' };
  }

  dataSlider.innerHTML = dataSliderSlot.innerHTML;

  return Composite.slider.events({
    isThemeDark: Attributes.isTheme.dark({ element }),
    dataSlider,
    headline: Slots.headline.default({ element }),
    actions: Slots.actions.default({ element }),
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      attributes,
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};
