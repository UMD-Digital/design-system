import { Load as AccordionLoader } from './accordion';
import { Load as AlertLoader } from './alert';
import { Load as ArticleLoader } from './article';
import { Load as BreadcrumbLoader } from './breadcrumb';
import { Load as CallToActionLoader } from './call-to-action';
import { Load as CardLoader } from './card';
import { Load as CardOverlayLoader } from './card-overlay';
import { Load as CarouselCardsLoader } from './carousel-cards';
import { Load as EventLoader } from './event';
import { Load as EventDateLoader } from './event-date';
import { Load as EventDateSliderLoader } from './events-date-slider';
import { Load as FooterLoader } from './footer';
import { Load as HeroLoader } from './hero';
import { Load as HeroLogoLoader } from './hero-logo';
import { Load as HeroMinimalLoader } from './hero-minimal';
import { Load as LogoLoader } from './logo';
import { Load as NavDrawerLoader } from './navigation/drawer';
import { Load as NavHeader } from './navigation/header';
import { Load as NavItemLoader } from './navigation/item';
import { Load as NavSliderLoader } from './navigation/slider';
import { Load as PathwayHighlightLoader } from './pathway-highlight';
import { Load as PathwayLoader } from './pathway';
import { Load as PersonLoader } from './person';
import { Load as QuoteLoader } from './quote';
import { Load as StatLoader } from './stat';
import { Load as SectionIntroLoader } from './section-intro';
import { Load as SectionIntroWideLoader } from './section-intro-wide';
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
  FooterLoader,
  NavHeader,
  HeroLoader,
  HeroLogoLoader,
  HeroMinimalLoader,
  LogoLoader,
  NavDrawerLoader,
  NavSliderLoader,
  NavItemLoader,
  PathwayLoader,
  PathwayHighlightLoader,
  PersonLoader,
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
