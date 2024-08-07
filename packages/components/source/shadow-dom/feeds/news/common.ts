import { TypeNewsFeedRequirements } from 'elements/feeds/news';

const ATTRIBUTE_TOKEN = 'token';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_ROWS = 'row-count';
const ATTRIBUTE_SHOW = 'show-count';
const ATTRIBUTE_LAZYLOAD = 'lazyload';
const ATTRIBUTE_CATEGORIES = 'categories';
const ATTRIBUTE_UNION = 'union';
const ATTRIBUTE_ENTRIES_TO_REMOVE = 'not';

export const CommonFeedNewsData = ({
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
  const entriesToRemove = element.getAttribute(ATTRIBUTE_ENTRIES_TO_REMOVE);

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const numberOfRowsToStart =
    Number(element.getAttribute(ATTRIBUTE_ROWS)) || numberOfRowsToStartDefault;
  const numberOfColumnsToShow =
    Number(element.getAttribute(ATTRIBUTE_SHOW)) ||
    numberOfColumnsToShowDefault;

  const data: TypeNewsFeedRequirements = {
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

  if (entriesToRemove) {
    data.entriesToRemove = entriesToRemove.split(',');
  }

  return data;
};
