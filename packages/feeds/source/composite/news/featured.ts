import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  gridGap,
  gridOffset,
} from '@universityofmaryland/web-elements-library/layout';
import { createImageOrLinkedImage } from '@universityofmaryland/web-utilities-library/elements';
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
    let numberOfColumnsToShow = 3;
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
    const setPosition = (position: number) => {
      const overlayElement = container.querySelector(
        `.${card.overlay.imageClassRef}`,
      ) as HTMLElement;
      if (overlayElement) overlayElement.style.top = `${position}px`;
    };

    const layoutElement = gridGap({ columns: 2 });

    const displayGridOffsetResults = async ({ feedData }: FeedDisplay) => {
      let entries = [];

      if (feedData.length >= 2) {
        const offsetLayout = gridOffset({
          columns: 2,
          isLayoutReversed,
          stickyTopPosition: overwriteStickyPosition,
        });
        const firstEntry = feedData[0];
        const overlayCard = card.overlay.image({
          ...dataComposed.display({ entry: firstEntry }),
          backgroundImage: createImageOrLinkedImage({
            imageUrl: firstEntry.image[0].url,
            altText: firstEntry.image[0].altText || 'News Article Image',
            linkUrl: firstEntry.url,
            linkLabel: 'Maryland Today Article with image',
          }),
        });

        offsetLayout.element.appendChild(overlayCard.element);
        offsetLayout.element.appendChild(layoutElement.element);
        container.appendChild(offsetLayout.element);
        setStyles(offsetLayout.styles);
        setStyles(overlayCard.styles);

        entries = feedData.slice(1, 3).map((entry) =>
          card.block({
            ...dataComposed.display({ entry, isThemeDark }),
            image: createImageOrLinkedImage({
              imageUrl: entry.image[0].url,
              altText: entry.image[0].altText || 'News Article Image',
              linkUrl: entry.url,
              linkLabel: 'Maryland Today Article with image',
            }),
            isAligned: true,
            isTransparent,
          }),
        );
      } else {
        entries = feedData.map((entry) =>
          card.overlay.image({
            ...dataComposed.display({ entry, isThemeDark }),
            backgroundImage: createImageOrLinkedImage({
              imageUrl: entry.image[0].url,
              altText: entry.image[0].altText || 'News Article Image',
              linkUrl: entry.url,
              linkLabel: 'Maryland Today Article with image',
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
        card.block({
          ...dataComposed.display({ entry, isThemeDark }),
          image: createImageOrLinkedImage({
            imageUrl: entry.image[0].url,
            altText: entry.image[0].altText || 'News Article Image',
            linkUrl: entry.url,
            linkLabel: 'Maryland Today Article with image',
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

    container.appendChild(loader.element);

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
