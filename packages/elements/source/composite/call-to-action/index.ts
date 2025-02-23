import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

const { convertJSSObjectToStyles } = Utility.styles;

const MAX_WIDTH = 380;
const ATTR_SIZE = 'size';
const ATTR_THEME = 'theme';
const SIZE_LARGE = 'large';
const THEME_DARK = 'dark';
const THEME_GOLD = 'gold';
const TYPE_PRIMARY = 'primary';
const TYPE_SECONDARY = 'secondary';
const TYPE_OUTLINE = 'outline';

const IS_THEME_DARK = `[${ATTR_THEME}="${THEME_DARK}"]`;
const IS_THEME_GOLD = `[${ATTR_THEME}="${THEME_GOLD}"]`;
const IS_LARGE_SIZE = `[${ATTR_SIZE}="${SIZE_LARGE}"]`;

const ELEMENT_BASE_CTA = 'call-to-action';
const ELEMENT_CTA_OUTLINE = 'call-to-action-outline';
const ELEMENT_CTA_PRIMARY = 'call-to-action-primary';
const ELEMENT_CTA_SECONDARY = 'call-to-action-secondary';

const ELEMENT_CTA_ANIMATION_WRAPPER = 'call-to-action-animation-wrapper';
const ELEMENT_CTA_WRAPPER = 'call-to-action-wrapper';
const ELEMENT_CTA_TEXT_WRAPPER = 'call-to-action-text-wrapper';

const OVERWRITE_THEME_GOLD_PRIMARY = `.${ELEMENT_CTA_PRIMARY}${IS_THEME_GOLD}`;

const OVERWRITE_THEME_DARK_SECONDARY = `.${ELEMENT_CTA_SECONDARY}${IS_THEME_DARK}`;
const OVERWRITE_THEME_GOLD_SECONDARY = `.${ELEMENT_CTA_SECONDARY}${IS_THEME_GOLD}`;

const OVERWRITE_THEME_DARK_OUTLINE = `.${ELEMENT_CTA_OUTLINE}${IS_THEME_DARK}`;

// prettier-ignore
const OverwriteSecondaryStyles = `
  .${ELEMENT_CTA_SECONDARY} .${ELEMENT_CTA_ANIMATION_WRAPPER} {
    background-position: left bottom !important;
  }

  .${ELEMENT_CTA_SECONDARY} {
    max-width: 100%;
  }
`;

// prettier-ignore
const OverwriteThemeGoldStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_GOLD_SECONDARY} > span > span`]:
      animation.line.slideUnderGold,
    },
  })}

  ${OVERWRITE_THEME_GOLD_SECONDARY} svg,
  ${OVERWRITE_THEME_GOLD_SECONDARY} path {
    fill: ${token.color.gold};
  }

  ${OVERWRITE_THEME_GOLD_SECONDARY} {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_GOLD_PRIMARY} {
    background-color: ${token.color.white};
    color: ${token.color.black};
  }

  ${OVERWRITE_THEME_GOLD_PRIMARY}:hover,
  ${OVERWRITE_THEME_GOLD_PRIMARY}:focus {
    background-color: ${token.color.gray.lighter};
  }

  ${OVERWRITE_THEME_GOLD_PRIMARY} svg,
  ${OVERWRITE_THEME_GOLD_PRIMARY} path {
    fill: ${token.color.red};
    margin-right: 5px;
  }
`;

// prettier-ignore
const OverwriteThemeDarkStyles = `
  ${OVERWRITE_THEME_DARK_OUTLINE} {
    background-color: transparent;
    border: 1px solid ${token.color.white};
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_OUTLINE}:hover,
  ${OVERWRITE_THEME_DARK_OUTLINE}:focus {
    background-color: ${token.color.white};
    border: 1px solid ${token.color.white};
    color: ${token.color.black};
  }

  ${OVERWRITE_THEME_DARK_SECONDARY} {
    color: ${token.color.white};
  }
`

