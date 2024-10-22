import { Tokens, Typography } from '@universityofmaryland/variables';
import { AssetIcon, Styles } from 'utilities';

export type TypeActionProps = {
  GetContainer: () => Element | null;
  setUpcomingSlide: (arg: string) => void;
  eventSlideLeft: () => void;
  ATTRIBUTE_CHILD_REF: string;
  ATTRIBUTE_PARENT_REF: string;
};

export type TypeAction = TypeActionProps & {
  link: HTMLAnchorElement;
};

const { Colors, Spacing } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_SLIDE_ACTION_CONTAINER = 'nav-slide-action-container';
const ELEMENT_SLIDE_ACTION_LINK = 'nav-slide-action-link';
const ELEMENT_SLIDE_ACTION_BUTTON = 'nav-slide-action-button';

// prettier-ignore
const LinkStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDE_ACTION_LINK}`]: Typography.SansSmall,
    },
  })}

  .${ELEMENT_SLIDE_ACTION_LINK} {
    transition: color 0.3s ease-in-out;
  }

  a.${ELEMENT_SLIDE_ACTION_LINK}:hover,
  a.${ELEMENT_SLIDE_ACTION_LINK}:focus {
    color: ${Colors.red};
  }
`;

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_SLIDE_ACTION_BUTTON} {
    position: absolute;
    right: ${Spacing.min};
    top: 5px;
    width: ${Spacing.lg};
    height: ${Spacing.lg};
    display: flex;
    justify-content: center;
  }

  .${ELEMENT_SLIDE_ACTION_BUTTON}:hover svg,
  .${ELEMENT_SLIDE_ACTION_BUTTON}:focus svg {
    transform: rotate(-90deg) translateY(4px);
  }

  .${ELEMENT_SLIDE_ACTION_BUTTON} svg {
    fill: ${Colors.red};
    height: 16px;
    width: 16px;
    transform: rotate(-90deg) translateY(0);
    transition: transform 0.3s ease-in-out;
  }
`;

// prettier-ignore
const STYLES_SLIDER_ACTION_ELEMENT = `
  .${ELEMENT_SLIDE_ACTION_CONTAINER} {
    display: flex;
    justify-content: space-between;
    position: relative;
    padding-right: ${Spacing['3xl']};
    margin-bottom: ${Spacing.xs};
  }

  ${LinkStyles}
  ${ButtonStyles}
`;

const CreateSlideButton = ({
  link,
  GetContainer,
  setUpcomingSlide,
  eventSlideLeft,
  ATTRIBUTE_CHILD_REF,
}: TypeAction) => {
  const element = GetContainer();

  if (!element) return null;

  const childReference = link.getAttribute(ATTRIBUTE_CHILD_REF);

  if (!childReference) return null;

  const button = document.createElement('button');
  button.classList.add(ELEMENT_SLIDE_ACTION_BUTTON);
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Next level of navigation');
  button.innerHTML = AssetIcon.CHEVRON_SMALL;
  button.addEventListener('click', () => {
    setUpcomingSlide(childReference);
    eventSlideLeft();
  });

  return button;
};

const CreateSliderActionElement = (props: TypeAction) => {
  const { link } = props;
  const actionContainer = document.createElement('div');
  const button = CreateSlideButton(props);

  actionContainer.classList.add(ELEMENT_SLIDE_ACTION_CONTAINER);

  link.classList.add(ELEMENT_SLIDE_ACTION_LINK);
  actionContainer.appendChild(link);

  if (button) actionContainer.appendChild(button);

  return actionContainer;
};

export default {
  CreateElement: CreateSliderActionElement,
  Styles: STYLES_SLIDER_ACTION_ELEMENT,
  Elements: {
    container: ELEMENT_SLIDE_ACTION_CONTAINER,
    link: ELEMENT_SLIDE_ACTION_LINK,
  },
};
