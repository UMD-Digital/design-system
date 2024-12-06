import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Slots, Register } from 'shadow-dom-model';
import { MarkupValidate } from 'utilities';

const { MediaInline, MediaWithCaption, MediaWrapped } = Components;

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

const Load = () => {
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
      image: MarkupValidate.ImageSlot({
        element,
        ImageSlot: Slots.name.assets.image,
      }),
      wrappingText,
    };

    if (hasWrappingText) {
      return MediaWrapped(content);
    }

    if (hasCaption) {
      return MediaWithCaption(content);
    }

    return MediaInline(content);
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

export default {
  Load,
};