// prettier-ignore
const OverwriteSizeStyles = `
  @media (${token.media.queries.tablet.min}) {
    ${IS_LARGE_SIZE} {
      font-size: ${token.font.size.lg};
      padding: ${token.spacing.sm} ${token.spacing.lg};
    }
  }
  
  @media (${token.media.queries.tablet.min}) {
    ${IS_LARGE_SIZE} svg {
      height: 17px;
      width: 17px;
      margin-right: 5px;
      margin-top: 3px;
    }
  }
`;

// prettier-ignore
const OutlineStyles = `
  .${ELEMENT_CTA_OUTLINE} {
    background-color: ${token.color.white};
    border: 1px solid ${token.color.gray.darker};
    color: ${token.color.black};
    transition: background .5s, border .5s, color .5s;
  }

  .${ELEMENT_CTA_OUTLINE} svg,
  .${ELEMENT_CTA_OUTLINE} path {
    fill: ${token.color.red};
    transition: fill .5s;
  }

  .${ELEMENT_CTA_OUTLINE}:hover,
  .${ELEMENT_CTA_OUTLINE}:focus {
    background-color: ${token.color.gray.darker};
    color: ${token.color.white};
  }

  .${ELEMENT_CTA_OUTLINE}:hover svg,
  .${ELEMENT_CTA_OUTLINE}:hover path,
  .${ELEMENT_CTA_OUTLINE}:focus svg,
  .${ELEMENT_CTA_OUTLINE}:focus path {
    fill: ${token.color.white};
  }
`;

// prettier-ignore
const PrimaryStyles = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CTA_PRIMARY}`]: typography.elements.interativeSmall,
    },
  })}

  .${ELEMENT_CTA_PRIMARY} {
    background-color: ${token.color.red};
    border: 1px solid ${token.color.red};
    color: ${token.color.white};
    transition: background .5s, border .5s, color .5s;
  }

  .${ELEMENT_CTA_PRIMARY}:hover,
  .${ELEMENT_CTA_PRIMARY}:focus {
    border: 1px solid ${token.color.redDark};
    background-color: ${token.color.redDark};
  }

  .${ELEMENT_CTA_PRIMARY} svg,
  .${ELEMENT_CTA_PRIMARY} path {
    fill: ${token.color.white};
  }
`;

// prettier-ignore
const SecondaryStyles = `
  .${ELEMENT_CTA_SECONDARY} {
    color: ${token.color.black};
    padding: 0 !important;
  }

  .${ELEMENT_CTA_SECONDARY} > span > span {
    width: calc(100% - 16px);
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CTA_SECONDARY} > span > span`]:
      animation.line.slideUnderRed,
    },
  })}
`;

// prettier-ignore
export const STYLES_CALL_TO_ACTION_ELEMENT = `
  .${ELEMENT_BASE_CTA} {
    display: inline-block;
    padding: ${token.spacing.xs} ${token.spacing.lg};
    font-size: ${token.font.size.base};
    display: inline-block;
    font-weight: 700;
    text-align: left;
    line-height: 1.28em;
    max-width: ${MAX_WIDTH}px;
    position: relative;
    font-family: inherit;
  }

  .${ELEMENT_BASE_CTA} svg {
    fill: ${token.color.red};
    height: 14px;
    width: 14px;
    transition: fill 0.5s;
    flex: 1 0 auto;
    z-index: 99;
    margin-right: 4px;
    margin-top: 2px;
  }

  .${ELEMENT_BASE_CTA} path {
    transition: fill 0.5s;
  }

  .${ELEMENT_CTA_WRAPPER} {
    display: flex;
  }

  .${ELEMENT_CTA_WRAPPER}[data-email] svg {
    padding-top: 3px;
  }

  .${ELEMENT_CTA_WRAPPER}[data-email] svg path {
    fill: ${token.color.red};
  }

  ${PrimaryStyles}
  ${OutlineStyles}
  ${SecondaryStyles}
  ${OverwriteSizeStyles}
  ${OverwriteThemeDarkStyles}
  ${OverwriteThemeGoldStyles}
  ${OverwriteSecondaryStyles}
