import {
  animatedLinks,
  colors,
  fontSize,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { NEW_WINDOW_ICON, DOCUMENT_ICON, FEARLESS_ICON } from 'assets/icons';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { MakeSlot } from 'helpers/ui';
import { ELEMENTS, SLOTS, VARIABLES } from '../globals';
import { CallToActionType } from '../component';

const CTA_ANIMATION_WRAPPER = 'umd-call-to-action-animation-wrapper';
const CTA_PLAIN_TEXT_SLOT = 'umd-call-to-action-plain-text-slot';

// prettier-ignore
const plainTextSlotStyles = `
  .${CTA_PLAIN_TEXT_SLOT} {
    text-decoration: underline;
    display: inline-block;
    font-size: ${fontSize.min};
    font-weight: 600;
    transition: color .5s;
  }

  .${CTA_PLAIN_TEXT_SLOT}:hover,
  .${CTA_PLAIN_TEXT_SLOT}:focus {
    color: ${colors.redDark};
  }

  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"] .${CTA_PLAIN_TEXT_SLOT} {
    margin-top: ${spacing.min};
  }

  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_SECONDARY}"] .${CTA_PLAIN_TEXT_SLOT} {
    padding-left: 18px;
    margin-top: ${spacing.min};
  }

  .${ELEMENTS.CTA_CONTAINER}[${VARIABLES.ATTR_PLAIN_TEXT}][${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"] {
    text-align: center;
  }
`;

// prettier-ignore
const sizeStyles = `
  [${VARIABLES.ATTR_SIZE}="${VARIABLES.SIZE_STANDARD}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    padding: ${spacing.xs} ${spacing.lg};
    font-size: ${fontSize.sm};
  }

  :host [${VARIABLES.ATTR_SIZE}="${VARIABLES.SIZE_LARGE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    padding: ${spacing.sm} ${spacing.lg};
    font-size: ${fontSize.lg};
  }

  :host [${VARIABLES.ATTR_SIZE}="${VARIABLES.SIZE_LARGE}"] svg {
    height: 17px;
    width: 17px;
    margin-right: 5px;
  }
`;

// prettier-ignore
const typePrimaryStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`:host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"]`]:
        typography['.umd-interactive-sans-small'],
    },
  })}

  :host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    background-color: ${colors.red};
    border: 1px solid ${colors.red};
    color: ${colors.white};
    max-width: 400px;
    transition: background .5s, border .5s, color .5s;
  }

  :host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT}:hover,
  :host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT}:focus {
    border: 1px solid ${colors.redDark};
    background-color: ${colors.redDark};
  }

  :host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_PRIMARY}"] svg{
    fill: ${colors.white};
  }
`;

// prettier-ignore
const typeSecondaryStyles = `
  :host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_SECONDARY}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    color: ${colors.black};
    padding: 0;
  }

  :host [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_SECONDARY}"][data-size="${VARIABLES.SIZE_LARGE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    padding: 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`[${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_SECONDARY}"] .${ELEMENTS.CTA_TEXT_WRAPPER}`]:
        animatedLinks['.umd-slidein-underline-red'],
    },
  })}

  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_SECONDARY}"] .${CTA_ANIMATION_WRAPPER} {
    background-position: left bottom !important;
  }
`;

// prettier-ignore
const typeOutlineStyles = `
  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_OUTLINE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    backgroundColor: ${colors.white};
    border: 1px solid ${colors.gray.darker};
    color: ${colors.black};
    transition: background .5s, border .5s, color .5s;
  }

  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_OUTLINE}"] svg {
    fill: ${colors.red};
    transition: fill .5s;
  }

  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_OUTLINE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT}:hover, 
  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_OUTLINE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT}:focus {
    background-color: ${colors.gray.darker};
    color: ${colors.white};
  }

  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_OUTLINE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT}:hover svg, 
  [${VARIABLES.ATTR_TYPE}="${VARIABLES.TYPE_OUTLINE}"] .${ELEMENTS.CTA_CONTAINER_ELEMENT}:focus svg {
    fill: ${colors.white};
  }
`;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  .${ELEMENTS.CTA_CONTAINER_ELEMENT} {
    display: inline-block;
    font-weight: 800;
    text-align: center;
    line-height: 1.2857142857142858em;
  }

  .${ELEMENTS.CTA_CONTAINER_ELEMENT} svg {
    fill: ${colors.red};
    height: 14px;
    width: 14px;
    transition: fill 0.5s;
    flex: 1 0 auto;
    margin-right: 4px;
  }

  .${ELEMENTS.CTA_WRAPPER} {
    display: flex;
    align-items: center;
  }

  .${ELEMENTS.CTA_TEXT_WRAPPER} {
    white-space: nowrap;
  }

  ${Reset}
  ${typePrimaryStyles}
  ${typeSecondaryStyles}
  ${typeOutlineStyles}
  ${sizeStyles}
  ${plainTextSlotStyles}
`;

