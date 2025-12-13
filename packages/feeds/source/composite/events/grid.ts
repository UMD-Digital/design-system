import { Composite } from '@universityofmaryland/web-elements-library';
import { createImageOrLinkedImage } from '@universityofmaryland/web-utilities-library/elements';
import * as feedElements from 'elements';
import * as feedMacros from 'macros';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import { type BlockProps, type FeedDisplay } from './_types';
import { type ElementModel } from '../../_types';

export default (props: BlockProps): ElementModel =>
  (() => {
    const { isThemeDark, isTransparent, numberOfColumnsToShow } = props;
    const loader = feedMacros.loader.create({ isThemeDark });
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
      ${loader.styles}
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
          Composite.card.block({
            ...dataComposed.display({ entry, isThemeDark }),
            image: createImageOrLinkedImage({
              imageUrl: entry.image[0].url,
              altText: entry.image[0].altText || 'Event Image',
              linkUrl: entry.url,
              linkLabel: 'University of Maryland Event',
            }),
            isAligned: false,
            isTransparent,
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

    const layoutElement = feedElements.layout.gridGap({
      count: numberOfColumnsToShow,
    });
    container.appendChild(loader.element);

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
