import { colors, fontSize, spacing } from '@universityofmaryland/variables';
import { Debounce } from 'helpers/performance';
import { NEW_WINDOW_ICON, DOCUMENT_ICON, FEARLESS_ICON } from 'assets/icons';
import {
  STYLES_CTA_OUTLINE,
  CLASS_STYLES_REF_CTA_OUTLINE,
} from 'styles/call-to-action-outline';
import {
  STYLES_CTA_SECONDARY,
  CLASS_STYLES_REF_CTA_SECONDARY,
} from 'styles/call-to-action-secondary';
import {
  STYLES_CTA_PRIMARY,
  CLASS_STYLES_REF_CTA_PRIMARY,
} from 'styles/call-to-action-primary';

const MAX_WIDTH = 380;
const ATTR_SIZE = 'data-size';
const ATTR_THEME = 'data-theme';
const SIZE_LARGE = 'large';
const THEME_DARK = 'dark';
const TYPE_PRIMARY = 'primary';
const TYPE_SECONDARY = 'secondary';
const TYPE_OUTLINE = 'outline';

export const CLASS_BASE_CTA = 'umd-call-to-action';
const CLASS_CTA_ANIMATION_WRAPPER = 'umd-call-to-action-animation-wrapper';
const CLASS_CTA_WRAPPER = 'umd-call-to-action-wrapper';
const CLASS_CTA_TEXT_WRAPPER = 'umd-call-to-action-text-wrapper';

// prettier-ignore
const ThemeStyles = `
  .${CLASS_STYLES_REF_CTA_OUTLINE}[${ATTR_THEME}="${THEME_DARK}"] {
    background-color: transparent;
    border: 1px solid ${colors.white};
    color: ${colors.white};
  }

  .${CLASS_STYLES_REF_CTA_OUTLINE}[${ATTR_THEME}="${THEME_DARK}"]:hover,
  .${CLASS_STYLES_REF_CTA_OUTLINE}[${ATTR_THEME}="${THEME_DARK}"]:focus {
    background-color: ${colors.white};
    border: 1px solid ${colors.white};
    color: ${colors.black};
  }

  .${CLASS_STYLES_REF_CTA_SECONDARY}[${ATTR_THEME}="${THEME_DARK}"] {
    color: ${colors.white};
  }
`

// prettier-ignore
const SizeStyles = `
  [${ATTR_SIZE}="${SIZE_LARGE}"] {
    padding: ${spacing.sm} ${spacing.lg};
    font-size: ${fontSize.lg};
  }
  
  [${ATTR_SIZE}="${SIZE_LARGE}"] svg {
    height: 17px;
    width: 17px;
    margin-right: 5px;
    margin-top: 3px;
  }
`;

// prettier-ignore
const OverwriteStyles = `
  .${CLASS_STYLES_REF_CTA_SECONDARY} .${CLASS_CTA_ANIMATION_WRAPPER} {
    background-position: left bottom !important;
  }
`;

// prettier-ignore
export const STYLES_CALL_TO_ACTION_ELEMENT = `
  .${CLASS_BASE_CTA} {
    display: inline-block;
    padding: ${spacing.xs} ${spacing.lg};
    font-size: ${fontSize.sm};
    display: inline-block;
    font-weight: 800;
    text-align: left;
    line-height: 1.28em;
    max-width: ${MAX_WIDTH}px;
  }

  .${CLASS_BASE_CTA} svg {
    fill: ${colors.red};
    height: 14px;
    width: 14px;
    transition: fill 0.5s;
    flex: 1 0 auto;
    z-index: 99;
    margin-right: 4px;
    margin-top: 2px;
  }

  .${CLASS_BASE_CTA} path {
    transition: fill 0.5s;
  }

  .${CLASS_CTA_WRAPPER} {
    display: flex;
  }

  ${STYLES_CTA_PRIMARY}
  ${STYLES_CTA_OUTLINE}
  ${STYLES_CTA_SECONDARY}
  ${SizeStyles}
  ${ThemeStyles}
  ${OverwriteStyles}
`;

const GetIcon = ({ element }: { element: HTMLElement }) => {
  const svgIcon = element.querySelector(`svg`);
  const imgIcon = element.querySelector(`img`);

  if (svgIcon) return svgIcon;
  if (imgIcon) return imgIcon;
  return null;
};

const CreateLinkIcon = ({
  element,
  icon,
  type,
  isLink,
}: {
  element: HTMLElement;
  icon: SVGSVGElement | HTMLImageElement | null;
  type: string;
  isLink: boolean;
}) => {
  const wrapper = element.querySelector(
    `.${CLASS_CTA_WRAPPER}`,
  ) as HTMLSpanElement;
  const textSpan = element.querySelector(
    `.${CLASS_CTA_TEXT_WRAPPER}`,
  ) as HTMLSpanElement;
  const isExternalReference = element
    .getAttribute('href')
    ?.includes('http' || 'https');
  const isExternalTab = element.getAttribute('target') === '_blank';
  const isDownload = element.getAttribute('download') !== null;

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

const CreateTextSpan = ({ element }: { element: HTMLElement }) => {
  const wrapper = document.createElement('span');
  const animationWrapper = document.createElement('span');

  if (element.textContent) {
    animationWrapper.classList.add(CLASS_CTA_ANIMATION_WRAPPER);
    wrapper.classList.add(CLASS_CTA_TEXT_WRAPPER);

    animationWrapper.innerHTML = element.textContent;
    element.textContent = '';

    wrapper.appendChild(animationWrapper);
    element.appendChild(wrapper);
  }
};

const CreateWrapper = ({ element }: { element: HTMLElement }) => {
  const wrapper = document.createElement('span');

  wrapper.classList.add(CLASS_CTA_WRAPPER);
  wrapper.innerHTML = element.innerHTML;
  element.innerHTML = '';
  element.appendChild(wrapper);
};

export const CreateCallToActionElement = ({
  cta,
  type = 'primary',
  size = null,
  theme = null,
}: {
  cta?: HTMLElement | null;
  type?: string;
  size?: string | null;
  theme?: string | null;
}) => {
  const element = cta || document.createElement('a');
  const icon = GetIcon({ element });

  element.classList.add(CLASS_BASE_CTA);

  if (type === TYPE_PRIMARY) {
    element.classList.add(CLASS_STYLES_REF_CTA_PRIMARY);
  }

  if (type === TYPE_SECONDARY) {
    element.classList.add(CLASS_STYLES_REF_CTA_SECONDARY);
  }

  if (type === TYPE_OUTLINE) {
    element.classList.add(CLASS_STYLES_REF_CTA_OUTLINE);
  }

  if (theme) {
    element.setAttribute('data-theme', theme);
  }

  if (size) {
    element.setAttribute('data-size', size);
  }

  CreateTextSpan({ element });
  CreateWrapper({ element });
  CreateLinkIcon({ element, icon, type, isLink: true });

  return element;
};
