import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { person as iconPerson } from '@universityofmaryland/web-icons-library/people';
import { assets, textLockup } from 'atomic';
import { PersonCard } from './_types';
import { type ElementModel } from '../../_types';

const mediumBreakpointStart = token.media.breakpointValues.medium.min;

const CreatePersonBlockElement = (props: PersonCard): ElementModel<HTMLElement> => {
  const { image: personImage, isThemeDark } = props;
  const textLockupElement = textLockup.person(props);
  const contactLockupElement = textLockup.contact(props);

  let image = personImage;

  if (!image) {
    image = imageFromSvg({
      SVG: iconPerson,
    });
  }

  const imageContainer = new ElementBuilder()
    .withClassName('person-block-image')
    .withChild(
      assets.image.background({
        element: image,
        isScaled: false,
        customStyles: {
          height: 'auto',
        },
      }),
    )
    .withStyles({
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
          transform: `none !important`,

          ...createMediaQuery('min-width', mediumBreakpointStart, {
            height: '200px !important',
          }),
        },
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName('person-block')
    .withChildren(imageContainer, textLockupElement, contactLockupElement)
    .build();
};

export const createCompositePersonBlock = CreatePersonBlockElement;
