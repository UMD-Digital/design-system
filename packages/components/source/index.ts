import { Load as AlertLoader } from './components/alert/component';
import { Load as CallToActionLoader } from './components/call-to-action/component';
import { Load as CardLoader } from './components/card/component';
import { Load as CardOverlayLoader } from './components/card-overlay/component';
import { Load as CarouselCardsLoader } from './components/carousel-cards/component';
import { Load as EventDateLoader } from './components/events-date/component';
import { Load as EventDateSliderLoader } from './components/events-date-slider/component';
import { Load as FooterLoader } from './components/footer/component';
import { Load as NavDrawerLoader } from './components/nav-drawer/component';
import { Load as NavItemLoader } from './components/nav-item/component';
import { Load as PathwayLoader } from './components/pathway/component';
import { Load as AccordionLoader } from './components/accordion/component';

import { Load as FeedNewsLoader } from './feeds/news/component';

const LoadUmdFeeds = () => {
  FeedNewsLoader();
};

const LoadUmdComponents = () => {
  AlertLoader();
  CardLoader();
  CallToActionLoader();
  CardOverlayLoader();
  CarouselCardsLoader();
  EventDateLoader();
  EventDateSliderLoader();
  FooterLoader();
  NavDrawerLoader();
  NavItemLoader();
  PathwayLoader();
  AccordionLoader();

  LoadUmdFeeds();
};

export default LoadUmdComponents;
