/**
 * Component Registration Functions
 *
 * All web component registration functions for the UMD Design System.
 * Each function must be called to register its component with the browser.
 *
 * @example
 * ```typescript
 * import * as Components from '@universityofmaryland/web-components-library/api';
 *
 * // Register specific components
 * Components.accordion.item();
 * Components.card.standard();
 * Components.hero.base();
 * ```
 */

// Accordion
import accordionItem from './accordion/item';
/** @internal */ export { default as accordionItem } from './accordion/item';

// Actions
import actionsDisplay from './actions/display';
/** @internal */ export { default as actionsDisplay } from './actions/display';

// Alert
import alertPage from './alert/page';
import alertPromo from './alert/promo';
import alertSite from './alert/site';
/** @internal */ export { default as alertPage } from './alert/page';
/** @internal */ export { default as alertPromo } from './alert/promo';
/** @internal */ export { default as alertSite } from './alert/site';

// Brand
import brandCardStack from './brand/stack';
import brandChevronScroll from './brand/chevron-scroll';
/** @internal */ export { default as brandCardStack } from './brand/stack';
/** @internal */ export { default as brandChevronScroll } from './brand/chevron-scroll';

// Card
import cardArticle from './card/article';
import cardEvent from './card/event';
import cardIcon from './card/icon';
import cardOverlay from './card/overlay';
import cardStandard from './card/standard';
import cardVideo from './card/video';
/** @internal */ export { default as cardArticle } from './card/article';
/** @internal */ export { default as cardEvent } from './card/event';
/** @internal */ export { default as cardIcon } from './card/icon';
/** @internal */ export { default as cardOverlay } from './card/overlay';
/** @internal */ export { default as cardStandard } from './card/standard';
/** @internal */ export { default as cardVideo } from './card/video';

// Carousel
import carouselBase from './carousel/base';
import carouselCards from './carousel/cards';
import carouselImageSingle from './carousel/image/single';
import carouselImageMultiple from './carousel/image/multiple';
import carouselThumbnail from './carousel/thumbnail';
import carouselWide from './carousel/wide';
/** @internal */ export { default as carouselBase } from './carousel/base';
/** @internal */ export { default as carouselCards } from './carousel/cards';
/** @internal */ export { default as carouselImageSingle } from './carousel/image/single';
/** @internal */ export { default as carouselImageMultiple } from './carousel/image/multiple';
/** @internal */ export { default as carouselThumbnail } from './carousel/thumbnail';
/** @internal */ export { default as carouselWide } from './carousel/wide';

// Feed
import feedEventsGrid from './feed/events/grid';
import feedEventsGrouped from './feed/events/grouped';
import feedEventsList from './feed/events/list';
import feedNewsFeatured from './feed/news/featured';
import feedNewsGrid from './feed/news/grid';
import feedNewsList from './feed/news/list';
import feedAlert from './feed/alert';

/** @internal */ export { default as feedEventsGrid } from './feed/events/grid';
/** @internal */ export { default as feedEventsGrouped } from './feed/events/grouped';
/** @internal */ export { default as feedEventsList } from './feed/events/list';
/** @internal */ export { default as feedNewsFeatured } from './feed/news/featured';
/** @internal */ export { default as feedNewsGrid } from './feed/news/grid';
/** @internal */ export { default as feedNewsList } from './feed/news/list';
/** @internal */ export { default as feedAlert } from './feed/alert';

// Footer
import footerOptions from './footer/options';
/** @internal */ export { default as footerOptions } from './footer/options';

// Hero
import heroBase from './hero/base';
import heroVideoArrow from './hero/custom/video';
import heroGrid from './hero/custom/grid';
import heroExpand from './hero/custom/expand';
import heroLogo from './hero/logo';
import heroMinimal from './hero/minimal';
/** @internal */ export { default as heroBase } from './hero/base';
/** @internal */ export { default as heroVideoArrow } from './hero/custom/video';
/** @internal */ export { default as heroGrid } from './hero/custom/grid';
/** @internal */ export { default as heroExpand } from './hero/custom/expand';
/** @internal */ export { default as heroLogo } from './hero/logo';
/** @internal */ export { default as heroMinimal } from './hero/minimal';

// Layout
import layoutBoxLogo from './layout/box-logo';
import layoutImageExpand from './layout/image-expand';
import layoutModal from './layout/modal';
import layoutSectionIntroSmall from './layout/section-intro/small';
import layoutSectionIntroWide from './layout/section-intro/wide';
import layoutScrollTop from './layout/scroll-top';
import layoutStickyColumns from './layout/sticky-columns';
/** @internal */ export { default as layoutBoxLogo } from './layout/box-logo';
/** @internal */ export { default as layoutImageExpand } from './layout/image-expand';
/** @internal */ export { default as layoutModal } from './layout/modal';
/** @internal */ export { default as layoutSectionIntroSmall } from './layout/section-intro/small';
/** @internal */ export { default as layoutSectionIntroWide } from './layout/section-intro/wide';
/** @internal */ export { default as layoutScrollTop } from './layout/scroll-top';
/** @internal */ export { default as layoutStickyColumns } from './layout/sticky-columns';

