import { LayoutImage } from 'macros';
import { Tokens } from '@universityofmaryland/variables';

import { AssetIcon, Performance } from 'utilities';

const { Colors, Spacing } = Tokens;
const { Debounce } = Performance;

type TypeTextContainer = {
  headline?: HTMLElement | null;
  richText?: HTMLElement | null;
};

type TypeCarouselImageStandardProps = {
  images: HTMLImageElement[];
  headlines?: HTMLElement[] | null;
  richTexts?: HTMLElement[] | null;
  isFullScreenOption?: boolean;
  theme?: string | null;
};

const ANIMATION_DURATION = 500;
const IMAGE_MIN_HEIGHT = 200;

const ATTRIBUTE_REFERENCE = 'data-reference';
const ATTRIBUTE_THEME = 'data-theme';
const ATTRIBUTE_ACTIVE_SLIDE = 'data-active-slide';
const THEME_DARK = 'dark';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const ELEMENT_NAME = 'umd-carousel-image-standard';
const ELEMENT_CAROUSEL_IMAGE_DECLARATION =
  'carousel-image-standard-declaration';
const ELEMENT_CAROUSEL_IMAGE_CONTAINER = 'carousel-image-standard-container';

const ELEMENT_SLIDER_CONTAINER = 'carousel-image-standard-slider';
const ELEMENT_SLIDE = 'carousel-image-standard-slide';
const ELEMENT_SLIDE_IMAGE_CONTAINER = 'carousel-image-standard-slide-image';
const ELEMENT_SLIDE_TEXT_CONTAINER = 'carousel-image-standard-slide-text';
const ELEMENT_SLIDE_HEADLINE = 'carousel-image-standard-slide-headline';
const ELEMENT_SLIDE_RICH_TEXT = 'carousel-image-standard-slide-rich-text';

const CAROUSEL_SLIDER_BUTTON = 'carousel-slider-button';
const CAROUSEL_CARDS_BUTTON_FORWARDS = 'carousel-slider-button-forwards';
const CAROUSEL_CARDS_BUTTON_BACKWARDS = 'carousel-slider-button-backwards';

const OVERWRITE_ACTIVE_SLIDE = `.${ELEMENT_SLIDE}[${ATTRIBUTE_ACTIVE_SLIDE}]`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CAROUSEL_IMAGE_CONTAINER}${IS_THEME_DARK}`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} {

  }
`;

// prettier-ignore
const TextContainerStyles = `
  .${ELEMENT_SLIDE_TEXT_CONTAINER} {

  }

  .${ELEMENT_SLIDE_HEADLINE} {
    
  }

  .${ELEMENT_SLIDE_RICH_TEXT} {
    
  }
`

// prettier-ignore
const ImageContainerStyles = `
  .${ELEMENT_SLIDE_IMAGE_CONTAINER} {
    position: relative;
    background-color: ${Colors.black};
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .${ELEMENT_SLIDE_IMAGE_CONTAINER} > * {
    height: 100%;
  }

  .${ELEMENT_SLIDE_IMAGE_CONTAINER} img {
    object-fit: contain;
    max-height: 100%;
  }
`

// prettier-ignore
const SliderButtons = `
  .${CAROUSEL_SLIDER_BUTTON} {
    background-color: ${Colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }

  .${CAROUSEL_SLIDER_BUTTON}:first-of-type {
    left: ${Spacing.sm};
  }

  .${CAROUSEL_SLIDER_BUTTON}:first-of-type svg {
    transform: rotate(180deg);
  }

  .${CAROUSEL_SLIDER_BUTTON}:last-of-type {
    right: ${Spacing.sm};
  }

  .${CAROUSEL_SLIDER_BUTTON} svg {
    fill: ${Colors.black};
    width: 16px;
  }
`

// prettier-ignore
const SlideStyles = `
  .${ELEMENT_SLIDE} {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 100%;
  }

  ${OVERWRITE_ACTIVE_SLIDE} {
    z-index: 9;
    left: 0;
  }
`

// prettier-ignore
const SliderStyles = `
  .${ELEMENT_SLIDER_CONTAINER} {
    position: relative;

  }
`

// prettier-ignore
const STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT = `
  .${ELEMENT_CAROUSEL_IMAGE_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_CAROUSEL_IMAGE_CONTAINER} {
    overflow: hidden;
  }

  ${LayoutImage.Styles}
  ${SliderStyles}
  ${SlideStyles}
  ${SliderButtons}
  ${ImageContainerStyles}
  ${TextContainerStyles}
  ${OverwriteThemeDark}
`;

const CreateTextContainer = ({ headline, richText }: TypeTextContainer) => {
  const textContainer = document.createElement('div');

  textContainer.classList.add(ELEMENT_SLIDE_TEXT_CONTAINER);

  if (headline) {
    headline.classList.add(ELEMENT_SLIDE_HEADLINE);
    textContainer.appendChild(headline);
  }

  if (richText) {
    richText.classList.add(ELEMENT_SLIDE_RICH_TEXT);
    textContainer.appendChild(richText);
  }

  return textContainer;
};

