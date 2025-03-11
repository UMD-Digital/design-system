import * as Feeds from '@universityofmaryland/web-feeds-library';
import { Attributes, Model, Register, Slots } from 'model';

const tagName = 'umd-element-slider-events-feed';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetDateElementsSizes(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const token = element.getAttribute(Attributes.names.FEED_TOKEN);
  const isTypeAcademic =
    element.getAttribute(Attributes.names.TYPE) === 'academic';
  const categories = element.getAttribute('categories');

  if (!token) {
    console.error('Token is required for this component');
    return { element: document.createElement('div'), styles: '' };
  }

  const sliderProps = {
    token,
    categories,
    isThemeDark,
    headline: Slots.headline.default({ element }),
    actions: Slots.actions.default({ element }),
  };

  if (isTypeAcademic) return Feeds.academic.slider(sliderProps);

  return Feeds.events.slider(sliderProps);
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      attributes,
      afterConnect: (ref, shadow) => ref?.events?.callback(shadow),
    }),
  });
};
