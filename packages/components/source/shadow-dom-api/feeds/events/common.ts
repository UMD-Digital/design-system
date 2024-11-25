import { TypeEventFeedRequirements } from 'elements/feeds/events';
import { Attributes } from 'shadow-dom-model';

export const CommonFeedEventsData = ({
  element,
  numberOfColumnsToShowDefault = 1,
  numberOfRowsToStartDefault = 5,
}: {
  element: HTMLElement;
  numberOfColumnsToShowDefault?: number;
  numberOfRowsToStartDefault?: number;
}) => {
  const token = element.getAttribute(Attributes.names.FEED_TOKEN);
  const isThemeDark = Attributes.isTheme.dark({ element });
  const categoriesAttribute = element.getAttribute(
    Attributes.names.FEED_CATEGORIES,
  );
  const numberOfRowsAttribute = element.getAttribute(
    Attributes.names.FEED_ROW_COUNT,
  );
  const numberOfColumnsAttribute = element.getAttribute(
    Attributes.names.FEED_COLUMN_COUNT,
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
    isThemeDark,
    numberOfRowsToStart,
    numberOfColumnsToShow,
    isLazyLoad:
      element.getAttribute(Attributes.names.FEED_LAZY_LOAD) ===
      Attributes.values.STATE_TRUE,
    isUnion:
      element.getAttribute(Attributes.names.FEED_UNION) !==
      Attributes.values.STATE_FALSE,
  };

  if (categoriesAttribute) {
    data.categories = categoriesAttribute.split(',');
  }

  return data;
};
