import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';
import { parseDateFromElement } from '@universityofmaryland/web-utilities-library/date';
import { pin as iconPin } from '@universityofmaryland/web-icons-library/location';
import { info as iconInfo } from '@universityofmaryland/web-icons-library/indicators';
import { textLockup, assets } from 'atomic';
import { CardEventTimeProps } from './_types';
import { type UMDElement } from '../../_types';

const mediumBreakpointStart = token.media.breakpointValues.medium.min;
const smallBreakpoint = token.media.breakpointValues.small.max;

const MakeDetailItem = (props: {
  icon: string;
  text: string;
  isThemeDark?: boolean;
}) => {
  const { icon, text, isThemeDark } = props;

  const iconElement = new ElementBuilder('span').withHTML(icon).build();
  const textElement = new ElementBuilder('span').withHTML(text).build();

  return new ElementBuilder('p')
    .styled(
      elementStyles.event.meta.composeItem({
        theme: isThemeDark ? 'dark' : 'light',
      }),
    )
    .withChildren(iconElement, textElement)
    .build();
};

const makeTimeRow = ({
  startTime,
  endTime,
  isThemeDark,
}: {
  startTime: CardEventTimeProps['startTime'];
  endTime?: CardEventTimeProps['endTime'];
  isThemeDark?: boolean;
}) => {
  const startParsed = parseDateFromElement({ element: startTime });
  if (!startParsed) return null;

  let timeText = startParsed.time;
  const endParsed = parseDateFromElement({ element: endTime });

  if (endParsed && endParsed.time !== startParsed.time) {
    timeText = `${timeText} - ${endParsed.time}`;
  }

  return new ElementBuilder('p')
    .withClassName('card-event-time-row')
    .styled(
      typography.sans.compose('larger', {
        theme: isThemeDark ? 'dark' : 'light',
      }),
    )
    .withStyles({
      element: {
        marginBottom: token.spacing.sm,
      },
    })
    .withHTML(timeText)
    .build();
};

const makeMetaRow = ({
  location,
  information,
  isThemeDark,
}: {
  location?: CardEventTimeProps['location'];
  information?: CardEventTimeProps['information'];
  isThemeDark?: boolean;
}) => {
  const children: UMDElement[] = [];

  if (location?.textContent) {
    children.push(
      MakeDetailItem({
        icon: iconPin,
        text: location.textContent,
        isThemeDark,
      }),
    );
  }

  if (information?.textContent) {
    children.push(
      MakeDetailItem({
        icon: iconInfo,
        text: information.textContent,
        isThemeDark,
      }),
    );
  }

  if (children.length === 0) return null;

  return new ElementBuilder()
    .withClassName('card-event-time-meta')
    .styled(elementStyles.event.meta.wrapper)
    .withStyles({
      element: {
        marginBottom: token.spacing.sm,
      },
    })
    .withChildren(...children)
    .build();
};

const makeImageColumn = ({
  image,
  isAligned,
}: {
  image: NonNullable<CardEventTimeProps['image']>;
  isAligned?: CardEventTimeProps['isAligned'];
}) => {
  const backgroundImage = assets.image.background({
    element: image,
    isScaled: isAligned,
    isGifAllowed: false,
    imageLoading: 'lazy',
  });

  return new ElementBuilder()
    .withClassName('card-event-time-image-wrapper')
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
          order: '2',

          ...(isAligned && {
            height: '160px',
          }),
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

export const createCompositeCardEventTime = (props: CardEventTimeProps) => {
  const {
    headline,
    startTime,
    endTime,
    location,
    information,
    text,
    actions,
    image,
    isAligned,
    isThemeDark,
  } = props;

  const contentChildren: UMDElement[] = [];

  const timeRow = makeTimeRow({ startTime, endTime, isThemeDark });
  if (timeRow) contentChildren.push(timeRow);

  const metaRow = makeMetaRow({ location, information, isThemeDark });
  if (metaRow) contentChildren.push(metaRow);

  const lockup = textLockup.small({
    headline: headline || null,
    text: text || null,
    actions: actions || null,
  });
  contentChildren.push(lockup);

  const contentColumn = new ElementBuilder()
    .withClassName('card-event-time-content')
    .withStyles({
      element: {
        flex: '1 0',

        ...createMediaQuery('min-width', mediumBreakpointStart, {
          paddingRight: token.spacing.md,
          order: '1',
        }),
      },
    })
    .withChildren(...contentChildren)
    .build();

  const children: UMDElement[] = [];

  if (image) {
    children.push(makeImageColumn({ image, isAligned }));
  }

  children.push(contentColumn);

  const wrapper = new ElementBuilder()
    .withClassName('card-event-time-wrapper')
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
    .withClassName('card-event-time-container')
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
