import {
  element,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';
import * as carouselElements from '../elements';
import { buttons } from 'atomic';
import { Image as LayoutImage } from 'layout';

type TypeFullScreen = {
  isFullScreenOption?: boolean;
};

type TypesetFullScreen = {
  setFullScreen: (arg: number) => void;
};

type TypeSlideContent = {
  images: HTMLImageElement[];
  headlines?: HTMLElement[] | null;
  texts?: HTMLElement[] | null;
};

type TypeImageContainerProps = TypeFullScreen &
  TypesetFullScreen & {
    image: HTMLImageElement;
    index: number;
  };

type TypeCarouselSlideProps = TypeSlideContent &
  TypesetFullScreen &
  TypeFullScreen;

type TypeCarouselImageStandardProps = TypeSlideContent &
  TypeFullScreen & {
    isThemeDark?: boolean;
  };

const ATTRIBUTE_REFERENCE = 'data-reference';

export const createCompositeCarouselImageStandard = (
  props: TypeCarouselImageStandardProps,
) =>
  (() => {
    const { images, isThemeDark, isFullScreenOption } = props;
    const overlayCarousel = carouselElements.overlay({ images });
    let buttonStyles = '';

    const CreateTextContainer = ({
      headlines,
      texts,
      reference,
    }: {
      headlines?: HTMLElement[] | null;
      texts?: HTMLElement[] | null;
      reference: string | null;
    }) => {
      const headline = headlines && headlines.find((item) => item.getAttribute(ATTRIBUTE_REFERENCE) === reference);
      const richText = texts && texts.find((item) => item.getAttribute(ATTRIBUTE_REFERENCE) === reference);
			
      if (!headline && !richText) return null;

      const createHeadline = () => {
        if (!headline) return null;
        return new ElementBuilder(headline)
          .withClassName('carousel-image-standard-slide-headline')
          .styled(typography.sans.large);
      };

      const createRichText = () => {
        if (!richText) return null;
        return new ElementBuilder(richText)
          .withClassName('carousel-image-standard-slide-rich-text')
          .withStyles({
            element: {
              marginTop: token.spacing.min,
              color: token.color.gray.dark,
              ...element.text.rich.advanced,
              ...(isThemeDark && {
                color: token.color.white,
                ...element.text.rich.advancedDark,
              }),
            },
          });
      };

      const textChildren = [createHeadline(), createRichText()].filter((child) => child !== null);

      return new ElementBuilder()
        .withClassName('carousel-image-standard-slide-text')
        .withStyles({
          element: {
            padding: token.spacing.md,
            paddingBottom: 0,
            backgroundColor: token.color.gray.lightest,
            ...(isThemeDark && {
              backgroundColor: token.color.black,
              '& *': { color: token.color.white },
            }),
            [`@media (${token.media.queries.tablet.min})`]: {
              paddingBottom: token.spacing.md,
            },
            '@container (min-width: 500px)': {
              padding: token.spacing.lg,
            },
          },
        })
        .withChildren(...textChildren)
        .build();
    };

    const CreateImageContainer = ({
      image,
      isFullScreenOption,
      setFullScreen,
      index,
    }: TypeImageContainerProps) => {
      const imageBlock = LayoutImage.CreateElement({
        image,
        showCaption: true,
      });

      const standardSlideWrapperElement = new ElementBuilder()
        .withClassName('carousel-image-standard-slide-wrapper')
        .withStyles({
          element: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& > *': { height: '100%' },
            '& img': { objectFit: 'contain', width: '100%', height: '100%' },
          },
        })
        .withChild(imageBlock)
        .build();

      if (isFullScreenOption) {
        const buttonFullscreen = buttons.fullscreen.create({
          callback: setFullScreen,
          index,
        });
        imageBlock.appendChild(buttonFullscreen.element);
        buttonStyles += buttonFullscreen.styles;
      }

      return new ElementBuilder()
        .withClassName('carousel-image-standard-slide-image')
        .withStyles({
          element: {
            position: 'relative',
            backgroundColor: token.color.black,
            ...(isThemeDark && { backgroundColor: token.color.gray.darker }),
          },
        })
        .withChild(standardSlideWrapperElement)
        .build();
    };

    const CreateSlide = (slideProps: TypeCarouselSlideProps) => {
      const { images, setFullScreen } = slideProps;
      const clonedImages = images.map((image) =>
        image.cloneNode(true),
      ) as HTMLImageElement[];

      const createStandardSlide = ({
        image,
        index,
      }: {
        image: HTMLImageElement;
        index: number;
      }) => {
        const reference = image.getAttribute(ATTRIBUTE_REFERENCE);
        const imageContainerModel = CreateImageContainer({
          ...slideProps,
          image,
          setFullScreen,
          index,
        });

        const textContainerModel = CreateTextContainer({
          ...slideProps,
          reference,
        });

        const slideChildren = [imageContainerModel, textContainerModel].filter((child) => child !== null);

        return new ElementBuilder()
          .withClassName('carousel-image-standard-slide')
          .withChildren(...slideChildren)
          .build();
      };

      return clonedImages.map((image, index) => {
        return createStandardSlide({ image, index });
      });
    };

    const slideModels = CreateSlide({
      ...props,
      setFullScreen: overlayCarousel.events.setFullScreen,
    });
    const slides = slideModels.map((model) => model.element);
    const slideStyles = slideModels.reduce(
      (accumulator, model) => accumulator + (model.styles ?? ''),
      '',
    );

    const carousel = carouselElements.image({
      slides,
      isThemeDark,
      callback: (activeIndex) => {
        indicatorWrapperModel.position(activeIndex);
      },
      maxHeight: 500,
      includeButtonWrapper: false,
    });

    const indicatorWrapperModel = carouselElements.indicatorWrapper({
      count: images.length,
      callback: carousel.events.EventMoveTo,
      isThemeDark,
      isBackground: true,
    });

    const indicatorContainerModel = new ElementBuilder()
      .withClassName('carousel-image-standard-indicator')
      .withStyles({
        element: {
          backgroundColor: token.color.gray.lightest,
          ...(isThemeDark && { backgroundColor: token.color.black }),
          [`@media (${token.media.queries.desktop.min})`]: {
            paddingBottom: token.spacing.lg,
          },
        },
      })
      .withChild(indicatorWrapperModel)
      .build();

    const buttonWrapperModel = new ElementBuilder()
      .withClassName('carousel-image-standard-buttons')
      .withStyles({
        element: {
          display: 'flex',
          justifyContent: 'center',
          gap: token.spacing.min,
          padding: `${token.spacing.md} 0`,
          backgroundColor: token.color.gray.lightest,
          ...(isThemeDark && { backgroundColor: token.color.black }),
        },
      })
      .withChildren(carousel.buttons.prev, carousel.buttons.next)
      .build();

    const containerModel = new ElementBuilder()
      .withClassName('carousel-image-standard-container')
      .withStyles({
        element: {
          position: 'relative',
          backgroundColor: token.color.gray.lightest,
          ...(isThemeDark && { backgroundColor: token.color.black }),
        },
      })
      .withChildren(carousel, indicatorContainerModel, buttonWrapperModel)
      .build();

    const declarationModel = new ElementBuilder()
      .withClassName('carousel-image-standard-declaration')
      .withStyles({
        element: { containerType: 'inline-size' },
      })
      .withChild(containerModel)
      .withEvents({ SetEventReize: carousel.events.EventResize })
      .build();

    declarationModel.styles = combineStyles(
      slideStyles,
      LayoutImage.Styles,
      overlayCarousel.styles,
      buttonStyles,
      declarationModel.styles,
    );

    images[images.length - 1].addEventListener('load', carousel.events.Load);

    if (isFullScreenOption) {
      const wrapperModel = new ElementBuilder()
        .withChild(declarationModel)
        .withModifier((element) => {
          element.insertAdjacentElement('afterbegin', overlayCarousel.element);
        })
        .withEvents({ SetEventReize: carousel.events.EventResize })
        .build();

      return wrapperModel;
    }

    return declarationModel;
  })();
