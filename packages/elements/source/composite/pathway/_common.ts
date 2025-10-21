import * as Styles from '@universityofmaryland/web-styles-library';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import * as Atomic from 'atomic';
import { type PathwayTextLockupProps, type PathwayAssetProps } from './_types';

export const createCompositeHeadline = ({
  headline,
  isThemeDark,
  isThemeMaryland,
}: Pick<
  PathwayTextLockupProps,
  'headline' | 'isThemeDark' | 'isThemeMaryland'
>) => {
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

  return ElementBuilder.styled.headline.sansLargest({
    element: headline,
    isThemeDark: isThemeDark || isThemeMaryland,
    elementStyles: {
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',
        color: Styles.token.color.black,
        ...desktopStyles,
      },
      siblingAfter: {
        marginTop: Styles.token.spacing.md,
      },
    },
  });
};

export const createCompositeStat = ({
  stats,
}: Pick<PathwayTextLockupProps, 'stats'>) => {
  const mediumSize = 800;

  if (!stats) return null;

  const statWrapper = ElementBuilder.create.div({
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

export const createTextLockupMedium = (
  props: Pick<
    PathwayTextLockupProps,
    | 'stats'
    | 'actions'
    | 'eventDetails'
    | 'eyebrow'
    | 'headline'
    | 'stats'
    | 'text'
    | 'isThemeDark'
    | 'isThemeMaryland'
  >,
) =>
  Atomic.textLockup.medium({
    ...props,
    ribbon: props.eyebrow,
    compositeHeadline: createCompositeHeadline(props),
    compositeStats: createCompositeStat(props),
  });

export const createAssetContent = (
  props: Pick<
    PathwayAssetProps,
    'dateSign' | 'image' | 'video' | 'isImageScaled'
  >,
) => {
  const { dateSign, image, video, isImageScaled = true } = props;
  const children = [];

  if (video) {
    children.push(
      Atomic.assets.video.observedAutoPlay({
        video,
        isScaled: isImageScaled,
        additionalElementStyles: {
          [`& video`]: {
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          },
        },
      }),
    );
  }

  if (!video && image) {
    children.push(
      Atomic.assets.image.background({
        element: image,
        isScaled: isImageScaled,
        isShowCaption: true,
        isGifAllowed: true,
        dateSign,
      }),
    );
  }

  return ElementBuilder.create.div({
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
