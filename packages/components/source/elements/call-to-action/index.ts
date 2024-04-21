import {
  Tokens,
  Typography,
  Animations,
} from '@universityofmaryland/variables';
import { AssetIcon, Styles } from 'utilities';

const { InterativeSmall } = Typography;

const { ConvertJSSObjectToStyles } = Styles;
const { Colors, FontSize, Spacing, Queries } = Tokens;
const { Link } = Animations;

const MAX_WIDTH = 380;
const ATTR_SIZE = 'size';
const ATTR_THEME = 'theme';
const SIZE_LARGE = 'large';
const THEME_DARK = 'dark';
const TYPE_PRIMARY = 'primary';
const TYPE_SECONDARY = 'secondary';
const TYPE_OUTLINE = 'outline';

const IS_DARK_THEME = `[${ATTR_THEME}="${THEME_DARK}"]`;
const IS_LARGE_SIZE = `[${ATTR_SIZE}="${SIZE_LARGE}"]`;

const ELEMENT_BASE_CTA = 'call-to-action';
const ELEMENT_CTA_OUTLINE = 'call-to-action-outline';
const ELEMENT_CTA_PRIMARY = 'call-to-action-primary';
const ELEMENT_CTA_SECONDARY = 'call-to-action-secondary';

const ELEMENT_CTA_ANIMATION_WRAPPER = 'call-to-action-animation-wrapper';
const ELEMENT_CTA_WRAPPER = 'call-to-action-wrapper';
const ELEMENT_CTA_TEXT_WRAPPER = 'call-to-action-text-wrapper';

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
const OverwriteThemeStyles = `
  .${ELEMENT_CTA_OUTLINE} ${IS_DARK_THEME} {
    background-color: transparent;
    border: 1px solid ${Colors.white};
    color: ${Colors.white};
  }

  .${ELEMENT_CTA_OUTLINE}${IS_DARK_THEME}:hover,
  .${ELEMENT_CTA_OUTLINE}${IS_DARK_THEME}:focus {
    background-color: ${Colors.white};
    border: 1px solid ${Colors.white};
    color: ${Colors.black};
  }

  .${ELEMENT_CTA_SECONDARY}${IS_DARK_THEME} {
    color: ${Colors.white};
  }
`

// prettier-ignore
const OverwriteSizeStyles = `
  @media (${Queries.tablet.min}) {
    ${IS_LARGE_SIZE} {
      font-size: ${FontSize.lg};
      padding: ${Spacing.sm} ${Spacing.lg};
    }
  }
  
  @media (${Queries.tablet.min}) {
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
    background-color: ${Colors.white};
    border: 1px solid ${Colors.gray.darker};
    color: ${Colors.black};
    transition: background .5s, border .5s, color .5s;
  }

  .${ELEMENT_CTA_OUTLINE} svg,
  .${ELEMENT_CTA_OUTLINE} path {
    fill: ${Colors.red};
    transition: fill .5s;
  }

  .${ELEMENT_CTA_OUTLINE}:hover,
  .${ELEMENT_CTA_OUTLINE}:focus {
    background-color: ${Colors.gray.darker};
    color: ${Colors.white};
  }

  .${ELEMENT_CTA_OUTLINE}:hover svg,
  .${ELEMENT_CTA_OUTLINE}:hover path,
  .${ELEMENT_CTA_OUTLINE}:focus svg,
  .${ELEMENT_CTA_OUTLINE}:focus path {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const PrimaryStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CTA_PRIMARY}`]: InterativeSmall,
    },
  })}

  .${ELEMENT_CTA_PRIMARY} {
    background-color: ${Colors.red};
    border: 1px solid ${Colors.red};
    color: ${Colors.white};
    transition: background .5s, border .5s, color .5s;
  }

  .${ELEMENT_CTA_PRIMARY}:hover,
  .${ELEMENT_CTA_PRIMARY}:focus {
    border: 1px solid ${Colors.redDark};
    background-color: ${Colors.redDark};
  }

  .${ELEMENT_CTA_PRIMARY} svg,
  .${ELEMENT_CTA_PRIMARY} path {
    fill: ${Colors.white};
  }
`;

// prettier-ignore
const SecondaryStyles = `
  .${ELEMENT_CTA_SECONDARY} {
    color: ${Colors.black};
    padding: 0 !important;
  }

  .${ELEMENT_CTA_SECONDARY} > span > span {
    width: calc(100% - 16px);
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CTA_SECONDARY} > span > span`]:
      Link.LineSlideUnder.red,
    },
  })}
`;

// prettier-ignore
export const STYLES_CALL_TO_ACTION_ELEMENT = `
  .${ELEMENT_BASE_CTA} {
    display: inline-block;
    padding: ${Spacing.xs} ${Spacing.lg};
    font-size: ${FontSize.base};
    display: inline-block;
    font-weight: 700;
    text-align: left;
    line-height: 1.28em;
    max-width: ${MAX_WIDTH}px;
    position: relative;
    font-family: inherit;
  }

  .${ELEMENT_BASE_CTA} svg {
    fill: ${Colors.red};
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

  ${PrimaryStyles}
  ${OutlineStyles}
  ${SecondaryStyles}
  ${OverwriteSizeStyles}
  ${OverwriteThemeStyles}
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

  if (!wrapper || !textSpan) return;

  if (icon) {
    wrapper.insertBefore(icon, textSpan);
    return;
  }

  if (type === TYPE_SECONDARY) {
    wrapper.innerHTML = AssetIcon.FEARLESS;
    wrapper.appendChild(textSpan);
  }

  if (!isLink) return;

  if (isExternalTab) {
    wrapper.innerHTML = AssetIcon.NEW_WINDOW;
    wrapper.appendChild(textSpan);
    return;
  }

  if (isDownload) {
    wrapper.innerHTML = AssetIcon.DOCUMENT;
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
  theme = null,
  styleProps = null,
}: {
  cta?: HTMLElement | null;
  type?: string;
  size?: string | null;
  theme?: string | null;
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

  if (theme) {
    element.setAttribute(ATTR_THEME, theme);
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
