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

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const numberOfRowsToStart =
    Number(element.getAttribute(ATTRIBUTE_ROWS)) || numberOfRowsToStartDefault;
  const numberOfColumnsToShow =
    Number(element.getAttribute(ATTRIBUTE_SHOW)) ||
    numberOfColumnsToShowDefault;

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
