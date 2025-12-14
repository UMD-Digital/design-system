import { card } from '@universityofmaryland/web-elements-library/composite';
import { stacked } from '@universityofmaryland/web-elements-library/layout';
import { createImageOrLinkedImage } from '@universityofmaryland/web-utilities-library/elements';
import { LoadingState } from 'states';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import { type ListProps, type FeedDisplay } from './_types';
import { type ElementModel } from '../../_types';

export default (props: ListProps): ElementModel =>
  (() => {
    const { isThemeDark } = props;
    // Use new class-based LoadingState API
    const loading = new LoadingState({ isThemeDark });
    const container = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    const setStyles = (additonalStyles: string) => (styles += additonalStyles);
    const getContainer = () => container;
    const getTotalEntries = () => totalEntries;
    const getOffset = () => offset;
    const getStyles = () => styles;
    const getShadowRoot = () => shadowRoot;
    let totalEntries = 0;
    let offset = 0;
    let styles = `
      ${loading.styles}
    `;
    let shadowRoot: ShadowRoot | null = null;

    const helperFunctions = {
      setTotalEntries,
      setOffset,
      setStyles,
      getContainer,
      getOffset,
      getTotalEntries,
      getStyles,
      getShadowRoot,
    };

    const callback = (shadow: ShadowRoot) => {
      shadowRoot = shadow;
    };

    const displayResults = async ({ feedData }: FeedDisplay) => {
      await feedDisplay.resultLoad({
        ...props,
        ...helperFunctions,
        displayResults,
        entries: feedData.map((entry) =>
          card.list({
            ...dataComposed.display({ entry, isThemeDark }),
            image: createImageOrLinkedImage({
              imageUrl: entry.image[0].url,
              altText: entry.image[0].altText || 'News Article Image',
              linkUrl: entry.url,
              linkLabel: 'Maryland Today Article with image',
            }),
            isAligned: false,
          }),
        ),
      });

      if (shadowRoot) {
        feedDisplay.setShadowStyles({
          shadowRoot,
          styles,
        });
      }
    };

    container.appendChild(loading.element);

    feedFetch.start({
      ...props,
      ...helperFunctions,
      displayResults,
      displayResultStart: feedDisplay.resultStart,
      displayNoResults: feedDisplay.noResults,
      layoutElement: stacked({ isThemeDark }),
    });

    return {
      element: container,
      styles,
      events: {
        callback,
      },
    };
  })();
