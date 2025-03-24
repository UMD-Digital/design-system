import { token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonCard } from './_types';

export default (props: PersonCard) => {
  const { image: personImage, actions } = props;
  const composite = ElementModel.composite.card.block({
    ...props,
    element: document.createElement('div'),
    isPerson: true,
  });
  const textLockupElement = textLockup.person(props);
  const contactLockupElement = textLockup.contact(props);

  let image = personImage;

  if (!image) {
    image = Utility.markup.create.imageFromSvg({
      SVG: Utility.asset.icon.PERSON,
    });
  }

  const imageContainer = assets.image.background({
    image,
    isScaled: false,
  });
  composite.element.appendChild(imageContainer.element);
  composite.styles += imageContainer.styles;

  textLockupElement.element.appendChild(contactLockupElement.element);
  textLockupElement.styles += contactLockupElement.styles;

  if (actions) {
    const styledActions = ElementModel.layout.gridInlineTabletRows({
      element: actions,
      elementStyles: {
        element: {
          marginTop: token.spacing.sm,
        },
      },
    });
    textLockupElement.element.appendChild(styledActions.element);
    textLockupElement.styles += styledActions.styles;
  }

  composite.element.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  return composite;
};
