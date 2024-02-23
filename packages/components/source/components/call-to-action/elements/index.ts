import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { MakeSlot } from 'helpers/ui';
import { ELEMENTS, SLOTS, VARIABLES } from '../globals';
import { CallToActionType } from '../component';
import {
  STYLES_CALL_TO_ACTION_ELEMENT,
  CreateCallToActionElement,
} from 'elements/call-to-action';

const { Colors, FontSize, Spacing } = Tokens;

const CTA_PLAIN_TEXT_SLOT = 'umd-call-to-action-plain-text-slot';

// prettier-ignore
const OverwritePrimaryLayoutStyles = `
  [${VARIABLES.ATTR_PLAIN_TEXT}][data-type="primary"]  {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  [data-type="primary"] .${CTA_PLAIN_TEXT_SLOT} {
    margin-top: ${Spacing.min};
  }
`

// prettier-ignore
const OverwriteSecondaryLayoutStyles = `
  [${VARIABLES.ATTR_PLAIN_TEXT}][data-type="secondary"]  {
    display: flex;
    flex-direction: column;
  }

  [data-type="secondary"] .${CTA_PLAIN_TEXT_SLOT} {
    padding-left: 20px;
    margin-top: ${Spacing.min};
  }
`

// prettier-ignore
const PlainTextSlotStyles = `
  .${CTA_PLAIN_TEXT_SLOT} {
    text-decoration: underline;
    display: inline-block;
    font-size: ${FontSize.min};
    transition: color .5s;
    position: relative;
  }

  .${CTA_PLAIN_TEXT_SLOT}:hover,
  .${CTA_PLAIN_TEXT_SLOT}:focus {
    color: ${Colors.redDark};
  }
`;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CALL_TO_ACTION_ELEMENT}
  ${PlainTextSlotStyles}
  ${OverwritePrimaryLayoutStyles}
  ${OverwriteSecondaryLayoutStyles}
`;

const CreateCtaElement = ({ element }: { element: CallToActionType }) => {
  const type = element._type;
  const size = element._size;
  const theme = element._theme;
  const styleProps = element._styleProps;

  const linkElement = element.querySelector(`a`);
  const buttonElement = element.querySelector(`button`);
  const styleObj = { type, size, theme, styleProps };

  if (linkElement) {
    const cta = linkElement.cloneNode(true) as HTMLAnchorElement;
    return CreateCallToActionElement({ cta, ...styleObj });
  }
  if (buttonElement) {
    const cta = buttonElement.cloneNode(true) as HTMLButtonElement;
    return CreateCallToActionElement({ cta, ...styleObj });
  }

  return CreateCallToActionElement({ type });
};

const CreatePlainText = ({ element }: { element: CallToActionType }) => {
  const linkElements = Array.from(element.querySelectorAll(`a`));
  return linkElements.filter(
    (link) => link.getAttribute('slot') === 'plain-text',
  );
};

export const CreateShadowDom = ({ element }: { element: CallToActionType }) => {
  const type = element._type;
  const container = document.createElement('div');
  const ctaElement = CreateCtaElement({ element });
  const plainTextElement = CreatePlainText({ element });
  const hasPlainText = plainTextElement.length > 0;

  container.classList.add(ELEMENTS.CTA_CONTAINER);
  container.appendChild(ctaElement);
  container.setAttribute('data-type', type);

  if (hasPlainText) {
    const plainTextSlot = MakeSlot({ type: SLOTS.PLAIN_TEXT });
    plainTextSlot.classList.add(CTA_PLAIN_TEXT_SLOT);
    container.setAttribute(VARIABLES.ATTR_PLAIN_TEXT, '');
    container.appendChild(plainTextSlot);
  }

  return container;
};