`;

const GetIcon = ({ element }: { element: HTMLElement }) => {
  const svgIcon = element.querySelector(`svg`);
  const imgIcon = element.querySelector(`img`);

  if (svgIcon) {
    const colorSet = svgIcon.getAttribute('color');

    if (colorSet) {
      const path = svgIcon.querySelector('path');
      if (path) path.style.fill = colorSet;
    }

    return svgIcon;
  }
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
    `.${ELEMENT_CTA_WRAPPER}`,
  ) as HTMLSpanElement;
  const textSpan = element.querySelector(
    `.${ELEMENT_CTA_TEXT_WRAPPER}`,
  ) as HTMLSpanElement;
  const isExternalTab = element.getAttribute('target') === '_blank';
  const isDownload = element.getAttribute('download') !== null;
  const isMail = element.getAttribute('href')?.includes('mailto:');

  if (!wrapper || !textSpan) return;

  if (icon) {
    wrapper.insertBefore(icon, textSpan);
    return;
  }

  if (type === TYPE_SECONDARY) {
    wrapper.innerHTML = Utility.asset.icon.FEARLESS;
    wrapper.appendChild(textSpan);
  }

  if (!isLink) return;

  if (isMail) {
    wrapper.innerHTML = Utility.asset.icon.EMAIL;
    wrapper.appendChild(textSpan);
    wrapper.setAttribute('data-email', '');
    return;
  }

  if (isExternalTab) {
    wrapper.innerHTML = Utility.asset.icon.NEW_WINDOW;
    wrapper.appendChild(textSpan);
    return;
  }

  if (isDownload) {
    wrapper.innerHTML = Utility.asset.icon.DOCUMENT;
    wrapper.appendChild(textSpan);
    return;
  }
};

const CreateTextSpan = ({ element }: { element: HTMLElement }) => {
  const wrapper = document.createElement('span');
  const animationWrapper = document.createElement('span');
  const cloneElement = element.cloneNode(true) as HTMLElement;
  const svg = cloneElement.querySelector('svg');
  const img = cloneElement.querySelector('img');

  if (svg) svg.remove();
  if (img) img.remove();

  if (element.textContent) {
    animationWrapper.classList.add(ELEMENT_CTA_ANIMATION_WRAPPER);
    wrapper.classList.add(ELEMENT_CTA_TEXT_WRAPPER);

    animationWrapper.innerHTML = cloneElement.innerHTML;
    element.textContent = '';

    wrapper.appendChild(animationWrapper);
    element.appendChild(wrapper);
  }
};

const CreateWrapper = ({ element }: { element: HTMLElement }) => {
  const wrapper = document.createElement('span');

  wrapper.classList.add(ELEMENT_CTA_WRAPPER);
  wrapper.innerHTML = element.innerHTML;
  element.innerHTML = '';
  element.appendChild(wrapper);
};

const CreateCallToActionElement = ({
  cta,
  type = TYPE_PRIMARY,
  size = null,
  isThemeDark,
  isThemeGold,
  styleProps = null,
}: {
  cta?: HTMLElement | null;
  type?: string;
  size?: string | null;
  isThemeDark?: boolean;
  isThemeGold?: boolean;
  styleProps?: string | null;
}) => {
  const element = cta || document.createElement('a');
  const icon = GetIcon({ element });

  element.classList.add(ELEMENT_BASE_CTA);

  if (type === TYPE_PRIMARY) {
    element.classList.add(ELEMENT_CTA_PRIMARY);
  }

  if (type === TYPE_SECONDARY) {
    element.classList.add(ELEMENT_CTA_SECONDARY);
  }

  if (type === TYPE_OUTLINE) {
    element.classList.add(ELEMENT_CTA_OUTLINE);
  }

  if (isThemeDark) {
    element.setAttribute(ATTR_THEME, THEME_DARK);
  }

  if (isThemeGold) {
    element.setAttribute(ATTR_THEME, THEME_GOLD);
  }

  if (size) {
    element.setAttribute(ATTR_SIZE, size);
  }

  if (styleProps) {
    element.setAttribute('style', styleProps);
  }

  CreateTextSpan({ element });
  CreateWrapper({ element });
  CreateLinkIcon({ element, icon, type, isLink: true });

  return element;
};

export default {
  CreateElement: CreateCallToActionElement,
  Styles: STYLES_CALL_TO_ACTION_ELEMENT,
};
