import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createCaption } from '../atomic/assets/image/caption';

export const createLayoutImageContainer = ({
  image,
  showCaption = false,
  isToggleCaption = false,
}: {
  image: HTMLImageElement;
  showCaption?: boolean;
  isToggleCaption?: boolean;
}) => {
  const caption = showCaption ? createCaption.create(isToggleCaption, image) : null;
  const children = [image, caption].filter((child) => child != null);

  return new ElementBuilder()
    .withClassName('image-container')
    .withStyles({
      element: {
        position: 'relative',
        display: 'inline-block',
        '& > img': { display: 'block', width: '100%', height: '100%' },
        '& > a': {
          display: 'block',
          lineHeight: 0,
          overflow: 'hidden',
          '& img': {
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1)',
            transition: 'transform 0.5s',
            width: '100%',
          },
          '&:hover img, &:focus img': { transform: 'scale(1.025)' },
        },
      },
    })
    .withChildren(...children)
    .build();
};
