import {
  animatedLinks,
  colors,
  richText,
  spacing,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CreateContent, ContentStyles } from './content';
import { CreateImage, ImageStyles } from './image';
import { CreateCta, CtaStyles } from './cta';
import { CreateCtaIcon, CtaIconStyles } from './cta-icon';
import { CardType } from '../component';
import { ELEMENTS, SLOTS } from '../globals';

const CARD_OVERLAY_CONTAINER = 'umd-card-overlay-container';
const CARD_OVERLAY_TEXT_CONTAINER = 'umd-card-overlay-text-container';
const CARD_OVERLAY_TINT_OVERLAY = 'umd-card-overlay-tint';

// prettier-ignore
const VariantLightThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    background-color: ${colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} svg {
    fill: ${colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${colors.white};
    border: 1px solid ${colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg,
  .${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg {
    fill: ${colors.gray.darker};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[theme="light"] .${ELEMENTS.CARD_OVERLAY_HEADLINE} a`]:
      animatedLinks['.umd-slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const VariantDarkThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[theme="dark"] {
    background-color: ${colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="dark"] * {
    color: ${colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="dark"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[theme="dark"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${colors.gray.darker};
    border: 1px solid ${colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[theme="dark"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg path,
  .${CARD_OVERLAY_CONTAINER}[theme="dark"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg path {
    fill: ${colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[theme="dark"] .${ELEMENTS.CARD_OVERLAY_TEXT}`]:
        richText['.umd-rich-text-dark'],
    },
  })}
`;

// prettier-ignore
const VariantImageThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[data-image="true"] {
    padding-top: ${spacing['4xl']};
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] * {
    color: ${colors.white};
  }

  @container umd-card (min-width: 300px) {
    .${CARD_OVERLAY_CONTAINER}[data-image="true"] {
      padding-top: ${spacing['8xl']};
    }
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] * {
    color: ${colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    background-color: ${colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a svg {
    fill: ${colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${colors.gray.darker};
    border: none;
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg,
  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg {
    fill: ${colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${CARD_OVERLAY_TINT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"]:hover .${CARD_OVERLAY_TINT_OVERLAY} {
    opacity: .7;
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"]:hover .${ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER} img,
  .${CARD_OVERLAY_CONTAINER}[data-image="true"]:focus-within .${ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER} img {
    transform: scale(1.025);
  }

  .${CARD_OVERLAY_CONTAINER}[data-image="true"] .${CARD_OVERLAY_TEXT_CONTAINER} {
    justify-content: flex-end;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_HEADLINE} a`]:
      animatedLinks['.umd-slidein-underline-white'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[data-image="true"] .${ELEMENTS.CARD_OVERLAY_TEXT}`]:
        richText['.umd-rich-text-dark'],
    },
  })}
`;

const VariantCTAIconStyles = `
  .${CARD_OVERLAY_CONTAINER}[data-cta-icon="true"] .${CARD_OVERLAY_TEXT_CONTAINER} {
    padding-right: 40px;
  }
`;

const VariantComboStyles = `
  .${CARD_OVERLAY_CONTAINER}[data-image="true"],
  .${CARD_OVERLAY_CONTAINER}[data-cta-icon="true"] {
    display: flex;
    align-items: flex-end;
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}

  .${CARD_OVERLAY_CONTAINER} {
    height: 100%;
    position: relative;
    background-color: ${colors.gray.lightest};
    padding: ${spacing.md};
    padding-top: ${spacing['4xl']};
    padding-bottom: ${spacing.lg};
  }

  @media (min-width: 768px) {
    .${CARD_OVERLAY_CONTAINER} {
      min-height: 368px;
    }
  }

  .${CARD_OVERLAY_TEXT_CONTAINER} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  ${ImageStyles}
  ${ContentStyles}
  ${CtaStyles}
  ${CtaIconStyles}
  ${VariantCTAIconStyles}
  ${VariantLightThemeStyles}
  ${VariantDarkThemeStyles}
  ${VariantImageThemeStyles}
  ${VariantComboStyles}
`;

export const CreateShadowDom = ({ element }: { element: CardType }) => {
  const container = document.createElement('div');
  const textContainer = document.createElement('div');
  const tintOverlay = document.createElement('div');
  const hasImage = element.querySelector(
    `[slot="${SLOTS.IMAGE}"]`,
  ) as HTMLImageElement;

  if (hasImage) {
    container.setAttribute('data-image', 'true');
    element.setAttribute('data-image', 'true');
  }

  const image = CreateImage({ element });
  const content = CreateContent({ element });
  const cta = CreateCta({ element });
  const ctaIcon = CreateCtaIcon({ element });

  textContainer.classList.add(CARD_OVERLAY_TEXT_CONTAINER);
  textContainer.appendChild(content);

  if (cta) {
    textContainer.appendChild(cta);
  }

  container.setAttribute('theme', element._theme);
  container.classList.add(CARD_OVERLAY_CONTAINER);

  container.appendChild(image);

  if (hasImage) {
    tintOverlay.classList.add(CARD_OVERLAY_TINT_OVERLAY);
    container.appendChild(tintOverlay);
  }

  if (ctaIcon) {
    container.setAttribute('data-cta-icon', 'true');
    container.appendChild(ctaIcon);
  }

  container.appendChild(textContainer);

  return container;
};
