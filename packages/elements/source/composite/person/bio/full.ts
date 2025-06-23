import * as Styles from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonBio } from '../_types';

export default (props: PersonBio) => {
  const { isThemeDark, image, actions, description } = props;
  const { name, ...textProps } = props;
  const container = ElementModel.create({
    element: document.createElement('div'),
    className: 'umd-element-composite-person-bio-full',
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

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: false,
    });
    container.element.appendChild(imageContainer.element);
    container.styles += imageContainer.styles;
  }

  if (name) {
    const styledName = ElementModel.headline.sansExtraLarge({
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
    });
    container.element.appendChild(styledName.element);
    container.styles += styledName.styles;
  }

  const textLockupElement = textLockup.person(textProps);
  container.element.appendChild(textLockupElement.element);
  container.styles += textLockupElement.styles;

  const contactLockupElement = textLockup.contact(props);
  container.element.appendChild(contactLockupElement.element);
  container.styles += contactLockupElement.styles;

  if (description) {
    const styledDescription = ElementModel.richText.simpleLarge({
      element: description,
      isThemeDark,
      elementStyles: {
        element: {
          marginTop: Styles.token.spacing.lg,
          maxWidth: Styles.token.spacing.maxWidth.smallest,
        },
      },
    });

    container.element.appendChild(styledDescription.element);
    container.styles += styledDescription.styles;
  }

  if (actions) {
    const styledActions = ElementModel.layout.gridInlineTabletRows({
      element: actions,
      elementStyles: {
        element: {
          marginTop: Styles.token.spacing.sm,
        },
      },
    });
    container.element.appendChild(styledActions.element);
    container.styles += styledActions.styles;
  }

  return container;
};
