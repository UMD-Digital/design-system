import { Load as AccordionLoader } from './accordion';
import { Load as AlertLoader } from './alert/page';
import { Load as ArticleLoader } from './article';
import { Load as BreadcrumbLoader } from './breadcrumb';
import { Load as CallToActionLoader } from './call-to-action';
import { Load as CardLoader } from './card/default';
import { Load as CardOverlayLoader } from './card/overlay';
import { Load as CarouselCardsLoader } from './carousel/cards';
import { Load as EventLoader } from './event';
import { Load as EventDateLoader } from './event/lockup';
import { Load as EventDateSliderLoader } from './slider/events';
import { Load as FeedNewsGridLoader } from './feeds/news/grid';
import { Load as FeedNewsListLoader } from './feeds/news/list';
import { Load as EventsNewsGridLoader } from './feeds/events/grid';
import { Load as EventsNewsListLoader } from './feeds/events/list';
import { Load as FooterLoader } from './footer';
import { Load as HeroLoader } from './hero/default';
import { Load as HeroLogoLoader } from './hero/logo';
import { Load as HeroMinimalLoader } from './hero/minimal';
import { Load as LogoLoader } from './logo';
import { Load as MediaInlineLoader } from './media/inline';
import { Load as NavDrawerLoader } from './navigation/drawer';
import { Load as NavHeader } from './navigation/header';
import { Load as NavItemLoader } from './navigation/item';
import { Load as NavSliderLoader } from './navigation/slider';
import { Load as PathwayHighlightLoader } from './pathway/highlight';
import { Load as PathwayLoader } from './pathway/default';
import { Load as PersonLoader } from './person/default';
import { Load as PersonBioLoader } from './person/bio';
import { Load as QuoteLoader } from './quote';
import { Load as StatLoader } from './stat';
import { Load as SectionIntroLoader } from './section-intro/default';
import { Load as SectionIntroWideLoader } from './section-intro/wide';
import { Load as StickyColumns } from './stickly-columns';

export const Components = {
  AccordionLoader,
  AlertLoader,
  ArticleLoader,
  BreadcrumbLoader,
  CardLoader,
  CallToActionLoader,
  CardOverlayLoader,
  CarouselCardsLoader,
  EventLoader,
  EventDateLoader,
  EventDateSliderLoader,
  FeedNewsGridLoader,
  FeedNewsListLoader,
  EventsNewsGridLoader,
  EventsNewsListLoader,
  FooterLoader,
  NavHeader,
  HeroLoader,
  HeroLogoLoader,
  HeroMinimalLoader,
  LogoLoader,
  MediaInlineLoader,
  NavDrawerLoader,
  NavSliderLoader,
  NavItemLoader,
  PathwayLoader,
  PathwayHighlightLoader,
  PersonLoader,
  PersonBioLoader,
  QuoteLoader,
  StatLoader,
  SectionIntroLoader,
  SectionIntroWideLoader,
  StickyColumns,
};

export default () => {
  for (const key in Components) {
    // @ts-ignore
    Components[key]();
  }
};
