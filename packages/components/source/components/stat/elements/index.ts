import { Typography, Tokens } from '@universityofmaryland/variables';
import { Styles, MarkupCreate } from 'utilities';
import { UMDStatElement } from '../index';
import { SLOTS, REFERENCES, VARIABLES } from '../globals';

const { ConvertJSSObjectToStyles, ResetString } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;
const { Colors, Spacing } = Tokens;
const {
  SansLarger,
  SansMedium,
  SansSmaller,
  SansMin,
  StatisticsMedium,
  StatisticsLarge,
} = Typography;

const { STAT, SUB_TEXT, TEXT } = SLOTS;
const {
  ELEMENT_NAME,
  ATTRIBUTE_THEME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_SIZE,
  ATTRIBUTE_HAS_LINE,
} = VARIABLES;
const { IS_THEME_DARK, IS_SIZE_LARGE, IS_WITH_LINE } = REFERENCES;

const SMALL = 400;

const STAT_CONTAINER = `umd-stat-container`;
const STAT_WRAPPER = `umd-stat-wrapper`;
const STAT_DISPLAY = `umd-stat-display`;
const STAT_TEXT = `umd-stat-text`;
const STAT_SUB_TEXT = `umd-stat-sub-text`;

// prettier-ignore
const VarationThemeDarkStyles = `
  .${STAT_WRAPPER}${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  .${STAT_WRAPPER}${IS_THEME_DARK} .${STAT_DISPLAY} {
    color: ${Colors.gold};
  }

  .${STAT_WRAPPER}${IS_THEME_DARK} .${STAT_SUB_TEXT} {
    color: ${Colors.gray.light};
  }
`;

// prettier-ignore
const VarationSizeLargeStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_WRAPPER}${IS_SIZE_LARGE} .${STAT_DISPLAY}`]: StatisticsLarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_WRAPPER}${IS_SIZE_LARGE} .${STAT_DISPLAY} *`]: StatisticsLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_WRAPPER}${IS_SIZE_LARGE} .${STAT_TEXT}`]: SansLarger,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_WRAPPER}${IS_SIZE_LARGE} .${STAT_TEXT} *`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_WRAPPER}${IS_SIZE_LARGE} .${STAT_SUB_TEXT}`]: SansSmaller,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_WRAPPER}${IS_SIZE_LARGE} .${STAT_SUB_TEXT} *`]: SansSmaller,
    },
  })}
`;

// prettier-ignore
const VarationWithLineStyles = `
  .${STAT_WRAPPER}${IS_WITH_LINE} {
    padding-left: ${Spacing.sm};
    border-left: 2px solid ${Colors.gold};
  }

  @container ${ELEMENT_NAME} (min-width: ${SMALL}px) {
    .${STAT_WRAPPER}${IS_WITH_LINE} {
      padding-left: ${Spacing.xl};
    }
  }
`

// prettier-ignore
const StatContainerStyles = `
  .${STAT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }
`;

// prettier-ignore
const StatWrapperStyles = `
  .${STAT_WRAPPER} {
    max-width: 480px;
  }
`;

// prettier-ignore
const StatDisplayStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_DISPLAY}`]: StatisticsMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_DISPLAY} *`]: StatisticsMedium,
    },
  })}
  
  .${STAT_DISPLAY} {
    color: ${Colors.red};
    -webkit-font-smoothing: antialiased;
  }

  .${STAT_DISPLAY} * {
    color: currentColor;
    -webkit-font-smoothing: antialiased;
  }

  .${STAT_DISPLAY} + * {
    margin-top: ${Spacing.min};
   }
`;

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_TEXT}`]: SansMedium,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_TEXT} *`]: SansMedium,
    },
  })}

  .${STAT_TEXT} {
    color: ${Colors.black};
    line-height: 1.444;
  }

  .${STAT_TEXT} * {
    color: currentColor;
  }

  .${STAT_TEXT} + * {
    margin-top: ${Spacing.min};
   }
`;

// prettier-ignore
const SubTextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_SUB_TEXT}`]: SansMin,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_SUB_TEXT} *`]: SansMin,
    },
  })}

  .${STAT_SUB_TEXT} {
    margin-top: ${Spacing.min};
    color: ${Colors.gray.mediumAA};
  }

  .${STAT_SUB_TEXT} * {
    color: currentColor;
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${ResetString}
  ${StatContainerStyles}
  ${StatWrapperStyles}
  ${StatDisplayStyles}
  ${TextStyles}
  ${SubTextStyles}
  ${VarationSizeLargeStyles}
  ${VarationWithLineStyles}
  ${VarationThemeDarkStyles}
`;

const MakeState = ({ element }: { element: UMDStatElement }) => {
  const stat = SlotWithDefaultStyling({ element, slotRef: STAT });

  if (stat) {
    let text = stat.textContent;

    if (!text) return null;

    text = text.trim();

    if (text.length > 6) {
      console.error('Stat text is too long. Please limit to 6 characters.');
      text = text.substring(0, 6);
    }

    stat.innerHTML = text;
    stat.classList.add(STAT_DISPLAY);

    return stat;
  }

  return null;
};

export const CreateShadowDom = ({ element }: { element: UMDStatElement }) => {
  const theme = element._theme;
  const type = element._type;
  const size = element._size;
  const hasLine = element._hasLine;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const stat = MakeState({ element });
  const text = SlotWithDefaultStyling({ element, slotRef: TEXT });
  const subText = SlotWithDefaultStyling({ element, slotRef: SUB_TEXT });

  container.classList.add(STAT_CONTAINER);
  wrapper.setAttribute(ATTRIBUTE_THEME, theme);
  wrapper.setAttribute(ATTRIBUTE_TYPE, type);
  wrapper.setAttribute(ATTRIBUTE_SIZE, size);
  if (hasLine) wrapper.setAttribute(ATTRIBUTE_HAS_LINE, '');
  wrapper.classList.add(STAT_WRAPPER);

  if (stat) wrapper.appendChild(stat);

  if (text) {
    text.classList.add(STAT_TEXT);
    wrapper.appendChild(text);
  }

  if (subText) {
    subText.classList.add(STAT_SUB_TEXT);
    wrapper.appendChild(subText);
  }

  container.appendChild(wrapper);

  return container;
};
