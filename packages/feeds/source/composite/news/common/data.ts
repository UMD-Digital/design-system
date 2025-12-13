import {
  createTextContainer,
  createTextWithLink,
  createTimeElement,
} from '@universityofmaryland/web-utilities-library/elements';
import * as feedFetch from './fetch';
import {
  CommonProps,
  DisplayStartProps,
  DisplayProps,
  EntryType,
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
    isUnion,
    categories,
    getOffset,
    token,
    numberOfRowsToStart,
    numberOfColumnsToShow = 1,
    entriesToRemove,
  } = props;
  const obj: feedFetch.TypeAPIFeedVariables = {
    offset: getOffset(),
    token,
    limit: numberOfRowsToStart,
  };

  if (numberOfColumnsToShow) {
    obj.limit = numberOfColumnsToShow * numberOfRowsToStart;
  }

  if (!isUnion && categories) {
    obj.relatedToAll = categories;
  }

  if (isUnion && categories) {
    obj.related = categories;
  }

  if (entriesToRemove) {
    obj.not = ['not', ...entriesToRemove];
  }

  return obj;
};

export const display = ({
  entry,
  isThemeDark,
}: {
  entry: EntryType;
  isThemeDark?: boolean;
  isTransparent?: boolean;
}) => ({
  newsId: entry.id.toString(),
  headline: createTextWithLink({
    text: entry.title,
    url: entry.url,
  }),
  text: createTextContainer({ text: entry.summary }),
  date: createTimeElement({
    datetime: entry.date,
    displayText: entry.dateFormatted,
  }),
  isThemeDark,
});
