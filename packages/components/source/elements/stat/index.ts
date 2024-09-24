import { Typography, Tokens, Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeStatElement = {
  stat?: HTMLElement | null;
};

type TypeStatRequirements = TypeStatElement & {
  theme?: string | null;
  displayType?: string | null;
  size?: string | null;
  hasLine?: boolean;
  text?: HTMLElement | null;
  subText?: HTMLElement | null;
};

const { ConvertJSSObjectToStyles } = Styles;
const { Text } = Elements;
const { Colors, Spacing, Breakpoints } = Tokens;
const {
  SansLarger,
  SansMedium,
  SansSmaller,
  SansMin,
  StatisticsMedium,
  StatisticsLarge,
} = Typography;

const BLOCK_TEXTURE = `<svg id="stat_block-texture" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" ><defs><style>.cls-1{opacity:.02;}.cls-1,.cls-2{fill:#454545;fill-rule:evenodd;isolation:isolate;stroke-width:0px;}.cls-2{opacity:.04;}</style></defs><path class="cls-1" d="M109.49,0H0v63.18l181.67,182.32L0,427.82v63.18h109.49l244.61-245.5L109.49,0Z"/><path class="cls-2" d="M108.94,0h172.44l244.61,245.5-244.61,245.5H108.94l244.61-245.5L108.94,0ZM0,179.11l58.16-58.29L0,62.54v116.57Z"/></svg>`;

const SMALL = 400;
const ELEMENT_NAME = 'umd-element-stat';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_SIZE = 'size';
const ATTRIBUTE_HAS_LINE = 'has-line';
const THEME_DARK = 'dark';
const SIZE_LARGE = 'large';

const ELEMENT_STAT_CONTAINER = `stat-container`;
const ELEMENT_STAT_WRAPPER = `stat-wrapper`;
const ELEMENT_STAT_DISPLAY = `stat-display`;
const ELEMENT_STAT_TEXT = `stat-text`;
const ELEMENT_STAT_SUB_TEXT = `stat-sub-text`;
const ELEMENT_DISPLAY_BLOCK = `stat-display-block`;

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_SIZE_LARGE = `[${ATTRIBUTE_SIZE}='${SIZE_LARGE}']`;
const IS_WITH_LINE = `[${ATTRIBUTE_HAS_LINE}]`;

const OVERWRITE_WITH_LINE_WRAPPER = `.${ELEMENT_STAT_WRAPPER}${IS_WITH_LINE}`;

const OVERWRITE_THEME_DARK_STAT_DISPLAY = `.${ELEMENT_STAT_WRAPPER}${IS_THEME_DARK} .${ELEMENT_STAT_DISPLAY}`;
const OVERWRITE_THEME_DARK_TEXT = `.${ELEMENT_STAT_WRAPPER}${IS_THEME_DARK} .${ELEMENT_STAT_TEXT}`;
const OVERWRITE_THEME_DARK_SUB_TEXT = `.${ELEMENT_STAT_WRAPPER}${IS_THEME_DARK} .${ELEMENT_STAT_SUB_TEXT}`;

const OVERWRITE_SIZE_LARGE_STAT_DISPLAY = `.${ELEMENT_STAT_WRAPPER}${IS_SIZE_LARGE} .${ELEMENT_STAT_DISPLAY}`;
const OVERWRITE_SIZE_LARGE_STAT_TEXT = `.${ELEMENT_STAT_WRAPPER}${IS_SIZE_LARGE} .${ELEMENT_STAT_TEXT}`;
const OVERWRITE_SIZE_LARGE_SUB_TEXT = `.${ELEMENT_STAT_WRAPPER}${IS_SIZE_LARGE} .${ELEMENT_STAT_SUB_TEXT}`;

// prettier-ignore
const VarationThemeDarkStyles = `
  .${ELEMENT_STAT_WRAPPER}${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_THEME_DARK_STAT_DISPLAY} {
    color: ${Colors.gold};
  }

  ${OVERWRITE_THEME_DARK_SUB_TEXT} {
    color: ${Colors.gray.light};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_TEXT}`]: Text.RichTextDark,
    },
  })}

`;

// prettier-ignore
const VarationDisplayBlockStyles = `
  .${ELEMENT_DISPLAY_BLOCK} {
    padding: ${Spacing.lg} ${Spacing.sm};
    border-top: 2px solid ${Colors.red};
    background-color: ${Colors.gray.lightest};
    position: relative;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media (min-width: ${Breakpoints.large.min}) {
    .${ELEMENT_DISPLAY_BLOCK} {
      padding: ${Spacing.lg};
    }
  }

  @media (min-width: ${Breakpoints.highDef.min}) {
    .${ELEMENT_DISPLAY_BLOCK} {
      padding: ${Spacing['2xl']} ${Spacing['3xl']};
    }
  }

  .${ELEMENT_DISPLAY_BLOCK} > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// prettier-ignore
const VarationSizeLargeStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_STAT_DISPLAY}`]: StatisticsLarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_STAT_DISPLAY} *`]: StatisticsLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_STAT_TEXT}`]: SansLarger,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_STAT_TEXT} *`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_SUB_TEXT}`]: SansSmaller,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_SUB_TEXT} *`]: SansSmaller,
    },
  })}