// Media
import mediaInline from './media/inline';
import mediaGif from './media/gif';
/** @internal */ export { default as mediaInline } from './media/inline';
/** @internal */ export { default as mediaGif } from './media/gif';

// Navigation
import navigationBreadcrumb from './navigation/breadcrumb';
import navigationDrawer from './navigation/drawer';
import navigationHeader from './navigation/header';
import navigationItem from './navigation/item';
import navigationSlider from './navigation/slider';
import navigationSticky from './navigation/sticky';

/** @internal */ export { default as navigationBreadcrumb } from './navigation/breadcrumb';
/** @internal */ export { default as navigationDrawer } from './navigation/drawer';
/** @internal */ export { default as navigationHeader } from './navigation/header';
/** @internal */ export { default as navigationItem } from './navigation/item';
/** @internal */ export { default as navigationSlider } from './navigation/slider';
/** @internal */ export { default as navigationSticky } from './navigation/sticky';

// Pathway
import pathwayImage from './pathway/image';
import pathwayHighlight from './pathway/highlight';
/** @internal */ export { default as pathwayImage } from './pathway/image';
/** @internal */ export { default as pathwayHighlight } from './pathway/highlight';

// Person
import personBio from './person/bio';
import personDisplay from './person/display';
import personHero from './person/hero';
/** @internal */ export { default as personBio } from './person/bio';
/** @internal */ export { default as personDisplay } from './person/display';
/** @internal */ export { default as personHero } from './person/hero';

// Quote
import quoteDisplay from './quote/display';
/** @internal */ export { default as quoteDisplay } from './quote/display';

// Slider
import sliderEventDisplay from './slider/event/display';
import sliderEventFeed from './slider/event/feed';
/** @internal */ export { default as sliderEventDisplay } from './slider/event/display';
/** @internal */ export { default as sliderEventFeed } from './slider/event/feed';

// Social
import socialSharing from './social/sharing';
/** @internal */ export { default as socialSharing } from './social/sharing';

// Stat
import statDisplay from './stat/display';
/** @internal */ export { default as statDisplay } from './stat/display';

// Tab
import tabDisplay from './tab/display';
/** @internal */ export { default as tabDisplay } from './tab/display';

// Text
import textEventLockup from './text/event-lockup';
/** @internal */ export { default as textEventLockup } from './text/event-lockup';

// Grouped exports for convenience
export const accordion = {
  item: accordionItem,
};

export const actions = {
  display: actionsDisplay,
};

export const alert = {
  page: alertPage,
  promo: alertPromo,
  site: alertSite,
};

export const brand = {
  cardStack: brandCardStack,
  chevronScroll: brandChevronScroll,
};

export const card = {
  article: cardArticle,
  event: cardEvent,
  icon: cardIcon,
  overlay: cardOverlay,
  standard: cardStandard,
  video: cardVideo,
};

export const carousel = {
  base: carouselBase,
  cards: carouselCards,
  imageSingle: carouselImageSingle,
  imageMultiple: carouselImageMultiple,
  thumbnail: carouselThumbnail,
  wide: carouselWide,
};

export const feed = {
  alert: feedAlert,
  eventsGrid: feedEventsGrid,
  eventsGrouped: feedEventsGrouped,
  eventsList: feedEventsList,
  newsFeatured: feedNewsFeatured,
  newsGrid: feedNewsGrid,
  newsList: feedNewsList,
};

export const footer = {
  options: footerOptions,
};

export const hero = {
  base: heroBase,
  videoArrow: heroVideoArrow,
  grid: heroGrid,
  expand: heroExpand,
  logo: heroLogo,
  minimal: heroMinimal,
};

export const layout = {
  boxLogo: layoutBoxLogo,
  imageExpand: layoutImageExpand,
  modal: layoutModal,
  sectionIntroSmall: layoutSectionIntroSmall,
  sectionIntroWide: layoutSectionIntroWide,
  scrollTop: layoutScrollTop,
  stickyColumns: layoutStickyColumns,
};

export const media = {
  inline: mediaInline,
  gif: mediaGif,
};

export const navigation = {
  breadcrumb: navigationBreadcrumb,
  drawer: navigationDrawer,
  header: navigationHeader,
  item: navigationItem,
  slider: navigationSlider,
  sticky: navigationSticky,
};

export const pathway = {
  image: pathwayImage,
  highlight: pathwayHighlight,
};

export const person = {
  bio: personBio,
  display: personDisplay,
  hero: personHero,
};

export const quote = {
  display: quoteDisplay,
};

export const slider = {
  eventDisplay: sliderEventDisplay,
  eventFeed: sliderEventFeed,
};

export const social = {
  sharing: socialSharing,
};

export const stat = {
  display: statDisplay,
};

export const tab = {
  display: tabDisplay,
};

export const text = {
  eventLockup: textEventLockup,
};
