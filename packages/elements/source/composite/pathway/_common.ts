import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as animationStyles from '@universityofmaryland/web-styles-library/animation';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { wrapTextNodeInSpan } from '@universityofmaryland/web-utilities-library/dom';
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
  const finalIsThemeDark = isThemeDark || isThemeMaryland;

  if (!headline) return null;

  const headlineStyles = {
    ...typography.sans.compose('largest', {
      theme: theme.fontColor(finalIsThemeDark),
    }),
    ...animationStyles.line.composeSlideUnder({
      color: theme.foreground(finalIsThemeDark),
    }),
  };

  return new ElementBuilder(headline)
    .styled(headlineStyles)
    .withStyles({
      element: {
        fontWeight: 800,
        textTransform: 'uppercase',
        textWrap: 'balance',

        [`@container (${token.media.queries.desktop.min})`]: {
          ...(isOverwriteHeadline && {
            fontSize: '40px',
          }),
        },
      },
      siblingAfter: {
        marginTop: token.spacing.md,
      },
    })
    .withModifier((el) => wrapTextNodeInSpan(el))
    .build();
};

export const createCompositeStat = ({
  stats,
}: Pick<PathwayTextLockupProps, 'stats'>) => {
  const mediumSize = 800;

  if (!stats) return null;

  const statWrapper = new ElementBuilder()
    .withClassName('text-lockup-medium-stats')
    .withStyles({
      element: {
        marginTop: token.spacing.lg,

        [`&:has(> *:nth-child(2))`]: {
          display: `grid`,
          gridGap: `${token.spacing.md}`,
        },

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          marginTop: token.spacing.lg,
          paddingTop: token.spacing.md,
          borderTop: `1px solid ${token.color.gray.light}`,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          marginTop: token.spacing['2xl'],

          [`&:has(> *:nth-child(2))`]: {
            gridGap: `${token.spacing.lg}`,
            gridTemplateColumns: `repeat(2, 1fr)`,
          },
        },
      },
    })
    .build();

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
        imageLoading: 'lazy',
        dateSign,
      }),
    );
  }

  return new ElementBuilder()
    .withClassName('pathway-image-container-wrapper')
    .withChildren(...children)
    .withStyles({
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
    })
    .build();
};
