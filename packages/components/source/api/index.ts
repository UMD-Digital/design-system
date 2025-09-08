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
export { default as accordionItem } from './accordion/item';

// Actions
import actionsDisplay from './actions/display';
export { default as actionsDisplay } from './actions/display';

// Alert
import alertPage from './alert/page';
import alertPromo from './alert/promo';
import alertSite from './alert/site';
export { default as alertPage } from './alert/page';
export { default as alertPromo } from './alert/promo';
export { default as alertSite } from './alert/site';

// Brand
import brandCardStack from './brand/stack';
import brandChevronScroll from './brand/chevron-scroll';
export { default as brandCardStack } from './brand/stack';
export { default as brandChevronScroll } from './brand/chevron-scroll';

// Card
import cardArticle from './card/article';
import cardEvent from './card/event';
import cardIcon from './card/icon';
import cardOverlay from './card/overlay';
import cardStandard from './card/standard';
import cardVideo from './card/video';
export { default as cardArticle } from './card/article';
export { default as cardEvent } from './card/event';
export { default as cardIcon } from './card/icon';
export { default as cardOverlay } from './card/overlay';
export { default as cardStandard } from './card/standard';
export { default as cardVideo } from './card/video';

// Carousel
import carouselBase from './carousel/base';
import carouselCards from './carousel/cards';
import carouselImageSingle from './carousel/image/single';
import carouselImageMultiple from './carousel/image/multiple';
import carouselThumbnail from './carousel/thumbnail';
import carouselWide from './carousel/wide';
export { default as carouselBase } from './carousel/base';
export { default as carouselCards } from './carousel/cards';
export { default as carouselImageSingle } from './carousel/image/single';
export { default as carouselImageMultiple } from './carousel/image/multiple';
export { default as carouselThumbnail } from './carousel/thumbnail';
export { default as carouselWide } from './carousel/wide';

// Feed
import feedEventsGrid from './feed/events/grid';
import feedEventsGrouped from './feed/events/grouped';
import feedEventsList from './feed/events/list';
import feedNewsFeatured from './feed/news/featured';
import feedNewsGrid from './feed/news/grid';
import feedNewsList from './feed/news/list';
import feedAlert from './feed/alert';

export { default as feedEventsGrid } from './feed/events/grid';
export { default as feedEventsGrouped } from './feed/events/grouped';
export { default as feedEventsList } from './feed/events/list';
export { default as feedNewsFeatured } from './feed/news/featured';
export { default as feedNewsGrid } from './feed/news/grid';
export { default as feedNewsList } from './feed/news/list';
export { default as feedAlert } from './feed/alert';

// Footer
import footerOptions from './footer/options';
export { default as footerOptions } from './footer/options';

// Hero
import heroBase from './hero/base';
import heroVideoArrow from './hero/custom/video';
import heroGrid from './hero/custom/grid';
import heroExpand from './hero/custom/expand';
import heroLogo from './hero/logo';
import heroMinimal from './hero/minimal';
export { default as heroBase } from './hero/base';
export { default as heroVideoArrow } from './hero/custom/video';
export { default as heroGrid } from './hero/custom/grid';
export { default as heroExpand } from './hero/custom/expand';
export { default as heroLogo } from './hero/logo';
export { default as heroMinimal } from './hero/minimal';

// Layout
import layoutBoxLogo from './layout/box-logo';
import layoutImageExpand from './layout/image-expand';
import layoutModal from './layout/modal';
import layoutSectionIntroSmall from './layout/section-intro/small';
import layoutSectionIntroWide from './layout/section-intro/wide';
import layoutScrollTop from './layout/scroll-top';
import layoutStickyColumns from './layout/sticky-columns';
export { default as layoutBoxLogo } from './layout/box-logo';
export { default as layoutImageExpand } from './layout/image-expand';
export { default as layoutModal } from './layout/modal';
export { default as layoutSectionIntroSmall } from './layout/section-intro/small';
export { default as layoutSectionIntroWide } from './layout/section-intro/wide';
export { default as layoutScrollTop } from './layout/scroll-top';
export { default as layoutStickyColumns } from './layout/sticky-columns';

// Media
import mediaInline from './media/inline';
import mediaGif from './media/gif';
export { default as mediaInline } from './media/inline';
export { default as mediaGif } from './media/gif';

// Navigation
import navigationBreadcrumb from './navigation/breadcrumb';
import navigationDrawer from './navigation/drawer';
import navigationHeader from './navigation/header';
import navigationItem from './navigation/item';
import navigationSlider from './navigation/slider';
import navigationSticky from './navigation/sticky';

export { default as navigationBreadcrumb } from './navigation/breadcrumb';
export { default as navigationDrawer } from './navigation/drawer';
export { default as navigationHeader } from './navigation/header';
export { default as navigationItem } from './navigation/item';
export { default as navigationSlider } from './navigation/slider';
export { default as navigationSticky } from './navigation/sticky';

// Pathway
import pathwayImage from './pathway/image';
import pathwayHighlight from './pathway/highlight';
export { default as pathwayImage } from './pathway/image';
export { default as pathwayHighlight } from './pathway/highlight';

// Person
import personBio from './person/bio';
import personDisplay from './person/display';
import personHero from './person/hero';
export { default as personBio } from './person/bio';
export { default as personDisplay } from './person/display';
export { default as personHero } from './person/hero';

// Quote
import quoteDisplay from './quote/display';
export { default as quoteDisplay } from './quote/display';

// Slider
import sliderEventDisplay from './slider/event/display';
import sliderEventFeed from './slider/event/feed';
export { default as sliderEventDisplay } from './slider/event/display';
export { default as sliderEventFeed } from './slider/event/feed';

// Social
import socialSharing from './social/sharing';
export { default as socialSharing } from './social/sharing';

// Stat
import statDisplay from './stat/display';
export { default as statDisplay } from './stat/display';

// Tab
import tabDisplay from './tab/display';
export { default as tabDisplay } from './tab/display';

// Text
import textEventLockup from './text/event-lockup';
export { default as textEventLockup } from './text/event-lockup';

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
