import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { theme } from '@universityofmaryland/web-utilities-library/theme';

const makeDateElement = ({
  element,
  isMonth,
  isDay,
  isLargeSize,
  isMultiDay,
  isThemeDark,
}: {
  element: string | HTMLElement;
  isMonth?: boolean;
  isDay?: boolean;
  isLargeSize?: boolean;
  isMultiDay?: boolean;
  isThemeDark?: boolean;
}) => {
  const dateElement = document.createElement('span');
  if (typeof element === 'string') {
    dateElement.innerHTML = element;
  } else {
    dateElement.appendChild(element);
  }

  if (isDay && isLargeSize && !isMultiDay) {
    return new ElementBuilder(dateElement)
      .styled(
        typography.sans.compose('extralarge', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .build();
  }

  if (isDay) {
    return new ElementBuilder(dateElement)
      .styled(
        typography.sans.compose('larger', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .build();
  }

  if (isMonth && isLargeSize && !isMultiDay) {
    return new ElementBuilder(dateElement)
      .styled(
        typography.sans.compose('small', {
          theme: theme.fontColor(isThemeDark),
        }),
      )
      .build();
  }

  return new ElementBuilder(dateElement)
    .styled(
      typography.sans.compose('min', { theme: theme.fontColor(isThemeDark) }),
    )
    .build();
};

const makeStartDateBlock = ({
  startMonth,
  startDay,
  isLargeSize,
  isMultiDay,
  isThemeDark,
}: {
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  isLargeSize?: boolean;
  isMultiDay?: boolean;
  isThemeDark?: boolean;
}) => {
  const monthElement = makeDateElement({
    element: startMonth,
    isMonth: true,
    isLargeSize,
    isMultiDay,
    isThemeDark,
  });
  const dayElement = makeDateElement({
    element: startDay,
    isDay: true,
    isLargeSize,
    isMultiDay,
    isThemeDark,
  });

  return new ElementBuilder('p')
    .withClassName('event-sign-start')
    .withStyles({})
    .withChildren(monthElement, dayElement)
    .build();
};

const makeEndDateBlock = ({
  endMonth,
  endDay,
  isThemeDark,
}: {
  endDay: string | HTMLElement;
  endMonth: string | HTMLElement;
  isThemeDark?: boolean;
}) => {
  const monthElement = makeDateElement({
    element: endMonth,
    isMonth: true,
    isMultiDay: true,
    isThemeDark,
  });
  const dayElement = makeDateElement({
    element: endDay,
    isDay: true,
    isMultiDay: true,
    isThemeDark,
  });

  return new ElementBuilder('p')
    .withClassName('event-sign-end')
    .withChildren(monthElement, dayElement)
    .build();
};

export default (props: {
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  endDay?: string | HTMLElement;
  endMonth?: string | HTMLElement;
  isThemeDark?: boolean;
  isLargeSize?: boolean;
}) => {
  const {
    startMonth,
    startDay,
    endDay,
    endMonth,
    isThemeDark,
    isLargeSize = false,
  } = props;
  const isTheSameMonth = endMonth === startMonth;
  const isTheSameDay = endDay === startDay;
  const isMultiDay = !isTheSameMonth || !isTheSameDay;

  const startBlock = makeStartDateBlock({
    startMonth,
    startDay,
    isLargeSize,
    isMultiDay,
    isThemeDark,
  });

  const container = new ElementBuilder()
    .styled(elementStyles.event.sign.container)
    .withChild(startBlock);

  if (isMultiDay && !!endDay && !!endMonth) {
    const srOnly = new ElementBuilder('span')
      .withClassName('sr-only')
      .withHTML('to')
      .build();

    const dash = new ElementBuilder('span')
      .withClassName('dash')
      .withStyles({
        element: {
          width: '10px',
          height: '3px',
          margin: '13px 5px 0',
          display: 'block',
          backgroundColor: isThemeDark ? 'white' : 'black',
        },
      })
      .build();

    const endBlock = makeEndDateBlock({
      endDay: endDay!,
      endMonth: endMonth!,
      isThemeDark,
    });

    container.withChild(srOnly);
    container.withChild(dash);
    container.withChild(endBlock);
  }

  return container.build();
};
