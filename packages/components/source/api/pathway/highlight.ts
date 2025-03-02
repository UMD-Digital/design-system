import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';
import { CommonPathwayData } from './common';

const { SlotWithDefaultStyling } = Markup.create;

const tagName = 'umd-element-pathway-highlight';

const createComponent = (element: HTMLElement) =>
  Composite.pathway.highlight.CreateElement({
    ...CommonPathwayData({
      element,
    }),
    quote: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.HIGHLIGHT,
    }),
    attribution: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.HIGHLIGHT_ATTRIBUTION,
    }),
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};
