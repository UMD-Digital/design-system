import { Tokens, Typography } from '@universityofmaryland/variables';
import { CHEVRON_SMALL_ICON } from 'utilities/assets/icons';
import { Styles } from 'utilities';
import { CreateSlideAction } from './slide-action';
import { ELEMENTS, VARIABLES } from '../../globals';
import { UMDNavDrawer } from '../../index';

const { Colors, Spacing } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

const {
  ATTRIBUTE_ACTIVE_SLIDE,
  ATTRIBUTE_PARENT_REF,
  ATTRIBUTE_DATA_SLIDE,
  ATTRIBUTE_CHILD_REF,
} = VARIABLES;
const { DRAWER_SLIDE_ACTION_BACK_BUTTON, DRAWER_SLIDE_SECONDARY_ACTION } =
  ELEMENTS;

const DRAWER_SLIDER_CHILD_CONTAINER = 'umd-element-drawer-child-slider';
const DRAWER_SLIDER_HEADLINE = 'umd-element-drawer-back-headline';
const DRAWER_SLIDER_ACTIONS = 'umd-element-drawer-back-actions';

// prettier-ignore
const backButtonStyles = `
  .${DRAWER_SLIDE_ACTION_BACK_BUTTON} {
    display: block;
    border-bottom: 1px solid ${Colors.gray.light};
    margin-bottom: ${Spacing.sm};
    padding-bottom: ${Spacing.sm};
  }

  @media (min-width: 480px) {
    .${DRAWER_SLIDE_ACTION_BACK_BUTTON} {
      margin-bottom: ${Spacing.md};
      padding-bottom: ${Spacing.md};
    }
  }

  .${DRAWER_SLIDE_ACTION_BACK_BUTTON} button {
    text-transform: uppercase;
    font-weight: 600;
    letter-Spacing: 1px;
    display: flex;
    align-items: center;
    color: ${Colors.black};
  }

  .${DRAWER_SLIDE_ACTION_BACK_BUTTON} button:hover,
  .${DRAWER_SLIDE_ACTION_BACK_BUTTON} button:focus {
    text-decoration: underline;
  }

  .${DRAWER_SLIDE_ACTION_BACK_BUTTON} button svg {
    fill: ${Colors.red};
    width: 12px;
    height: 12px;
    margin-right: ${Spacing.min};
    transform: rotate(90deg);
  }
`;

// prettier-ignore
const headlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${DRAWER_SLIDER_HEADLINE}`]: Typography.SansLarge,
    },
  })}

  .${DRAWER_SLIDER_HEADLINE} {
    margin-bottom: ${Spacing.md};
    font-weight: 700;
  }
`;

// prettier-ignore
const slideActionStyles = `
  .${DRAWER_SLIDER_ACTIONS} {
    padding-left: ${Spacing.sm};
  }

  .${DRAWER_SLIDER_ACTIONS} a {
    font-weight: 400;
  }
`;

// prettier-ignore
export const childSliderStyles = `
  ${backButtonStyles}
  ${headlineStyles}
  ${slideActionStyles}
`;

const createSlideBackButton = ({
  element,
  parentRef,
}: {
  element: UMDNavDrawer;
  parentRef: string;
}) => {
  const backButtonContainer = document.createElement('div');
  const slideBackButton = document.createElement('button');

  slideBackButton.innerHTML = `${CHEVRON_SMALL_ICON} Back`;
  slideBackButton.setAttribute('type', 'button');
  slideBackButton.addEventListener('click', () => {
    element._upcomingSlide = parentRef;
    element.eventSlideRight();
  });

  backButtonContainer.classList.add(DRAWER_SLIDE_ACTION_BACK_BUTTON);
  backButtonContainer.appendChild(slideBackButton);

  return backButtonContainer;
};

const createSlideHeadline = ({ headline }: { headline: string }) => {
  const slideHeadline = document.createElement('p');

  slideHeadline.innerHTML = headline;
  slideHeadline.classList.add(DRAWER_SLIDER_HEADLINE);

  return slideHeadline;
};

const createSlideActions = ({
  element,
  slide,
}: {
  element: UMDNavDrawer;
  slide: HTMLDivElement;
}) => {
  const slideActionsContainer = document.createElement('div');
  const clonedSlide = slide.cloneNode(true) as HTMLDivElement;
  const links = Array.from(
    clonedSlide.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    links.forEach((link) => {
      const slideAction = CreateSlideAction({ element, link });
      slideAction.classList.add(DRAWER_SLIDE_SECONDARY_ACTION);
      slideActionsContainer.appendChild(slideAction);
    });
  }

  slideActionsContainer.classList.add(DRAWER_SLIDER_ACTIONS);

  return slideActionsContainer;
};

export const CreateChildSlide = ({ element }: { element: UMDNavDrawer }) => {
  const slides = Array.from(
    element.querySelectorAll(`[${ATTRIBUTE_PARENT_REF}]`),
  ) as HTMLDivElement[];

  return slides.map((slide) => {
    const sliderContainer = document.createElement('div');
    const isSlideActive = slide.hasAttribute(ATTRIBUTE_ACTIVE_SLIDE);
    const parentRef = slide.getAttribute(ATTRIBUTE_PARENT_REF) as string;
    const parentElement = element.querySelector(
      `[${ATTRIBUTE_CHILD_REF}="${parentRef}"]`,
    ) as HTMLElement;

    if (!parentElement) {
      console.error(`No parent reference found for ${parentRef}`);
      return;
    }

    const headline = parentElement.textContent as string;
    const slideBackButton = createSlideBackButton({ element, parentRef });
    const slideHeadline = createSlideHeadline({ headline });
    const slideActions = createSlideActions({ element, slide });

    if (isSlideActive) {
      sliderContainer.setAttribute(`${ATTRIBUTE_ACTIVE_SLIDE}`, ``);
      element._currentSlide = sliderContainer;
    }

    sliderContainer.setAttribute(`${ATTRIBUTE_DATA_SLIDE}`, '');
    sliderContainer.classList.add(DRAWER_SLIDER_CHILD_CONTAINER);
    sliderContainer.setAttribute(`${ATTRIBUTE_PARENT_REF}`, `${parentRef}`);

    sliderContainer.appendChild(slideBackButton);
    sliderContainer.appendChild(slideHeadline);
    sliderContainer.appendChild(slideActions);

    return sliderContainer;
  });
};
