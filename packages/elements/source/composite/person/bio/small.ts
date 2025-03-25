import { token } from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonBio } from '../_types';

export default (props: PersonBio) => {
  const { isThemeDark, image, actions, description } = props;
  const { name, ...textProps } = props;
  const container = document.createElement('div');
  const textColumn = document.createElement('div');
  const composite = ElementModel.composite.person.bio({
    element: document.createElement('div'),
    isThemeDark,
  });
  const textContainer = ElementModel.text.lineAdjustmentInset({
    element: document.createElement('div'),
  });
  let styles = '';

  const textLockupElement = textLockup.person(textProps);
  const contactLockupElement = textLockup.contact(props);

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: false,
    });
    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  if (name) {
    const styledName = ElementModel.headline.sansExtraLarge({
      element: name,
      isThemeDark,
      elementStyles: {
        element: {
          marginTop: token.spacing.min,
          color: `${token.color.black}`,
          textTransform: 'uppercase',
          fontWeight: '800',
        },
      },
    });
    textContainer.element.appendChild(styledName.element);
    composite.styles += styledName.styles;
  }

  textContainer.element.appendChild(textLockupElement.element);
  textColumn.appendChild(textContainer.element);
  textColumn.appendChild(contactLockupElement.element);
  composite.styles += textContainer.styles;
  composite.styles += textLockupElement.styles;
  composite.styles += contactLockupElement.styles;
  styles += composite.styles;

  if (actions) {
    const styledActions = ElementModel.layout.gridInlineTabletRows({
      element: actions,
      elementStyles: {
        element: {
          marginTop: token.spacing.sm,
        },
      },
    });
    textColumn.appendChild(styledActions.element);
    styles += styledActions.styles;
  }

  composite.element.appendChild(textColumn);
  container.appendChild(composite.element);

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

  return { element: container, styles };
};
