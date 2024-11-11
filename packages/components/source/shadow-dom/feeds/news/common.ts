import { WebComponents } from 'utilities';
import { TypeNewsFeedRequirements } from 'elements/feeds/news';

const { AttributesNames, AttributesValues } = WebComponents;

export const CommonFeedNewsData = ({
  element,
  numberOfColumnsToShowDefault = 1,
  numberOfRowsToStartDefault = 5,
}: {
  element: HTMLElement;
  numberOfColumnsToShowDefault?: number;
  numberOfRowsToStartDefault?: number;
}) => {
  const token = element.getAttribute(AttributesNames.FEED_TOKEN);
  const theme = element.getAttribute(AttributesNames.THEME);
  const categoriesAttribute = element.getAttribute(
    AttributesNames.FEED_CATEGORIES,
  );
  const entriesToRemove = element.getAttribute(
    AttributesNames.FEED_NOT_ENTRIES,
  );

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const numberOfRowsToStart =
    Number(element.getAttribute(AttributesNames.FEED_ROW_COUNT)) ||
    numberOfRowsToStartDefault;
  const numberOfColumnsToShow =
    Number(element.getAttribute(AttributesNames.FEED_COLUMN_COUNT)) ||
    numberOfColumnsToShowDefault;

  const data: TypeNewsFeedRequirements = {
    token,
    theme,
    numberOfRowsToStart,
    numberOfColumnsToShow,
    isLazyLoad:
      element.getAttribute(AttributesNames.FEED_LAZY_LOAD) ===
      AttributesValues.STATE_TRUE,
    isUnion:
      element.getAttribute(AttributesNames.FEED_UNION) !==
      AttributesValues.STATE_FALSE,
  };

  if (categoriesAttribute) {
    data.categories = categoriesAttribute.split(',');
  }

  if (entriesToRemove) {
    data.entriesToRemove = entriesToRemove.split(',');
  }

  return data;
};
