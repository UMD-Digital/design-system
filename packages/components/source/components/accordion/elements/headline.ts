import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  ELEMENT_NAME,
  SLOTS,
  BREAKPOINTS,
  ELEMENTS,
} from 'components/accordion/globals';
import { ELEMENT_TYPE } from 'components/accordion';
import { SlotDefaultStyling } from 'helpers/ui';
import { EventToggleExpand } from '../services/events';

const { Colors, Spacing } = Tokens;

const { HEADLINE } = SLOTS;
const { small } = BREAKPOINTS;
const { ACCORDION_HEADLINE } = ELEMENTS;

// prettier-ignore
export const headlineStyles = `
  .${ACCORDION_HEADLINE} {
    display: flex;
    border-top: 1px solid transparent;
    padding: 32px 100px 32px 32px !important;
    background-color: ${Colors.gray.lightest};
    padding-right: calc(16px + ${Spacing.sm} + ${Spacing.md}) !important;
    position: relative;
    text-align: left;
    transition: background 0.5s, border 0.5s, color 0.5s, padding 0.5s;
    width: 100%;
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_HEADLINE} {
      padding: ${Spacing.lg} !important;
      padding-right: calc(20px + ${Spacing.lg} + ${Spacing['2xl']}) !important;
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

  .${ACCORDION_HEADLINE}:hover,
  .${ACCORDION_HEADLINE}:focus {
    background-color: ${Colors.gray.light};
  }

  .${ACCORDION_HEADLINE}[aria-expanded='true'] {
    border-top: 1px solid ${Colors.red};
    color: ${Colors.red};
  }

  .${ACCORDION_HEADLINE}[aria-expanded='true']:after {
    transform: rotate(90deg);
  }

  .${ACCORDION_HEADLINE}[aria-expanded='true']:hover,
  .${ACCORDION_HEADLINE}[aria-expanded='true']:focus {
    color: ${Colors.black};
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
  headlineContainer.ariaExpanded = 'false';

  if (headerSlot) {
    headlineContainer.appendChild(headerSlot);

    headlineContainer.addEventListener('click', () => {
      const isExpanded = headlineContainer.ariaExpanded === 'true';

      EventToggleExpand({ element: element, expand: !isExpanded });
    });

    return headlineContainer;
  }

  return null;
};
