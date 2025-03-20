import { token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

const ELEMENT_SLIDE_INDICATOR_CONTAINER = 'slide-indicator-container';
const ELEMENT_SLIDE_INDICATOR_LINE = 'slide-indicator-line';
const ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER = 'slide-indicator-button-wrapper';

// prettier-ignore
const LineStyles = `
  .${ELEMENT_SLIDE_INDICATOR_LINE} {
    position: absolute;
    left: 0;
    top: 0;
    height: 24px;
    width: 80px;
    transition: left 500ms;
    background-color: ${token.color.red};
    z-index: 99;
  }
`

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER} {
    width: 80px;
    height: 100%;
    background-color: ${token.color.gray.light};
    position: relative;
  }

  .${ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER} > span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 22px;
    display: block;
    background-color: ${token.color.gray.lightest};
    z-index: 99;
  }
`

const STYLES_INDICATOR = `
  .${ELEMENT_SLIDE_INDICATOR_CONTAINER} {
    position: relative;
    height: 24px;
    display: flex;
    align-items: flex-start;
    max-width: 100%;
    overflow: hidden;
  }

  .${ELEMENT_SLIDE_INDICATOR_CONTAINER} > span {
    display: block;
    width: ${token.spacing.sm};
    height:  22px;
    z-index: 999;
    position: relative;
  }
  
  ${LineStyles}
  ${ButtonStyles}

`;

export default ({
  count,
  overlayColor,
  isThemeDark,
  isThemeLight,
  callback,
}: {
  count: number;
  overlayColor?: string;
  isThemeDark?: boolean;
  isThemeLight?: boolean;
  callback: (arg: number) => void;
}) =>
  (() => {
    const container = document.createElement('div');
    const line = document.createElement('div');
    let styles = STYLES_INDICATOR;

    const buttons = Array.from({ length: count }).map((count, i) => {
      const button = document.createElement('button');

      button.classList.add(ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER);
      button.addEventListener('click', () => callback(i));
      button.setAttribute('aria-label', `Slide ${i + 1}`);

      return button;
    });

    const positionLine = (index: number) => {
      const button = buttons[index];
      const buttonSize = button.clientWidth;
      const buttonPosition = button.offsetLeft;

      line.style.width = `${buttonSize}px`;
      line.style.left = `${buttonPosition}px`;
    };
    const sizeButtons = () => {
      const maxWidth = 80;
      const containerSize = container.clientWidth;
      let buttonSize = containerSize / count;

      if (buttonSize > maxWidth) buttonSize = maxWidth;

      buttons.forEach((button) => {
        button.style.width = `${buttonSize}px`;
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
          const isLoaded = container.clientWidth > 0;
          if (!isLoaded) {
            reload();
          } else {
            sizeButtons();
            positionLine(position);
            line.style.display = 'block';
          }
        }, 500);
      };

      line.style.display = 'none';
      reload();
    };

    let position = 0;

    line.classList.add(ELEMENT_SLIDE_INDICATOR_LINE);

    container.classList.add(ELEMENT_SLIDE_INDICATOR_CONTAINER);
    container.appendChild(line);
    buttons.forEach((button) => {
      const spacer = document.createElement('span');
      const overlay = document.createElement('span');
      let spacerColor: string = token.color.white;

      if (isThemeDark && !overlayColor) {
        spacerColor = token.color.black;
      }

      if (isThemeLight && !overlayColor) {
        spacerColor = token.color.gray.lightest;
      }

      spacer.style.backgroundColor = spacerColor;
      overlay.style.backgroundColor = spacerColor;

      button.appendChild(overlay);
      container.appendChild(button);
      container.appendChild(spacer);
    });

    load();

    window.addEventListener(
      'resize',
      Utility.performance.debounce(eventResize, 20),
    );

    return {
      element: container,
      styles,
      position: eventPosition,
    };
  })();
