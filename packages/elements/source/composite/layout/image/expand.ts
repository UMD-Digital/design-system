import * as token from '@universityofmaryland/web-token-library';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  parsePixelValue,
  withViewTimelineAnimation,
} from '@universityofmaryland/web-utilities-library/styles';
import {
  isScreenZoomed,
  isPreferredReducedMotion,
} from '@universityofmaryland/web-utilities-library/accessibility';

type TypeLayoutImageExpandProps = {
  content: HTMLElement;
  image: HTMLImageElement;
};

const KEYFRAMES = `
  @keyframes img-overlay {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes img-size {
    to { width: 100%; height: 100vh; }
  }
`;

const CreateImageContainer = ({ image }: TypeLayoutImageExpandProps) => {
  const imageOverlay = new ElementBuilder()
    .withClassName('layout-image-expand-image-overlay')
    .withStyles({
      element: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0,0,0,0.65)',
        opacity: 1,
        ...withViewTimelineAnimation({
          animation: 'img-overlay forwards',
          animationTimeline: 'view()',
          animationRangeStart: '70vh',
          animationRangeEnd: '100vh',
        }),
      },
    })
    .build();

  const imageSize = new ElementBuilder()
    .withClassName('layout-image-expand-image-size')
    .withStyles({
      element: {
        overflow: 'hidden',
        position: 'relative',
        ...withViewTimelineAnimation({
          width: token.spacing.maxWidth.smallest,
          height: '70vh',
          animation: 'img-size ease-in-out forwards',
          animationTimeline: 'view()',
          animationRangeStart: 'cover',
          animationRangeEnd: '200vh',
        }),
        '@supports not (animation-timeline: scroll())': {
          height: '100%',
        },
        '@media (prefers-reduced-motion: reduce)': {
          height: '100%',
        },
        '& img': {
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
    })
    .withChildren(image, imageOverlay)
    .build();

  const imagePosition = new ElementBuilder()
    .withClassName('layout-image-expand-image-position')
    .withStyles({
      element: {
        width: '100%',
        margin: '0 auto',
        ...withViewTimelineAnimation({
          display: 'flex',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          animation: 'img-position ease-in-out forwards',
          animationTimeline: 'view()',
          animationRangeStart: 'cover',
          animationRangeEnd: '200vh',
        }),
        '@supports not (animation-timeline: scroll())': {
          height: '100%',
        },
        '@media (prefers-reduced-motion: reduce)': {
          height: '100%',
        },
      },
    })
    .withChild(imageSize)
    .build();

  return new ElementBuilder()
    .withClassName('layout-image-expand-image-container')
    .withStyles({
      element: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        ...withViewTimelineAnimation({
          position: 'relative',
        }),
      },
    })
    .withChild(imagePosition)
    .build();
};

const CreateTextContainer = ({ content }: TypeLayoutImageExpandProps) => {
  const textLock = new ElementBuilder()
    .withClassName('layout-image-expand-text-lock')
    .withStyles({
      element: {
        ...layout.space.horizontal.larger,
        display: 'flex',
        height: '100%',
      },
    })
    .withChild(content)
    .build();

  const textContainer = new ElementBuilder()
    .withClassName('layout-image-expand-text-container')
    .withStyles({
      element: {
        position: 'relative',
        paddingTop: token.spacing.max,
        paddingBottom: token.spacing.max,
        height: '100%',
        zIndex: 9999,
      },
    })
    .withChild(textLock)
    .build();

  return new ElementBuilder()
    .withClassName('layout-image-expand-text-animation')
    .withStyles({
      element: {
        width: '100vw',
        ...withViewTimelineAnimation({
          position: 'absolute',
          top: 0,
          height: '80vh',
          transform: 'translateY(80vh)',
        }),
        [`@media (${token.media.queries.tablet.min})`]: {
          ...withViewTimelineAnimation({
            transform: 'translateY(100vh)',
          }),
        },
      },
    })
    .withChild(textContainer)
    .build();
};

const CreateImageExpandElement = (props: TypeLayoutImageExpandProps) => {
  const imageContainerModel = CreateImageContainer(props);
  const textContainerModel = CreateTextContainer(props);
  let containerElement!: HTMLElement;

  const sizeImageForText = () => {
    const textContainerHeight =
      textContainerModel.element.clientHeight +
      parsePixelValue(token.spacing['2xl']) * 2;
    const imageContainerHeight = containerElement.clientHeight;

    if (textContainerHeight > imageContainerHeight) {
      containerElement.style.minHeight = `${textContainerHeight}px`;
    }
  };

  const containerModel = new ElementBuilder()
    .withClassName('layout-image-expand-container')
    .withStyles({
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    })
    .ref((element) => {
      containerElement = element;
    })
    .withChildren(imageContainerModel, textContainerModel)
    .build();

  const declarationModel = new ElementBuilder()
    .withClassName('layout-image-expand-declaration')
    .withStyles({
      element: {
        containerType: 'inline-size',
        overflow: 'clip',
        ...withViewTimelineAnimation({ height: '180vh' }),
        [`@media (${token.media.queries.tablet.min})`]: {
          ...withViewTimelineAnimation({ height: '200vh' }),
        },
      },
    })
    .withChild(containerModel)
    .build();

  declarationModel.styles += KEYFRAMES;

  if (isScreenZoomed() && !isPreferredReducedMotion()) {
    textContainerModel.element.style.height = '90vh';
    textContainerModel.element.style.transform = 'translateY(0)';
  }

  if (!CSS.supports('animation-timeline', 'view()')) {
    setTimeout(() => {
      sizeImageForText();
    }, 1000);
    window.addEventListener('resize', () => sizeImageForText());
  }

  return declarationModel;
};

export const createCompositeLayoutImageExpand = CreateImageExpandElement;
