import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  SLOTS,
  ELEMENT_NAME,
  BREAKPOINTS,
  ELEMENTS,
} from 'components/accordion/globals';
import { ELEMENT_TYPE } from 'components/accordion/component';
import { SlotDefaultStyling } from 'helpers/ui';

const { Colors, Spacing } = Tokens;

// prettier-ignore
export const bodyStyles = `
    .${ELEMENTS.ACCORDION_BODY_WRAPPER} {
        background-color: ${Colors.gray.lightest};
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out !important;
    }

    .${ELEMENTS.ACCORDION_BODY_WRAPPER}[aria-hidden="true"] .${ELEMENTS.ACCORDION_BODY} {
       visibility: hidden;
    }

    .${ELEMENTS.ACCORDION_BODY} {
        padding: ${Spacing.md} !important;
    }

    @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.small}px) {
        .${ELEMENTS.ACCORDION_BODY} {
            padding: ${Spacing.lg} !important;
        }
    }
    
    .${ELEMENTS.ACCORDION_BODY} > * {
        margin-top: ${Spacing.sm} !important;
    }

    .${ELEMENTS.ACCORDION_BODY} > *:first-child {
        margin-top: 0 !important;
    }

    @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.small}px) {
        .${ELEMENTS.ACCORDION_BODY} > * {
            margin-top: ${Spacing.lg} !important;
        }

        .${ELEMENTS.ACCORDION_BODY}:first-child {
            margin-top: 0;
          }
    }

    ${ConvertJSSObjectToStyles({
        styleObj: {
          [`.${ELEMENTS.ACCORDION_BODY_WRAPPER}`]:
            Typography.SansMedium
        },
    })}
`;

export const CreateBody = ({ element }: { element: ELEMENT_TYPE }) => {
  const contentWrapper = document.createElement('div');
  const bodySlot = SlotDefaultStyling({ element, slotRef: SLOTS.BODY });

  contentWrapper.classList.add(ELEMENTS.ACCORDION_BODY_WRAPPER);

  if (bodySlot) {
    bodySlot.classList.add(ELEMENTS.ACCORDION_BODY);
    contentWrapper.ariaHidden = 'true';
    contentWrapper.appendChild(bodySlot);
    return contentWrapper;
  }

  return null;
};
