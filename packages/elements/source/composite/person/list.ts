import { token } from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonCard } from './_types';

const actionStyles = {
  element: {
    marginTop: token.spacing.sm,
  },
};

export default (props: PersonCard) => {
  const { image, actions } = props;
  const composite = ElementModel.composite.card.list({
    ...props,
    element: document.createElement('div'),
    isDisplayPerson: true,
  });

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: false,
    });

    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  const textLockupElement = textLockup.person(props);
  const contactLockupElement = textLockup.contact(props);

  textLockupElement.element.appendChild(contactLockupElement.element);
  textLockupElement.styles += contactLockupElement.styles;

  if (actions) {
    const styledActions = ElementModel.layout.gridInlineTabletRows({
      element: actions,
      elementStyles: actionStyles,
    });
    textLockupElement.element.appendChild(styledActions.element);
    textLockupElement.styles += styledActions.styles;
  }

  composite.element.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  return composite;
};
