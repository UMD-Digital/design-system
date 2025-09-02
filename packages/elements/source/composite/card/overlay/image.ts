import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { actions, assets, textLockup } from 'atomic';
import { asset, markup, theme } from 'utilities';
import { CardOverlayProps } from '../_types';
import { ElementVisual } from '../../../_types';

export const classRef = 'card-overlay-image';

export default (props: CardOverlayProps) => {
  const { isQuote, ctaIcon, dateSign, backgroundImage, text } = props;
  const children: ElementVisual[] = [];
  const wrapperChildren: ElementVisual[] = [];
  const load = () => {
    const sizeElements = () => {
      const textCopy = text?.innerHTML;
      if (text && textCopy) {
        const modifiedText = markup.modify.truncateTextBasedOnSize({
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
  let imageContainerClass: string | null = null;

  if (ctaIcon && ctaIcon instanceof HTMLElement) {
    children.push(actions.icon({ ...props, ctaIcon, isThemeLight: false }));
  }

  if (backgroundImage) {
    const imageContainer = assets.image.background({
      element: backgroundImage,
      isScaled: true,
      isGifAllowed: true,
      customStyles: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

        [`&:before`]: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: 1,
          transition: `opacity 0.5s ease-in-out`,
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 60%, rgba(0, 0, 0, 0.9) 100%)',
        },

        [`&[data-size="large"]:before`]: {
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .55) 30%, rgba(0, 0, 0, 0.9) 100%)',
        },

        [`img`]: {
          transform: 'scale(1.025)',
        },
      },
    });
    children.push(imageContainer);
    imageContainerClass = imageContainer.element.className;
  }

  if (dateSign) {
    wrapperChildren.push(
      ElementModel.layout.backgroundBoxWhite({
        element: document.createElement('div'),
        elementStyles: {
          element: {
            alignSelf: `flex-start`,
          },
          siblingAfter: {
            marginTop: `${Styles.token.spacing.min}`,
          },
        },
        children: [dateSign],
      }),
    );
  }

  if (isQuote) {
    const quoteWrapper = ElementModel.createDiv({
      className: 'card-overlay-image-quote-wrapper',
      elementStyles: {
        element: {
          width: '41px',
          height: '30px',
          marginBottom: `${Styles.token.spacing.xs}`,

          '& svg': {
            fill: `${Styles.token.color.red}`,
          },
        },
      },
    });

    quoteWrapper.element.innerHTML = asset.icon.QUOTE;
    wrapperChildren.push(quoteWrapper);
  }

  wrapperChildren.push(
    textLockup.smallScaling({
      ...props,
      isThemeDark: true,
    }),
  );

  const textWrapper = ElementModel.createDiv({
    className: 'card-overlay-image-text-wrapper',
    elementStyles: {
      element: {
        height: 'auto',
        paddingRight: `${ctaIcon ? Styles.token.spacing['2xl'] : 0}`,
      },
    },
    children: [
      ElementModel.createDiv({
        children: wrapperChildren,
        className: 'card-overlay-image-text-content',
        elementStyles: {
          element: {
            maxWidth: `${Styles.token.spacing.maxWidth.smallest}`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9,
            position: 'relative',
          },
        },
      }),
    ],
  });

  const composite = ElementModel.createDiv({
    className: classRef,
    children: [
      ElementModel.createDiv({
        className: 'card-overlay-image-container',
        children: [...children, textWrapper],
        elementStyles: {
          element: {
            position: 'relative',
            padding: `${Styles.token.spacing.lg} ${Styles.token.spacing.md}`,
            paddingTop: `${Styles.token.spacing['4xl']}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            minHeight: '360px',
            height: '100%',
            overflow: 'hidden',

            ...theme.media.createContainerQuery(
              'min-width',
              Styles.token.media.breakpointValues.medium.min,
              {
                paddingTop: `${Styles.token.spacing['8xl']}`,
                minHeight: `424px`,
              },
            ),
          },
        },
      }),
    ],
    elementStyles: {
      element: {
        height: '100%',
        containerType: 'inline-size',

        [`&:hover .${imageContainerClass}:before, &:focus .${imageContainerClass}:before`]:
          {
            opacity: 0.7,
          },

        ['&:hover img, &:focus img']: {
          transform: 'scale(1)',
          transition: 'transform 0.5s ease-in-out',
        },
      },
    },
  });

  return {
    ...composite,
    events: {
      load,
    },
  };
};