`;

// prettier-ignore
const VarationWithLineStyles = `
  ${OVERWRITE_WITH_LINE_WRAPPER} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.gold};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    ${OVERWRITE_WITH_LINE_WRAPPER} {
      padding-left: ${Spacing.xl};
    }
  }
`

// prettier-ignore
const StatDisplayStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_DISPLAY}`]: StatisticsMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_DISPLAY} *`]: StatisticsMedium,
    },
  })}
  
  .${ELEMENT_STAT_DISPLAY} {
    color: ${Colors.red};
    -webkit-font-smoothing: antialiased;
  }

  .${ELEMENT_STAT_DISPLAY} * {
    color: currentColor;
    -webkit-font-smoothing: antialiased;
  }

  .${ELEMENT_STAT_DISPLAY} + * {
    margin-top: ${Spacing.min};
   }
`;

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_TEXT}`]: Text.RichText,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_TEXT}`]: SansMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_TEXT} *`]: SansMedium,
    },
  })}

  .${ELEMENT_STAT_TEXT} {
    color: ${Colors.black};
    line-height: 1.444;
  }

  .${ELEMENT_STAT_TEXT} * {
    color: currentColor;
  }

  .${ELEMENT_STAT_TEXT} + * {
    margin-top: ${Spacing.min};
   }
`;

// prettier-ignore
const SubTextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_SUB_TEXT}`]: SansMin,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STAT_SUB_TEXT} *`]: SansMin,
    },
  })}

  .${ELEMENT_STAT_SUB_TEXT} {
    margin-top: ${Spacing.min};
    color: ${Colors.gray.mediumAA};
  }

  .${ELEMENT_STAT_SUB_TEXT} * {
    color: currentColor;
  }
`;

const STYLES_STAT_ELEMENT = `
  .${ELEMENT_STAT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    height: inherit;
  }

  .${ELEMENT_STAT_WRAPPER} {
    max-width: 720px;
    position: relative;
  }

  ${StatDisplayStyles}
  ${TextStyles}
  ${SubTextStyles}
  ${VarationSizeLargeStyles}
  ${VarationWithLineStyles}
  ${VarationThemeDarkStyles}
  ${VarationDisplayBlockStyles}
`;

const MakeStat = ({ stat }: TypeStatElement) => {
  if (stat) {
    let text = stat.textContent;

    if (!text) return null;

    text = text.trim();

    if (text.length > 6) {
      console.error('Stat text is too long. Please limit to 6 characters.');
      text = text.substring(0, 6);
    }

    stat.innerHTML = text;
    stat.classList.add(ELEMENT_STAT_DISPLAY);

    return stat;
  }

  return null;
};

const MakeDefaultLayout = (props: TypeStatRequirements) => {
  const { theme, size, text, subText } = props;

  const wrapper = document.createElement('div');
  const statElement = MakeStat(props);

  if (theme) wrapper.setAttribute(ATTRIBUTE_THEME, theme);
  if (size) wrapper.setAttribute(ATTRIBUTE_SIZE, size);

  wrapper.classList.add(ELEMENT_STAT_WRAPPER);

  if (statElement) wrapper.appendChild(statElement);

  if (text) {
    text.classList.add(ELEMENT_STAT_TEXT);
    wrapper.appendChild(text);
  }

  if (subText) {
    subText.classList.add(ELEMENT_STAT_SUB_TEXT);
    wrapper.appendChild(subText);
  }

  return wrapper;
};

export const CreateStatElement = (props: TypeStatRequirements) => {
  const { displayType, hasLine } = props;
  const container = document.createElement('div');
  const wrapper = MakeDefaultLayout(props);

  container.classList.add(ELEMENT_STAT_CONTAINER);

  if (displayType === 'block') {
    const block = document.createElement('div');
    block.classList.add(ELEMENT_DISPLAY_BLOCK);
    block.innerHTML = BLOCK_TEXTURE;
    block.appendChild(wrapper);

    container.appendChild(block);
    return container;
  }

  if (hasLine) wrapper.setAttribute(ATTRIBUTE_HAS_LINE, '');
  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateStatElement,
  Styles: STYLES_STAT_ELEMENT,
};
