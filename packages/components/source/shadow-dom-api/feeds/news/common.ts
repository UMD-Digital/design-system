import { Attributes, AttributeNames, AttributesValues } from 'shadow-dom-model';
import { TypeNewsFeedRequirements } from 'elements/feeds/news';

export const CommonFeedNewsData = ({
  element,
  numberOfColumnsToShowDefault = 1,
  numberOfRowsToStartDefault = 5,
}: {
  element: HTMLElement;
  numberOfColumnsToShowDefault?: number;
  numberOfRowsToStartDefault?: number;
}) => {
  const token = element.getAttribute(AttributeNames.FEED_TOKEN);
  const isThemeDark = Attributes.isThemeDark({ element });
  const categoriesAttribute = element.getAttribute(
    AttributeNames.FEED_CATEGORIES,
  );
  const entriesToRemove = element.getAttribute(AttributeNames.FEED_NOT_ENTRIES);

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const numberOfRowsToStart =
    Number(element.getAttribute(AttributeNames.FEED_ROW_COUNT)) ||
    numberOfRowsToStartDefault;
  const numberOfColumnsToShow =
    Number(element.getAttribute(AttributeNames.FEED_COLUMN_COUNT)) ||
    numberOfColumnsToShowDefault;

  const data: TypeNewsFeedRequirements = {
    token,
    isThemeDark,
    numberOfRowsToStart,
    numberOfColumnsToShow,
    isLazyLoad:
      element.getAttribute(AttributeNames.FEED_LAZY_LOAD) ===
      AttributesValues.STATE_TRUE,
    isUnion:
      element.getAttribute(AttributeNames.FEED_UNION) !==
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
