import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  createCompositeNavigationSliderAction as SlideAction,
  TypeActionProps,
} from './action';

export type TypeFirstSlideProps = TypeActionProps & {
  displayType?: string;
  ATTRIBUTE_ACTIVE_SLIDE: string;
  ATTRIBUTE_DATA_SLIDE: string;
  currentSlide: HTMLElement | null;
  primarySlideLinks?: HTMLElement | null;
  primarySlidesSecondaryLinks?: HTMLElement | null;
  primarySlideContent?: HTMLElement | null;
  setCurrentSlide: (arg: {
    element: HTMLElement;
    withTransition?: boolean;
  }) => void;
  eventSlideRight: () => void;
};

export type TypeFirstSlide = TypeFirstSlideProps & {
  isContextMenu: boolean;
};

const createPrimaryLinks = (props: TypeFirstSlideProps) => {
  const { primarySlideLinks } = props;

  if (!primarySlideLinks) return null;

  const links = Array.from(
    primarySlideLinks.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length === 0) return null;

  const linkElements = links.map((link) => SlideAction({ ...props, link }));

  return new ElementBuilder()
    .withClassName('nav-slider-first-slide-primary-links-container')
    .withChildren(...linkElements)
    .withStyles({
      element: {
        ['& .nav-slide-action-link']: {
          ...typography.sans.large,
          fontWeight: 700,
          lineHeight: '1.3em',
        },

        ['& .nav-slide-action-container']: {
          borderBottom: `1px solid ${token.color.gray.light}`,
          paddingBottom: token.spacing.md,
          marginBottom: token.spacing.md,
        },
      },
    });
};

const createSecondaryLinks = (props: TypeFirstSlideProps) => {
  const isInteriorNav = props.displayType !== 'drawer-nav';
  const { primarySlidesSecondaryLinks } = props;

  if (!primarySlidesSecondaryLinks) return null;

  const elements = Array.from(
    primarySlidesSecondaryLinks.querySelectorAll(':scope > *'),
  ) as HTMLAnchorElement[];

  if (elements.length === 0) return null;

  const linkElements = elements.map((link) => SlideAction({ ...props, link }));

  return new ElementBuilder()
    .withClassName('nav-slider-secondary-links-container')
    .withChildren(...linkElements)
    .withStyles({
      element: {
        ['& .nav-slide-action-container:last-child']: {
          borderBottom: `1px solid ${token.color.gray.light}`,
          paddingBottom: token.spacing.md,
          ...(isInteriorNav && { marginBottom: 0 }),
        },
      },
    });
};

const createAdditionalContent = (props: TypeFirstSlideProps) => {
  const { primarySlideContent } = props;

  if (!primarySlideContent) return null;

  return new ElementBuilder()
    .withClassName('nav-slider-additional-content')
    .withChild(primarySlideContent)
    .withStyles({
      element: {
        paddingTop: token.spacing.md,
      },
    });
};

export const createCompositeNavigationSliderFirst = (props: TypeFirstSlide) => {
  const {
    setCurrentSlide,
    ATTRIBUTE_DATA_SLIDE,
    ATTRIBUTE_ACTIVE_SLIDE,
    isContextMenu,
  } = props;

  const primaryLinkContent = createPrimaryLinks(props);
  const secondaryLinkContent = createSecondaryLinks(props);
  const additionalContent = createAdditionalContent(props);

  const wrapperChildren = [
    primaryLinkContent,
    secondaryLinkContent,
    additionalContent,
  ].filter((child) => child != null);

  const wrapper = new ElementBuilder()
    .withClassName('nav-slide-wrapper')
    .withChildren(...wrapperChildren);

  const sliderOverflow = new ElementBuilder()
    .withClassName('nav-slide-overflow')
    .withChild(wrapper);

  let sliderContainerBuilder = new ElementBuilder()
    .withClassName('nav-slider-first-slide-container')
    .withAttribute(ATTRIBUTE_DATA_SLIDE, '')
    .withChild(sliderOverflow);

  const sliderContainerElement = sliderContainerBuilder.getElement();

  if (!isContextMenu) {
    sliderContainerBuilder = sliderContainerBuilder.withAttribute(
      ATTRIBUTE_ACTIVE_SLIDE,
      '',
    );
    setCurrentSlide({ element: sliderContainerElement });
  }

  return sliderContainerBuilder.build();
};
