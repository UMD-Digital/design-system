import {
  animatedLinks,
  colors,
  fontSize,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { NEW_WINDOW_ICON, DOCUMENT_ICON, FEARLESS_ICON } from 'assets/icons';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { ELEMENTS, VARIABLES } from '../globals';
import { CallToActionType } from '../component';

const CTA_ANIMATION_WRAPPER = 'umd-call-to-action-animation-wrapper';

const sizeStyles = `
  [data-size="standard"] {
    padding: ${spacing.xs} ${spacing.lg};
    font-size: ${fontSize.sm};
  }

  :host [data-size="large"] {
    padding: ${spacing.sm} ${spacing.lg};
    font-size: ${fontSize.lg};
  }

  :host [data-size="large"] svg {
    height: 17px;
    width: 17px;
    margin-right: 5px;
  }
`;

const typePrimaryStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`:host [data-type="primary"]`]:
        typography['.umd-interactive-sans-small'],
    },
  })}

  :host [data-type="primary"] {
    background-color: ${colors.red};
    border: 1px solid ${colors.red};
    color: ${colors.white};
    max-width: 400px;
    transition: background .5s, border .5s, color .5s;
  }

  :host [data-type="primary"]:hover,
  :host [data-type="primary"]:focus {
    border: 1px solid ${colors.redDark};
    background-color: ${colors.redDark};
  }

  :host [data-type="primary"] svg{
    fill: ${colors.white};
  }
`;

const typeSecondaryStyles = `
  :host [data-type="secondary"] {
    color: ${colors.black};
    padding: 0;
  }

  :host [data-type="secondary"][data-size="large"] {
    padding: 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`[data-type="secondary"] .${ELEMENTS.CTA_TEXT_WRAPPER}`]:
        animatedLinks['.umd-slidein-underline-red'],
    },
  })}
`;

const typeOutlineStyles = `
  [data-type="outline"] {
    backgroundColor: ${colors.white};
    border: 1px solid ${colors.gray.darker};
    color: ${colors.black};
    transition: background .5s, border .5s, color .5s;
  }

  [data-type="outline"] svg {
    fill: ${colors.red};
    transition: fill .5s;
  }

  [data-type="outline"]:hover, 
  [data-type="outline"]:focus {
    background-color: ${colors.gray.darker};
    color: ${colors.white};
  }

  [data-type="outline"]:hover svg, 
  [data-type="outline"]:focus svg {
    fill: ${colors.white};
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  .${ELEMENTS.CTA_CONTAINER} {
    display: inline-block;
    font-weight: 800;
    text-align: center;
    line-height: 1.2857142857142858em;
  }

  .${ELEMENTS.CTA_CONTAINER} svg {
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
}: {
  cta: HTMLElement;
  icon: SVGSVGElement | HTMLImageElement | null;
  type: string;
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

  if (linkElement) cta = linkElement.cloneNode(true) as HTMLAnchorElement;
  if (buttonElement) cta = buttonElement.cloneNode(true) as HTMLButtonElement;

  if (cta) {
    const icon = GetIcon({ cta });

    CreateTextSpan({ cta });
    CreateWrapper({ cta });
    CreateLinkIcon({ cta, icon, type });
    cta.classList.add(ELEMENTS.CTA_CONTAINER);
    if (hasPlainText) cta.setAttribute(VARIABLES.ATTR_PLAIN_TEXT, '');
    cta.setAttribute('data-size', size);
    cta.setAttribute('data-type', type);
  }

  return cta;
};
