import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';
import { CommonPersonData } from './common';

const tagName = 'umd-element-person-bio';

const { SlotWithDefaultStyling } = Markup.create;

const createComponent = (element: HTMLElement) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isFullImage = Attributes.isLayout.fullImage({ element });

  if (isFullImage) {
    return Composite.person.bio.full({
      ...CommonPersonData({ element, isThemeDark }),
      description: SlotWithDefaultStyling({
        element,
        slotRef: Slots.name.DESCRIPTION,
      }),
    });
  }

  return Composite.person.bio.small({
    ...CommonPersonData({ element, isThemeDark }),
    description: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.DESCRIPTION,
    }),
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};
