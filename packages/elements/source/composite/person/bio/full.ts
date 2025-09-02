import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type PersonBio } from '../_types';
import { type ElementVisual } from '../../../_types';

export default (props: PersonBio) => {
  const { isThemeDark, image, actions, description } = props;
  const { name, ...textProps } = props;
  let children: ElementVisual[] = [];

  if (image) {
    children.push(
      assets.image.background({
        element: image,
        isScaled: false,
      }),
    );
  }

  if (name) {
    children.push(
      ElementModel.headline.sansExtraLarge({
        element: name,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.lg,
            color: `${Styles.token.color.black}`,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',
          },
          siblingAfter: {
            marginTop: Styles.token.spacing.min,
          },
        },
      }),
    );
  }

  children.push(textLockup.person(textProps));
  children.push(textLockup.contact(props));

  if (description) {
    children.push(
      ElementModel.richText.simpleLarge({
        element: description,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.lg,
            maxWidth: Styles.token.spacing.maxWidth.smallest,
          },
        },
      }),
    );
  }

  if (actions) {
    children.push(
      ElementModel.layout.gridInlineTabletRows({
        element: actions,
        elementStyles: {
          element: {
            marginTop: Styles.token.spacing.sm,
          },
        },
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'person-bio-full-container',
    children,
    elementStyles: {
      element: {
        [`& .${Styles.element.asset.image.wrapper.className}`]: {
          [`@container (max-width: ${Styles.token.media.breakpointValues.medium.max}px)`]:
            {
              display: 'flex',
            },
        },
      },
    },
  });
};
