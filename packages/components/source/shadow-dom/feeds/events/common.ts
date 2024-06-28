import { TypeEventFeedRequirements } from 'elements/feeds/events';

const ATTRIBUTE_TOKEN = 'token';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ROWS = 'row-count';
const ATTRIBUTE_SHOW = 'show-count';
const ATTRIBUTE_LAZYLOAD = 'lazyload';
const ATTRIBUTE_CATEGORIES = 'categories';
const ATTRIBUTE_UNION = 'union';

export const CommonFeedEventsData = ({
  element,
  numberOfColumnsToShowDefault = 1,
  numberOfRowsToStartDefault = 5,
}: {
  element: HTMLElement;
  numberOfColumnsToShowDefault?: number;
  numberOfRowsToStartDefault?: number;
}) => {
  const token = element.getAttribute(ATTRIBUTE_TOKEN);
  const theme = element.getAttribute(ATTRIBUTE_THEME);
  const categoriesAttribute = element.getAttribute(ATTRIBUTE_CATEGORIES);
  const numberOfRowsAttribute = element.getAttribute(ATTRIBUTE_ROWS);
  const numberOfColumnsAttribute = element.getAttribute(ATTRIBUTE_SHOW);
  const isValidRowAttribute =
    numberOfRowsAttribute &&
    Number(numberOfRowsAttribute) > 0 &&
    Number(numberOfRowsAttribute) < 3;
  const isValidColumnAttribute =
    numberOfColumnsAttribute &&
    Number(numberOfColumnsAttribute) > 1 &&
    Number(numberOfColumnsAttribute) < 5;
  let numberOfRowsToStart = numberOfRowsToStartDefault;
  let numberOfColumnsToShow = numberOfColumnsToShowDefault;

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  if (isValidRowAttribute) {
    numberOfRowsToStart = Number(numberOfRowsAttribute);
  }

  if (isValidColumnAttribute) {
    numberOfColumnsToShow = Number(numberOfColumnsAttribute);
  }

  const data: TypeEventFeedRequirements = {
    token,
    theme,
    numberOfRowsToStart,
    numberOfColumnsToShow,
    isLazyLoad: element.getAttribute(ATTRIBUTE_LAZYLOAD) === 'true',
    isUnion: element.getAttribute(ATTRIBUTE_UNION) !== 'false',
  };

  if (categoriesAttribute) {
    data.categories = categoriesAttribute.split(',');
  }

  return data;
};
