import postcss from 'postcss';
import {
  typography,
  spacing,
  colors,
  animatedLinks,
} from '@universityofmaryland/umd-web-configuration';
import { MakeSlot, SlotDefaultStyling } from 'helpers/ui';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { SLOTS, ELEMENTS } from '../globals';
import { CardType } from '../component';

const OVERLAY_CARD_HEADLINE = 'umd-overlay-card-headline';
const OVERLAY_CARD_EYEBROW = 'umd-overlay-card-eyebrow';
const OVERLAY_CARD_TEXT = 'umd-overlay-card-text';
const OVERLAY_CARD_DATE = 'umd-overlay-card-date';

const postcssJs = require('postcss-js');
const linkStyles = postcss().process(animatedLinks['.umd-fadein-simple-dark'], {
  parser: postcssJs,
});

export const ContentStyles = `
  .${ELEMENTS.CONTENT_CONTAINER} {
    position: relative;
    z-index: 9;
  }

  .${OVERLAY_CARD_EYEBROW} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-eyebrow'],
    })}
  }

  * + .${OVERLAY_CARD_HEADLINE} {
    margin-top: ${spacing.min}
  }

  .${OVERLAY_CARD_HEADLINE} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-larger'],
    })}
  }

  .${OVERLAY_CARD_HEADLINE} a {
    ${ConvertJSSObjectToStyles({
      styleObj: animatedLinks['.umd-slidein-underline-gray-red'],
    })}

  * + .${OVERLAY_CARD_TEXT} {
    margin-top: ${spacing.sm}
  }

  * + .${OVERLAY_CARD_DATE} {
    margin-top: ${spacing.min}
  }

  .${OVERLAY_CARD_DATE} * {
    ${ConvertJSSObjectToStyles({
      styleObj: typography['.umd-sans-min'],
    })}
    color: ${colors.gray.mediumAA};
  }

`;

export const CreateContent = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const eyebrowSlot = SlotDefaultStyling({ element, slotRef: SLOTS.EYEBROW });
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const textSlot = MakeSlot({ type: SLOTS.TEXT });
  const dateSlot = SlotDefaultStyling({ element, slotRef: SLOTS.DATE });

  container.classList.add(ELEMENTS.CONTENT_CONTAINER);

  const style = {
    top: 10,
    '&:hover': {
      top: 5,
    },
  };

  if (eyebrowSlot) {
    const eyebrowWrapper = document.createElement('div');
    eyebrowWrapper.appendChild(eyebrowSlot);
    eyebrowWrapper.classList.add(OVERLAY_CARD_EYEBROW);
    container.appendChild(eyebrowWrapper);
  }

  if (headlineSlot) {
    const headlineWrapper = document.createElement('div');
    headlineWrapper.appendChild(headlineSlot);
    headlineWrapper.classList.add(OVERLAY_CARD_HEADLINE);
    container.appendChild(headlineWrapper);
  }

  if (textSlot) {
    const textWrapper = document.createElement('div');
    textWrapper.appendChild(textSlot);
    textWrapper.classList.add(OVERLAY_CARD_TEXT);
    container.appendChild(textWrapper);
  }

  if (dateSlot) {
    const dateWrapper = document.createElement('div');
    dateWrapper.appendChild(dateSlot);
    dateWrapper.classList.add(OVERLAY_CARD_DATE);
    container.appendChild(dateWrapper);
  }

  return container;
};
