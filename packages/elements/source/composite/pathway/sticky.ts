import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { createAssetContent, createTextLockupMedium } from './_common';
import { type PathwayStickyProps } from './_types';
import { type ElementVisual } from '../../_types';

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

const createTextContent = (props: PathwayStickyProps): ElementVisual => {
  const wrapper = ElementModel.createDiv({
    className: 'pathway-text-container-wrapper',
    children: [createTextLockupMedium(props)],
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
