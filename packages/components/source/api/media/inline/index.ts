import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Slots, Register } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-media-inline';

const slots = {
  caption: {
    allowedElements: ['div', 'p'],
  },
  text: {
    allowedElements: ['div', 'p'],
  },
  wrappingText: {
    allowedElements: ['div', 'p'],
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
  },
};

export default () => {
  const createComponent = (element: HTMLElement) => {
    const caption = Slots.text.caption({ element });
    const wrappingText =
      Slots.text.default({ element, isDefaultStyling: false }) ||
      Slots.deprecated.wrappingText({ element, isDefaultStyling: false });
    const isAlignmentRight = Attributes.isLayout.alignmentRight({ element });
    const isThemeDark = Attributes.isTheme.dark({ element });
    const hasWrappingText = wrappingText !== null;
    const hasCaption = caption !== null;

    const content = {
      isAlignmentRight,
      isThemeDark,
      caption,
      image: Markup.validate.ImageSlot({
        element,
        ImageSlot: Slots.name.assets.image,
      }),
      wrappingText,
    };

    if (hasWrappingText) {
      return Composite.media.inline.wrapped(content);
    }

    if (hasCaption) {
      return Composite.media.inline.caption(content);
    }

    return Composite.media.inline.standard(content);
  };

  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      onReady: (element: Model.ElementRef) => element?.events?.load(),
    }),
  });
};
