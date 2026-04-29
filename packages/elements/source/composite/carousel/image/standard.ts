import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as carouselElements from '../elements';
import { animations, buttons } from 'atomic';
import { Image as LayoutImage } from 'layout';

type TypeImage = {
  image: HTMLImageElement;
};

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

type TypeImageContainerProps = TypeImage &
  TypeFullScreen &
  TypesetFullScreen & {
    index: number;
    isThemeDark?: boolean;
  };

type TypeCarouselSlideProps = TypeSlideContent &
  TypesetFullScreen &
  TypeFullScreen & {
    isThemeDark?: boolean;
  };

type TypeCarouselImageStandardProps = TypeSlideContent &
  TypeFullScreen & {
    isThemeDark?: boolean;
  };

const MEDIUM = 500;
const ATTRIBUTE_REFERENCE = 'data-reference';

export const createCompositeCarouselImageStandard = (
  props: TypeCarouselImageStandardProps,
) =>
  (() => {
    const { images, isThemeDark, isFullScreenOption } = props;
    const overlayCarousel = carouselElements.overlay({
      images,
    });

    const createHeadline = ({
      headline,
      isThemeDark,
    }: {
      headline?: HTMLElement | null;
      isThemeDark?: boolean;
    }) => {
      if (!headline) {
        return null;
      }

      return new ElementBuilder(headline)
        .withClassName('carousel-image-standard-slide-headline')
        .styled(Styles.typography.sans.large)
        .withStyles({
          element: {
            ...(isThemeDark && {
              color: token.color.white,
              '& *': {
                color: token.color.white,
              },
            }),
          },
        })
        .build();
    };

    const createRichText = ({
      richText,
      isThemeDark,
    }: {
      richText?: HTMLElement | null;
      isThemeDark?: boolean;
    }) => {
      if (!richText) {
        return null;
      }

      let builder = new ElementBuilder(richText)
        .withClassName('carousel-image-standard-slide-rich-text')
        .withStyles({
          element: {
            marginTop: token.spacing.min,
            color: token.color.gray.dark,
            ...(isThemeDark && {
              color: token.color.white,
            }),
          },
        });

      if (isThemeDark) {
        builder = builder.styled(Styles.element.text.rich.advancedDark);
      } else {
        builder = builder.styled(Styles.element.text.rich.advanced);
      }

      return builder.build();
    };

    const createTextContainer = ({
      headlines,
      texts,
      reference,
      isThemeDark,
    }: {
      headlines?: HTMLElement[] | null;
      texts?: HTMLElement[] | null;
      reference: string | null;
      isThemeDark?: boolean;
    }) => {
      let headline: HTMLElement | null = null;
      let richText: HTMLElement | null = null;

      if (headlines) {
        headline =
          headlines.find(
            (currentHeadline) =>
              currentHeadline.getAttribute(ATTRIBUTE_REFERENCE) === reference,
          ) || null;
      }

      if (texts) {
        richText =
          texts.find(
            (currentText) =>
              currentText.getAttribute(ATTRIBUTE_REFERENCE) === reference,
          ) || null;
      }

      if (!headline && !richText) {
        return null;
      }

      const textContainerBuilder = new ElementBuilder()
        .withClassName('carousel-image-standard-slide-text')
        .withStyles({
          element: {
            padding: token.spacing.md,
            paddingBottom: 0,
            backgroundColor: token.color.gray.lightest,
            ...(isThemeDark && {
              backgroundColor: token.color.black,
            }),
            [`@container (min-width: ${MEDIUM}px)`]: {
              padding: token.spacing.lg,
              paddingBottom: 0,
            },
          },
        });
      const headlineElement = createHeadline({
        headline,
        isThemeDark,
      });
      const richTextElement = createRichText({
        richText,
        isThemeDark,
      });

      if (headlineElement) {
        textContainerBuilder.withChild(headlineElement);
      }

      if (richTextElement) {
        textContainerBuilder.withChild(richTextElement);
      }

      return textContainerBuilder.build();
    };

    const createImageContainer = ({
      image,
      isFullScreenOption,
      setFullScreen,
      index,
      isThemeDark,
    }: TypeImageContainerProps) => {
      const imageBlock = LayoutImage.CreateElement({
        image,
        showCaption: true,
      });
      const imageBlockBuilder = new ElementBuilder(imageBlock);

      if (isFullScreenOption) {
        imageBlockBuilder.withChild(
          buttons.fullscreen.create({
            callback: setFullScreen,
            index,
          }),
        );
      }

      return new ElementBuilder()
        .withClassName('carousel-image-standard-slide-image')
        .withStyles({
          element: {
            position: 'relative',
            backgroundColor: token.color.black,
            ...(isThemeDark && {
              backgroundColor: token.color.gray.dark,
            }),
            '& img': {
              objectFit: 'contain',
              maxHeight: '100%',
            },
          },
        })
        .withChild(
          new ElementBuilder()
            .withClassName('carousel-image-standard-slide-wrapper')
            .withStyles({
              element: {
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& > *': {
                  height: '100%',
                },
              },
            })
            .withChild(imageBlockBuilder.build())
            .build(),
        )
        .build();
    };

    const createSlide = (props: TypeCarouselSlideProps) => {
      const { images, setFullScreen, isThemeDark } = props;
      const clonedImages = images.map(
        (image) => image.cloneNode(true) as HTMLImageElement,
      );

      return clonedImages.map((image, index) => {
        const reference = image.getAttribute(ATTRIBUTE_REFERENCE);
        const textContainer = createTextContainer({
          ...props,
          reference,
          isThemeDark,
        });
        const slideBuilder = new ElementBuilder()
          .withClassName('carousel-image-standard-slide')
          .withChild(
            createImageContainer({
              ...props,
              image,
              setFullScreen,
              index,
              isThemeDark,
            }),
          );

        if (textContainer) {
          slideBuilder.withChild(textContainer);
        }

        return slideBuilder.build();
      });
    };

    const slideModels = createSlide({
      ...props,
      setFullScreen: overlayCarousel.events.setFullScreen,
    });
		
    const carousel = carouselElements.image({
      slides: slideModels.map((slide) => slide.element),
      callback: (activeIndex) => {
        indicator.position(activeIndex);
      },
      maxHeight: 500,
    });
    const indicatorOptions: {
      count: number;
      callback: (index: number) => void;
      isThemeDark?: boolean;
      overlayColor?: string;
    } = {
      count: images.length || 0,
      callback: carousel.events.EventMoveTo,
      isThemeDark,
    };

    if (!isThemeDark) {
      indicatorOptions.overlayColor = token.color.gray.lightest;
    }

    const indicator = animations.actions.indicator(indicatorOptions);
    const indicatorWrapper = new ElementBuilder()
      .withClassName('carousel-indicator-wrapper')
      .withStyles({
        element: {
          padding: token.spacing.md,
          backgroundColor: token.color.gray.lightest,
          display: 'flex',
          justifyContent: 'center',
          ...(isThemeDark && {
            backgroundColor: token.color.black,
          }),
          [`@container (min-width: ${MEDIUM}px)`]: {
            padding: token.spacing.lg,
          },
        },
      })
      .withChild(indicator)
      .build();

    const declaration = new ElementBuilder()
      .withClassName('carousel-image-standard-declaration')
      .withStyles({
        element: {
          containerType: 'inline-size',
        },
      })
      .withChild(
        new ElementBuilder()
          .withClassName('carousel-image-standard-container')
          .withStyles({
            element: {
              overflow: 'hidden',
              backgroundColor: token.color.gray.lightest,
              ...(isThemeDark && {
                backgroundColor: token.color.black,
              }),
            },
          })
          .withChild(carousel)
          .withChild(indicatorWrapper)
          .build(),
      )
      .build();

    images[images.length - 1].addEventListener('load', carousel.events.Load);

    let elementModel = declaration;

    if (isFullScreenOption) {
      elementModel = new ElementBuilder()
        .withChild(overlayCarousel)
        .withChild(declaration)
        .build();
    }

    elementModel.styles += slideModels.reduce(
      (accumulator, currentSlide) => accumulator + currentSlide.styles,
      '',
    );
    elementModel.styles += LayoutImage.Styles;

    return {
      ...elementModel,
      events: {
        SetEventReize: carousel.events.EventResize,
      },
    };
  })();
