import * as feedElements from 'elements';
import Fetch from './api';
import * as dataComposed from './data';
import {
  NoResultsProps,
  DisplayStartProps,
  DisplayStartResultsProps,
  DisplayProps,
} from '../_types';

interface LoadMoreProps extends DisplayProps {}

interface CreateProps extends DisplayStartProps {
  displayResultStart: (props: DisplayStartResultsProps) => void;
  displayNoResults: (props: NoResultsProps) => void;
}

export const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

export const load = async (props: LoadMoreProps) => {
  const { getContainer, getOffset, displayResults, getTotalEntries } = props;
  const container = getContainer();
  const currentCount = getOffset();
  const totalEntries = getTotalEntries();

  feedElements.buttonLazyLoad.remove({ container });
  feedElements.loader.display({ container });

  Fetch.Entries({
    variables: dataComposed.apiVariables(props),
  }).then((feedData) => {
    displayResults({ feedData: feedData.entries });

    feedElements.ariaLive.update({
      container,
      message: `Showing ${
        currentCount + feedData.entries.length
      } of ${totalEntries} articles`,
    });
  });
};

export const start = async (props: CreateProps) => {
  const { displayNoResults, displayResultStart, setTotalEntries } = props;

  Fetch.Entries({
    variables: dataComposed.apiVariables(props),
  }).then((feedData) => {
    const totalEntries = feedData.count;

    if (totalEntries === 0) {
      displayNoResults({ container: props.getContainer() });
      return;
    }

    setTotalEntries(totalEntries);

    return displayResultStart({ ...props, feedData: feedData.entries });
  });
};
