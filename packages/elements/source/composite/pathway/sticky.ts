import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createAssetContent, createTextLockupMedium } from './_common';
import { type PathwayStickyProps } from './_types';
import { type ElementModel } from '../../_types';

const mediumSize = 800;
const largeSize = 1200;

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
): ElementModel<HTMLElement> | null => {
  const { image, video, isImagePositionLeft, isImageScaled } = props;

  if (!image && !video) return null;

  return new ElementBuilder()
    .withClassName('pathway-image-container')
    .withChild(createAssetContent(props))
    .withStyles({
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
    })
    .build();
};

const createTextContent = (
  props: PathwayStickyProps,
): ElementModel<HTMLElement> => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-text-container-wrapper')
    .withChild(createTextLockupMedium(props))
    .withStyles({
      element: {
        padding: `${token.spacing.md} 0`,

        [`@container (max-width: ${mediumSize - 1}px)`]: {
          ...layout.space.horizontal.larger,
        },

        [`@container (min-width: ${mediumSize}px)`]: {
          padding: `0 ${token.spacing['2xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },

        [`@container (min-width: ${largeSize}px)`]: {
          padding: `0 ${token.spacing['6xl']}`,

          ...(props.isImagePositionLeft === false && {
            paddingLeft: '0',
          }),

          ...(props.isImagePositionLeft && {
            paddingRight: '0',
          }),
        },
      },
    })
    .build();

  const container = new ElementBuilder()
    .withClassName('pathway-text-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        ...(props.isThemeDark && {
          backgroundColor: token.color.black,
          color: token.color.white,
        }),

        ...(props.isThemeMaryland && {
          backgroundColor: token.color.red,
          color: token.color.white,
        }),

        [`@container (min-width: ${mediumSize}px)`]: {
          ...(props.isImagePositionLeft === false && {
            order: '1',
          }),
        },
      },
    })
    .build();

  return container;
};

const createLock = (props: PathwayStickyProps) => {
  const textContent = createTextContent(props);
  const assetContent = createAssetColumn(props);

  const lockWrapper = new ElementBuilder()
    .withClassName('pathway-container-lock-wrapper')
    .withStyles({
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
    });

  if (assetContent) {
    lockWrapper.withChild(assetContent);
  }
  lockWrapper.withChild(textContent);

  const lockWrapperBuilt = lockWrapper.build();

  return new ElementBuilder()
    .styled(Styles.layout.space.horizontal.larger)
    .withChild(lockWrapperBuilt)
    .withStyles({
      element: {
        [`@container (max-width: ${mediumSize - 1}px)`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    })
    .build();
};

export default (props: PathwayStickyProps) => {
  const wrapper = new ElementBuilder()
    .withClassName('pathway-sticky-container-wrapper')
    .withChild(createLock(props))
    .build();

  return new ElementBuilder()
    .withClassName('pathway-sticky-container')
    .withChild(wrapper)
    .withStyles({
      element: {
        container: 'inline-size',
        position: 'relative',
      },
    })
    .build();
};
