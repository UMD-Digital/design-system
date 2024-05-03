import { Tokens } from '@universityofmaryland/variables';
import { AssetIcon, Styles } from 'utilities';
import { SetLocalString } from '../services/helper';
import { EventClose } from '../services/events';
import { CreateHeadline, headlineStyles } from './headline';
import { CreateBody, bodyStyles } from './body';
import { CreateCta, ctaStyles } from './cta';
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../globals';
import { UMDAlertElement } from '../index';

const { Colors, Spacing } = Tokens;

const { SMALL } = BREAKPOINTS;
const { ICON_CLASS } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_WITH_ICON, IS_WITHOUT_ICON } = REFERENCES;

const CONTAINER_CLASS = 'umd-element-alert-container';
const CLOSE_BUTTON_CLASS = 'umd-element-alert-close-button';

const ButtonStyles = `
  .${CLOSE_BUTTON_CLASS} {
    position: absolute;
    top: ${Spacing.lg};
    right: ${Spacing.lg};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL}px) {
    .${CLOSE_BUTTON_CLASS} {
      top: ${Spacing.sm};
      right: ${Spacing.sm};
    }
  }
`;

const IconStyles = `
  .${CONTAINER_CLASS}${IS_WITH_ICON} .${ICON_CLASS} {
    display: block;
    fill: ${Colors.gold};
  }

  .${CONTAINER_CLASS}${IS_WITHOUT_ICON} .${ICON_CLASS} {
    display: none;
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL}px) {
    .${ICON_CLASS} {
      position: absolute;
      top: -20px;
    }
  }
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}

  :host .${CONTAINER_CLASS} {
    container: ${ELEMENT_NAME} / inline-size;
    display: flex;
    position: relative;
    padding: ${Spacing.lg};
    padding-right: ${Spacing['2xl']};
    gap: ${Spacing.lg};
    border: solid 4px ${Colors.gold};
  }

  @container ${ELEMENT_NAME} (max-width: 260px) {
    .${CONTAINER_CLASS} {
      display: none
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL}px) {
    .${CONTAINER_CLASS} {
      padding-right: ${Spacing.lg};
    }
  }

  ${IconStyles}
  ${ButtonStyles}
  ${headlineStyles}
  ${bodyStyles}
  ${ctaStyles}
`;

const CreateIcon = ({ element }: { element: UMDAlertElement }) => {
  const type = element.getAttribute('type');
  const iconWrapper = document.createElement('div');
  let icon = AssetIcon.NOTIFICATION;

  if (type && type === 'emergency') {
    icon = AssetIcon.EXCLAMATION;
  }

  iconWrapper.classList.add(ICON_CLASS);
  iconWrapper.innerHTML = icon;

  return iconWrapper;
};

const CreateCloseButton = ({ element }: { element: UMDAlertElement }) => {
  const closeButton = document.createElement('button');

  closeButton.classList.add(CLOSE_BUTTON_CLASS);
  closeButton.innerHTML = AssetIcon.CLOSE_BUTTON;
  closeButton.setAttribute('aria-label', 'Close alert');
  closeButton.addEventListener('click', () => {
    EventClose({ element });
    SetLocalString();
  });

  return closeButton;
};

export const CreateShadowDom = ({ element }: { element: UMDAlertElement }) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const headline = CreateHeadline({ element });
  const body = CreateBody({ element });
  const cta = CreateCta({ element });

  container.classList.add(CONTAINER_CLASS);

  if (headline) wrapper.appendChild(headline);
  if (body) wrapper.appendChild(body);
  if (cta) wrapper.appendChild(cta);

  container.appendChild(CreateIcon({ element }));
  container.appendChild(wrapper);
  container.appendChild(CreateCloseButton({ element }));

  return container;
};
