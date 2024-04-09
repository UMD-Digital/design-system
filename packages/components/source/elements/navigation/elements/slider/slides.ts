import { Tokens, Typography } from '@universityofmaryland/variables';
import { AssetIcon, Styles } from 'utilities';
import FirstSlide, { TypeFirstSlideProps } from './slide-first';
import SlideAction, {
  TypeActionProps,
  ELEMENT_SLIDE_ACTION_CONTAINER,
} from './action';

export type TypeSlideProps = TypeActionProps &
  TypeFirstSlideProps & {
    ATTRIBUTE_DATA_SLIDE: string;
    ATTRIBUTE_ACTIVE_SLIDE: string;
    childrenSlides?: HTMLElement | null;
    primarySlideLinks?: HTMLElement | null;
    primarySlidesSecondaryLinks?: HTMLElement | null;
    setCurrentSlide: (arg: HTMLElement) => void;
    eventSlideRight: () => void;
  };

type TypeDrawerChildBack = TypeSlideProps & {
  parentRef: string;
};

type TypeDrawerChildSlide = TypeSlideProps & {
  slider: HTMLElement;
};

type TypeSliderSlideActions = TypeSlideProps & {
  slide: HTMLDivElement;
};

const { Colors, Spacing } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_SLIDER_SLIDE_CONTAINER = 'slider-slide-container';
const ELEMENT_SLIDER_SLIDE_HEADLINE = 'slider-slide-headline';
const ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON =
  'slider-slide-action-back-button';

const OVERWRITE_ACTION_SECONDARY_CONTAINER = `.${ELEMENT_SLIDER_SLIDE_CONTAINER} .${ELEMENT_SLIDE_ACTION_CONTAINER}`;

// prettier-ignore
const OverwriteActionStyles = `
  ${OVERWRITE_ACTION_SECONDARY_CONTAINER} {
    padding-left: ${Spacing.sm};
  }
`;

// prettier-ignore
const BackButtonStyles = `
  .${ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON} {
    display: block;
    border-bottom: 1px solid ${Colors.gray.light};
    margin-bottom: ${Spacing.sm};
    padding-bottom: ${Spacing.sm};
  }

  @media (min-width: 480px) {
    .${ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON} {
      margin-bottom: ${Spacing.md};
      padding-bottom: ${Spacing.md};
    }
  }

  .${ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON} button {
    text-transform: uppercase;
    font-weight: 600;
    letter-Spacing: 1px;
    display: flex;
    align-items: center;
    color: ${Colors.black};
  }

  .${ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON} button:hover,
  .${ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON} button:focus {
    text-decoration: underline;
  }

  .${ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON} button svg {
    fill: ${Colors.red};
    width: 12px;
    height: 12px;
    margin-right: ${Spacing.min};
    transform: rotate(90deg);
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_SLIDER_SLIDE_HEADLINE}`]: Typography.SansLarge,
    },
  })}

  .${ELEMENT_SLIDER_SLIDE_HEADLINE} {
    margin-bottom: ${Spacing.md};
    font-weight: 700;
  }
`;

// prettier-ignore
const STYLES_CHILD_SLIDE_ELEMENT = `
  ${BackButtonStyles}
  ${HeadlineStyles}
  ${SlideAction.Styles}
  ${FirstSlide.Styles}
  ${OverwriteActionStyles}
