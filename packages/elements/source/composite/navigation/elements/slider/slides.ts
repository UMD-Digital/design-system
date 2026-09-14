import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import {
  ElementBuilder,
  ElementModel,
} from '@universityofmaryland/web-builder-library';
import { cloneElementWithoutAttributes } from '@universityofmaryland/web-utilities-library/dom';
import { chevron_down as iconChevronDown } from '@universityofmaryland/web-icons-library/controls';
import {
  createCompositeNavigationSliderFirst as FirstSlide,
  TypeFirstSlideProps,
} from './slide-first';
import {
  createCompositeNavigationSliderAction as SlideAction,
  TypeActionProps,
} from './action';

export type TypeSlideProps = TypeActionProps &
  TypeFirstSlideProps & {
    childrenSlides?: HTMLElement | null;
    childrenSlideContent?: HTMLSlotElement[];
    primarySlideLinks?: HTMLElement | null;
    primarySlidesSecondaryLinks?: HTMLElement | null;
    eventSlideRight: () => void;
  };

type TypeSlideBackContainer = TypeSlideProps & {
  parentRef: string;
};

type TypeDrawerChildSlide = TypeSlideProps & {};

type TypeSliderSlideActions = TypeSlideProps & {
  slide: HTMLDivElement;
};

const createSlideBackButton = (props: TypeSlideBackContainer) => {
  const { eventSlideRight, parentRef, setUpcomingSlide } = props;

  if (!parentRef) return null;

  const button = new ElementBuilder('button')
    .withClassName('nav-slide-back-button')
    .withAttribute('type', 'button')
    .withAttribute('aria-label', 'Previous level of navigation')
    .withHTML(`${iconChevronDown} Back`)
    .withStyles({
      element: {
        textTransform: 'uppercase',
        fontWeight: 600,
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        color: token.color.black,

        '&:hover, &:focus': {
          textDecoration: 'underline',
        },

        '& svg': {
          fill: token.color.red,
          width: '12px',
          height: '12px',
          marginRight: token.spacing.min,
          transform: 'rotate(90deg)',
        },
      },
    })
    .on('click', () => {
      setUpcomingSlide(parentRef);
      eventSlideRight();
    });

  return new ElementBuilder()
    .withClassName('nav-slide-action-back-button')
    .withChild(button)
    .withStyles({
      element: {
        display: 'block',
        borderBottom: `1px solid ${token.color.black}`,
        marginBottom: token.spacing.sm,
        paddingBottom: token.spacing.sm,

        [`@media (${token.media.queries.medium.min})`]: {
          marginBottom: token.spacing.md,
          paddingBottom: token.spacing.md,
        },
      },
    });
};

const createSlideHeadline = ({
  link,
  displayType,
}: {
  link: HTMLAnchorElement;
  displayType?: string;
}) => {
  const isInteriorNav = displayType !== 'drawer-nav';
  const clonedLink = cloneElementWithoutAttributes({ element: link });

  return new ElementBuilder('p')
    .withClassName('nav-slide-headline')
    .withChild(clonedLink)
    .withStyles({
      element: {
        ...typography.sans.large,
        marginBottom: token.spacing.md,
        fontWeight: 700,
        color: token.color.black,

        ...(isInteriorNav && {
          borderBottom: `1px solid ${token.color.gray.light}`,
          paddingBottom: token.spacing.md,
        }),
      },
    });
};

