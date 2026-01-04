/**
 * Component Registration Functions
 *
 * All web component registration functions for the UMD Design System.
 * Each function must be called to register its component with the browser.
 *
 * @example
 * ```typescript
 * import * as Components from '@universityofmaryland/web-components-library/web-components';
 *
 * // Register specific components
 * Components.accordion.item();
 * Components.card.standard();
 * Components.hero.base();
 * ```
 *
 * @example
 * ```typescript
 * // Import individual components for tree-shaking
 * import { CardStandard, HeroBase } from '@universityofmaryland/web-components-library/web-components';
 *
 * CardStandard();
 * HeroBase();
 * ```
 */

// Namespace exports for Components.category.variant() pattern
export * as accordion from './accordion';
export * as actions from './actions';
export * as alert from './alert';
export * as brand from './brand';
export * as card from './card';
export * as carousel from './carousel';
export * as feed from './feed';
export * as footer from './footer';
export * as hero from './hero';
export * as layout from './layout';
export * as media from './media';
export * as navigation from './navigation';
export * as pathway from './pathway';
export * as person from './person';
export * as quote from './quote';
export * as slider from './slider';
export * as social from './social';
export * as stat from './stat';
export * as tab from './tab';
export * as text from './text';

// Flat named exports for direct imports and optimal tree-shaking
// Accordion
export { AccordionItem } from './accordion';

// Actions
export { ActionsDisplay } from './actions';

// Alert
export { AlertPage, AlertPromo, AlertSite } from './alert';

// Brand
export { BrandCardStack, BrandChevronScroll } from './brand';

// Card
export {
  CardArticle,
  CardEvent,
  CardIcon,
  CardOverlay,
  CardStandard,
  CardVideo,
} from './card';

// Carousel
export {
  CarouselBase,
  CarouselCards,
  CarouselImageSingle,
  CarouselImageMultiple,
  CarouselThumbnail,
  CarouselWide,
} from './carousel';

// Feed
export {
  FeedAlert,
  FeedEventsGrid,
  FeedEventsGrouped,
  FeedEventsList,
  FeedExpertsBio,
  FeedExpertsGrid,
  FeedExpertsList,
  FeedNewsFeatured,
  FeedNewsGrid,
  FeedNewsList,
} from './feed';

// Footer
export { FooterOptions } from './footer';

// Hero
export {
  HeroBase,
  HeroVideoArrow,
  HeroGrid,
  HeroExpand,
  HeroLogo,
  HeroMinimal,
} from './hero';

// Layout
export {
  LayoutBoxLogo,
  LayoutImageExpand,
  LayoutModal,
  LayoutSectionIntroSmall,
  LayoutSectionIntroWide,
  LayoutScrollTop,
  LayoutStickyColumns,
} from './layout';

// Media
export { MediaInline, MediaGif } from './media';

// Navigation
export {
  NavigationBreadcrumb,
  NavigationDrawer,
  NavigationHeader,
  NavigationItem,
  NavigationSlider,
  NavigationSticky,
} from './navigation';

// Pathway
export { PathwayImage, PathwayHighlight } from './pathway';

// Person
export { PersonBio, PersonDisplay, PersonHero } from './person';

// Quote
export { QuoteDisplay } from './quote';

// Slider
export { SliderEventDisplay, SliderEventFeed } from './slider';

// Social
export { SocialSharing } from './social';

// Stat
export { StatDisplay } from './stat';

// Tab
export { TabDisplay } from './tab';

// Text
export { TextEventLockup } from './text';
