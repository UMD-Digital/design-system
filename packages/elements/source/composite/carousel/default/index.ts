import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as carouselElements from '../elements';
import { type TypeButtonConfig } from '../elements/equal-width-items';

type TypeCarouselRequirements = {
  slide: HTMLElement;
  shadowRef?: HTMLElement;
  blocks: HTMLElement[];
  isThemeDark?: boolean;
  gridGap?: string | null;
  hasLeftButton?: boolean;
  hasRightButton?: boolean;
  mobileHint?: boolean;
  hint?: boolean;
  tabletSize?: number;
  desktopSize?: number;
  mobileCount?: number;
  tabletCount?: number;
  desktopCount?: number;
  maxCount?: number;
  button?: TypeButtonConfig;
};

export const createCompositeCarouselDefault = (props: TypeCarouselRequirements) =>
  (() => {
    const {
      slide,
      shadowRef,
      blocks,
      isThemeDark,
      gridGap,
      hasLeftButton = true,
      hasRightButton = true,
      mobileHint = true,
      hint = true,
      tabletSize,
      desktopSize,
      tabletCount,
      desktopCount,
      maxCount,
      button,
    } = props;

    let tabletBreakpoint = tabletSize ?? token.media.breakpointValues.desktop.min;
    let desktopBreakpoint = desktopSize;
    let blockGap;

    if (gridGap) {
      blockGap = parseInt(gridGap);
      tabletBreakpoint = 1000 + parseInt(gridGap);
      desktopBreakpoint = 1400 + parseInt(gridGap);
    }

    const carouselContainer = carouselElements.blocks.CreateElement({
      slide,
      shadowRef,
      blocks,
      hasLeftButton,
      hasRightButton,
      showMobileHint: mobileHint,
      showHint: hint,
      tabletBreakpoint,
      desktopBreakpoint,
      tabletCount,
      desktopCount,
      maxCount,
      blockGap,
      button: {
        ...button,
        ...carouselElements.buttonColorsOnWhite(isThemeDark),
      },
    });

    const containerModel = new ElementBuilder()
      .withClassName('element-carousel-default-container')
      .withStyles({
        element: {
          position: 'relative',
          overflow: 'hidden',
        },
      })
      .withModifier((element) => {
        if (isThemeDark) {
          element.setAttribute('data-theme', 'dark');
        }
      })
      .withChild(carouselContainer)
      .build();

    const declarationModel = new ElementBuilder()
      .withClassName('carousel-default-declaration')
      .withStyles({
        element: {
          containerType: 'inline-size',
          '& *': { color: token.color.white },
        },
      })
      .withChild(containerModel)
      .withEvents({
        resize: carouselContainer.events.resize,
        load: carouselContainer.events.load,
      })
      .build();

    return declarationModel;
  })();
