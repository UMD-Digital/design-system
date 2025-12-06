import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { isPreferredReducedMotion } from '@universityofmaryland/web-utilities-library/accessibility';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';
import { assets, textLockup } from 'atomic';
import { type ContentElement, type ElementModel } from '../../../_types';

interface CornerProps {
  images: Array<HTMLImageElement>;
  isCornerLeft: boolean;
}

interface CenterProps {
  images: Array<HTMLImageElement>;
  video?: HTMLVideoElement | null;
}

interface HeroGridProps {
  headline?: ContentElement;
  text?: ContentElement;
  actions?: ContentElement;
  corners: Array<CornerProps>;
  center: CenterProps | null;
  isThemeDark?: boolean;
}

const isPreferReducedMotion = isPreferredReducedMotion();
const isScrollTimelineSupported = () =>
  'ScrollTimeline' in window || CSS.supports('animation-timeline', 'scroll()');
const isDisplayWithoutAnimation =
  isPreferReducedMotion || !isScrollTimelineSupported();

const ANIMATION_RANGES = {
  GRID_COLUMNS: { start: '110vh', end: '230vh' },
  GRID_ROWS: { start: '110vh', end: '230vh' },
  TINT_FADE: { start: '50vh', end: '140vh' },
} as const;

const GRID_LAYOUT = {
  COLUMNS: {
    INITIAL: '20% 60% 20%',
    FINAL: '0 100% 0',
    DEFAULT: '25% 50% 25%',
  },
  ROWS: {
    INITIAL: '25vh 1fr 25vh',
    FINAL: '0 1fr 0',
    TRIPLE: '1fr 1fr 1fr',
  },
} as const;

const keyFrameColumns = `
  @keyframes grid-columns {
    from {
      grid-template-columns: ${GRID_LAYOUT.COLUMNS.INITIAL};
    }
    to {
      grid-template-columns: ${GRID_LAYOUT.COLUMNS.FINAL};
      grid-gap: 0;
    }
  }
`;

const keyFrameRows = `
  @keyframes grid-rows {
    from {
      grid-template-rows: ${GRID_LAYOUT.ROWS.INITIAL};
    }
    to {
      grid-template-rows: ${GRID_LAYOUT.ROWS.FINAL};
      grid-gap: 0;
    }
  }
`;

