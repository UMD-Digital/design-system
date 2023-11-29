import { MakeDefaultStyleTag } from 'helpers/styles';
import { Load as AlertLoader } from './components/alert/component';
import { Load as CardLoader } from './components/card/component';
import { Load as CardOverlayLoader } from './components/card-overlay/component';
import { Load as CarouselCardsLoader } from './components/carousel-cards/component';
import { Load as DateSliderLoader } from './components/events-date-slider/component';
import { Load as FooterLoader } from './components/footer/component';
import { Load as NavDropdownLoader } from './components/nav-item/component';

const LoadUmdComponents = () => {
  let styleString = AlertLoader();
  styleString += CardLoader();
  styleString += CardOverlayLoader();
  styleString += CarouselCardsLoader();
  styleString += DateSliderLoader();
  styleString += FooterLoader();
  styleString += NavDropdownLoader();

  MakeDefaultStyleTag({ styleString });
};

export default LoadUmdComponents;
