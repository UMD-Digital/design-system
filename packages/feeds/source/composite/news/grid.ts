import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  grid,
  gridGap,
} from '@universityofmaryland/web-elements-library/layout';
import { createImageOrLinkedImage } from '@universityofmaryland/web-utilities-library/elements';
import { LoadingState } from 'states';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import { type BlockProps, type FeedDisplay } from './_types';
import { type ElementModel } from '../../_types';

export default (props: BlockProps): ElementModel =>
  (() => {
    const { isThemeDark, isTransparent, numberOfColumnsToShow, isTypeOverlay } =
      props;
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
      const entries = feedData.map((entry) => {
        if (isTypeOverlay) {
          return card.overlay.image({
            ...dataComposed.display({ entry }),
            backgroundImage: createImageOrLinkedImage({
              imageUrl: entry.image[0].url,
              altText: entry.image[0].altText || 'News Article Image',
              linkUrl: entry.url,
              linkLabel: 'Maryland Today Article with image',
            }),
          });
        }

        return card.block({
          ...dataComposed.display({ entry, isThemeDark }),
          image: createImageOrLinkedImage({
            imageUrl: entry.image[0].url,
            altText: entry.image[0].altText || 'News Article Image',
            linkUrl: entry.url,
            linkLabel: 'Maryland Today Article with image',
          }),
          isAligned: true,
          isTransparent,
        });
      });

      await feedDisplay.resultLoad({
        ...props,
        ...helperFunctions,
        displayResults,
        entries,
      });

      if (shadowRoot) {
        feedDisplay.setShadowStyles({
          shadowRoot,
          styles,
        });
      }
    };

    const layoutElement = isTypeOverlay
      ? grid({ columns: numberOfColumnsToShow as 2 | 3 | 4 })
      : gridGap({ columns: numberOfColumnsToShow as 2 | 3 | 4 });

    container.appendChild(loading.element);

    feedFetch.start({
      ...props,
      ...helperFunctions,
      displayResults,
      displayResultStart: feedDisplay.resultStart,
      displayNoResults: feedDisplay.noResults,
      layoutElement,
      isThemeDark,
    });

    return {
      element: container,
      styles,
      events: {
        callback,
      },
    };
  })();