const createSlideActions = (props: TypeSliderSlideActions) => {
  const { slide } = props;
  const clonedSlide = slide.cloneNode(true) as HTMLDivElement;
  const links = Array.from(
    clonedSlide.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  const actionElements = links.map((link) => SlideAction({ ...props, link }));

  return new ElementBuilder().withChildren(...actionElements);
};

const createContentContainer = () =>
  new ElementBuilder().withClassName('nav-slide-action-content').withStyles({
    element: {
      '* + &': {
        marginTop: token.spacing.lg,
      },
    },
  });

const buildSlideEntry = ({
  props,
  slide,
  parentRef,
  parentElement,
}: {
  props: TypeDrawerChildSlide;
  slide: HTMLDivElement;
  parentRef: string;
  parentElement: HTMLAnchorElement;
}) => {
  const {
    setCurrentSlide,
    childrenSlideContent,
    ATTRIBUTE_ACTIVE_SLIDE,
    ATTRIBUTE_DATA_SLIDE,
    ATTRIBUTE_PARENT_REF,
  } = props;

  const contentRef = slide.getAttribute('content-slot');
  const isSlideActive = slide.hasAttribute(ATTRIBUTE_ACTIVE_SLIDE);

  const slideBackButton = createSlideBackButton({ ...props, parentRef });
  const slideHeadline = createSlideHeadline({
    link: parentElement,
    displayType: props.displayType,
  });
  const slideActions = createSlideActions({ ...props, slide });

  const sliderWrapperChildren = [
    slideBackButton,
    slideHeadline,
    slideActions,
  ].filter((child) => child != null);

  const sliderWrapper = new ElementBuilder()
    .withClassName('nav-slide-wrapper')
    .withChildren(...sliderWrapperChildren);

  const sliderOverflowModel = new ElementBuilder()
    .withClassName('nav-slide-overflow')
    .withChild(sliderWrapper)
    .build();

  let contentContainer = null;

  if (contentRef) {
    const additionalContent = childrenSlideContent?.find(
      (element) => element.getAttribute('name') === contentRef,
    );

    if (additionalContent) {
      sliderOverflowModel.element.appendChild(additionalContent);
      contentContainer = createContentContainer();
    }
  }

  const sliderContainerChildren = [
    contentContainer,
    sliderOverflowModel,
  ].filter((child) => child != null);

  let sliderContainerBuilder = new ElementBuilder()
    .withClassName('nav-slide-container')
    .withAttribute(ATTRIBUTE_DATA_SLIDE, '')
    .withAttribute(ATTRIBUTE_PARENT_REF, parentRef)
    .withChildren(...sliderContainerChildren);

  if (isSlideActive) {
    sliderContainerBuilder = sliderContainerBuilder.withAttribute(
      ATTRIBUTE_ACTIVE_SLIDE,
      '',
    );
  }

  const sliderContainerElement = sliderContainerBuilder.getElement();

  if (isSlideActive) {
    setCurrentSlide({ element: sliderContainerElement });
  }

  return {
    model: sliderContainerBuilder.build(),
    isContextMenu: isSlideActive,
  };
};

const queryAll = <ElementType extends Element>(
  container: Element | null | undefined,
  selector: string,
): ElementType[] => {
  if (!container) return [];

  return Array.from(container.querySelectorAll<ElementType>(selector));
};

export const createCompositeNavigationSlides = (
  props: TypeDrawerChildSlide,
) => {
  const {
    childrenSlides,
    primarySlideLinks,
    primarySlidesSecondaryLinks,
    ATTRIBUTE_PARENT_REF,
    ATTRIBUTE_CHILD_REF,
  } = props;

  const slideModels: ElementModel[] = [];

  let isContextMenu = false;

  if (!childrenSlides) {
    return [FirstSlide({ ...props, isContextMenu })];
  }

  const slides = queryAll<HTMLDivElement>(
    childrenSlides,
    `[${ATTRIBUTE_PARENT_REF}]`,
  );
  const parentOptions = [
    ...queryAll<HTMLAnchorElement>(primarySlideLinks, 'a'),
    ...queryAll<HTMLAnchorElement>(primarySlidesSecondaryLinks, ':scope > *'),
    ...queryAll<HTMLAnchorElement>(childrenSlides, `[${ATTRIBUTE_CHILD_REF}]`),
  ];

  slides.forEach((slide) => {
    const parentRef = slide.getAttribute(ATTRIBUTE_PARENT_REF) as string;
    const parentElement = parentOptions.find(
      (option) => option.getAttribute(ATTRIBUTE_CHILD_REF) === parentRef,
    );

    if (!parentElement) {
      console.error(`No parent reference found for ${parentRef}`);
      return;
    }

    const entry = buildSlideEntry({ props, slide, parentRef, parentElement });

    if (entry.isContextMenu) isContextMenu = true;

    slideModels.push(entry.model);
  });

  slideModels.push(FirstSlide({ ...props, isContextMenu }));

  return slideModels;
};
