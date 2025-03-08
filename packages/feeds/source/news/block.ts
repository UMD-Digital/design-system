import { Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as newsCommon from './common';
import { BlockProps, FeedDisplay } from './_types';

export default (props: BlockProps) =>
  (() => {
    const { isThemeDark, isTransparent } = props;
    const loader = feedElements.loader.create();
    const container = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    const setStyles = (styles: string) => (compliedStyles += styles);
    const getContainer = () => container;
    const getTotalEntries = () => totalEntries;
    const getOffset = () => offset;
    let totalEntries = 0;
    let offset = 0;
    let compliedStyles = `
      ${feedElements.noResultStyles}
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
      await newsCommon.displayResultLoad({
        ...props,
        ...helperFunctions,
        displayResults,
        entries: feedData.map((entry) =>
          Composite.card.block({
            ...newsCommon.dataDisplay({ entry, isThemeDark }),
            image: feedElements.asset.standard({
              images: entry.image,
              url: entry.url,
            }),
            isAligned: false,
            isTransparent,
          }),
        ),
      });

      if (shadowRoot) {
        newsCommon.setShadowStyles({
          shadowRoot,
          styles: compliedStyles,
        });
      }
    };

    container.appendChild(loader);

    newsCommon.createFeed({
      ...props,
      ...helperFunctions,
      displayResults,
      displayResultStart: newsCommon.displayResultStart,
      displayNoResults: newsCommon.displayNoResults,
    });

    return {
      element: container,
      styles: '',
      events: {
        callback,
      },
    };
  })();
