import { token, typography } from '@universityofmaryland/web-styles-library';
import * as theme from 'helpers/theme';
import * as assets from 'helpers/assets';
import * as markup from 'helpers/markup';
import FirstSlide, { TypeFirstSlideProps, TypeFirstSlide } from './slide-first';
import SlideAction, { TypeActionProps } from './action';

export type TypeSlideProps = TypeActionProps &
  TypeFirstSlideProps & {
    ATTRIBUTE_DATA_SLIDE: string;
    ATTRIBUTE_ACTIVE_SLIDE: string;
    childrenSlides?: HTMLElement | null;
    childrenSlideContent?: HTMLSlotElement[];
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

const ELEMENT_NAV_SLIDE_CONTAINER = 'nav-slide-container';
const ELEMENT_NAV_SLIDE_WRAPPER = 'nav-slide-wrapper';
const ELEMENT_NAV_SLIDE_HEADLINE = 'nav-slide-headline';
const ELEMENT_NAV_SLIDE_BACK_BUTTON = 'nav-slide-action-back-button';
const ELEMENT_NAV_SLIDE_CONTENT = 'nav-slide-action-content';

// prettier-ignore
const ContentStyles = `
  * + .${ELEMENT_NAV_SLIDE_CONTENT} {
    margin-top: ${token.spacing.lg};
  }
`;

// prettier-ignore
const BackButtonStyles = `
  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} {
    display: block;
    border-bottom: 1px solid ${token.color.black};
    margin-bottom: ${token.spacing.sm};
    padding-bottom: ${token.spacing.sm};
  }

  @media (min-width: 480px) {
    .${ELEMENT_NAV_SLIDE_BACK_BUTTON} {
      margin-bottom: ${token.spacing.md};
      padding-bottom: ${token.spacing.md};
    }
  }

  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button {
    text-transform: uppercase;
    font-weight: 600;
    letter-Spacing: 1px;
    display: flex;
    align-items: center;
    color: ${token.color.black};
  }

  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button:hover,
  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button:focus {
    text-decoration: underline;
  }

  .${ELEMENT_NAV_SLIDE_BACK_BUTTON} button svg {
    fill: ${token.color.red};
    width: 12px;
    height: 12px;
    margin-right: ${token.spacing.min};
    transform: rotate(90deg);
  }
`;

// prettier-ignore
const HeadlineStyles = `
  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_NAV_SLIDE_HEADLINE}`]: typography.sans.large,
    },
  })}

  .${ELEMENT_NAV_SLIDE_HEADLINE} {
    margin-bottom: ${token.spacing.md};
    font-weight: 700;
    color: ${token.color.black};
  }
`;

// prettier-ignore
const STYLES_NAV_SLIDES = `
  ${BackButtonStyles}
  ${HeadlineStyles}
  ${ContentStyles}
  ${SlideAction.Styles}
  ${FirstSlide.Styles}
`;

const createSlideBackButton = (props: TypeSlideBackContainer) => {
  const { eventSlideRight, parentRef, setUpcomingSlide } = props;

  if (!parentRef) return;
  const backButtonContainer = document.createElement('div');
  const slideBackButton = document.createElement('button');

  slideBackButton.innerHTML = `${assets.icon.CHEVRON_SMALL} Back`;
  slideBackButton.setAttribute('type', 'button');
  slideBackButton.setAttribute('aria-label', 'Previous level of navigation');
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

  slideHeadline.appendChild(markup.modify.cleanCopy({ element: link }));
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
    childrenSlideContent,
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
    ? Array.from(primarySlidesSecondaryLinks.querySelectorAll(':scope > *'))
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
    const contentRef = slide.getAttribute('content-slot');
    const sliderContainer = document.createElement('div');
    const sliderWrapper = document.createElement('div');
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

    if (slideBackButton) sliderWrapper.appendChild(slideBackButton);
    sliderWrapper.appendChild(slideHeadline);
    sliderWrapper.appendChild(slideActions);

    sliderWrapper.classList.add(ELEMENT_NAV_SLIDE_WRAPPER);
    sliderContainer.appendChild(sliderWrapper);

    if (contentRef) {
      const additionalContent = childrenSlideContent?.find(
        (element) => element.getAttribute('name') === contentRef,
      );

      if (additionalContent) {
        const contentContainer = document.createElement('div');

        contentContainer.appendChild(additionalContent);
        contentContainer.classList.add(ELEMENT_NAV_SLIDE_CONTENT);

        sliderContainer.appendChild(contentContainer);
      }
    }

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
  Elements: {
    container: ELEMENT_NAV_SLIDE_CONTAINER,
    wrapper: ELEMENT_NAV_SLIDE_WRAPPER,
    headline: ELEMENT_NAV_SLIDE_HEADLINE,
  },
};
