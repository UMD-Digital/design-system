import {
  colors,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { NEW_WINDOW_ICON, DOCUMENT_ICON } from 'assets/icons';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { ELEMENTS } from '../globals';
import { CallToActionType } from '../component';

const CTA_WRAPPER = 'umd-call-to-action-wrapper';

const sizeStyles = `
  [data-size="standard"] {
    padding: ${spacing.xs} ${spacing.lg};
  }

  [data-size="large"] {
    padding: ${spacing.sm} ${spacing.lg};
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
  [data-type="secondary"] {
    padding: ${spacing.xs} ${spacing.lg};
  }
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
  }

  .${ELEMENTS.CTA_CONTAINER} svg {
    fill: ${colors.red};
    height: 14px;
    width: 14px;
    transition: fill 0.5s;
    flex: 1 0 auto;
    margin-right: 4px;
  }

  .${CTA_WRAPPER} {
    display: flex;
    align-items: center;
  }

  .${ELEMENTS.CTA_TEXT_WRAPPER} {
    white-space: nowrap;
  }

  ${Reset}
  ${sizeStyles}
  ${typePrimaryStyles}
  ${typeSecondaryStyles}
  ${typeOutlineStyles}
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
}: {
  cta: HTMLElement;
  icon: SVGSVGElement | HTMLImageElement | null;
}) => {
  const wrapper = cta.querySelector(`.${CTA_WRAPPER}`) as HTMLSpanElement;
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

  wrapper.classList.add(CTA_WRAPPER);
  wrapper.innerHTML = cta.innerHTML;
  cta.innerHTML = '';
  cta.appendChild(wrapper);
};

const CreateTextSpan = ({ cta }: { cta: HTMLElement }) => {
  const wrapper = document.createElement('span');

  if (cta.textContent) {
    wrapper.classList.add(ELEMENTS.CTA_TEXT_WRAPPER);
    wrapper.innerHTML = cta.textContent;
    cta.textContent = '';
    cta.appendChild(wrapper);
  }
};

export const CreateShadowDom = ({ element }: { element: CallToActionType }) => {
  const ctaElement = element.querySelector(`a`);
  const buttonElement = element.querySelector(`button`);
  let cta = null;

  if (ctaElement) cta = ctaElement.cloneNode(true) as HTMLAnchorElement;
  if (buttonElement) cta = buttonElement.cloneNode(true) as HTMLButtonElement;

  if (cta) {
    const icon = GetIcon({ cta });

    CreateTextSpan({ cta });
    CreateWrapper({ cta });
    CreateLinkIcon({ cta, icon });
    cta.classList.add(ELEMENTS.CTA_CONTAINER);
    cta.setAttribute('data-size', element._size);
    cta.setAttribute('data-type', element._type);
  }

  if (ctaElement) ctaElement.remove();
  if (buttonElement) buttonElement.remove();

  return cta;
};
