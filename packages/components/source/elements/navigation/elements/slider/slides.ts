import { Tokens, Typography } from '@universityofmaryland/variables';
import { AssetIcon, Styles, MarkupModify } from 'utilities';
import FirstSlide, { TypeFirstSlideProps, TypeFirstSlide } from './slide-first';
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
    eventSlideRight: () => void;
  };

type TypeSlideBackContainer = TypeSlideProps & {
  parentRef: string;
};

type TypeDrawerChildSlide = TypeSlideProps & {
  slider: HTMLElement;
};

type TypeSlideFirstContainer = TypeDrawerChildSlide & TypeFirstSlide;

type TypeSliderSlideActions = TypeSlideProps & {
  slide: HTMLDivElement;
};

const { Colors, Spacing } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;
const { CleanCopy } = MarkupModify;

const ELEMENT_NAV_SLIDE_CONTAINER = 'nav-slide-container';
export const ELEMENT_NAV_SLIDE_HEADLINE = 'nav-slide-headline';
const ELEMENT_NAV_SLIDE_BACK_BUTTON = 'nav-slide-action-back-button';

// prettier-ignore
const BackButtonStyles = `
  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} {
    display: block;
    border-bottom: 1px solid ${Colors.gray.light};
    margin-bottom: ${Spacing.sm};
    padding-bottom: ${Spacing.sm};
  }

  @media (min-width: 480px) {
    .${ELEMENT_NAV_SLIDE_BACK_BUTTON} {
      margin-bottom: ${Spacing.md};
      padding-bottom: ${Spacing.md};
    }
  }

  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button {
    text-transform: uppercase;
    font-weight: 600;
    letter-Spacing: 1px;
    display: flex;
    align-items: center;
    color: ${Colors.black};
  }

  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button:hover,
  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button:focus {
    text-decoration: underline;
  }

  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button svg {
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
      [`.${ELEMENT_NAV_SLIDE_HEADLINE}`]: Typography.SansLarge,
    },
  })}

  .${ELEMENT_NAV_SLIDE_HEADLINE} {
    margin-bottom: ${Spacing.md};
    font-weight: 700;
  }
`;

// prettier-ignore
const STYLES_NAV_SLIDES = `
  ${BackButtonStyles}
  ${HeadlineStyles}
  ${SlideAction.Styles}
  ${FirstSlide.Styles}
`;

const createSlideBackButton = (props: TypeSlideBackContainer) => {
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

  backButtonContainer.classList.add(ELEMENT_NAV_SLIDE_BACK_BUTTON);
  backButtonContainer.appendChild(slideBackButton);

  return backButtonContainer;
};

const createSlideHeadline = ({ link }: { link: HTMLAnchorElement }) => {
  const slideHeadline = document.createElement('p');

  slideHeadline.appendChild(CleanCopy({ element: link }));
  slideHeadline.classList.add(ELEMENT_NAV_SLIDE_HEADLINE);

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

  return slideActionsContainer;
};

const CreateFirstSlide = (props: TypeSlideFirstContainer) => {
  const { slider } = props;
  slider.appendChild(FirstSlide.CreateElement(props));
};

const CreateNavSlides = (props: TypeDrawerChildSlide) => {
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
  let isContextMenu = false;
  if (!childrenSlides) {
    CreateFirstSlide({ ...props, isContextMenu });
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

    const slideBackButton = createSlideBackButton({ ...props, parentRef });
    const slideHeadline = createSlideHeadline({ link: parentElement });
    const slideActions = createSlideActions({ ...props, slide });

    // Context Menu
    if (isSlideActive) {
      sliderContainer.setAttribute(`${ATTRIBUTE_ACTIVE_SLIDE}`, ``);
      setCurrentSlide({ element: sliderContainer });
      isContextMenu = true;
    }

    sliderContainer.setAttribute(`${ATTRIBUTE_DATA_SLIDE}`, '');
    sliderContainer.classList.add(ELEMENT_NAV_SLIDE_CONTAINER);
    sliderContainer.setAttribute(`${ATTRIBUTE_PARENT_REF}`, `${parentRef}`);

    if (slideBackButton) sliderContainer.appendChild(slideBackButton);
    sliderContainer.appendChild(slideHeadline);
    sliderContainer.appendChild(slideActions);

    slider.appendChild(sliderContainer);

    if (i === slides.length - 1) {
      setTimeout(() => {
        CreateFirstSlide({ ...props, isContextMenu });
      }, 100);
    }
  });
};

export default {
  CreateElement: CreateNavSlides,
  Styles: STYLES_NAV_SLIDES,
};
