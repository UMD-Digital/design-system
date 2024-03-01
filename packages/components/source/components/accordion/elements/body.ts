import { Tokens, Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  SLOTS,
  ELEMENT_NAME,
  BREAKPOINTS,
  ELEMENTS,
  NAMING,
} from 'components/accordion/globals';
import { ELEMENT_TYPE } from 'components/accordion';
import { SlotDefaultStyling } from 'helpers/ui';

const { Colors, Spacing } = Tokens;

const { BODY } = SLOTS;
const { small } = BREAKPOINTS;
const { ACCORDION_BODY, ACCORDION_BODY_WRAPPER, CONTAINER_NAME } = ELEMENTS;
const { THEME_DARK_ATTR } = NAMING;

// prettier-ignore
export const bodyStyles = `
  .${ACCORDION_BODY_WRAPPER} {
    background-color: ${Colors.gray.lightest};
    height: 0;
    overflow: hidden;
    transition: height 0.5s ease-in-out;
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_BODY_WRAPPER} {
    background-color: ${Colors.gray.darker};
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_BODY} > * {
    color: ${Colors.white} !important;
  }

  .${ACCORDION_BODY} {
      padding: ${Spacing.md};
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_BODY} {
      padding: ${Spacing.lg};
    }
  }

  .${ACCORDION_BODY} > * {
    margin-top: ${Spacing.sm};
  }

  .${ACCORDION_BODY} > *:first-child {
    margin-top: 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_BODY} > * {
      margin-top: ${Spacing.lg};
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
    contentWrapper.ariaHidden = element._open ? 'false' : 'true';
    contentWrapper.appendChild(bodySlot);

    return contentWrapper;
  }

  return null;
};
