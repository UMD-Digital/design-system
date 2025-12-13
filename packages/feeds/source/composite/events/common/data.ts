import { events } from '@universityofmaryland/web-elements-library/atomic';
import {
  createTextWithLink,
  createTextContainer,
} from '@universityofmaryland/web-utilities-library/elements';
import * as feedFetch from './fetch';
import {
  CommonProps,
  DisplayStartProps,
  DisplayProps,
  EventType,
  FeedDisplay,
} from '../_types';

interface LazyLoadProps extends DisplayProps {
  callback: (props: DisplayStartProps) => Promise<void>;
}

interface DataApiProps extends CommonProps {}

export const lazyLoadVariables = (props: LazyLoadProps) => ({
  ...props,
  totalEntries: props.getTotalEntries(),
  offset: props.getOffset(),
  container: props.getContainer(),
  callback: () => feedFetch.load(props),
});

export const apiVariables = (
  props: DataApiProps,
): feedFetch.TypeAPIFeedVariables => {
  const {
    categories,
    getOffset,
    token,
    numberOfRowsToStart,
    numberOfColumnsToShow = 1,
  } = props;
  const obj: feedFetch.TypeAPIFeedVariables = {
    offset: getOffset(),
    token,
    limit: numberOfRowsToStart,
  };

  if (numberOfColumnsToShow) {
    obj.limit = numberOfColumnsToShow * numberOfRowsToStart;
  }

  if (categories) {
    obj.related = categories;
  }

  return obj;
};

export const display = ({
  entry,
  isThemeDark,
}: {
  entry: EventType;
  isThemeDark?: boolean;
  isTransparent?: boolean;
}) => ({
  headline: createTextWithLink({
    text: entry.title,
    url: entry.url,
  }),
  text: createTextContainer({ text: entry.summary }),
  eventMeta: events.meta({
    ...entry,
    isThemeDark,
  }),
  isThemeDark,
});
