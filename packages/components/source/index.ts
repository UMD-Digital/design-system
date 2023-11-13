import { MakeDefaultStyleTag } from 'helpers/ui';
import { Load as AlertLoader } from './components/alert/component';
import { Load as CarouselCardsLoader } from './components/carousel-cards/component';
import { Load as DateSliderLoader } from './components/events-date-slider/component';
import { Load as FooterLoader } from './components/footer/component';
import { Load as NavDropdownLoader } from './components/nav-item/component';

let styleString = AlertLoader();
styleString += CarouselCardsLoader();
styleString += DateSliderLoader();
styleString += FooterLoader();
styleString += NavDropdownLoader();

MakeDefaultStyleTag({ styleString });
