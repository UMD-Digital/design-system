import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles, MarkupCreate } from 'utilities';
import { SLOTS, ELEMENT_NAME, BREAKPOINTS, ELEMENTS, NAMING } from '../globals';
import { ELEMENT_TYPE } from '../index';

const { Colors, Spacing } = Tokens;

const { ConvertJSSObjectToStyles } = Styles;
const { Node } = MarkupCreate;

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
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_BODY_WRAPPER} {
    background-color: ${Colors.gray.darker};
  }

  .${CONTAINER_NAME}${THEME_DARK_ATTR} .${ACCORDION_BODY} {
    color: ${Colors.white} !important;
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
  }

  @container ${ELEMENT_NAME} (min-width: ${small}px) {
    .${ACCORDION_BODY}:first-child {
      margin-top: 0;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ACCORDION_BODY_WRAPPER}`]: Typography.SansMedium
    },
  })}
`;

export const CreateBody = ({ element }: { element: ELEMENT_TYPE }) => {
  const contentWrapper = document.createElement('div');
  const bodySlot = Node.slot({ type: BODY });

  contentWrapper.classList.add(ACCORDION_BODY_WRAPPER);

  if (bodySlot) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(ACCORDION_BODY);
    contentWrapper.ariaHidden = element._open ? 'false' : 'true';
    wrapper.appendChild(bodySlot);
    contentWrapper.appendChild(wrapper);

    return contentWrapper;
  }

  return null;
};
