import * as Styles from '@universityofmaryland/web-styles-library';
import { Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedMacros from 'macros';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import {
  type DisplayStartResultsProps,
  type FeaturedProps,
  type FeedDisplay,
} from './_types';
import { type ElementModel } from '../../_types';

export default (props: FeaturedProps): ElementModel =>
  (() => {
    const {
      isThemeDark,
      isLazyLoad,
      isLayoutReversed,
      isTransparent,
      overwriteStickyPosition,
    } = props;
    const loader = feedMacros.loader.create();
    const container = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    const setStyles = (additonalStyles: string) => (styles += additonalStyles);
    const getContainer = () => container;
    const getTotalEntries = () => totalEntries;
    const getOffset = () => offset;
    const getStyles = () => styles;
    const getShadowRoot = () => shadowRoot;
    let numberOfColumnsToShow = 3;
    let totalEntries = 0;
    let offset = 0;
    let styles = `
      ${feedMacros.loaderStyles}
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
    const setPosition = (position: number) => {
      const overlayElement = container.querySelector(
        `.${Styles.element.composite.card.overlay.image.tint.className}`,
      ) as HTMLElement;

      if (overlayElement) overlayElement.style.top = `${position}px`;
    };

    const layoutElement = feedElements.layout.gridGap({ count: 2 });

    const displayGridOffsetResults = async ({ feedData }: FeedDisplay) => {
      let entries = [];

      if (feedData.length >= 2) {
        const offsetLayout = feedElements.layout.gridOffsetGap({
          count: 2,
          isLayoutReversed,
          overwriteStickyPosition,
        });
        const firstEntry = feedData[0];
        const overlayCard = Composite.card.overlay.image({
          ...dataComposed.display({ entry: firstEntry }),
          backgroundImage: feedElements.asset.standard({
            images: firstEntry.image,
            url: firstEntry.url,
          }),
        });

        offsetLayout.element.appendChild(overlayCard.element);
        offsetLayout.element.appendChild(layoutElement.element);
        container.appendChild(offsetLayout.element);
        setStyles(offsetLayout.styles);
        setStyles(overlayCard.styles);

        entries = feedData.slice(1, 3).map((entry) =>
          Composite.card.block({
            ...dataComposed.display({ entry, isThemeDark }),
            image: feedElements.asset.standard({
              images: entry.image,
              url: entry.url,
            }),
            isAligned: true,
            isTransparent,
          }),
        );
      } else {
        entries = feedData.map((entry) =>
          Composite.card.overlay.image({
            ...dataComposed.display({ entry, isThemeDark }),
            backgroundImage: feedElements.asset.standard({
              images: entry.image,
              url: entry.url,
            }),
          }),
        );

        container.appendChild(layoutElement.element);
      }

      await feedDisplay.resultLoad({
        ...props,
        ...helperFunctions,
        numberOfColumnsToShow: 2,
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

    const displayResults = async ({ feedData }: FeedDisplay) => {
      const entries = feedData.map((entry) =>
        Composite.card.block({
          ...dataComposed.display({ entry, isThemeDark }),
          image: feedElements.asset.standard({
            images: entry.image,
            url: entry.url,
          }),
          isAligned: true,
          isTransparent,
        }),
      );

      await feedDisplay.resultLoad({
        ...props,
        ...helperFunctions,
        numberOfColumnsToShow: 2,
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

    const resultStart = (props: DisplayStartResultsProps) => {
      const { feedData, setOffset, getOffset } = props;
      const totalEntries = getTotalEntries();
      const showAmount = 3;
      const message = isLazyLoad
        ? `Showing ${showAmount} of ${totalEntries} articles`
        : `Showing ${showAmount} articles`;

      setOffset(getOffset() + 1);

      if (totalEntries) setTotalEntries(totalEntries);

      layoutElement.element.setAttribute(
        'id',
        feedDisplay.ID_GRID_LAYOUT_CONTAINER,
      );

      setStyles(layoutElement.styles);

      displayGridOffsetResults({ feedData });

      container.appendChild(
        feedMacros.ariaLive.create({
          message,
        }),
      );
    };

    container.appendChild(loader);

    feedFetch.start({
      ...props,
      ...helperFunctions,
      numberOfColumnsToShow,
      displayResults,
      displayResultStart: resultStart,
      displayNoResults: feedDisplay.noResults,
      layoutElement,
    });

    return {
      element: container,
      styles,
      events: {
        callback,
        setPosition,
      },
    };
  })();
