import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';

interface ContentProps {
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
  additional?: HTMLSlotElement | null;
}

interface AssetProps {
  image?: HTMLImageElement;
  video?: HTMLVideoElement;
}

interface HeroExpandProps extends ContentProps, AssetProps {}

const keyFrameImgOverlay = `
  @keyframes img-overlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const keyFrameImgSize = `
  @keyframes img-size {
    from { height: 50vh; }
    to { height: 100vh; }
  }
`;

const keyFrameComponentSize = `
  @keyframes component-size {
    from { width: 10%; }
    to { width: 100vw; }
  }

  @keyframes component-size-tablet {
    from { width: 60%; }
    to { width: 100vw; }
  }
`;

const createImageOverlay = () => {
  return ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-expand-image-overlay',
    elementStyles: {
      element: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0,0,0,0.65)',
        opacity: 1,

        [`@media (prefers-reduced-motion: no-preference)`]: {
          [`@supports (animation-timeline: view())`]: {
            opacity: 0,
            animation: 'img-overlay forwards',
            animationTimeline: 'view()',
            animationRangeStart: '70vh',
            animationRangeEnd: '100vh',
          },
        },
      },
    },
  });
};

const createImageSize = ({ image, video }: AssetProps) => {
  const imageSize = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-expand-image-size',
    elementStyles: {
      element: {
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
        width: '100%',

        [`@media (prefers-reduced-motion: no-preference)`]: {
          [`@supports (animation-timeline: view())`]: {
            height: '50vh',
            animation: 'img-size ease-in-out forwards',
            animationTimeline: 'view()',
            animationRangeStart: '40vh',
            animationRangeEnd: '100vh',

            [`@container (${Styles.token.media.queries.tablet.min})`]: {
              animationRangeEnd: '200vh',
            },
          },
        },
      },
    },
  });

  if (video) {
    imageSize.element.appendChild(video);
  } else if (image) {
    imageSize.element.appendChild(image);
  }

  const overlay = createImageOverlay();
  imageSize.element.appendChild(overlay.element);
  imageSize.styles += overlay.styles;

  return imageSize;
};

const createAssetContainer = (props: AssetProps) => {
  const container = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-expand-image-container',
    elementStyles: {
      element: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        height: '100%',
        overflow: 'clip',
        display: 'flex',
        alignItems: 'center',

        [`@media (prefers-reduced-motion: no-preference)`]: {
          [`@supports (animation-timeline: view())`]: {
            width: '10%',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'component-size ease-in-out forwards',
            animationTimeline: 'view()',
            animationRangeStart: '40vh',
            animationRangeEnd: '100vh',

            [`@container (${Styles.token.media.queries.tablet.min})`]: {
              width: '60%',
              animation: 'component-size-tablet ease-in-out forwards',
              animationTimeline: 'view()',
              animationRangeStart: '60vh',
              animationRangeEnd: '200vh',
            },
          },
        },
      },
    },
  });

  const imageSize = createImageSize(props);
  container.element.appendChild(imageSize.element);
  container.styles += imageSize.styles;

  return container;
};

const createEyebrow = (eyebrow?: HTMLElement | null) => {
  if (!eyebrow) return null;

  return ElementModel.text.ribbon({
    element: eyebrow,
    elementStyles: {
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

const createHeadline = (headline?: HTMLElement | null) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    ...(isOverwriteHeadline && { fontSize: '96px' }),
  };

  return ElementModel.headline.campaignMaximum({
    element: headline,
    elementStyles: {
      element: {
        color: Styles.token.color.white,
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',
        ...desktopStyles,
      },
    },
  });
};

const createTextContainer = ({
  headline,
  eyebrow,
  actions,
  additional,
}: ContentProps) => {
  const textContainer = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-expand-text-container',
    elementStyles: {
      element: {
        position: 'relative',
        height: '100%',
        zIndex: 9999,
        textAlign: 'center',
        padding: `${Styles.token.spacing.md} 0`,

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          padding: `${Styles.token.spacing['3xl']} 0`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },

        [`@container (${Styles.token.media.queries.highDef.min})`]: {
          padding: `${Styles.token.spacing['6xl']} 0`,
        },
      },
    },
  });

  if (eyebrow || headline) {
    const topText = ElementModel.create({
      element: document.createElement('div'),
      className: 'hero-expand-text-top-container',
      elementStyles: {
        siblingAfter: {
          marginTop: Styles.token.spacing.lg,
        },
      },
    });

    const eyebrowElement = createEyebrow(eyebrow);
    if (eyebrowElement) {
      topText.element.appendChild(eyebrowElement.element);
      topText.styles += eyebrowElement.styles;
    }

    const headlineElement = createHeadline(headline);
    if (headlineElement) {
      topText.element.appendChild(headlineElement.element);
      topText.styles += headlineElement.styles;
    }

    textContainer.element.appendChild(topText.element);
    textContainer.styles += topText.styles;
  }

  if (actions || additional) {
    const bottomText = ElementModel.create({
      element: document.createElement('div'),
      className: 'hero-expand-text-bottom-container',
    });

    if (actions) {
      const actionsContainer = ElementModel.create({
        element: document.createElement('div'),
        className: 'hero-expand-text-actions',
        elementStyles: {
          siblingAfter: {
            marginTop: Styles.token.spacing.lg,
          },
        },
      });
      actionsContainer.element.appendChild(actions);
      bottomText.element.appendChild(actionsContainer.element);
      bottomText.styles += actionsContainer.styles;
    }

    if (additional) {
      const additionalContainer = ElementModel.create({
        element: document.createElement('div'),
        className: 'hero-expand-text-additional',
      });
      additionalContainer.element.appendChild(additional);
      bottomText.element.appendChild(additionalContainer.element);
      bottomText.styles += additionalContainer.styles;
    }

    textContainer.element.appendChild(bottomText.element);
    textContainer.styles += bottomText.styles;
  }

  return textContainer;
};

const createSticky = (props: HeroExpandProps) => {
  const sticky = ElementModel.create({
    element: document.createElement('div'),
    className: 'hero-expand-sticky',
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (${Styles.token.media.queries.tablet.min})`]: {
          [`@media (prefers-reduced-motion: no-preference)`]: {
            [`@supports (animation-timeline: view())`]: {
              position: 'sticky',
              top: 0,
              height: '100vh',
            },
          },
        },

        [`@supports (not (animation-timeline: view()))`]: {
          top: '0 !important',
        },
      },
    },
  });

  const assetContainer = createAssetContainer(props);
  sticky.element.appendChild(assetContainer.element);
  sticky.styles += assetContainer.styles;

  const textContainer = createTextContainer(props);
  sticky.element.appendChild(textContainer.element);
  sticky.styles += textContainer.styles;

  return sticky;
};

export default (props: HeroExpandProps) =>
  (() => {
    const composite = ElementModel.create({
      element: document.createElement('div'),
      className: 'umd-hero-expand',
      elementStyles: {
        element: {
          [`@media (prefers-reduced-motion: no-preference)`]: {
            [`@supports (animation-timeline: view())`]: {
              position: 'relative',

              [`@container (${Styles.token.media.queries.tablet.min})`]: {
                height: '200vh',
              },
            },
          },

          ['& img, & video']: {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        },
      },
    });

    const sticky = createSticky(props);
    composite.element.appendChild(sticky.element);
    composite.styles += sticky.styles;

    const setTopPosition = ({ value }: { value: string | null }) => {
      sticky.element.style.top = value || '0';
    };

    composite.styles = `
      ${keyFrameImgOverlay}
      ${keyFrameImgSize}
      ${keyFrameComponentSize}
      ${composite.styles}
    `;

    return {
      ...composite,
      events: {
        setTopPosition,
      },
    };
  })();
