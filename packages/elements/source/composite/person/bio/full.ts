import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../../_types';
import { assets, textLockup } from 'atomic';
import { type PersonBio } from '../_types';

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
      ElementBuilder.styled.headline.sansExtraLarge({
        element: name,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: token.spacing.lg,
            color: `${token.color.black}`,
            textTransform: 'uppercase',
            fontWeight: '800',
            display: 'block',
          },
          siblingAfter: {
            marginTop: token.spacing.min,
          },
        },
      }),
    );
  }

  children.push(textLockup.person(textProps));
  children.push(textLockup.contact(props));

  if (description) {
    children.push(
      ElementBuilder.styled.richText.simpleLarge({
        element: description,
        isThemeDark,
        elementStyles: {
          element: {
            marginTop: token.spacing.lg,
            maxWidth: token.spacing.maxWidth.smallest,
          },
        },
      }),
    );
  }

  if (actions) {
    children.push(
      ElementBuilder.styled.layout.gridInlineTabletRows({
        element: actions,
        elementStyles: {
          element: {
            marginTop: token.spacing.sm,
          },
        },
      }),
    );
  }

  return ElementBuilder.create.div({
    className: 'person-bio-full-container',
    children,
    elementStyles: {
      element: {
        [`& .${elementStyles.asset.image.wrapper.className}`]: {
          [`@container (max-width: ${token.media.breakpointValues.medium.max}px)`]:
            {
              display: 'flex',
            },
        },
      },
    },
  });
};
