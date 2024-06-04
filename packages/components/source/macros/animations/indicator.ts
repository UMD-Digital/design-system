import { Tokens } from '@universityofmaryland/variables';
import { Performance } from 'utilities';

const { Colors, Spacing } = Tokens;
const { Debounce } = Performance;

const ELEMENT_SLIDE_INDICATOR_CONTAINER = 'slide-indicator-container';
const ELEMENT_SLIDE_INDICATOR_LINE = 'slide-indicator-line';
const ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER = 'slide-indicator-button-wrapper';

// prettier-ignore
const LineStyles = `
  .${ELEMENT_SLIDE_INDICATOR_LINE} {
    position: absolute;
    left: 0;
    top: 0;
    height: 2px;
    width: 80px;
    transition: left 500ms;
    background-color: ${Colors.red};
    z-index: 99;
  }
`

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER} {
    width: 80px;
    height: 100%;
    background-color: ${Colors.gray.lightest};
  }
`

const STYLES_INDICATOR = `
  .${ELEMENT_SLIDE_INDICATOR_CONTAINER} {
    position: relative;
    height: 2px;
    display: flex;
    align-items: center;
    max-width: 100%;
    overflow: hidden;
  }

  .${ELEMENT_SLIDE_INDICATOR_CONTAINER} > span {
    display: block;
    width: ${Spacing.sm};
    height: 4px;
    z-index: 999;
  }
  
  ${LineStyles}
  ${ButtonStyles}

`;

const CreateSlideIndicator = ({
  count,
  overlayColor,
  theme,
  callback,
}: {
  count: number;
  overlayColor?: string;
  theme?: string | null;
  callback: (arg: number) => void;
}) =>
  (() => {
    const container = document.createElement('div');
    const line = document.createElement('div');

    const buttons = Array.from({ length: count }).map((count, i) => {
      const button = document.createElement('button');

      button.classList.add(ELEMENT_SLIDE_INDICATOR_BUTTON_WRAPPER);
      button.addEventListener('click', () => callback(i));

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
      let spacerColor = Colors.white;

      if (theme === 'dark' && !overlayColor) spacerColor = Colors.black;
      if (theme === 'light' && !overlayColor) spacerColor = Colors.gray.lighter;

      spacer.style.backgroundColor = spacerColor;

      container.appendChild(button);
      container.appendChild(spacer);
    });

    load();

    window.addEventListener('resize', Debounce(eventResize, 20));

    return {
      element: container,
      position: eventPosition,
    };
  })();

export default {
  CreateElement: CreateSlideIndicator,
  Styles: STYLES_INDICATOR,
};
