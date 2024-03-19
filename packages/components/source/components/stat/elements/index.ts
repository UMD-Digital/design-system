import { Typography, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { SlotDefaultStyling } from 'helpers/ui';
import { UMDStatElement } from '../index';
import { SLOTS, REFERENCES, VARIABLES } from '../globals';

const { Colors, Spacing } = Tokens;
const { SansLarger, SansSmaller, StatisticsLarge } = Typography;

const { STAT, SUB_TEXT, TEXT } = SLOTS;
const { ATTRIBUTE_THEME, ATTRIBUTE_TYPE } = VARIABLES;
const { IS_THEME_DARK } = REFERENCES;

const STAT_CONTAINER = `umd-stat-container`;
const STAT_WRAPPER = `umd-stat-wrapper`;
const STAT_DISPLAY = `umd-stat-display`;
const STAT_TEXT = `umd-stat-text`;
const STAT_SUB_TEXT = `umd-stat-sub-text`;

// prettier-ignore
const VarationThemeDarkStyles = `
  .${STAT_CONTAINER}${IS_THEME_DARK} .${STAT_WRAPPER} * {
    color: ${Colors.white};
  }

  .${STAT_CONTAINER}${IS_THEME_DARK} .${STAT_DISPLAY} {
    color: ${Colors.gold};
  }
`;

// prettier-ignore
const StatContainerStyles = `
  .${STAT_CONTAINER} {

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
      [`.${STAT_DISPLAY}`]: StatisticsLarge,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_DISPLAY} *`]: StatisticsLarge,
    },
  })}
  
  .${STAT_DISPLAY} {
    color: ${Colors.red};
  }

  .${STAT_DISPLAY} * {
    color: currentColor;
  }

  .${STAT_DISPLAY} + * {
    margin-top: ${Spacing.sm};
   }
`;

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_TEXT}`]: SansLarger,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_TEXT} *`]: SansLarger,
    },
  })}

  .${STAT_TEXT} {
    color: ${Colors.black};
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
      [`.${STAT_SUB_TEXT}`]: SansSmaller,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${STAT_SUB_TEXT} *`]: SansSmaller,
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

  ${Reset}
  ${StatContainerStyles}
  ${StatWrapperStyles}
  ${StatDisplayStyles}
  ${TextStyles}
  ${SubTextStyles}
  ${VarationThemeDarkStyles}
`;

const MakeState = ({ element }: { element: UMDStatElement }) => {
  const stat = SlotDefaultStyling({ element, slotRef: STAT });

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
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const stat = MakeState({ element });
  const text = SlotDefaultStyling({ element, slotRef: TEXT });
  const subText = SlotDefaultStyling({ element, slotRef: SUB_TEXT });

  container.classList.add(STAT_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  container.setAttribute(ATTRIBUTE_TYPE, type);
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
