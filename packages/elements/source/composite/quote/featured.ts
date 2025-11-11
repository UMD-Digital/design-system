import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import InlineQuote from './inline';
import { image as elementImage, action as elementAction } from './elements';
import { quoteAnimation } from './helper/animation';
import { MEDIUM, SMALL } from './_constants';
import { type QuoteFeaturedProps } from './_types';

const BACKGROUND_TEXTURE_LIGHT = `<svg id="quote_background_light" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 850.5 532.1"><path d="M.3,0h332.7L.3,326.6V0Z" fill="#757575" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/><path d="M517.9,532.1h332.7L308.6,0H0v23.6l517.9,508.5Z" fill="#000" fill-rule="evenodd" isolation="isolate" opacity=".04" stroke-width="0"/></svg>`;
const BACKGROUND_TEXTURE_DARK = `<svg id="quote_background_dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 614.86 300.65"><defs><style>.cls-1{opacity:.25;}.cls-1,.cls-2{fill:#757575;fill-rule:evenodd;isolation:isolate;}.cls-2{opacity:.1;}</style></defs><path class="cls-2" d="m.27,0h332.67L27.46,299.93H.27V0Z"/><path class="cls-1" d="m0,0h308.65l306.21,300.65h-332.67L0,23.59V0Z"/></svg>`;

const createImageContainer = (props: QuoteFeaturedProps) => {
  const { image, action } = props;

  const containerBuilder = new ElementBuilder()
    .withClassName('quote-featured-image')
    .withStyles({
      element: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: `-${token.spacing.lg}`,

        ['&[align-center=true]']: {
          marginTop: '0',
          justifyContent: 'center',
        },

        [`@container (max-width: ${SMALL - 1}px)`]: {
          padding: `0 ${token.spacing.lg}`,
        },

        [`@container (min-width: ${SMALL}px) and (max-width: ${MEDIUM - 1}px)`]:
          {
            margin: '0 auto',
            marginTop: `-${token.spacing['8xl']}`,
            maxWidth: '300px',
          },

        [`@container (min-width: ${MEDIUM}px)`]: {
          paddingLeft: token.spacing['6xl'],
          width: `calc(300px + ${token.spacing['6xl']})`,
        },
      },
    });

  if (image) {
    const imageElement = elementImage({
      ...props,
      isTypeFeatured: true,
      image,
    });
    containerBuilder.withChild(imageElement);
  }

  if (action) {
    const actionElement = elementAction({
      isTypeFeatured: true,
      action,
    });
    containerBuilder.withChild(actionElement);
  }

  const container = containerBuilder.build();

  if (window.innerWidth >= MEDIUM && image instanceof HTMLImageElement) {
    image.addEventListener('load', () => {
      const parent = container;

      if (!parent) return;

      const aspectRatio = image.offsetHeight / parent.element.offsetHeight;

      if (aspectRatio < 0.5) {
        container.element.setAttribute('align-center', 'true');
      }
    });
  }

  return container;
};

const createTextureContainer = ({
  isThemeDark,
  isThemeMaryland,
}: QuoteFeaturedProps) => {
  const isDarkText = isThemeDark || isThemeMaryland;
  const backgroundTexture = imageFromSvg({
    SVG: isDarkText ? BACKGROUND_TEXTURE_DARK : BACKGROUND_TEXTURE_LIGHT,
  });

  const backgroundTextureElement = new ElementBuilder(backgroundTexture)
    .withClassName('quote-background-texture')
    .build();

  const container = new ElementBuilder()
    .withClassName('quote-featured-texture')
    .withChild(backgroundTextureElement)
    .withStyles({
      element: {
        overflow: 'hidden',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',

        [`& > img`]: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '70%',
          height: '120%',
          objectFit: 'cover',
        },

        [`@container (max-width: ${MEDIUM - 1}px)`]: {
          display: 'none',
        },
      },
    })
    .build();

  return container;
};

export default (props: QuoteFeaturedProps) => {
  const { isThemeDark, isThemeMaryland, image, isTransparent } = props;

  const inlineQuote = InlineQuote({ ...props, isTypeFeatured: true });

  const textContainer = new ElementBuilder()
    .withClassName('quote-featured-text')
    .withChild(inlineQuote)
    .withStyles({
      element: {
        padding: token.spacing.lg,
        position: 'relative',
        width: '100%',

        ...(isTransparent && { padding: '0' }),

        [`@container (min-width: ${SMALL}px)`]: {
          padding: `${token.spacing['2xl']}`,
        },

        [`@container (min-width: ${MEDIUM}px)`]: {
          padding: `${token.spacing['4xl']}`,
        },
      },
    })
    .build();

  const wrapper = new ElementBuilder()
    .withClassName('quote-featured-container-wrapper')
    .withStyles({
      element: {
        backgroundColor: token.color.gray.lightest,
        position: 'relative',
        ...(isThemeDark && { backgroundColor: token.color.black }),
        ...(isThemeMaryland && { backgroundColor: token.color.red }),
        ...(isTransparent && { backgroundColor: 'transparent' }),

        ...(image && {
          display: 'flex',
          flexDirection: 'column',

          [`@container (min-width: ${MEDIUM}px)`]: {
            display: 'flex',
            flexDirection: 'row',
          },
        }),
      },
    });

  if (!isTransparent) {
    wrapper.withChild(createTextureContainer(props));
  }

  if (image) {
    wrapper.withChild(createImageContainer(props));
  }

  wrapper.withChild(textContainer);

  const wrapperBuilt = wrapper.build();

  const spacer = new ElementBuilder()
    .withClassName('quote-featured-container-spacer')
    .withChild(wrapperBuilt)
    .withStyles({
      element: {
        paddingTop: token.spacing.lg,

        ...(isTransparent && { padding: '0' }),

        [`@container (min-width: ${SMALL}px) and (max-width: ${MEDIUM - 1}px)`]:
          {
            ...(image && {
              paddingTop: token.spacing['8xl'],
            }),
          },
      },
    })
    .build();

  const container = new ElementBuilder()
    .withClassName('quote-featured-container')
    .withChild(spacer)
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .build();

  const loadAnimation = () => {
    quoteAnimation({
      ...props,
      quoteElement: container,
    });
  };

  return {
    ...container,
    events: {
      loadAnimation,
    },
  };
};
