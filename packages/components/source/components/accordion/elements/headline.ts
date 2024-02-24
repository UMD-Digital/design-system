import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  ELEMENT_NAME,
  SLOTS,
  BREAKPOINTS,
  ELEMENTS,
} from 'components/accordion/globals';
import { ELEMENT_TYPE } from 'components/accordion/component';
import { SlotDefaultStyling } from 'helpers/ui';
import { EventToggleExpand } from '../services/events';

const { Colors, Spacing } = Tokens;

// prettier-ignore
export const headlineStyles = `
  .${ELEMENTS.ACCORDION_HEADLINE} {
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

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.small}px) {
    .${ELEMENTS.ACCORDION_HEADLINE} {
      padding: ${Spacing.lg} !important;
      padding-right: calc(20px + ${Spacing.lg} + ${Spacing['2xl']}) !important;
    }
  }

  .${ELEMENTS.ACCORDION_HEADLINE}:before,
  .${ELEMENTS.ACCORDION_HEADLINE}:after {
    content: '';
    background-color: ${Colors.red};
    position: absolute;
    right: ${Spacing.md};
    transition: background 0.5s, height 0.5s, right 0.5s, top 0.5s,
    transform 0.5s, width 0.5s;
  }

  .${ELEMENTS.ACCORDION_HEADLINE}:before {
    height: 4px;
    top: calc(50% - 2px);
    width: 16px;
  }

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.small}px) {
    .${ELEMENTS.ACCORDION_HEADLINE}:before {
      width: 20px;
      right: 32px;
    }
  }

  .${ELEMENTS.ACCORDION_HEADLINE}:after {
    height: 16px;
    top: calc(50% - 8px);
    right: calc(${Spacing.md} + 6px);
    width: 4px;
  }

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.small}px) {
    .${ELEMENTS.ACCORDION_HEADLINE}:after {
      height: 20px;
      top: calc(50% - 10px);
      right: calc(${Spacing.lg} + 8px);
    }
  }

  .${ELEMENTS.ACCORDION_HEADLINE}:hover,
  .${ELEMENTS.ACCORDION_HEADLINE}:focus {
    background-color: ${Colors.gray.light};
  }

  .${ELEMENTS.ACCORDION_HEADLINE}[aria-expanded='true'] {
    border-top: 1px solid ${Colors.red};
    color: ${Colors.red};
  }

  .${ELEMENTS.ACCORDION_HEADLINE}[aria-expanded='true']:after {
    transform: rotate(90deg);
  }

  .${ELEMENTS.ACCORDION_HEADLINE}[aria-expanded='true']:hover,
  .${ELEMENTS.ACCORDION_HEADLINE}[aria-expanded='true']:focus {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.ACCORDION_HEADLINE}`]:
        Typography.SansLarge,
    },
  })}
`;

export const CreateHeadline = ({ element }: { element: ELEMENT_TYPE }) => {
  const headlineContainer = document.createElement('button');
  const headerSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });

  headlineContainer.classList.add(ELEMENTS.ACCORDION_HEADLINE);
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