const CreateSlide = ({
  images,
  headlines,
  richTexts,
}: TypeCarouselImageStandardProps) =>
  images.map((image) => {
    const reference = image.getAttribute(ATTRIBUTE_REFERENCE);
    const slide = document.createElement('div');
    const imageContainer = document.createElement('div');
    const imageWrapper = LayoutImage.CreateElement({
      image,
      showCaption: true,
    });
    const headline = headlines?.find(
      (headline) => headline.getAttribute(ATTRIBUTE_REFERENCE) === reference,
    );
    const richText = richTexts?.find(
      (text) => text.getAttribute(ATTRIBUTE_REFERENCE) === reference,
    );

    slide.classList.add(ELEMENT_SLIDE);
    imageContainer.classList.add(ELEMENT_SLIDE_IMAGE_CONTAINER);

    imageContainer.appendChild(imageWrapper);

    slide.appendChild(imageContainer);

    if (headline || richText) {
      const textContainer = CreateTextContainer({
        headline,
        richText,
      });
      slide.appendChild(textContainer);
    }

    return slide;
  });

const CreateButton = ({
  SetEventSlideForward,
  SetEventSlideBackward,
  isRight = true,
}: {
  SetEventSlideForward: () => void;
  SetEventSlideBackward: () => void;
  isRight?: boolean;
}) => {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.classList.add(CAROUSEL_SLIDER_BUTTON);
  button.innerHTML = AssetIcon.FORWARD_ARROW;

  if (!isRight) {
    button.setAttribute('aria-label', 'Previous');
  } else {
    button.setAttribute('aria-label', 'Next');
  }

  button.addEventListener('click', () => {
    if (isRight) SetEventSlideForward();
    if (!isRight) SetEventSlideBackward();
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, ANIMATION_DURATION + 100);
  });

  return button;
};

const GetImageSize = ({
  image,
  parentNode,
}: {
  image: HTMLImageElement;
  parentNode: HTMLElement;
}) => {
  const imgHeight = image.naturalHeight;
  const aspectRatio = image.naturalWidth / imgHeight;
  const maxElementHeight = parentNode.offsetWidth / aspectRatio;
  const maxWindowHeight = 500;
  const maxHeight =
    maxElementHeight > maxWindowHeight ? maxWindowHeight : maxElementHeight;
  const defaultImageHeight = imgHeight > maxHeight ? maxHeight : imgHeight;

  return defaultImageHeight;
};

const SetCarouselSize = ({
  slider,
  activeSlide,
}: {
  slider: HTMLElement;
  activeSlide: HTMLElement;
}) => {
  const img = activeSlide.querySelector('img') as HTMLImageElement;
  const imageSize = GetImageSize({ image: img, parentNode: slider });

  slider.style.height = `${imageSize}px`;
};

const SetActiveSlide = ({ activeSlide }: { activeSlide: HTMLElement }) => {};

const CreateCarouselImageStandardElement = (
  props: TypeCarouselImageStandardProps,
) => {
  const { isFullScreenOption = true, theme } = props;
  const elementDeclaration = document.createElement('div');
  const elementContainer = document.createElement('div');
  const slider = document.createElement('div');
  const slides = CreateSlide(props);
  const SetEventSlideForward = () => {
    const activeSlide = slides[activeIndex];
    activeSlide.removeAttribute(ATTRIBUTE_ACTIVE_SLIDE);
    activeIndex = activeIndex + 1;
    if (activeIndex >= slides.length) activeIndex = 0;
    const nextSlide = slides[activeIndex];
    SetCarouselSize({ slider, activeSlide: nextSlide });
    nextSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
  };
  const SetEventSlideBackward = () => {
    const activeSlide = slides[activeIndex];
    activeSlide.removeAttribute(ATTRIBUTE_ACTIVE_SLIDE);
    activeIndex = activeIndex - 1;
    if (activeIndex < 0) activeIndex = slides.length - 1;
    const nextSlide = slides[activeIndex];
    SetCarouselSize({ slider, activeSlide: nextSlide });
    nextSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
  };
  const DataEventSlide = { SetEventSlideForward, SetEventSlideBackward };
  const EventResize = () => {
    SetCarouselSize({ slider, activeSlide: slides[activeIndex] });
  };
  const Load = () => {
    setTimeout(() => {
      const activeSlide = slides[activeIndex];
      SetCarouselSize({ slider, activeSlide });
      activeSlide.setAttribute(ATTRIBUTE_ACTIVE_SLIDE, '');
    }, 100);
  };
  let activeIndex = 0;

  slider.classList.add(ELEMENT_SLIDER_CONTAINER);
  slider.append(...slides);
  slider.appendChild(CreateButton({ ...DataEventSlide }));
  slider.appendChild(
    CreateButton({
      ...DataEventSlide,
      isRight: true,
    }),
  );

  elementContainer.classList.add(ELEMENT_CAROUSEL_IMAGE_CONTAINER);
  elementContainer.appendChild(slider);
  if (theme) elementContainer.setAttribute(ATTRIBUTE_THEME, theme);

  elementDeclaration.classList.add(ELEMENT_CAROUSEL_IMAGE_DECLARATION);
  elementDeclaration.appendChild(elementContainer);

  window.addEventListener('resize', Debounce(EventResize, 10));

  return {
    element: elementDeclaration,
    events: { Load },
  };
};

export default {
  CreateElement: CreateCarouselImageStandardElement,
  Styles: STYLES_CAROUSEL_IMAGE_STANDARD_ELEMENT,
};