`;

const createSlideBackButton = (props: TypeDrawerChildBack) => {
  const { eventSlideRight, parentRef, setUpcomingSlide } = props;

  if (!parentRef) return;
  const backButtonContainer = document.createElement('div');
  const slideBackButton = document.createElement('button');

  slideBackButton.innerHTML = `${AssetIcon.CHEVRON_SMALL} Back`;
  slideBackButton.setAttribute('type', 'button');
  slideBackButton.addEventListener('click', () => {
    setUpcomingSlide(parentRef);
    eventSlideRight();
  });

  backButtonContainer.classList.add(ELEMENT_SLIDER_SLIDE_ACTION_BACK_BUTTON);
  backButtonContainer.appendChild(slideBackButton);

  return backButtonContainer;
};

const createSlideHeadline = ({ headline }: { headline: string }) => {
  const slideHeadline = document.createElement('p');

  slideHeadline.innerHTML = headline;
  slideHeadline.classList.add(ELEMENT_SLIDER_SLIDE_HEADLINE);

  return slideHeadline;
};

const createSlideActions = (props: TypeSliderSlideActions) => {
  const { slide } = props;

  const slideActionsContainer = document.createElement('div');
  const clonedSlide = slide.cloneNode(true) as HTMLDivElement;
  const links = Array.from(
    clonedSlide.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    links.forEach((link) =>
      slideActionsContainer.appendChild(
        SlideAction.CreateElement({ ...props, link }),
      ),
    );
  }

  // slideActionsContainer.classList.add(ELEMENT_SLIDE_ACTION_CONTAINER);

  return slideActionsContainer;
};

const CreateFirstSlide = (props: TypeDrawerChildSlide) => {
  const { slider } = props;
  slider.appendChild(FirstSlide.CreateElement(props));
};

const CreateChildSlideElement = (props: TypeDrawerChildSlide) => {
  const {
    slider,
    setCurrentSlide,
    childrenSlides,
    primarySlideLinks,
    primarySlidesSecondaryLinks,
    ATTRIBUTE_PARENT_REF,
    ATTRIBUTE_CHILD_REF,
    ATTRIBUTE_ACTIVE_SLIDE,
    ATTRIBUTE_DATA_SLIDE,
  } = props;

  if (!childrenSlides) {
    CreateFirstSlide(props);
    return;
  }

  const slides = Array.from(
    childrenSlides.querySelectorAll(`[${ATTRIBUTE_PARENT_REF}]`),
  ) as HTMLDivElement[];
  const primaryLinks = primarySlideLinks
    ? Array.from(primarySlideLinks.querySelectorAll('a'))
    : [];
  const secondaryLinks = primarySlidesSecondaryLinks
    ? Array.from(primarySlidesSecondaryLinks.querySelectorAll('a'))
    : [];
  const childLinks = Array.from(
    childrenSlides.querySelectorAll(`[${ATTRIBUTE_CHILD_REF}]`),
  ) as HTMLAnchorElement[];
  const parentOptions = [
    ...primaryLinks,
    ...secondaryLinks,
    ...childLinks,
  ] as HTMLAnchorElement[];

  slides.forEach((slide, i) => {
    const sliderContainer = document.createElement('div');
    const isSlideActive = slide.hasAttribute(ATTRIBUTE_ACTIVE_SLIDE);
    const parentRef = slide.getAttribute(ATTRIBUTE_PARENT_REF) as string;
    const parentElement = parentOptions.find(
      (option) => option.getAttribute(ATTRIBUTE_CHILD_REF) === parentRef,
    );

    if (!parentElement) {
      console.error(`No parent reference found for ${parentRef}`);
      return;
    }

    const headline = parentElement.textContent as string;
    const slideBackButton = createSlideBackButton({ ...props, parentRef });
    const slideHeadline = createSlideHeadline({ headline });
    const slideActions = createSlideActions({ ...props, slide });

    // Context Menu
    if (isSlideActive) {
      sliderContainer.setAttribute(`${ATTRIBUTE_ACTIVE_SLIDE}`, ``);
      setCurrentSlide(sliderContainer);
    }

    sliderContainer.setAttribute(`${ATTRIBUTE_DATA_SLIDE}`, '');
    sliderContainer.classList.add(ELEMENT_SLIDER_SLIDE_CONTAINER);
    sliderContainer.setAttribute(`${ATTRIBUTE_PARENT_REF}`, `${parentRef}`);

    if (slideBackButton) sliderContainer.appendChild(slideBackButton);
    sliderContainer.appendChild(slideHeadline);
    sliderContainer.appendChild(slideActions);

    slider.appendChild(sliderContainer);

    if (i === slides.length - 1) {
      setTimeout(() => {
        CreateFirstSlide(props);
      }, 100);
    }
  });
};

export default {
  CreateElement: CreateChildSlideElement,
  Styles: STYLES_CHILD_SLIDE_ELEMENT,
};
