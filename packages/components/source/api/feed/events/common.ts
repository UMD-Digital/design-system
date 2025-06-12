import { Attributes } from 'model';
import { eventProps } from '../_types';

export const CommonFeedEventsData = ({ element }: { element: HTMLElement }) => {
  const token = Attributes.getValue.feedToken({ element });

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const categories = Attributes.getValue.feedFilterIds({ element });

  const data: eventProps = {
    token,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
    ...(categories && { categories: categories.split(',') }),
  };

  return data;
};
