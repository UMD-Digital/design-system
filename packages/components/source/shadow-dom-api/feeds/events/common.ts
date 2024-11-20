import { TypeEventFeedRequirements } from 'elements/feeds/events';
import { AttributeNames, AttributesValues } from 'shadow-dom-model';

export const CommonFeedEventsData = ({
  element,
  numberOfColumnsToShowDefault = 1,
  numberOfRowsToStartDefault = 5,
}: {
  element: HTMLElement;
  numberOfColumnsToShowDefault?: number;
  numberOfRowsToStartDefault?: number;
}) => {
  const token = element.getAttribute(AttributeNames.FEED_TOKEN);
  const theme = element.getAttribute(AttributeNames.THEME);
  const categoriesAttribute = element.getAttribute(
    AttributeNames.FEED_CATEGORIES,
  );
  const numberOfRowsAttribute = element.getAttribute(
    AttributeNames.FEED_ROW_COUNT,
  );
  const numberOfColumnsAttribute = element.getAttribute(
    AttributeNames.FEED_COLUMN_COUNT,
  );
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

  return data;
};
