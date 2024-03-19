import {
  Animations,
  Typography,
  Tokens,
} from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { SlotDefaultStyling } from 'helpers/ui';
import { UMDStatElement } from '../index';
import { SLOTS } from '../globals';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarger, SansMin, Eyebrow } = Typography;

const { STAT, SUB_TEXT, TEXT } = SLOTS;

const STAT_CONTAINER = `umd-stat-container`;
const STAT_WRAPPER = `umd-stat-wrapper`;
const STAT_DISPLAY = `umd-stat-display`;
const STAT_TEXT = `umd-stat-text`;
const STAT_SUB_TEXT = `umd-stat-sub-text`;

// prettier-ignore
const StatContainerStyles = `
  .${STAT_CONTAINER} {

  }
`;

// prettier-ignore
const StatWrapperStyles = `
  .${STAT_WRAPPER} {

  }
`;

// prettier-ignore
const StatDisplayStyles = `
  .${STAT_DISPLAY} {

  }
`;

// prettier-ignore
const TextStyles = `
  .${STAT_TEXT} {

  }
`;

// prettier-ignore
const SubTextStyles = `
  .${STAT_SUB_TEXT} {
    margin-top: ${Spacing.min};
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
`;

export const CreateShadowDom = ({ element }: { element: UMDStatElement }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const stat = SlotDefaultStyling({ element, slotRef: STAT });
  const text = SlotDefaultStyling({ element, slotRef: TEXT });
  const subText = SlotDefaultStyling({ element, slotRef: SUB_TEXT });

  container.classList.add(STAT_CONTAINER);
  wrapper.classList.add(STAT_WRAPPER);

  if (stat) {
    stat.classList.add(STAT_DISPLAY);
    wrapper.appendChild(stat);
  }

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
