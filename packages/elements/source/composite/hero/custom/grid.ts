import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { assets, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { type ContentElement } from '_types';

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
}

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

const CLASS_NAMES = {
  CORNER_LEFT: 'hero-grid-corner-left',
  CORNER_RIGHT: 'hero-grid-corner-right',
  CENTER: 'hero-grid-center',
  TINT: 'hero-grid-tint',
  TEXT_CONTAINER: 'hero-expand-text-container',
  LAYOUT: 'hero-grid-layout',
  CONTAINER: 'hero-grid-container',
} as const;

const THEME_VALUES = {
  TINT_COLOR: 'rgba(0, 0, 0, 0.5)',
  HEADLINE_CHAR_THRESHOLD: 30,
  HEADLINE_LARGE_SIZE: '80px',
  SCROLL_HEIGHT: '300vh',
  SCROLL_PADDING_TOP: '140vh',
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
  gridGap: `${Styles.token.spacing.min}`,
  width: '100%',
  height: '100vh',

  [`@media (${Styles.token.media.queries.tablet.min})`]: {
    gridGap: `${Styles.token.spacing.md}`,
  },

  [`@media (${Styles.token.media.queries.desktop.min})`]: {
    gridGap: `${Styles.token.spacing.lg}`,
  },

  ['& > *']: {
    overflow: 'hidden',
    position: 'relative',
  },
};

const createImageWrapper = (image: HTMLImageElement) =>
  assets.image.background({
    image,
    isScaled: true,
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

  return ElementModel.createDiv({
    className: isCornerLeft
      ? CLASS_NAMES.CORNER_LEFT
      : CLASS_NAMES.CORNER_RIGHT,
    children,
    elementStyles: {
      element: {
        ...columnBase,
        gridTemplateRows: GRID_LAYOUT.ROWS.TRIPLE,
      },
    },
    attributes: [
      {
        role: 'region',
        'aria-label': `${
          isCornerLeft ? 'Left' : 'Right'
        } decorative image grid`,
      },
    ],
  });
};

const createCenter = ({ images, video }: CenterProps) => {
  const children = [
    ElementModel.create({
      element: document.createElement('div'),
      className: CLASS_NAMES.TINT,
      elementStyles: {
        element: {
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: THEME_VALUES.TINT_COLOR,
          zIndex: 9,
          opacity: 0,
          ...Utils.theme.media.withViewTimelineAnimation({
            animation: 'tint-fade ease-in-out forwards',
            animationTimeline: 'view()',
            animationRangeStart: ANIMATION_RANGES.TINT_FADE.start,
            animationRangeEnd: ANIMATION_RANGES.TINT_FADE.end,
          }),
        },
      },
      attributes: [
        {
          role: 'region',
          'aria-label': 'Main hero content',
        },
      ],
    }),
  ];

  if (video) {
    children.push(
      createVideoWrapper(video),
      createImageWrapper(images[0]),
      createImageWrapper(images[1]),
    );
  } else {
    images.forEach((image) => {
      children.push(createImageWrapper(image));
    });
  }

  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.CENTER,
    children,
    elementStyles: {
      element: {
        ...columnBase,
        gridTemplateRows: GRID_LAYOUT.ROWS.INITIAL,
        ...Utils.theme.media.withViewTimelineAnimation({
          animation: 'grid-rows ease-in-out forwards',
          animationTimeline: 'view()',
          animationRangeStart: ANIMATION_RANGES.GRID_ROWS.start,
          animationRangeEnd: ANIMATION_RANGES.GRID_ROWS.end,
        }),
      },
    },
  });
};

const createHeadline = (props: Pick<HeroGridProps, 'headline'>) => {
  const { headline } = props;
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline =
    characterCount > THEME_VALUES.HEADLINE_CHAR_THRESHOLD;

  if (!headline) return null;

  const desktopStyles = {
    ...(isOverwriteHeadline && { fontSize: THEME_VALUES.HEADLINE_LARGE_SIZE }),
  };

  const headlineElement = ElementModel.headline.campaignExtraLarge({
    element: headline,
    elementStyles: {
      element: {
        textTransform: 'uppercase',
        textWrap: 'pretty',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
    isThemeDark: true,
  });

  return headlineElement;
};

const createTextContainer = (props: Pick<HeroGridProps, 'headline' | 'text' | 'actions'>) => {
  const { actions, headline, text } = props;

  if (!text && !actions && !headline) {
    return null;
  }

  const textContainer = ElementModel.createDiv({
    className: CLASS_NAMES.TEXT_CONTAINER,
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

        ...Utils.theme.media.withViewTimelineAnimation({
          paddingTop: THEME_VALUES.SCROLL_PADDING_TOP,
        }),
      },
    },
  });

  const lock = ElementModel.layout.spaceHorizontalSmallest({
    element: document.createElement('div'),
    elementStyles: {
      element: {
        height: '100%',
        width: '100%',
        position: 'relative',
      },
    },
  });

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
    errors.forEach((error) => console.error(error));
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
    gridGap: `${Styles.token.spacing.min}`,
    backgroundColor: 'var(--grayDark)',

    [`@media (${Styles.token.media.queries.tablet.min})`]: {
      gridGap: `${Styles.token.spacing.md}`,
    },

    [`@media (${Styles.token.media.queries.desktop.min})`]: {
      gridGap: `${Styles.token.spacing.lg}`,
    },

    ...Utils.theme.media.withViewTimelineAnimation({
      position: 'sticky',
      top: 0,
      animation: 'grid-columns ease-in-out forwards',
      animationTimeline: 'view()',
      animationRangeStart: ANIMATION_RANGES.GRID_COLUMNS.start,
      animationRangeEnd: ANIMATION_RANGES.GRID_COLUMNS.end,
    }),
  };

  return ElementModel.createDiv({
    className: CLASS_NAMES.LAYOUT,

    children: [
      createCorner(leftCorner),
      createCenter(center),
      createCorner(rightCorner),
    ],
    elementStyles: { element: gridStyles },
    attributes: [
      {
        role: 'region',
        'aria-label': 'Hero grid layout',
      },
    ],
  });
};

export default (props: HeroGridProps) => {
  const validated = validateGridProps(props);
  if (!validated) return null;

  const { leftCorner, rightCorner, center } = validated;
  const text = createTextContainer(props);
  const grid = createGridLayout(leftCorner, rightCorner, center);

  const children = text ? [grid, text] : [grid];

  const containerStyles = {
    width: '100%',
    display: 'block',
    ...Utils.theme.media.withViewTimelineAnimation({
      height: THEME_VALUES.SCROLL_HEIGHT,
    }),
    ['img, video']: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
    },
  };

  const composite = ElementModel.createDiv({
    className: CLASS_NAMES.CONTAINER,
    children,
    elementStyles: { element: containerStyles },
    attributes: [
      {
        role: 'main',
        'aria-label': 'Hero section',
      },
    ],
  });

  composite.styles += keyFrameColumns;
  composite.styles += keyFrameRows;
  composite.styles += keyFrameTint;

  return composite;
};
