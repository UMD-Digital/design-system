import { Load as AccordionLoader } from './components/accordion';
import { Load as AlertLoader } from './components/alert';
import { Load as CallToActionLoader } from './components/call-to-action';
import { Load as CardLoader } from './components/card';
import { Load as CardOverlayLoader } from './components/card-overlay';
import { Load as CarouselCardsLoader } from './components/carousel-cards';
import { Load as EventDateLoader } from './components/events-date';
import { Load as EventDateSliderLoader } from './components/events-date-slider';
import { Load as FooterLoader } from './components/footer';
import { Load as HeroLoader } from './components/hero';
import { Load as NavDrawerLoader } from './components/nav-drawer';
import { Load as NavItemLoader } from './components/nav-item';
import { Load as PathwayLoader } from './components/pathway';

import { Load as FeedNewsLoader } from './feeds/news/grid/component';
import { Load as EventsNewsLoader } from './feeds/events/grid/component';

const LoadUmdFeeds = () => {
  FeedNewsLoader();
  EventsNewsLoader();
};

const LoadUmdComponents = () => {
  AccordionLoader();
  AlertLoader();
  CardLoader();
  CallToActionLoader();
  CardOverlayLoader();
  CarouselCardsLoader();
  EventDateLoader();
  EventDateSliderLoader();
  FooterLoader();
  HeroLoader();
  NavDrawerLoader();
  NavItemLoader();
  PathwayLoader();

  LoadUmdFeeds();
};

export default LoadUmdComponents;
