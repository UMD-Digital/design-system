import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import SlideAction, {
  TypeActionProps,
  ELEMENT_SLIDE_ACTION_CONTAINER,
  ELEMENT_SLIDE_ACTION_LINK,
} from './action';

export type TypeFirstSlideProps = TypeActionProps & {
  ATTRIBUTE_ACTIVE_SLIDE: string;
  ATTRIBUTE_DATA_SLIDE: string;
  currentSlide: HTMLElement | null;
  primarySlideLinks?: HTMLElement | null;
  primarySlidesSecondaryLinks?: HTMLElement | null;
  primarySlideContent?: HTMLElement | null;
  setCurrentSlide: (arg: HTMLElement) => void;
  eventSlideRight: () => void;
};

const { Spacing, Colors } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_SLIDER_FIRST_SLIDE_CONTAINER = 'nav-slider-first-slide-container';
const ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER =
  'nav-slider-first-slide-primary-links-container';
const ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER =
  'nav-slider-secondary-links-container';
const ELEMENT_SLIDER_ADDITIONAL_CONTENT = 'nav-slider-additional-content';

const OVERWRITE_ACTION_PRIMARY_CONTAINER = `.${ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER} .${ELEMENT_SLIDE_ACTION_CONTAINER}`;
const OVERWRITE_ACTION_PRIMARY_LINK = `.${ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER} .${ELEMENT_SLIDE_ACTION_LINK}`;

//prettier-ignore;
const OverwriteSlidePrimaryLink = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_ACTION_PRIMARY_LINK}`]: Typography.SansLarge,
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
    border-bottom: 1px solid ${Colors.gray.light};
    padding-bottom: ${Spacing.md};
  }
`;

//prettier-ignore;
const AdditonalContent = `
  .${ELEMENT_SLIDER_ADDITIONAL_CONTENT} {
    padding-top: ${Spacing['2xl']};
  }
`;

// prettier-ignore
const STYLES_PRIMARY_SLIDE_ELEMENT = `
  .${ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER} {
    border-bottom: 1px solid ${Colors.gray.light};
    margin-bottom: ${Spacing.md};
  }

  ${AdditonalContent}
  ${OverwriteSlidePrimaryContainer}
  ${OverwriteSlidePrimaryLink}
`;

// @media (min-width: 480px) {
//   .${ELEMENT_SLIDER_FIRST_SLIDE_PRIMARY_LINKS_CONTAINER} * + {
//     padding-top: ${Spacing.xs};
//     margin-top: ${Spacing.xs};
//   }
// }

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

  const links = Array.from(
    primarySlidesSecondaryLinks.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    container.classList.add(ELEMENT_SLIDER_SECONDARY_LINKS_CONTAINER);

    links.forEach((link) =>
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

const CreatePrimarySlideElement = (props: TypeFirstSlideProps) => {
  const {
    setCurrentSlide,
    currentSlide,
    ATTRIBUTE_DATA_SLIDE,
    ATTRIBUTE_ACTIVE_SLIDE,
  } = props;
  const sliderContainer = document.createElement('div');
  const primarlyLinkContent = createPrimaryLinks(props);
  const secondaryLinkContent = createSecondaryLinks(props);
  const additionalContent = createAdditonalContent(props);

  sliderContainer.classList.add(ELEMENT_SLIDER_FIRST_SLIDE_CONTAINER);
  sliderContainer.setAttribute(`${ATTRIBUTE_DATA_SLIDE}`, '');

  if (!currentSlide) {
    sliderContainer.setAttribute(`${ATTRIBUTE_ACTIVE_SLIDE}`, '');
    setCurrentSlide(sliderContainer);
  }

  if (primarlyLinkContent) sliderContainer.appendChild(primarlyLinkContent);
  if (secondaryLinkContent) sliderContainer.appendChild(secondaryLinkContent);
  if (additionalContent) sliderContainer.appendChild(additionalContent);

  return sliderContainer;
};

export default {
  CreateElement: CreatePrimarySlideElement,
  Styles: STYLES_PRIMARY_SLIDE_ELEMENT,
};
