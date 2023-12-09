import { MakeDefaultStyleTag } from 'helpers/styles';
import { Load as AlertLoader } from './components/alert/component';
import { Load as CardLoader } from './components/card/component';
import { Load as CardOverlayLoader } from './components/card-overlay/component';
import { Load as CarouselCardsLoader } from './components/carousel-cards/component';
import { Load as EventDateLoader } from './components/events-date/component';
import { Load as EventDateSliderLoader } from './components/events-date-slider/component';
import { Load as FooterLoader } from './components/footer/component';
import { Load as NavDrawerLoader } from './components/nav-drawer/component';
import { Load as NavItemLoader } from './components/nav-item/component';

const LoadUmdComponents = () => {
  let styleString = AlertLoader();
  styleString += CardLoader();
  styleString += CardOverlayLoader();
  styleString += CarouselCardsLoader();
  styleString += EventDateLoader();
  styleString += EventDateSliderLoader();
  styleString += FooterLoader();
  styleString += NavDrawerLoader();
  styleString += NavItemLoader();

  MakeDefaultStyleTag({ styleString });
};

export default LoadUmdComponents;
