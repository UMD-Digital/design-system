import * as token from '@universityofmaryland/web-styles-library/token';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { person as iconPerson } from '@universityofmaryland/web-icons-library/people';
import { ElementVisual } from '../../_types';
import { assets, textLockup } from 'atomic';
import { PersonCard } from './_types';

const mediumBreakpointStart = token.media.breakpointValues.medium.min;

export default (props: PersonCard) => {
  const { image: personImage, isThemeDark } = props;
  const textLockupElement = textLockup.person(props);
  const contactLockupElement = textLockup.contact(props);
  let children: ElementVisual[] = [];

  let image = personImage;

  if (!image) {
    image = imageFromSvg({
      SVG: iconPerson,
    });
  }

  children.push(
    ElementBuilder.create.div({
      className: 'person-block-image',
      elementStyles: {
        element: {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: `${token.color.gray.lighter}`,
          marginBottom: `${token.spacing.md}`,

          ...(isThemeDark && {
            backgroundColor: `${token.color.gray.darker}`,
          }),

          ['& img, & svg']: {
            display: 'block',
            width: '100%',
            objectFit: 'contain',
            height: '140px !important',

            ...createMediaQuery('min-width', mediumBreakpointStart, {
              height: '200px !important',
            }),
          },
        },
      },
      children: [
        assets.image.background({
          element: image,
          isScaled: false,
          customStyles: {
            height: 'auto',
          },
        }),
      ],
    }),
  );

  children.push(textLockupElement);
  children.push(contactLockupElement);

  return ElementBuilder.create.div({
    className: 'person-block',
    children,
  });
};
