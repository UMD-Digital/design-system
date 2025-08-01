import { Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedMacros from 'macros';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import { type BlockProps, type FeedDisplay } from './_types';
import { type ElementModel } from '../../_types';

export default (props: BlockProps): ElementModel =>
  (() => {
    const { isThemeDark, isTransparent, numberOfColumnsToShow, isTypeOverlay } =
      props;
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
      const entries = feedData.map((entry) => {
        if (isTypeOverlay) {
          return Composite.card.overlay.image({
            ...dataComposed.display({ entry }),
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
      ? feedElements.layout.grid({ count: numberOfColumnsToShow })
      : feedElements.layout.gridGap({ count: numberOfColumnsToShow });

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
