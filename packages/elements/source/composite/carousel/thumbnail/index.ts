import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as carouselElements from '../elements';

type TypeCarouselThumbnailProps = {
  blocks: HTMLElement[];
  isThemeDark?: boolean;
};

export const createCompositeCarouselThumbnail = (
  props: TypeCarouselThumbnailProps,
) =>
  (() => {
    const { blocks, isThemeDark } = props;
    const slide = new ElementBuilder().build().element;

    const CreatePerson = ({ block }: { block: HTMLElement }) =>
      new ElementBuilder()
        .withClassName('carousel-person-slide')
        .withStyles({
          element: {
            border: `1px solid ${token.color.gray.light}`,
            ...(isThemeDark && { border: `1px solid ${token.color.gray.dark}` }),
            borderLeft: 'none',
            padding: token.spacing.lg,
            '&:first-child': {
              borderLeft: `1px solid ${token.color.gray.light}`,
              ...(isThemeDark && { borderLeft: `1px solid ${token.color.gray.dark}` }),
            },
          },
        })
        .withChild(block)
        .build();

    const blocksWrapperModels = blocks.map((block) => CreatePerson({ block }));
    const blocksWrapper = blocksWrapperModels.map((model) => model.element);
    const blocksStyles = blocksWrapperModels[0] ? blocksWrapperModels[0].styles : '';

    const carousel = carouselElements.blocks.CreateElement({
      blocks: blocksWrapper,
      slide,
      mobileBreakpoint: token.media.breakpointValues.medium.min,
      tabletBreakpoint: token.media.breakpointValues.desktop.min,
      desktopBreakpoint: token.media.breakpointValues.highDef.min,
      desktopCount: 3,
      maxCount: 4,
      blockGap: 0,
      showHint: false,
      showMobileHint: false,
      button: {
        outsetOffset: token.spacing.md,
        ...(isThemeDark && carouselElements.buttonColorsOnBlack()),
      },
    });

    const containerModel = new ElementBuilder()
      .withClassName('carousel-thumbnail-container')
      .withStyles({
        element: {
          overflow: 'hidden',
          padding: `0 ${token.spacing.md}`,
          ...(isThemeDark && { backgroundColor: token.color.black }),
        },
      })
      .withChild(carousel)
      .build();

    const declarationModel = new ElementBuilder()
      .withClassName('carousel-thumbnail-declaration')
      .withStyles({
        element: {
          containerType: 'inline-size',
        },
      })
      .withChild(containerModel)
      .withEvents({
        resize: carousel.events.resize,
        load: carousel.events.load,
      })
      .build();

    declarationModel.styles += blocksStyles;

    return declarationModel;
  })();
