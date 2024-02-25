import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  SLOTS,
  ELEMENT_NAME,
  BREAKPOINTS,
  ELEMENTS,
} from 'components/accordion/globals';
import { ELEMENT_TYPE } from 'components/accordion';
import { SlotDefaultStyling } from 'helpers/ui';

const { Colors, Spacing } = Tokens;

const { BODY } = SLOTS;
const { small } = BREAKPOINTS;
const { ACCORDION_BODY, ACCORDION_BODY_WRAPPER } = ELEMENTS;

// prettier-ignore
export const bodyStyles = `
    .${ACCORDION_BODY_WRAPPER} {
        background-color: ${Colors.gray.lightest};
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in-out !important;
    }

    .${ACCORDION_BODY_WRAPPER}[aria-hidden="true"] .${ACCORDION_BODY} {
       visibility: hidden;
    }

    .${ACCORDION_BODY} {
        padding: ${Spacing.md} !important;
    }

    @container ${ELEMENT_NAME} (min-width: ${small}px) {
        .${ACCORDION_BODY} {
            padding: ${Spacing.lg} !important;
        }
    }
    
    .${ACCORDION_BODY} > * {
        margin-top: ${Spacing.sm} !important;
    }

    .${ACCORDION_BODY} > *:first-child {
        margin-top: 0 !important;
    }

    @container ${ELEMENT_NAME} (min-width: ${small}px) {
        .${ACCORDION_BODY} > * {
            margin-top: ${Spacing.lg} !important;
        }

        .${ACCORDION_BODY}:first-child {
            margin-top: 0;
          }
    }

    ${ConvertJSSObjectToStyles({
        styleObj: {
          [`.${ACCORDION_BODY_WRAPPER}`]:
            Typography.SansMedium
        },
    })}
`;

export const CreateBody = ({ element }: { element: ELEMENT_TYPE }) => {
  const contentWrapper = document.createElement('div');
  const bodySlot = SlotDefaultStyling({ element, slotRef: BODY });

  contentWrapper.classList.add(ACCORDION_BODY_WRAPPER);

  if (bodySlot) {
    bodySlot.classList.add(ACCORDION_BODY);
    contentWrapper.ariaHidden = 'true';
    contentWrapper.appendChild(bodySlot);
    return contentWrapper;
  }

  return null;
};
