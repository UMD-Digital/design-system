import {
  colors,
  fontWeight,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { CHEVRON_SMALL_ICON } from 'assets/icons';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { VARIABLES } from 'components/nav-drawer/globals';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const DRAWER_SLIDE_ACTION = 'umd-element-drawer-slide-action';
const DRAWER_SLIDE_ACTION_LINK = 'umd-element-drawer-slide-action-link';
const DRAWER_SLIDE_ACTION_BUTTON = 'umd-element-drawer-slide-action-button';

const anchorStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${DRAWER_SLIDE_ACTION_LINK}`]: typography['.umd-sans-medium'],
    },
  })}

  .${DRAWER_SLIDE_ACTION_LINK} {
    font-weight: ${fontWeight.extraBold};
    transition: color 0.3s ease-in-out;
  }

  .${DRAWER_SLIDE_ACTION_LINK}:hover,
  .${DRAWER_SLIDE_ACTION_LINK}:focus {
    color: ${colors.red};
  }
`;
const buttonStyles = `
  .${DRAWER_SLIDE_ACTION_BUTTON} {
    padding-right: ${spacing.sm};
    width: ${spacing.lg};
    height: ${spacing.lg};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .${DRAWER_SLIDE_ACTION_BUTTON} svg {
    fill: ${colors.red};
    height: 16px;
    width: 16px;
    transform: rotate(-90deg);
  }
`;

export const slideActionStyles = `
  .${DRAWER_SLIDE_ACTION} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${colors.gray.light};
    margin-bottom: ${spacing.min};
    padding-bottom: ${spacing.min};
  }

  @media (min-width: 480px) {
    .${DRAWER_SLIDE_ACTION} {
      margin-bottom: ${spacing.sm};
      padding-bottom: ${spacing.sm};
    }
  }

  ${anchorStyles}
  ${buttonStyles}
`;

const CreateSlideButton = ({ element }: { element: UMDNavDrawer }) => {
  const button = document.createElement('button');

  button.classList.add(DRAWER_SLIDE_ACTION_BUTTON);
  button.innerHTML = CHEVRON_SMALL_ICON;
  button.addEventListener('click', element.eventSlide.bind(element));

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
  const childReference = link.getAttribute(VARIABLES.ATTRIBUTE_CHILD_REF);

  actionContainer.classList.add(DRAWER_SLIDE_ACTION);

  link.classList.add(DRAWER_SLIDE_ACTION_LINK);
  actionContainer.appendChild(link);

  if (childReference) {
    const doesReferenceExist = element.querySelector(
      `[${VARIABLES.ATTRIBUTE_PARENT_REF}="${childReference}"]`,
    );

    if (doesReferenceExist) {
      const button = CreateSlideButton({ element });

      actionContainer.appendChild(button);
    } else {
      console.error(
        `Missing child reference for ${childReference} on ${link.innerHTML}`,
      );
    }
  }

  return actionContainer;
};
