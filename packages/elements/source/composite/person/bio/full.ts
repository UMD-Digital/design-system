import { token } from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonBio } from '../_types';

export default (props: PersonBio) => {
  const { isThemeDark, image, actions, description } = props;
  const { name, ...textProps } = props;
  const container = document.createElement('div');
  let styles = '';

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: false,
    });
    container.appendChild(imageContainer.element);
    styles += imageContainer.styles;
  }

  if (name) {
    const styledName = ElementModel.headline.sansExtraLarge({
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
    });
    container.appendChild(styledName.element);
    styles += styledName.styles;
  }

  const textLockupElement = textLockup.person(textProps);
  container.appendChild(textLockupElement.element);
  styles += textLockupElement.styles;

  const contactLockupElement = textLockup.contact(props);
  container.appendChild(contactLockupElement.element);
  styles += contactLockupElement.styles;

  if (description) {
    const styledDescription = ElementModel.richText.simpleLarge({
      element: description,
      isThemeDark,
      elementStyles: {
        element: {
          marginTop: token.spacing.lg,
          maxWidth: token.spacing.maxWidth.smallest,
        },
      },
    });

    container.appendChild(styledDescription.element);
    styles += styledDescription.styles;
  }

  if (actions) {
    const styledActions = ElementModel.layout.gridInlineTabletRows({
      element: actions,
      elementStyles: {
        element: {
          marginTop: token.spacing.sm,
        },
      },
    });
    container.appendChild(styledActions.element);
    styles += styledActions.styles;
  }

  return { element: container, styles };
};
