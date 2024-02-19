import {
  SlideInUnderlineLink,
  FadeInUnderlineLink,
  SpecialAnimationsLink,
} from './link';
import { FloatCardsIcon } from './cards-icon';
import { FloatCardsOverlay } from './cards-overlay';

export default {
  ...SlideInUnderlineLink,
  ...FadeInUnderlineLink,
  ...SpecialAnimationsLink,
  ...FloatCardsIcon,
  ...FloatCardsOverlay,
};
