import { ElementModel } from 'model';

const makeDateElement = ({
  element,
  isMonth,
  isDay,
  isLargeSize,
  isMultiDay,
}: {
  element: string | HTMLElement;
  isMonth?: boolean;
  isDay?: boolean;
  isLargeSize?: boolean;
  isMultiDay?: boolean;
}) => {
  const dateElement = document.createElement('span');
  if (typeof element === 'string') {
    dateElement.innerHTML = element;
  } else {
    dateElement.appendChild(element);
  }

  if (isDay && isLargeSize && !isMultiDay) {
    return ElementModel.headline.sansExtraLarge({ element: dateElement });
  }

  if (isDay) {
    return ElementModel.headline.sansLarger({ element: dateElement });
  }

  if (isMonth && isLargeSize && !isMultiDay) {
    return ElementModel.headline.sansSmall({ element: dateElement });
  }

  return ElementModel.headline.sansMin({ element: dateElement });
};

const makeStartDateBlock = ({
  startMonth,
  startDay,
  isLargeSize,
  isMultiDay,
}: {
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  isLargeSize?: boolean;
  isMultiDay?: boolean;
}) => {
  const startWrapper = document.createElement('p');
  const startMonthWrapper = makeDateElement({
    element: startMonth,
    isMonth: true,
    isLargeSize,
    isMultiDay,
  });
  const startDayWrapper = makeDateElement({
    element: startDay,
    isDay: true,
    isLargeSize,
    isMultiDay,
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
}: {
  endDay: string | HTMLElement;
  endMonth: string | HTMLElement;
}) => {
  const endWrapper = document.createElement('p');

  const endMonthWrapper = makeDateElement({
    element: endMonth,
    isMonth: true,
    isMultiDay: true,
  });
  const endDayWrapper = makeDateElement({
    element: endDay,
    isDay: true,
    isMultiDay: true,
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
  });
  container.element.appendChild(startBlock.element);
  styles += startBlock.styles;

  if (isMultiDay && endDay && endMonth) {
    const srOnly = document.createElement('span');
    const dash = document.createElement('span');
    const endBlock = makeEndDateBlock({
      endDay,
      endMonth,
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
