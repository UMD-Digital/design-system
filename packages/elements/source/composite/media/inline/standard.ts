import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { Image as LayoutImage } from 'layout';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
};

const CreateMediaInline = (props: TypeMediaInlineRequirements) =>
  (() => {
    const { image } = props;

    const createImageChild = () => {
      if (!image) {
        console.warn('CreateMediaInline: No image provided');
        return null;
      }
      return LayoutImage.CreateElement({ image, showCaption: true });
    };

    const model = new ElementBuilder()
      .withClassName('element-media-inline-container')
      .withStyles({
        element: {
          display: 'block',
          maxWidth: '100%',
        },
      })
      .withChild(createImageChild())
      .build();

    model.styles += LayoutImage.Styles;

    return model;
  })();

export const createCompositeMediaInlineStandard = CreateMediaInline;
