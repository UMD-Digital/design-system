import { Tokens, typography } from '@universityofmaryland/variables';
import { CHEVRON_SMALL_ICON } from 'assets/icons';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { CreateSlideAction } from './slide-action';

const { colors, fontWeight, spacing } = Tokens;

const DRAWER_SLIDER_CHILD_CONTAINER = 'umd-element-drawer-child-slider';
const DRAWER_SLIDER_HEADLINE = 'umd-element-drawer-back-headline';
const DRAWER_SLIDER_ACTIONS = 'umd-element-drawer-back-actions';

// prettier-ignore
const backButtonStyles = `
  .${ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON} {
    display: block;
    border-bottom: 1px solid ${colors.gray.light};
    margin-bottom: ${spacing.sm};
    padding-bottom: ${spacing.sm};
  }

  @media (min-width: 480px) {
    .${ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON} {
      margin-bottom: ${spacing.md};
      padding-bottom: ${spacing.md};
    }
  }

  .${ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON} button {
    text-transform: uppercase;
    font-weight: ${fontWeight.semiBold};
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    color: ${colors.black};
  }

  .${ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON} button:hover,
  .${ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON} button:focus {
    text-decoration: underline;
  }

  .${ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON} button svg {
    fill: ${colors.red};
    width: 12px;
    height: 12px;
    margin-right: ${spacing.min};
    transform: rotate(90deg);
  }
`;

// prettier-ignore
const headlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${DRAWER_SLIDER_HEADLINE} `]: typography['.umd-sans-large'],
    },
  })}

  .${DRAWER_SLIDER_HEADLINE} {
    margin-bottom: ${spacing.md};
    font-weight: ${fontWeight.extraBold};
  }
`;

// prettier-ignore
const slideActionStyles = `
  .${DRAWER_SLIDER_ACTIONS} {
    padding-left: ${spacing.sm};
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

  backButtonContainer.classList.add(ELEMENTS.DRAWER_SLIDE_ACTION_BACK_BUTTON);
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
      slideAction.classList.add(ELEMENTS.DRAWER_SLIDE_SECONDARY_ACTION);
      slideActionsContainer.appendChild(slideAction);
    });
  }

  slideActionsContainer.classList.add(DRAWER_SLIDER_ACTIONS);

  return slideActionsContainer;
};

export const CreateChildSlide = ({ element }: { element: UMDNavDrawer }) => {
  const slides = Array.from(
    element.querySelectorAll(`[${VARIABLES.ATTRIBUTE_PARENT_REF}]`),
  ) as HTMLDivElement[];

  return slides.map((slide) => {
    const sliderContainer = document.createElement('div');
    const isSlideActive = slide.hasAttribute(VARIABLES.ATTRIBUTE_ACTIVE_SLIDE);
    const parentRef = slide.getAttribute(
      VARIABLES.ATTRIBUTE_PARENT_REF,
    ) as string;
    const parentElement = element.querySelector(
      `[${VARIABLES.ATTRIBUTE_CHILD_REF}="${parentRef}"]`,
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
      sliderContainer.setAttribute(`${VARIABLES.ATTRIBUTE_ACTIVE_SLIDE}`, ``);
      element._currentSlide = sliderContainer;
    }

    sliderContainer.setAttribute(`${VARIABLES.ATTRIBUTE_DATA_SLIDE}`, '');
    sliderContainer.classList.add(DRAWER_SLIDER_CHILD_CONTAINER);
    sliderContainer.setAttribute(
      `${VARIABLES.ATTRIBUTE_PARENT_REF}`,
      `${parentRef}`,
    );

    sliderContainer.appendChild(slideBackButton);
    sliderContainer.appendChild(slideHeadline);
    sliderContainer.appendChild(slideActions);

    return sliderContainer;
  });
};
