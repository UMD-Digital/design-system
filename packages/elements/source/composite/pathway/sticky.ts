import * as Styles from '@universityofmaryland/web-styles-library';
import * as Atomic from 'atomic';
import { ElementModel } from 'model';
import { type ElementVisual } from '_types';

interface PathwayStickyProps {
  actions?: HTMLElement | null;
  dateSign?: ElementVisual;
  eventDetails?: ElementVisual;
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isImagePositionLeft?: boolean;
  isImageScaled?: boolean;
  isThemeDark?: boolean;
  isThemeMaryland?: boolean;
  stats?: HTMLElement | null;
  text?: HTMLElement | null;
  video?: HTMLVideoElement | null;
}

const mediumSize = 800;
const largeSize = 1200;

const createAssetContent = ({
  image,
  video,
  dateSign,
  isImageScaled,
}: Pick<
  PathwayStickyProps,
  'dateSign' | 'isThemeDark' | 'image' | 'video' | 'isImageScaled'
>): ElementVisual => {
  const children: ElementVisual[] = [];

  if (video) {
    children.push(
      Atomic.assets.video.observedAutoPlay({
        video,
        isScaled: isImageScaled,
      }),
    );
  }

  if (!video && image) {
    children.push(
      Atomic.assets.image.background({
        image,
        isScaled: isImageScaled,
        isShowCaption: true,
        dateSign,
      }),
    );
  }

  return ElementModel.createDiv({
    className: 'pathway-image-container-wrapper',
    children,
    elementStyles: {
      element: {
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        display: 'grid',

        [`&:has(.image-container)`]: {
          alignItems: 'center',
        },
      },
    },
  });
};

const createAssetColumn = (
  props: Pick<
    PathwayStickyProps,
    | 'dateSign'
    | 'isThemeDark'
    | 'image'
    | 'video'
    | 'isImagePositionLeft'
    | 'isImageScaled'
  >,
): ElementVisual | null => {
  const { image, video, isImagePositionLeft, isImageScaled } = props;

  if (!image && !video) return null;

  return ElementModel.createDiv({
    className: 'pathway-image-container',
    children: [createAssetContent(props)],
    elementStyles: {
      element: {
        position: 'sticky',
        top: '0',
        alignSelf: 'flex-start',
        height: '100%',

        ...(isImageScaled === false && {
          display: 'flex',
          justifyContent: 'center',
        }),

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          position: 'relative',
          display: 'grid',
          minHeight: '56vw',
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          position: 'sticky',
          top: '0',
          alignSelf: 'flex-start',

          ...(isImagePositionLeft === false && {
            order: '2',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          [`& img`]: {
            minHeight: '656px',
          },
        },
      },
    },
  });
};

const createHeadline = ({
  headline,
  isThemeDark,
}: Pick<PathwayStickyProps, 'headline' | 'isThemeDark'>) => {
  const characterCount = headline?.textContent?.trim().length || 0;
  const isOverwriteHeadline = characterCount > 30;

  if (!headline) return null;

  const desktopStyles = {
    [`@container (${Styles.token.media.queries.desktop.min})`]: {
      ...(isOverwriteHeadline && {
        fontSize: '40px',
      }),
    },
  };

  return ElementModel.headline.sansLargest({
    element: headline,
    isThemeDark,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

const createStat = ({ stats }: Pick<PathwayStickyProps, 'stats'>) => {
  if (!stats) return null;

  const statWrapper = ElementModel.createDiv({
    className: 'text-lockup-medium-stats',
    elementStyles: {
      element: {
        marginTop: Styles.token.spacing.lg,

        [`&:has(> *:nth-child(2))`]: {
          display: `grid`,
          gridGap: `${Styles.token.spacing.md}`,
        },

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          marginTop: Styles.token.spacing.lg,
          paddingTop: Styles.token.spacing.md,
          borderTop: `1px solid ${Styles.token.color.gray.light}`,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          marginTop: Styles.token.spacing['2xl'],

          [`&:has(> *:nth-child(2))`]: {
            gridGap: `${Styles.token.spacing.lg}`,
            gridTemplateColumns: `repeat(2, 1fr)`,
          },
        },
      },
    },
  });

  statWrapper.element.innerHTML = stats.innerHTML;

  return statWrapper;
};

const createTextContent = (props: PathwayStickyProps): ElementVisual => {
  const children: ElementVisual[] = [];

  children.push(
    Atomic.textLockup.medium({
      actions: props.actions,
      eventDetails: props.eventDetails,
      compositeHeadline: createHeadline(props),
      isThemeDark: props.isThemeDark,
      ribbon: props.eyebrow,
      compositeStats: createStat(props),
      text: props.text,
    }),
  );

  const wrapper = ElementModel.createDiv({
    className: 'pathway-text-container-wrapper',
    children,
    elementStyles: {
      element: {
        padding: `${Styles.token.spacing.md} 0`,

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          ...Styles.layout.space.horizontal.larger,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `0 ${Styles.token.spacing['2xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `0 ${Styles.token.spacing['6xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },
      },
    },
  });

  const container = ElementModel.createDiv({
    className: 'pathway-text-container',
    children: [wrapper],
    elementStyles: {
      element: {
        ...(props.isThemeDark && {
          backgroundColor: Styles.token.color.black,
          color: Styles.token.color.white,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: Styles.token.color.red,
          color: Styles.token.color.white,
        }),

        [`@container (min-width: ${mediumSize}px)`]: {
          ...(props.isImagePositionLeft === false && {
            order: '1',
          }),
        },
      },
    },
  });

  return container;
};

const createLock = (props: PathwayStickyProps) => {
  const textContent = createTextContent(props);
  const assetContent = createAssetColumn(props);
  const children: ElementVisual[] = [];

  if (assetContent) {
    children.push(assetContent);
  }
  children.push(textContent);

  const lockWrapper = ElementModel.createDiv({
    className: 'pathway-container-lock-wrapper',
    children,
    elementStyles: {
      element: {
        position: 'relative',

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          padding: '0',
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          display: 'flex',

          [`& > *`]: {
            width: '50%',
          },
        },
      },
    },
  });

  return ElementModel.layout.spaceHorizontalLarger({
    element: document.createElement('div'),
    children: [lockWrapper],
    elementStyles: {
      element: {
        [`@container (max-width: ${mediumSize - 1}px)`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },
  });
};

export default (props: PathwayStickyProps) =>
  ElementModel.createDiv({
    className: 'pathway-sticky-container',
    children: [
      ElementModel.createDiv({
        className: 'pathway-sticky-container-wrapper',
        children: [createLock(props)],
      }),
    ],
    elementStyles: {
      element: {
        container: 'inline-size',
        position: 'relative',
      },
    },
  });
