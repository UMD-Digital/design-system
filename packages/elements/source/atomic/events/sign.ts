import { ElementModel } from 'model';
import { type ElementVisual } from '../../_types';

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
    return ElementModel.headline.sansExtraLarge({
      element: dateElement,
      isThemeDark,
    });
  }

  if (isDay) {
    return ElementModel.headline.sansLarger({
      element: dateElement,
      isThemeDark,
    });
  }

  if (isMonth && isLargeSize && !isMultiDay) {
    return ElementModel.headline.sansSmall({
      element: dateElement,
      isThemeDark,
    });
  }

  return ElementModel.headline.sansMin({ element: dateElement, isThemeDark });
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
}) =>
  ElementModel.createParagraph({
    className: 'event-sign-start',
    children: [
      makeDateElement({
        element: startMonth,
        isMonth: true,
        isLargeSize,
        isMultiDay,
        isThemeDark,
      }),
      makeDateElement({
        element: startDay,
        isDay: true,
        isLargeSize,
        isMultiDay,
        isThemeDark,
      }),
    ],
  });

const makeEndDateBlock = ({
  endMonth,
  endDay,
  isThemeDark,
}: {
  endDay: string | HTMLElement;
  endMonth: string | HTMLElement;
  isThemeDark?: boolean;
}) =>
  ElementModel.createParagraph({
    className: 'event-sign-end',
    children: [
      makeDateElement({
        element: endMonth,
        isMonth: true,
        isMultiDay: true,
        isThemeDark,
      }),
      makeDateElement({
        element: endDay,
        isDay: true,
        isMultiDay: true,
        isThemeDark,
      }),
    ],
  });

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
  let children: ElementVisual[] = [];

  children.push(
    makeStartDateBlock({
      startMonth,
      startDay,
      isLargeSize,
      isMultiDay,
      isThemeDark,
    }),
  );

  if (isMultiDay && endDay && endMonth) {
    const srOnly = ElementModel.createSpan({
      className: 'sr-only',
    });
    const dash = ElementModel.createSpan({
      className: 'dash',
      elementStyles: {
        element: {
          width: '10px',
          height: '3px',
          margin: '13px 5px 0',
          display: 'block',
          backgroundColor: isThemeDark ? 'white' : 'black',
        },
      },
    });

    srOnly.element.innerHTML = 'to';

    children.push(
      srOnly,
      dash,
      makeEndDateBlock({
        endDay,
        endMonth,
        isThemeDark,
      }),
    );
  }

  return ElementModel.event.signContainer({
    element: document.createElement('div'),
    children,
  });
};
