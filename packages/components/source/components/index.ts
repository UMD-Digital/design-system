import { Load as AccordionLoader } from './accordion';
import { Load as AlertLoader } from './alert';
import { Load as ArticleLoader } from './article';
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
import { Load as PersonLoader } from './person';
import { Load as NavDrawerLoader } from './nav-drawer';
import { Load as NavItemLoader } from './nav-item';
import { Load as PathwayLoader } from './pathway';
import { Load as QuoteLoader } from './quote';
import { Load as StatLoader } from './stat';

export const Components = {
  AccordionLoader,
  AlertLoader,
  ArticleLoader,
  CardLoader,
  CallToActionLoader,
  CardOverlayLoader,
  CarouselCardsLoader,
  EventLoader,
  EventDateLoader,
  EventDateSliderLoader,
  FooterLoader,
  HeroLoader,
  HeroLogoLoader,
  HeroMinimalLoader,
  PersonLoader,
  NavDrawerLoader,
  NavItemLoader,
  PathwayLoader,
  QuoteLoader,
  StatLoader,
};

export default () => {
  for (const key in Components) {
    // @ts-ignore
    Components[key]();
  }
};
