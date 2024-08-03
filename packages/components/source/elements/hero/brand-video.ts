import { Tokens, Typography, Elements } from '@universityofmaryland/variables';
import { Performance, Styles } from 'utilities';
import { AnimationOverlayBrand, ButtonVideoState } from 'macros';

type TypeHeroBrandVideoProps = {
  video: HTMLVideoElement;
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  isAnimationOnLoad?: boolean;
};

const { Spacing, Colors } = Tokens;
const { CampaignMaxium, SansLarger } = Typography;
const { Text } = Elements;
const { ConvertJSSObjectToStyles } = Styles;
const { Debounce } = Performance;

const ELEMENT_NAME = 'umd-element-hero-brand-video';
const ELEMENT_HERO_ELEMENT_DECLARATION = 'hero-logo-brand-video-declaration';
const ELEMENT_HERO_ELEMENT_CONTAINER = 'hero-logo-brand-video-container';
const ELEMENT_HERO_ELEMENT_WRAPPER = 'hero-logo-brand-video-wrapper';
const ELEMENT_HERO_ELEMENT_VIDEO = 'hero-logo-brand-video';
const ELEMENT_HERO_ELEMENT_TEXT_OVERLAY = 'hero-logo-brand-text-overlay';
const ELEMENT_HERO_ELEMENT_TEXT_CONTAINER = 'hero-logo-brand-text-container';
const ELEMENT_HERO_ELEMENT_HEADLINE = 'hero-logo-brand-headline';
const ELEMENT_HERO_ELEMENT_TEXT = 'hero-logo-brand-text';

const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_ELEMENT_HEADLINE}`]: CampaignMaxium,
    },
  })}

  .${ELEMENT_HERO_ELEMENT_HEADLINE} {
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 1000ms ease-in-out;
    transition-delay: 600ms;
  }
`;

const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_HERO_ELEMENT_TEXT} *`]: Text.SimpleLarge,
    },
  })}

  @media (min-width: 1024px) {
    ${ConvertJSSObjectToStyles({
      styleObj: {
        [`.${ELEMENT_HERO_ELEMENT_TEXT} *`]: SansLarger,
      },
    })}
  }

  .${ELEMENT_HERO_ELEMENT_TEXT} {
    max-width: 720px;
    margin: 0 auto;
    opacity: 0;
    transition: opacity 1000ms ease-in-out;
    transition-delay: 1500ms;
  }

  @media (max-width: 649px) {
    .${ELEMENT_HERO_ELEMENT_TEXT} {
      display: none;
    }
  }

  * + .${ELEMENT_HERO_ELEMENT_TEXT} {
    margin-top: ${Spacing.md};
  }
`;

const TextContainerStyles = `
  .${ELEMENT_HERO_ELEMENT_TEXT_CONTAINER} {
    z-index: 99;
    text-align: center;
    width: calc(100% - 24px);
    max-width: 950px;
    padding: ${Spacing.xl} ${Spacing.md};
  }

  .${ELEMENT_HERO_ELEMENT_TEXT_CONTAINER} * {
    color: ${Colors.white};
  }
`;

const TextOverlayStyles = `
  .${ELEMENT_HERO_ELEMENT_TEXT_OVERLAY} {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 98;
    opacity: 0;
    transition: opacity 1500ms ease-in-out;
  }
`;

const VideoStyles = `
  .${ELEMENT_HERO_ELEMENT_VIDEO} {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    min-width: 100%;
    min-height: 100%;
  }
`;

const STYLES_HERO_BRAND_VIDEO_ELEMENT = `
  .${ELEMENT_HERO_ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_HERO_ELEMENT_CONTAINER} {
    aspect-ratio: 16 / 9;
    width: 100%;
  }

  .${ELEMENT_HERO_ELEMENT_WRAPPER} {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${VideoStyles}
  ${TextContainerStyles}
  ${TextOverlayStyles}
  ${HeadlineStyles}
  ${TextStyles}
  ${ButtonVideoState.Styles}
  ${AnimationOverlayBrand.Styles}
`;

const CreateTextContainer = (props: TypeHeroBrandVideoProps) => {
  const { headline, text } = props;
  const overlay = document.createElement('div');
  const container = document.createElement('div');

  if (!headline && !text) return null;

  container.classList.add(ELEMENT_HERO_ELEMENT_TEXT_CONTAINER);

  if (headline) {
    headline.classList.add(ELEMENT_HERO_ELEMENT_HEADLINE);
    container.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_HERO_ELEMENT_TEXT);
    container.appendChild(text);
  }

  overlay.classList.add(ELEMENT_HERO_ELEMENT_TEXT_OVERLAY);
  overlay.appendChild(container);

  return overlay;
};

const AnimationSequence = ({ container }: { container: HTMLDivElement }) => {
  const overlay = container.querySelector(
    `.${ELEMENT_HERO_ELEMENT_TEXT_OVERLAY}`,
  ) as HTMLDivElement;
  const headline = container.querySelector(
    `.${ELEMENT_HERO_ELEMENT_HEADLINE}`,
  ) as HTMLDivElement;
  const text = container.querySelector(
    `.${ELEMENT_HERO_ELEMENT_TEXT}`,
  ) as HTMLDivElement;

  overlay.style.opacity = '1';
  headline.style.opacity = '1';
  text.style.opacity = '1';
};

const CreateHeroBrandVideoElement = (props: TypeHeroBrandVideoProps) => {
  const { video, isAnimationOnLoad } = props;
  const declaration = document.createElement('section');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const textContainer = CreateTextContainer(props);
  const completedCallback = () => AnimationSequence({ container });
  const overlay = AnimationOverlayBrand.CreateElement({
    sizedContainer: container,
    sizedWrapper: wrapper,
    completedCallback,
    isAnimationOnLoad,
  });
  const buttonMacro = ButtonVideoState.CreateElement({ video });
  const eventRize = () => {
    if (container.offsetHeight > window.innerHeight) {
      container.style.height = `${(window.innerHeight / 10) * 9}px`;
    }
  };
  const eventLoad = () => {
    const isReduced =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    overlay.events.load();
    buttonMacro.events.setButtonPlay();
    eventRize();

    if (isReduced) {
      video.pause();
      buttonMacro.events.setButtonPause();
    }
  };

  video.classList.add(ELEMENT_HERO_ELEMENT_VIDEO);

  wrapper.classList.add(ELEMENT_HERO_ELEMENT_WRAPPER);
  wrapper.appendChild(video);
  if (textContainer) wrapper.appendChild(textContainer);
  wrapper.appendChild(overlay.element);
  wrapper.appendChild(buttonMacro.elements.button);

  container.classList.add(ELEMENT_HERO_ELEMENT_CONTAINER);
  container.appendChild(wrapper);

  declaration.classList.add(ELEMENT_HERO_ELEMENT_DECLARATION);
  declaration.appendChild(container);

  window.addEventListener(
    'resize',
    Debounce(() => {
      eventRize();
    }, 20),
  );

  return {
    element: declaration,
    events: {
      load: eventLoad,
    },
  };
};

export default {
  CreateElement: CreateHeroBrandVideoElement,
  Styles: STYLES_HERO_BRAND_VIDEO_ELEMENT,
};