const keyFrameTint = `
  @keyframes tint-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const columnBase = {
  display: 'grid',
  gridAutoFlow: 'row dense',
  gridGap: `${token.spacing.min}`,
  width: '100%',
  height: '100vh',

  [`@media (${token.media.queries.tablet.min})`]: {
    gridGap: `${token.spacing.md}`,
  },

  [`@media (${token.media.queries.desktop.min})`]: {
    gridGap: `${token.spacing.lg}`,
  },

  ['& > *']: {
    overflow: 'hidden',
    position: 'relative',
  },
};

const createImageWrapper = (image: HTMLImageElement) =>
  assets.image.background({
    element: image,
    isScaled: true,
    isGifAllowed: true,
    isShowCaption: true,
  });

const createVideoWrapper = (video: HTMLVideoElement) =>
  assets.video.observedAutoPlay({
    video,
    isAutoplay: true,
    additionalElementStyles: {
      additionalElementStyles: {
        width: '100%',
        aspectRatio: '1 / 1',
        position: 'relative',
        overflow: 'hidden',

        [`& video`]: {
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },
      },
    },
  });

const createCorner = ({ images, isCornerLeft }: CornerProps) => {
  const children = images.map((image) => createImageWrapper(image));

  return new ElementBuilder()
    .withClassName(
      isCornerLeft ? 'hero-grid-corner-left' : 'hero-grid-corner-right',
    )
    .withChildren(...children)
    .withStyles({
      element: {
        ...columnBase,
        gridTemplateRows: GRID_LAYOUT.ROWS.TRIPLE,
      },
    })
    .withAttribute('role', 'region')
    .withAttribute(
      'aria-label',
      `${isCornerLeft ? 'Left' : 'Right'} decorative image grid`,
    )
    .build();
};

const createCenter = ({ images, video }: CenterProps) => {
  const tint = new ElementBuilder()
    .withClassName('hero-grid-tint')
    .withStyles({
      element: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9,
        opacity: 0,
        ...withViewTimelineAnimation({
          animation: 'tint-fade ease-in-out forwards',
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_RANGES.TINT_FADE.start,
          animationRangeEnd: ANIMATION_RANGES.TINT_FADE.end,
        }),
      },
    })
    .withAttribute('role', 'region')
    .withAttribute('aria-label', 'Main hero content')
    .build();

  const container = new ElementBuilder()
    .withClassName('hero-grid-center')
    .withChild(tint)
    .withStyles({
      element: {
        ...columnBase,
        gridTemplateRows: GRID_LAYOUT.ROWS.INITIAL,
        ...withViewTimelineAnimation({
          animation: 'grid-rows ease-in-out forwards',
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_RANGES.GRID_ROWS.start,
          animationRangeEnd: ANIMATION_RANGES.GRID_ROWS.end,
        }),
      },
    });

  if (video) {
    container
      .withChild(createImageWrapper(images[0]))
      .withChild(createVideoWrapper(video))
      .withChild(createImageWrapper(images[1]));
  } else {
    images.forEach((image) => {
      container.withChild(createImageWrapper(image));
    });
  }

  return container.build();
};

const createHeadline = (
  props: Pick<HeroGridProps, 'headline'>,
): ElementModel<HTMLElement> | null => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '80px',
      }),
    },
  };

  return new ElementBuilder(headline)
    .styled(Styles.typography.campaign.fonts.extraLarge)
    .withStyles({
      element: {
        color: token.color.white,
        textTransform: 'uppercase',
        textWrap: 'pretty',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: token.spacing.md,
      },
    })
    .build();
};

const createTextContainer = (
  props: Pick<HeroGridProps, 'headline' | 'text' | 'actions' | 'isThemeDark'>,
) => {
  const { actions, headline, text, isThemeDark } = props;
  let shouldRenderBlackText = null;

  if (isDisplayWithoutAnimation && !isThemeDark) {
    shouldRenderBlackText = true;
  }

  if (!text && !actions && !headline) {
    return null;
  }

  const textContainer = new ElementBuilder()
    .withClassName('hero-expand-text-container')
    .withStyles({
      element: {
        position: 'relative',
        height: '100%',
        zIndex: 9999,
        textAlign: 'center',
        padding: `${token.spacing.md} 0`,

        [`@container (${token.media.queries.tablet.min})`]: {
          padding: `${token.spacing['3xl']} 0`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },

        [`@container (${token.media.queries.highDef.min})`]: {
          padding: `${token.spacing['6xl']} 0`,
        },

        ...withViewTimelineAnimation({
          paddingTop: '140vh',
        }),

        ['*']: {
          ...(shouldRenderBlackText && {
            color: `${token.color.black} !important`,
          }),
        },
      },
    })
    .build();

  const lock = new ElementBuilder()
    .styled(Styles.layout.space.horizontal.smallest)
    .withStyles({
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    })
    .build();

  const textLockupElement = textLockup.large({
    headlineComposite: createHeadline(props),
    textLargest: text,
    actions,
    isThemeDark: true,
  });

  lock.element.appendChild(textLockupElement.element);
  lock.styles += textLockupElement.styles;

  textContainer.element.appendChild(lock.element);
  textContainer.styles += lock.styles;

  return textContainer;
};

const validateGridProps = (
  props: HeroGridProps,
): {
  leftCorner: CornerProps;
  rightCorner: CornerProps;
  center: CenterProps;
} | null => {
  const leftCorner = props.corners.find((c) => c.isCornerLeft);
  const rightCorner = props.corners.find((c) => !c.isCornerLeft);

  const errors = [];

  // Validate corners
  if (!leftCorner) {
    errors.push('Left corner is required for hero grid');
  } else if (!leftCorner.images || leftCorner.images.length === 0) {
    errors.push('Left corner must have at least one image');
  }

  if (!rightCorner) {
    errors.push('Right corner is required for hero grid');
  } else if (!rightCorner.images || rightCorner.images.length === 0) {
    errors.push('Right corner must have at least one image');
  }

  // Validate center
  if (!props.center) {
    errors.push('Center is required for hero grid');
  } else {
    if (!props.center.images || props.center.images.length === 0) {
      errors.push('Center must have at least one image');
    } else if (props.center.video && props.center.images.length < 2) {
      errors.push('Center must have at least 2 images when video is provided');
    }
  }

  if (errors.length > 0) {
    errors.forEach((error) => console.log('Hero Grid Error:', error));
    return null;
  }

  return {
    leftCorner: leftCorner as CornerProps,
    rightCorner: rightCorner as CornerProps,
    center: props.center as CenterProps,
  };
};

const createGridLayout = (
  leftCorner: CornerProps,
  rightCorner: CornerProps,
  center: CenterProps,
) => {
  const gridStyles = {
    gridTemplateColumns: GRID_LAYOUT.COLUMNS.DEFAULT,
    height: '100vh',
    width: '100%',
    display: 'grid',
    gridGap: `${token.spacing.min}`,

    [`@media (${token.media.queries.tablet.min})`]: {
      gridGap: `${token.spacing.md}`,
    },

    [`@media (${token.media.queries.desktop.min})`]: {
      gridGap: `${token.spacing.lg}`,
    },

    ...withViewTimelineAnimation({
      position: 'sticky',
      top: 0,
      animation: 'grid-columns ease-in-out forwards',
      animationTimeline: 'view()',
      animationRangeStart: ANIMATION_RANGES.GRID_COLUMNS.start,
      animationRangeEnd: ANIMATION_RANGES.GRID_COLUMNS.end,
    }),
  };

  return new ElementBuilder()
    .withClassName('hero-grid-layout')
    .withChildren(
      createCorner(leftCorner),
      createCenter(center),
      createCorner(rightCorner),
    )
    .withStyles({ element: gridStyles })
    .withAttribute('role', 'region')
    .withAttribute('aria-label', 'Hero grid layout')
    .build();
};

export default (props: HeroGridProps) => {
  const validated = validateGridProps(props);
  if (!validated) return null;

  const { leftCorner, rightCorner, center } = validated;
  const text = createTextContainer(props);
  const grid = createGridLayout(leftCorner, rightCorner, center);

  const composite = new ElementBuilder()
    .withClassName('hero-grid-container')
    .withChild(grid)
    .withStyles({
      element: {
        width: '100%',
        display: 'block',
        containerType: 'inline-size',
        ...withViewTimelineAnimation({
          height: '300vh',
        }),
        ['img, video']: {
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        },
      },
    })
    .withAttribute('role', 'main')
    .withAttribute('aria-label', 'Hero section');

  if (text) {
    composite.withChild(text);
  }

  const built = composite.build();

  built.styles += keyFrameColumns;
  built.styles += keyFrameRows;
  built.styles += keyFrameTint;

  return built;
};
