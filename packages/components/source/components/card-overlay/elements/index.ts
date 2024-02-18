import { Animations, Tokens, Fields } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CreateContent, ContentStyles } from './content';
import { CreateImage, ImageStyles } from './image';
import { CreateCta, CtaStyles } from './cta';
import { CreateCtaIcon, CtaIconStyles } from './cta-icon';
import { CardType } from '../component';
import { ELEMENTS, SLOTS, VARIABLES } from '../globals';

const { Colors, Spacing } = Tokens;
const { TextDark } = Fields;
const { LinkLineSlide } = Animations;

const CARD_OVERLAY_CONTAINER = 'umd-card-overlay-container';
const CARD_OVERLAY_TEXT_CONTAINER = 'umd-card-overlay-text-container';
const CARD_OVERLAY_TINT_OVERLAY = 'umd-card-overlay-tint';

// prettier-ignore
const VariantLightThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    background-color: ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} svg,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} path {
    fill: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${Colors.white};
    border: 1px solid ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover path,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus path {
    fill: ${Colors.gray.darker};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_LIGHT}] .${ELEMENTS.CARD_OVERLAY_HEADLINE} a`]:
      LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const VariantDarkThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] {
    background-color: ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] * {
    color: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${Colors.gray.darker};
    border: 1px solid ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg path,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg path {
    fill: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_THEME_DARK}] .${ELEMENTS.CARD_OVERLAY_TEXT}`]:
        TextDark,
    },
  })}
`;

// prettier-ignore
const VariantImageThemeContent = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_HEADLINE} a`]:
      LinkLineSlide['.slidein-underline-white'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_TEXT}`]:
        TextDark,
    },
  })}
`;

// prettier-ignore
const VariantImageThemeCtaIcon = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a {
    background-color: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a svg,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a path {
    fill: ${Colors.gray.darker};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus {
    background-color: ${Colors.gray.darker};
    border: none;
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover svg,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:hover path,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus svg,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${ELEMENTS.CARD_OVERLAY_CTA_ICON_CONTAINER} a:focus path {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const VariantImageThemeTint = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${CARD_OVERLAY_TINT_OVERLAY} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}]:hover .${CARD_OVERLAY_TINT_OVERLAY} {
    opacity: .7;
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}]:hover .${ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER} img,
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}]:focus-within .${ELEMENTS.CARD_OVERLAY_IMAGE_CONTAINER} img {
    transform: scale(1.025);
  }
`

// prettier-ignore
const VariantImageThemeStyles = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] {
    padding-top: ${Spacing['4xl']};
  }

  @container umd-card (min-width: 300px) {
    .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] {
      padding-top: ${Spacing['8xl']};
    }
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] * {
    color: ${Colors.white};
  }

  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}] .${CARD_OVERLAY_TEXT_CONTAINER} {
    justify-content: flex-end;
  }

  ${VariantImageThemeTint}
  ${VariantImageThemeContent}
  ${VariantImageThemeCtaIcon}
`;

// prettier-ignore
const VariantCTAIconStyles = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_CTA_ICON}] .${CARD_OVERLAY_TEXT_CONTAINER} {
    padding-right: 40px;
  }
`;

// prettier-ignore
const VariantComboStyles = `
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_IMAGE}],
  .${CARD_OVERLAY_CONTAINER}[${VARIABLES.ATTR_CTA_ICON}] {
    display: flex;
    align-items: flex-end;
  }
`;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}

  .${CARD_OVERLAY_CONTAINER} {
    height: 100%;
    position: relative;
    background-color: ${Colors.gray.lightest};
    padding: ${Spacing.md};
    padding-top: ${Spacing['4xl']};
    padding-bottom: ${Spacing.lg};
  }

  @media (min-width: 768px) {
    .${CARD_OVERLAY_CONTAINER} {
      min-height: 456px;
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
    container.setAttribute(VARIABLES.ATTR_IMAGE, '');
    element.setAttribute(VARIABLES.ATTR_IMAGE, '');
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

  container.setAttribute(VARIABLES.ATTR_THEME, element._theme);
  container.classList.add(CARD_OVERLAY_CONTAINER);

  container.appendChild(image);

  if (hasImage) {
    tintOverlay.classList.add(CARD_OVERLAY_TINT_OVERLAY);
    container.appendChild(tintOverlay);
  }

  if (ctaIcon) {
    container.setAttribute(VARIABLES.ATTR_CTA_ICON, '');
    container.appendChild(ctaIcon);
  }

  container.appendChild(textContainer);

  return container;
};
