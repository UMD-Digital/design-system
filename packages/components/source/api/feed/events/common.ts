import { Attributes } from 'model';
import { eventProps } from '../_types';

export const CommonFeedEventsData = ({ element }: { element: HTMLElement }) => {
  const token = element.getAttribute(Attributes.names.deprecated.feed.FEED_TOKEN);
  const isThemeDark = Attributes.isTheme.dark({ element });
  const categoriesAttribute = element.getAttribute(
    Attributes.names.deprecated.feed.FEED_CATEGORIES,
  );

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const data: eventProps = {
    token,
    isThemeDark,
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
  };

  if (categoriesAttribute) {
    data.categories = categoriesAttribute.split(',');
  }

  return data;
};
