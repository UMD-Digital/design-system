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
  const { isQuote, ctaIcon, dateSign, backgroundImage, text } = props;

  const composite = ElementModel.composite.card.overlay.image({
    ...props,
    element: document.createElement('div'),
    elementStyles,
    isThemeDark: true,
  });
  const wrapper = ElementModel.create({
    element: document.createElement('div'),
    className: 'card-overlay-image-wrapper',
    elementStyles: {
      element: {
        paddingRight: `${ctaIcon ? Styles.token.spacing['2xl'] : 0}`,
      },
    },
  });
  let imageContainerClass: string | null = null;

  if (ctaIcon && ctaIcon instanceof HTMLElement) {
    const actionIcon = actions.icon({ ...props, ctaIcon, isThemeLight: false });

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

  if (dateSign) {
    const dataWrapper = ElementModel.layout.backgroundBoxWhite({
      element: document.createElement('div'),
      elementStyles: {
        element: {
          alignSelf: `flex-start`,
        },
        siblingAfter: {
          marginTop: `${Styles.token.spacing.min}`,
        },
      },
    });
    dataWrapper.element.appendChild(dateSign.element);

    textLockupElement.element.insertBefore(
      dataWrapper.element,
      textLockupElement.element.firstChild,
    );
    composite.styles += dataWrapper.styles;
    composite.styles += dateSign.styles;
  }

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

  wrapper.element.appendChild(textLockupElement.element);
  wrapper.styles += textLockupElement.styles;

  composite.element.appendChild(wrapper.element);
  composite.styles += wrapper.styles;

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
