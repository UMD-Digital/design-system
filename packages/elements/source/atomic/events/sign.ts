import { ElementModel } from 'model';

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
}) => {
  const startWrapper = document.createElement('p');
  const startMonthWrapper = makeDateElement({
    element: startMonth,
    isMonth: true,
    isLargeSize,
    isMultiDay,
    isThemeDark,
  });
  const startDayWrapper = makeDateElement({
    element: startDay,
    isDay: true,
    isLargeSize,
    isMultiDay,
    isThemeDark,
  });
  let styles = '';

  startWrapper.appendChild(startMonthWrapper.element);
  styles += startMonthWrapper.styles;
  startWrapper.appendChild(startDayWrapper.element);
  styles += startDayWrapper.styles;

  return { element: startWrapper, styles };
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
  const endWrapper = document.createElement('p');

  const endMonthWrapper = makeDateElement({
    element: endMonth,
    isMonth: true,
    isMultiDay: true,
    isThemeDark,
  });
  const endDayWrapper = makeDateElement({
    element: endDay,
    isDay: true,
    isMultiDay: true,
    isThemeDark,
  });
  let styles = '';

  endWrapper.appendChild(endMonthWrapper.element);
  styles += endMonthWrapper.styles;
  endWrapper.appendChild(endDayWrapper.element);
  styles += endDayWrapper.styles;

  return { element: endWrapper, styles };
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
  const container = ElementModel.event.signContainer({
    element: document.createElement('div'),
  });
  const isTheSameMonth = endMonth === startMonth;
  const isTheSameDay = endDay === startDay;
  const isMultiDay = !isTheSameMonth || !isTheSameDay;
  let styles = container.styles;

  const startBlock = makeStartDateBlock({
    startMonth,
    startDay,
    isLargeSize,
    isMultiDay,
    isThemeDark,
  });
  container.element.appendChild(startBlock.element);
  styles += startBlock.styles;

  if (isMultiDay && endDay && endMonth) {
    const srOnly = document.createElement('span');
    const dash = document.createElement('span');
    const endBlock = makeEndDateBlock({
      endDay,
      endMonth,
      isThemeDark,
    });

    srOnly.classList.add('sr-only');
    srOnly.innerHTML = 'to';

    dash.style.width = '10px';
    dash.style.height = '3px';
    dash.style.margin = '0 5px';
    dash.style.display = 'block';
    dash.style.backgroundColor = isThemeDark ? 'white' : 'black';

    container.element.appendChild(srOnly);
    container.element.appendChild(dash);
    container.element.appendChild(endBlock.element);
    styles += endBlock.styles;
  }

  return { element: container.element, styles };
};
