import { token } from '@universityofmaryland/web-styles-library';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { PersonCard } from './_types';

const actionStyles = {
  element: {
    marginTop: token.spacing.sm,
  },
};

const headlineStyles = {
  element: {
    fontWeight: '700',
    color: `${token.color.black}`,

    [`& + *`]: {
      marginTop: token.spacing.min,
    },
  },
  subElement: {
    color: 'currentColor',
  },
};

export default (props: PersonCard) => {
  const { image, actions, isThemeDark } = props;
  const composite = ElementModel.composite.card.list({
    ...props,
    element: document.createElement('div'),
    isDisplayTabular: true,
  });
  const { name, ...otherProps } = props;
  const textLockupElement = textLockup.person(otherProps);
  const contactLockupElement = textLockup.contact(props);

  // First Column

  if (image) {
    const imageContainer = assets.image.background({
      image,
      isScaled: false,
    });

    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
  }

  // Second Column

  if (name) {
    const styledName = ElementModel.headline.sansLarge({
      element: name,
      elementStyles: headlineStyles,
      isThemeDark,
    });
    textLockupElement.element.insertBefore(
      styledName.element,
      textLockupElement.element.firstChild,
    );
    textLockupElement.styles += styledName.styles;
  }

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

  // Third Column

  composite.element.appendChild(contactLockupElement.element);
  composite.styles += contactLockupElement.styles;

  return composite;
};
