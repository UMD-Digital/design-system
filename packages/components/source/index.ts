import { MakeDefaultStyleTag } from 'helpers/ui';
import { Load as AlertLoader } from './components/alert';
import { Load as CarouselCardsLoader } from './components/carousel-cards';
import { Load as DateSliderLoader } from './components/events-date-slider';
import { Load as FooterLoader } from './components/footer';
import { Load as NavDropdownLoader } from './components/nav-item';

let styleString = AlertLoader();
styleString += CarouselCardsLoader();
styleString += DateSliderLoader();
styleString += FooterLoader();
styleString += NavDropdownLoader();

MakeDefaultStyleTag({ styleString });
