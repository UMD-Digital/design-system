import { Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import { BlockProps, FeedDisplay } from './_types';

export default (props: BlockProps) =>
  (() => {
    const { isThemeDark, isTransparent, numberOfColumnsToShow, isTypeOverlay } =
      props;
    const loader = feedElements.loader.create();
    const container = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    const setStyles = (additonalStyles: string) => (styles += additonalStyles);
    const getContainer = () => container;
    const getTotalEntries = () => totalEntries;
    const getOffset = () => offset;
    let totalEntries = 0;
    let offset = 0;
    let styles = `
      ${feedElements.noResultStyles}
      ${feedElements.loaderStyles}
    `;
    let shadowRoot: ShadowRoot | null = null;

    const helperFunctions = {
      setTotalEntries,
      setOffset,
      setStyles,
      getContainer,
      getOffset,
      getTotalEntries,
    };

    const callback = (shadow: ShadowRoot) => {
      shadowRoot = shadow;
    };

    const displayResults = async ({ feedData }: FeedDisplay) => {
      const entries = feedData.map((entry) => {
        if (isTypeOverlay) {
          return Composite.card.overlay.image({
            ...dataComposed.display({ entry, isThemeDark }),
            backgroundImage: feedElements.asset.standard({
              images: entry.image,
              url: entry.url,
            }),
          });
        }

        return Composite.card.block({
          ...dataComposed.display({ entry, isThemeDark }),
          image: feedElements.asset.standard({
            images: entry.image,
            url: entry.url,
          }),
          isAligned: false,
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
      ? feedElements.layout.grid({ count: numberOfColumnsToShow })
      : feedElements.layout.gridGap({ count: numberOfColumnsToShow });

    container.appendChild(loader);

    feedFetch.start({
      ...props,
      ...helperFunctions,
      displayResults,
      displayResultStart: feedDisplay.resultStart,
      displayNoResults: feedDisplay.noResults,
      layoutElement,
    });

    return {
      element: container,
      styles,
      events: {
        callback,
      },
    };
  })();
