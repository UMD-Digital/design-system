import { Tokens, Typography } from '@universityofmaryland/variables';
import { CHEVRON_SMALL_ICON } from 'assets/icons';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { VARIABLES, ELEMENTS } from 'components/nav-drawer/globals';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { Colors, Spacing } = Tokens;

const DRAWER_SLIDE_ACTION_BUTTON = 'umd-element-drawer-slide-action-button';

// prettier-ignore
const anchorStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.DRAWER_SLIDE_ACTION_LINK}`]: Typography.SansMedium,
    },
  })}

  .${ELEMENTS.DRAWER_SLIDE_ACTION_LINK} {
    line-height: 1.3em;
  }

  .${ELEMENTS.DRAWER_SLIDE_ACTION_LINK} {
    font-weight: 700;
    transition: color 0.3s ease-in-out;
  }

  .${ELEMENTS.DRAWER_SLIDE_ACTION_LINK}:hover,
  .${ELEMENTS.DRAWER_SLIDE_ACTION_LINK}:focus {
    color: ${Colors.red};
  }
`;

// prettier-ignore
const buttonStyles = `
  .${DRAWER_SLIDE_ACTION_BUTTON} {
    position: absolute;
    right: ${Spacing.min};
    top: 5px;
    width: ${Spacing.lg};
    height: ${Spacing.lg};
    display: flex;
    justify-content: center;
  }

  .${DRAWER_SLIDE_ACTION_BUTTON}:hover svg,
  .${DRAWER_SLIDE_ACTION_BUTTON}:focus svg {
    transform: rotate(-90deg) translateY(4px);
  }

  .${DRAWER_SLIDE_ACTION_BUTTON} svg {
    fill: ${Colors.red};
    height: 16px;
    width: 16px;
    transform: rotate(-90deg) translateY(0);
    transition: transform 0.3s ease-in-out;
  }
`;

// prettier-ignore
export const slideActionStyles = `
  .${ELEMENTS.DRAWER_SLIDE_ACTION} {
    display: flex;
    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid ${Colors.gray.light};
    margin-bottom: ${Spacing.md};
    padding-bottom: ${Spacing.md};
    padding-right: ${Spacing['3xl']};
  }

  ${anchorStyles}
  ${buttonStyles}
`;

const CreateSlideButton = ({
  element,
  link,
}: {
  element: UMDNavDrawer;
  link: HTMLAnchorElement;
}) => {
  const childReference = link.getAttribute(VARIABLES.ATTRIBUTE_CHILD_REF);

  if (!childReference) return null;

  const doesReferenceExist = element.querySelector(
    `[${VARIABLES.ATTRIBUTE_PARENT_REF}="${childReference}"]`,
  );

  if (!doesReferenceExist) {
    console.error(
      `Missing child reference for ${childReference} on ${link.innerHTML}`,
    );
    return null;
  }

  const button = document.createElement('button');
  button.classList.add(DRAWER_SLIDE_ACTION_BUTTON);
  button.setAttribute('type', 'button');
  button.innerHTML = CHEVRON_SMALL_ICON;
  button.addEventListener('click', () => {
    element._upcomingSlide = childReference;
    element.eventSlideLeft();
  });

  return button;
};

export const CreateSlideAction = ({
  element,
  link,
}: {
  element: UMDNavDrawer;
  link: HTMLAnchorElement;
}) => {
  const actionContainer = document.createElement('div');
  const button = CreateSlideButton({ element, link });

  actionContainer.classList.add(ELEMENTS.DRAWER_SLIDE_ACTION);

  link.classList.add(ELEMENTS.DRAWER_SLIDE_ACTION_LINK);
  actionContainer.appendChild(link);

  if (button) actionContainer.appendChild(button);

  return actionContainer;
};
