import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { spacing } from '@universityofmaryland/umd-web-configuration/dist/tokens/layout.js';
import { CreateContent, ContentStyles } from './content';
import { CreateCta, CtaStyles } from './cta';
import { CreateImage, ImageStyles } from './image';
import { CardType } from '../component';
import { ELEMENTS, SLOTS } from '../globals';

const CARD_OVERLAY_CONTAINER = 'umd-card-overlay-container';
const CARD_OVERLAY_TEXT_CONTAINER = 'umd-card-overlay-text-container';
const CARD_OVERLAY_TINT_OVERLAY = 'umd-card-overlay-tint';

const VariantThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[theme="dark"] {
    background-color: ${colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="dark"] .${ELEMENTS.CONTENT_CONTAINER} {

  }
`;

const VariantImageStyles = `
  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${CARD_OVERLAY_TEXT_CONTAINER} {
    position: absolute;
    bottom: ${spacing.md};
    left: ${spacing.md};
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CONTAINER_CTA} {
    position: relative;
    bottom: 0;
    left: 0;
    margin-top: ${spacing.min};
  }

  .${CARD_OVERLAY_TINT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
  }
`;

export const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-card / inline-size; 
  }

  .${CARD_OVERLAY_CONTAINER} {
    max-width: 560px;
    min-height: 300px;
    position: relative;
    background-color: ${colors.gray.light};
    padding: ${spacing['4xl']} ${spacing.md};
  }

  ${ImageStyles}
  ${ContentStyles}
  ${CtaStyles}
  ${VariantThemeStyles}
  ${VariantImageStyles}
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const tintOverlay = document.createElement('div');
  const hasImage = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;
  const image = CreateImage({ element });
  const content = CreateContent({ element });
  const cta = CreateCta({ element });

  textContainer.classList.add(CARD_OVERLAY_TEXT_CONTAINER);

  textContainer.appendChild(content);
  textContainer.appendChild(cta);

  container.setAttribute('theme', element._theme);
  container.classList.add(CARD_OVERLAY_CONTAINER);

  container.appendChild(image);

  if (hasImage) {
    container.setAttribute('data-image', 'true');
    tintOverlay.classList.add(CARD_OVERLAY_TINT_OVERLAY);
    container.appendChild(tintOverlay);
  }

  container.appendChild(textContainer);

  return container;
};
