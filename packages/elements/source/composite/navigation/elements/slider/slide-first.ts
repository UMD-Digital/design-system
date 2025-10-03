import { token, typography } from '@universityofmaryland/web-styles-library';
import * as theme from 'helpers/theme';
import Slides from './slides';
import SlideAction, { TypeActionProps } from './action';

export type TypeFirstSlideProps = TypeActionProps & {
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

const ELEMENT_SLIDER_FIRST_SLIDE_CONTAINER = 'nav-slider-first-slide-container';
const ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER =
  'nav-slider-first-slide-primary-links-container';
const ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER =
  'nav-slider-secondary-links-container';
const ELEMENT_SLIDER_ADDITIONAL_CONTENT = 'nav-slider-additional-content';

const OVERWRITE_ACTION_PRIMARY_CONTAINER = `.${ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER} .${SlideAction.Elements.container}`;
const OVERWRITE_ACTION_PRIMARY_LINK = `.${ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER} .${SlideAction.Elements.link}`;

//prettier-ignore;
const OverwriteSlidePrimaryLink = `
  ${theme.convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_ACTION_PRIMARY_LINK}`]: typography.sans.large,
    },
  })}

  ${OVERWRITE_ACTION_PRIMARY_LINK} {
    font-weight: 700;
    line-height: 1.3em;
  }
`;

//prettier-ignore;
const OverwriteSlidePrimaryContainer = `
  ${OVERWRITE_ACTION_PRIMARY_CONTAINER} {
    border-bottom: 1px solid ${token.color.gray.light};
    padding-bottom: ${token.spacing.md};
    margin-bottom: ${token.spacing.md};
  }
`;

//prettier-ignore;
const SecondaryLinksContainer = `
  .${ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER} .${SlideAction.Elements.container}:last-child {
    border-bottom: 1px solid ${token.color.gray.light};
    padding-bottom: ${token.spacing.md};
  }
`;

//prettier-ignore;
const AdditonalContent = `
  .${ELEMENT_SLIDER_ADDITIONAL_CONTENT} {
    padding-top: ${token.spacing.md};
  }
`;

// prettier-ignore
const STYLES_SLIDE_FIRST_ELEMENT = `
  ${SecondaryLinksContainer}
  ${AdditonalContent}
  ${OverwriteSlidePrimaryContainer}
  ${OverwriteSlidePrimaryLink}
`;

const createPrimaryLinks = (props: TypeFirstSlideProps) => {
  const container = document.createElement('div');
  const { primarySlideLinks } = props;

  if (!primarySlideLinks) return null;

  const links = Array.from(
    primarySlideLinks.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    container.classList.add(ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER);

    links.forEach((link) =>
      container.appendChild(SlideAction.CreateElement({ ...props, link })),
    );

    return container;
  }

  return null;
};

const createSecondaryLinks = (props: TypeFirstSlideProps) => {
  const container = document.createElement('div');
  const { primarySlidesSecondaryLinks } = props;

  if (!primarySlidesSecondaryLinks) return null;

  const elements = Array.from(
    primarySlidesSecondaryLinks.querySelectorAll(':scope > *'),
  ) as HTMLAnchorElement[];

  if (elements.length > 0) {
    container.classList.add(ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER);

    elements.forEach((link) =>
      container.appendChild(SlideAction.CreateElement({ ...props, link })),
    );

    return container;
  }

  return null;
};

const createAdditonalContent = (element: TypeFirstSlideProps) => {
  const container = document.createElement('div');
  const { primarySlideContent } = element;

  if (!primarySlideContent) return null;

  container.classList.add(ELEMENT_SLIDER_ADDITIONAL_CONTENT);
  container.appendChild(primarySlideContent);

  return container;
};

const CreateSlideFirstElement = (props: TypeFirstSlide) => {
  const {
    setCurrentSlide,
    ATTRIBUTE_DATA_SLIDE,
    ATTRIBUTE_ACTIVE_SLIDE,
    isContextMenu,
  } = props;
  const sliderContainer = document.createElement('div');
  const wrapper = document.createElement('div');
  const primarlyLinkContent = createPrimaryLinks(props);
  const secondaryLinkContent = createSecondaryLinks(props);
  const additionalContent = createAdditonalContent(props);

  sliderContainer.classList.add(ELEMENT_SLIDER_FIRST_SLIDE_CONTAINER);
  sliderContainer.setAttribute(`${ATTRIBUTE_DATA_SLIDE}`, '');

  if (!isContextMenu) {
    sliderContainer.setAttribute(`${ATTRIBUTE_ACTIVE_SLIDE}`, '');
    setCurrentSlide({ element: sliderContainer });
  }

  if (primarlyLinkContent) wrapper.appendChild(primarlyLinkContent);
  if (secondaryLinkContent) wrapper.appendChild(secondaryLinkContent);
  if (additionalContent) wrapper.appendChild(additionalContent);

  wrapper.classList.add(Slides.Elements.wrapper);
  sliderContainer.appendChild(wrapper);

  return sliderContainer;
};

export default {
  CreateElement: CreateSlideFirstElement,
  Styles: STYLES_SLIDE_FIRST_ELEMENT,
  Elements: {
    secondaryContainer: ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER,
  },
};
