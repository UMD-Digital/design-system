import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { type AnimationIndicatorProps } from './_types';
import { type ElementModel } from '_types';

export const createAnimationIndicator = (props: AnimationIndicatorProps) =>
  (() => {
    const { count, overlayColor, isThemeDark, callback } = props;

    const createButton = (index: number) => {
      const overlay = new ElementBuilder('span')
        .withClassName('slide-overlay')
        .withStyles({
          element: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '22px',
            display: 'block',
            backgroundColor: token.color.white,
            zIndex: 99,

            ...(overlayColor && {
              backgroundColor: overlayColor,
            }),

            ...(!overlayColor && {
              ...(isThemeDark && {
                backgroundColor: token.color.black,
              }),
            }),
          },
        })
        .build();

      return new ElementBuilder('button')
        .withClassName('slide-indicator-button-wrapper')
        .withStyles({
          element: {
            width: '80px',
            height: '100%',
            backgroundColor: token.color.gray.light,
            position: 'relative',
          },
        })
        .withChild(overlay)
        .withAttribute('aria-label', `Slide ${index + 1}`)
        .withModifier((element: HTMLElement) => {
          element.addEventListener('click', () => callback(index));
        })
        .build();
    };

    const createButtonsAndSpacers = () => {
      const buttonsAndSpacers: ElementModel<HTMLElement>[] = [];

      for (let index = 0; index < count; index++) {
        buttonsAndSpacers.push(buttons[index]);
        buttonsAndSpacers.push(spacers[index]);
      }

      return buttonsAndSpacers;
    };

    const buttons: ElementModel<HTMLElement>[] = Array.from({
      length: count * 2,
    }).map((_, index) => createButton(index));

    const spacers: ElementModel<HTMLElement>[] = Array.from(
      { length: count },
      () => {
        return new ElementBuilder('span')
          .withClassName('slide-spacer')
          .withStyles({
            element: {
              display: 'block',
              width: token.spacing.sm,
              height: '22px',
              zIndex: 999,
              position: 'relative',
              backgroundColor: token.color.white,

              ...(overlayColor && {
                backgroundColor: overlayColor,
              }),

              ...(!overlayColor && {
                ...(isThemeDark && {
                  backgroundColor: token.color.black,
                }),
              }),
            },
          })
          .build();
      },
    );

    const line = new ElementBuilder('div')
      .withClassName('slide-indicator-line')
      .withStyles({
        element: {
          position: 'absolute',
          left: 0,
          top: 0,
          height: '24px',
          width: '80px',
          transition: 'left 500ms',
          backgroundColor: token.color.red,
          zIndex: 99,
        },
      })
      .build();

    const buttonsAndSpacers = createButtonsAndSpacers();

    const container = new ElementBuilder('div')
      .withClassName('slide-indicator-container')
      .withStyles({
        element: {
          position: 'relative',
          height: '24px',
          display: 'flex',
          alignItems: 'flex-start',
          maxWidth: '100%',
          overflow: 'hidden',
        },
      })
      .withChild(line)
      .withChildren(...buttonsAndSpacers)
      .build();

    const positionLine = (index: number) => {
      const button = buttons[index];
      const buttonSize = button.element.clientWidth;
      const buttonPosition = button.element.offsetLeft;

      line.element.style.width = `${buttonSize}px`;
      line.element.style.left = `${buttonPosition}px`;
    };

    const sizeButtons = () => {
      const maxWidth = 80;
      const containerSize = container.element.clientWidth;
      let buttonSize = containerSize / count;

      if (buttonSize > maxWidth) buttonSize = maxWidth;

      buttons.forEach((button) => {
        button.element.style.width = `${buttonSize}px`;
      });
    };

    const eventResize = () => {
      sizeButtons();
      positionLine(position);
    };

    const eventPosition = (index: number) => {
      positionLine(index);
      position = index;
    };

    const load = () => {
      const reload = () => {
        setTimeout(() => {
          const isLoaded = container.element.clientWidth > 0;
          if (!isLoaded) {
            reload();
          } else {
            sizeButtons();
            positionLine(position);
            line.element.style.display = 'block';
          }
        }, 500);
      };

      line.element.style.display = 'none';
      reload();
    };

    let position = 0;

    load();

    window.addEventListener('resize', debounce(eventResize, 20));

    return {
      ...container,
      position: eventPosition,
    };
  })();
