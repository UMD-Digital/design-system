import { MediaInline, MediaWithCaption, MediaWrapped } from 'elements';
import { Attributes, Model, Slots, Register } from 'shadow-dom-model';
import { MarkupValidate } from 'utilities';

const tagName = 'umd-element-media-inline';

const Load = () => {
  const createComponent = (element: HTMLElement) => {
    const caption = Slots.defined.caption({ element });
    const wrappingText =
      Slots.defined.text({ element, isDefaultStyling: false }) ||
      Slots.defined.wrappingText({ element, isDefaultStyling: false });
    const isAlignmentRight = Attributes.isLayout.alignmentRight({ element });
    const hasWrappingText = wrappingText !== null;
    const hasCaption = caption !== null;

    const content = {
      isAlignmentRight,
      caption,
      image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
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
      createComponent,
      onReady: (element: Model.ElementRef) => element?.events?.load(),
    }),
  });
};

export default {
  Load,
};
