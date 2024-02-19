import {
  SlideInUnderlineLink,
  FadeInUnderlineLink,
  SpecialAnimationsLink,
} from './link';
import { FloatCardsIconGrid } from './cards-icon-grid';
import { FloatCardsOverlayGrid } from './cards-overlay-grid';

export default {
  ...SlideInUnderlineLink,
  ...FadeInUnderlineLink,
  ...SpecialAnimationsLink,
  ...FloatCardsIconGrid,
  ...FloatCardsOverlayGrid,
};
