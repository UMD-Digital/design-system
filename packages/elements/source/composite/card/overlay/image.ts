import * as Styles from '@universityofmaryland/web-styles-library';
import { actions, assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import * as Utilities from 'utilities';
import { CardOverlayProps } from '../_types';

const elementStyles: Record<string, any> = {
  element: {
    className: 'card-block-overall-container',
    containerType: 'inline-size',
    height: '100%',
  },
};

export default (props: CardOverlayProps) => {
  const { isQuote, ctaIcon, backgroundImage, text } = props;

  if (ctaIcon) {
    elementStyles.element.paddingRight = `${Styles.token.spacing['2xl']}`;
  }

  const composite = ElementModel.composite.card.overlay.image({
    ...props,
    element: document.createElement('div'),
    elementStyles,
    isThemeDark: true,
  });
  let imageContainerClass = null;

  if (ctaIcon && ctaIcon instanceof HTMLElement) {
    const actionIcon = actions.icon({ ...props, ctaIcon, isThemeDark: true });

    composite.element.appendChild(actionIcon.element);
    composite.styles += actionIcon.styles;
  }

  if (backgroundImage) {
    const imageContainer = assets.image.background({
      image: backgroundImage,
      isScaled: true,
    });

    composite.element.appendChild(imageContainer.element);
    composite.styles += imageContainer.styles;
    imageContainerClass = imageContainer.element.className;
  }

  const textLockupElement = textLockup.smallScaling({
    ...props,
    isThemeDark: true,
  });

  if (isQuote) {
    const quoteWrapper = ElementModel.composite.card.overlay.elementQuote({
      element: document.createElement('div'),
    });

    quoteWrapper.element.innerHTML = Utilities.asset.icon.QUOTE;
    textLockupElement.element.insertBefore(
      quoteWrapper.element,
      textLockupElement.element.firstChild,
    );
    composite.styles += quoteWrapper.styles;
  }

  composite.element.appendChild(textLockupElement.element);
  composite.styles += textLockupElement.styles;

  const load = () => {
    const sizeElements = () => {
      const textCopy = text?.innerHTML;
      if (text && textCopy) {
        const modifiedText = Utilities.markup.modify.truncateTextBasedOnSize({
          text: textCopy,
          size: composite.element.offsetWidth,
        });

        text.innerHTML = modifiedText;

        if (modifiedText.length >= 220) {
          const assetContainer = composite.element.querySelector(
            `.${imageContainerClass}`,
          );
          if (assetContainer) {
            assetContainer.setAttribute('data-size', 'large');
          }
        }
      }
    };

    sizeElements();
  };

  return {
    ...composite,
    events: {
      load,
    },
  };
};
