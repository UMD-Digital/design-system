import * as Styles from '@universityofmaryland/web-styles-library';
import { asset, markup, theme } from 'utilities';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonCard } from './_types';
import { ElementVisual } from '../../_types';

const mediumBreakpointStart = Styles.token.media.breakpointValues.medium.min;

export default (props: PersonCard) => {
  const { image: personImage, isThemeDark } = props;
  const textLockupElement = textLockup.person(props);
  const contactLockupElement = textLockup.contact(props);
  let children: ElementVisual[] = [];

  let image = personImage;

  if (!image) {
    image = markup.create.imageFromSvg({
      SVG: asset.icon.PERSON,
    });
  }

  children.push(
    ElementModel.createDiv({
      className: 'person-block-image',
      elementStyles: {
        element: {
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: `${Styles.token.color.gray.lighter}`,
          marginBottom: `${Styles.token.spacing.md}`,

          ...(isThemeDark && {
            backgroundColor: `${Styles.token.color.gray.darker}`,
          }),

          ['& img, & svg']: {
            display: 'block',
            width: '100%',
            objectFit: 'contain',
            height: '140px !important',

            ...theme.media.createContainerQuery(
              'min-width',
              mediumBreakpointStart,
              {
                height: '200px !important',
              },
            ),
          },
        },
      },
      children: [
        assets.image.background({
          image,
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

  return ElementModel.createDiv({
    className: 'person-block',
    children,
  });
};
