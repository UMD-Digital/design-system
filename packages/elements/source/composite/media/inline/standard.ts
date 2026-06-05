import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createLayoutImageContainer } from 'layout';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
};

const CreateMediaInline = (props: TypeMediaInlineRequirements) =>
  (() => {
    const { image } = props;

    const createImage = () => {
      if (!image) {
        console.warn('CreateMediaInline: No image provided');
        return null;
      }
      return createLayoutImageContainer({ image, showCaption: true });
    };

    const imageElement = createImage();

    const model = new ElementBuilder()
      .withClassName('element-media-inline-container')
      .withStyles({
        element: {
          display: 'block',
          maxWidth: '100%',
        },
      })
      .withChild(imageElement)
      .build();


    return model;
  })();

export const createCompositeMediaInlineStandard = CreateMediaInline;
