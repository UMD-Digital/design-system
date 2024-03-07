import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  ELEMENT_NAME,
  SLOTS,
  BREAKPOINTS,
  ELEMENTS,
  NAMING,
} from 'components/accordion/globals';
import { ELEMENT_TYPE } from 'components/accordion';
import { SlotDefaultStyling } from 'helpers/ui';
import { EventAdjustExpandState, EventAdjustHeight } from '../services/events';

const { Colors, Spacing } = Tokens;

const { HEADLINE } = SLOTS;
const { small } = BREAKPOINTS;
const { ACCORDION_HEADLINE, CONTAINER_NAME } = ELEMENTS;
const { THEME_DARK_ATTR } = NAMING;

// prettier-ignore
export const headlineStyles = `
  .${ACCORDION_HEADLINE} {
    display: flex;
    border-top: 1px solid transparent;
    padding: ${Spacing.md};
    padding-right: ${Spacing['4xl']};
    background-color: ${Colors.gray.lightest};
    position: relative;
    transition: background 0.5s, border 0.5s, color 0.5s, padding 0.5s;
    width: 100%;
    text-align: left;
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE} {
    background-color: ${Colors.black};
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE} > * {
    color: ${Colors.white}
  }

  .${CONTAINER_NAME} .${ACCORDION_HEADLINE} > * {
    color: ${Colors.gray.dark}
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_HEADLINE} {
      padding: ${Spacing.lg};
      padding-right: ${Spacing['6xl']}
    }
  }

  .${ACCORDION_HEADLINE}:before,
  .${ACCORDION_HEADLINE}:after {
    content: '';
    background-color: ${Colors.red};
    position: absolute;
    right: ${Spacing.md};
    transition: background 0.5s, height 0.5s, right 0.5s, top 0.5s,
    transform 0.5s, width 0.5s;
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}:before,
  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}:after {
    background-color: ${Colors.gold};
  }

  .${ACCORDION_HEADLINE}:before {
    height: 4px;
    top: calc(50% - 2px);
    width: 16px;
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_HEADLINE}:before {
      width: 20px;
      right: 32px;
    }
  }

  .${ACCORDION_HEADLINE}:after {
    height: 16px;
    top: calc(50% - 8px);
    right: calc(${Spacing.md} + 6px);
    width: 4px;
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_HEADLINE}:after {
      height: 20px;
      top: calc(50% - 10px);
      right: calc(${Spacing.lg} + 8px);
    }
  }

  .${ACCORDION_HEADLINE}[aria-expanded='true'],
  .${ACCORDION_HEADLINE}:hover,
  .${ACCORDION_HEADLINE}:focus {
    background-color: ${Colors.gray.lighter};
    border-top: 1px solid ${Colors.red};
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}[aria-expanded='true'],
  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}:hover,
  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}:focus {
    background-color: ${Colors.gray.dark};
    border-top: 1px solid ${Colors.gold};
  }

  .${ACCORDION_HEADLINE}[aria-expanded='true'] > *,
  .${ACCORDION_HEADLINE}:hover > *,
  .${ACCORDION_HEADLINE}:focus > * {
    color: ${Colors.red} !important;
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}[aria-expanded='true'] > *,
  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}:hover > *,
  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_HEADLINE}:focus > * {
    color: ${Colors.gold} !important;
  }

  .${ACCORDION_HEADLINE}[aria-expanded='true']:after {
    transform: rotate(90deg);
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ACCORDION_HEADLINE}`]:
        Typography.SansLarge,
    },
  })}
`;

export const CreateHeadline = ({ element }: { element: ELEMENT_TYPE }) => {
  const headlineContainer = document.createElement('button');
  const headerSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });

  headlineContainer.classList.add(ACCORDION_HEADLINE);
  headlineContainer.ariaExpanded = element._open ? 'true' : 'false';

  if (headerSlot) {
    headlineContainer.appendChild(headerSlot);

    headlineContainer.addEventListener('click', () => {
      EventAdjustExpandState({ element: element });
      EventAdjustHeight({ element: element, maintainExpandState: false });
    });

    return headlineContainer;
  }

  return null;
};
