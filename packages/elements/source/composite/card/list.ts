import * as Styles from '@universityofmaryland/web-styles-library';
import { textLockup, assets } from 'atomic';
import { theme } from 'utilities';
import { ElementModel } from 'model';
import { CardListProps } from './_types';
import { ElementVisual } from '../../_types';

const smallBreakpoint = Styles.token.media.breakpointValues.small.max;
const mediumBreakpointStart = Styles.token.media.breakpointValues.medium.min;
const mediumBreakpoint = Styles.token.media.breakpointValues.large.min;

const makeDateColumn = (dateSign: ElementVisual) =>
  ElementModel.createDiv({
    className: 'card-list-date-sign-wrapper',
    elementStyles: {
      element: {
        width: `${Styles.token.spacing.xl}`,
        order: 1,
        alignSelf: 'flex-start',

        ...theme.media.createContainerQuery('max-width', mediumBreakpoint, {
          display: 'none',
        }),
        ...theme.media.createContainerQuery('min-width', mediumBreakpoint, {
          width: `${Styles.token.spacing['8xl']}`,
        }),
      },
    },
    children: [dateSign],
  });

const makeTextColumn = (props: CardListProps) =>
  ElementModel.createDiv({
    className: 'card-list-text-wrapper',
    elementStyles: {
      element: {
        flex: '1 0',

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            paddingRight: `${Styles.token.spacing.md}`,
            order: '2',
          },
        ),

        ...theme.media.createContainerQuery('min-width', mediumBreakpoint, {
          width: '208px',
        }),
      },
    },
    children: [textLockup.small(props)],
  });

const makeImageColumn = ({
  image,
  isAligned,
}: {
  image: NonNullable<CardListProps['image']>;
  isAligned?: CardListProps['isAligned'];
}) =>
  ElementModel.createDiv({
    className: 'card-list-image-wrapper',
    elementStyles: {
      element: {
        ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
          marginLeft: Styles.token.spacing.min,
          marginBottom: Styles.token.spacing.md,
          width: '120px',
          float: 'right',
        }),

        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            display: 'block',
            width: '160px',
            order: '3',
          },
        ),

        ...theme.media.createContainerQuery('min-width', mediumBreakpoint, {
          width: '208px',
        }),

        '& img': {
          ...theme.media.createContainerQuery('max-width', smallBreakpoint, {
            height: 'auto !important',
          }),
        },
      },
    },
    children: [
      assets.image.background({
        image,
        isScaled: isAligned,
        isAspectStandard: isAligned,
      }),
    ],
  });

export default (props: CardListProps) => {
  const { image, isAligned, isThemeDark, dateSign } = props;
  let children: ElementVisual[] = [];

  if (dateSign) {
    children.push(makeDateColumn(dateSign));
  }

  children.push(makeTextColumn(props));

  // Image
  if (image) {
    children.push(makeImageColumn({ image, isAligned }));
  }

  const wrapper = ElementModel.createDiv({
    className: 'card-list-wrapper',
    elementStyles: {
      element: {
        ...theme.media.createContainerQuery(
          'min-width',
          mediumBreakpointStart,
          {
            display: 'flex',
            justifyContent: 'space-between',
          },
        ),
      },
    },
    children,
  });

  return ElementModel.createDiv({
    className: 'card-list-container',
    elementStyles: {
      element: {
        height: '100%',
        maxWidth: `${Styles.token.spacing.maxWidth.smallest}`,
        paddingBottom: '24px',
        borderBottom: `1px solid ${Styles.token.color.gray.light}`,
        overflow: 'hidden',

        ...(isThemeDark && {
          backgroundColor: Styles.token.color.black,
          color: Styles.token.color.white,
          borderBottom: `1px solid ${Styles.token.color.gray.dark}`,
        }),
      },
    },
    children: [wrapper],
  });
};
