import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { truncateTextBasedOnSize } from '@universityofmaryland/web-utilities-library/string';
import { quote as iconQuote } from '@universityofmaryland/web-icons-library/brand';
import { actions, assets, textLockup } from 'atomic';
import { CardOverlayProps } from '../_types';
import { type UMDElement } from '../../../_types';

export const classRef = 'card-overlay-image';

export const createCardOverlayImage = (props: CardOverlayProps) => {
  const { isQuote, ctaIcon, dateSign, backgroundImage, text } = props;
  const children: UMDElement[] = [];
  const wrapperChildren: UMDElement[] = [];
  const load = () => {
    const sizeElements = () => {
      const textCopy = text?.innerHTML;
      if (text && textCopy) {
        const modifiedText = truncateTextBasedOnSize({
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
      new ElementBuilder()
        .styled(Styles.layout.background.box.white)
        .withStyles({
          element: {
            alignSelf: `flex-start`,
          },
          siblingAfter: {
            marginTop: `${token.spacing.min}`,
          },
        })
        .withChild(dateSign)
        .build(),
    );
  }

  if (isQuote) {
    const quoteWrapper = new ElementBuilder()
      .withClassName('card-overlay-image-quote-wrapper')
      .withStyles({
        element: {
          width: '41px',
          height: '30px',
          marginBottom: `${token.spacing.xs}`,

          '& svg': {
            fill: `${token.color.red}`,
          },
        },
      })
      .withHTML(iconQuote)
      .build();

    wrapperChildren.push(quoteWrapper);
  }

  wrapperChildren.push(
    textLockup.smallScaling({
      ...props,
      isThemeDark: true,
    }),
  );

  const textContent = new ElementBuilder()
    .withClassName('card-overlay-image-text-content')
    .withStyles({
      element: {
        maxWidth: `${token.spacing.maxWidth.smallest}`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9,
        position: 'relative',
      },
    })
    .withChildren(...wrapperChildren)
    .build();

  const textWrapper = new ElementBuilder()
    .withClassName('card-overlay-image-text-wrapper')
    .withStyles({
      element: {
        height: 'auto',
        paddingRight: `${ctaIcon ? token.spacing['2xl'] : 0}`,
      },
    })
    .withChild(textContent)
    .build();

  const container = new ElementBuilder()
    .withClassName('card-overlay-image-container')
    .withStyles({
      element: {
        position: 'relative',
        padding: `${token.spacing.lg} ${token.spacing.md}`,
        paddingTop: `${token.spacing['4xl']}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '360px',
        height: '100%',
        overflow: 'hidden',

        ...createMediaQuery(
          'min-width',
          token.media.breakpointValues.medium.min,
          {
            paddingTop: `${token.spacing['8xl']}`,
            minHeight: `424px`,
          },
        ),
      },
    })
    .withChildren(...children, textWrapper)
    .build();

  const composite = new ElementBuilder()
    .withClassName(classRef)
    .withStyles({
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
    })
    .withChild(container)
    .build();

  return {
    ...composite,
    events: {
      load,
    },
  };
};
