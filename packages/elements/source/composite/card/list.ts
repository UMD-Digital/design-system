import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { textLockup, assets } from 'atomic';
import { CardListProps } from './_types';
import { type UMDElement } from '../../_types';

const smallBreakpoint = token.media.breakpointValues.small.max;
const mediumBreakpointStart = token.media.breakpointValues.medium.min;
const mediumBreakpoint = token.media.breakpointValues.large.min;

const makeDateColumn = (dateSign: UMDElement) =>
  new ElementBuilder()
    .withClassName('card-list-date-sign-wrapper')
    .withStyles({
      element: {
        width: `${token.spacing.xl}`,
        order: 1,
        alignSelf: 'flex-start',

        ...createMediaQuery('max-width', mediumBreakpoint, {
          display: 'none',
        }),
        ...createMediaQuery('min-width', mediumBreakpoint, {
          width: `${token.spacing['8xl']}`,
        }),
      },
    })
    .withChild(dateSign)
    .build();

const makeTextColumn = (props: CardListProps) => {
  const lockup = textLockup.small(props);

  return new ElementBuilder()
    .withClassName('card-list-text-wrapper')
    .withStyles({
      element: {
        flex: '1 0',

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          paddingRight: `${token.spacing.md}`,
          order: '2',
        }),

        ...createMediaQuery('min-width', mediumBreakpoint, {
          width: '208px',
        }),
      },
    })
    .withChild(lockup)
    .build();
};

const makeImageColumn = ({
  image,
  isAligned,
}: {
  image: NonNullable<CardListProps['image']>;
  isAligned?: CardListProps['isAligned'];
}) => {
  const backgroundImage = assets.image.background({
    element: image,
    isScaled: isAligned,
    isGifAllowed: false,
  });

  return new ElementBuilder()
    .withClassName('card-list-image-wrapper')
    .withStyles({
      element: {
        ...createMediaQuery('max-width', smallBreakpoint, {
          marginLeft: token.spacing.min,
          marginBottom: token.spacing.md,
          width: '120px',
          float: 'right',
          position: 'relative',
          zIndex: 99,

          ...(isAligned && {
            height: '104px',
          }),
        }),

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          display: 'block',
          width: '160px',
          order: '3',

          ...(isAligned && {
            height: '160px',
          }),
        }),

        ...createMediaQuery('min-width', mediumBreakpoint, {
          width: '208px',
        }),

        '& img': {
          ...createMediaQuery('max-width', smallBreakpoint, {
            height: 'auto !important',
          }),
        },
      },
    })
    .withChild(backgroundImage)
    .build();
};

export default (props: CardListProps) => {
  const { image, isAligned, isThemeDark, dateSign } = props;
  let children: UMDElement[] = [];

  if (image) {
    children.push(makeImageColumn({ image, isAligned }));
  }

  if (dateSign) {
    children.push(makeDateColumn(dateSign));
  }

  children.push(makeTextColumn(props));

  const wrapper = new ElementBuilder()
    .withClassName('card-list-wrapper')
    .withStyles({
      element: {
        containerType: 'inline-size',

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          display: 'flex',
          justifyContent: 'space-between',
        }),
      },
    })
    .withChildren(...children)
    .build();

  return new ElementBuilder()
    .withClassName('card-list-container')
    .withStyles({
      element: {
        height: '100%',
        overflow: 'hidden',

        ...(isThemeDark && {
          backgroundColor: token.color.black,
          color: token.color.white,
        }),
      },
    })
    .withChild(wrapper)
    .build();
};