const GetIcon = ({ cta }: { cta: HTMLElement }) => {
  const svgIcon = cta.querySelector(`svg`);
  const imgIcon = cta.querySelector(`img`);

  if (svgIcon) return svgIcon;
  if (imgIcon) return imgIcon;
  return null;
};

const CreateLinkIcon = ({
  cta,
  icon,
  type,
  isLink,
}: {
  cta: HTMLElement;
  icon: SVGSVGElement | HTMLImageElement | null;
  type: string;
  isLink: boolean;
}) => {
  const wrapper = cta.querySelector(
    `.${ELEMENTS.CTA_WRAPPER}`,
  ) as HTMLSpanElement;
  const textSpan = cta.querySelector(
    `.${ELEMENTS.CTA_TEXT_WRAPPER}`,
  ) as HTMLSpanElement;
  const isExternalReference = cta
    .getAttribute('href')
    ?.includes('http' || 'https');
  const isExternalTab = cta.getAttribute('target') === '_blank';
  const isDownload = cta.getAttribute('download') !== null;

  if (!wrapper || !textSpan) return;

  if (icon) {
    wrapper.insertBefore(icon, textSpan);
    return;
  }

  if (type === 'secondary') {
    wrapper.innerHTML = FEARLESS_ICON;
    wrapper.appendChild(textSpan);
  }

  if (!isLink) return;

  if (isExternalReference || isExternalTab) {
    wrapper.innerHTML = NEW_WINDOW_ICON;
    wrapper.appendChild(textSpan);
    return;
  }

  if (isDownload) {
    wrapper.innerHTML = DOCUMENT_ICON;
    wrapper.appendChild(textSpan);
    return;
  }
};

const CreateWrapper = ({ cta }: { cta: HTMLElement }) => {
  const wrapper = document.createElement('span');

  wrapper.classList.add(ELEMENTS.CTA_WRAPPER);
  wrapper.innerHTML = cta.innerHTML;
  cta.innerHTML = '';
  cta.appendChild(wrapper);
};

const CreateTextSpan = ({ cta }: { cta: HTMLElement }) => {
  const wrapper = document.createElement('span');
  const animationWrapper = document.createElement('span');

  if (cta.textContent) {
    animationWrapper.classList.add(CTA_ANIMATION_WRAPPER);
    wrapper.classList.add(ELEMENTS.CTA_TEXT_WRAPPER);

    animationWrapper.innerHTML = cta.textContent;
    cta.textContent = '';

    wrapper.appendChild(animationWrapper);
    cta.appendChild(wrapper);
  }
};

export const CreateShadowDom = ({ element }: { element: CallToActionType }) => {
  const type = element._type;
  const size = element._size;
  const container = document.createElement('div');
  const linkElements = Array.from(element.querySelectorAll(`a`));
  const buttonElement = element.querySelector(`button`);
  const linkElementsPlainText = linkElements.filter(
    (link) => link.getAttribute('slot') === 'plain-text',
  );
  const linkElementFiltered = linkElements.filter(
    (link) => !linkElementsPlainText.includes(link),
  );
  const linkElement = linkElementFiltered[0] || null;
  const hasPlainText = linkElementsPlainText.length > 0;
  let cta = null;
  let isLink = true;

  if (linkElement) cta = linkElement.cloneNode(true) as HTMLAnchorElement;
  if (buttonElement) {
    cta = buttonElement.cloneNode(true) as HTMLButtonElement;
    isLink = false;
  }

  if (!cta) return null;

  const icon = GetIcon({ cta });
  container.classList.add(ELEMENTS.CTA_CONTAINER);
  container.setAttribute(VARIABLES.ATTR_SIZE, size);
  container.setAttribute(VARIABLES.ATTR_TYPE, type);
  if (hasPlainText) container.setAttribute(VARIABLES.ATTR_PLAIN_TEXT, '');

  cta.classList.add(ELEMENTS.CTA_CONTAINER_ELEMENT);

  CreateTextSpan({ cta });
  CreateWrapper({ cta });
  CreateLinkIcon({ cta, icon, type, isLink: true });

  container.appendChild(cta);

  if (hasPlainText) {
    const plainTextSlot = MakeSlot({ type: SLOTS.PLAIN_TEXT });
    plainTextSlot.classList.add(CTA_PLAIN_TEXT_SLOT);
    container.appendChild(plainTextSlot);
  }

  return container;
};
