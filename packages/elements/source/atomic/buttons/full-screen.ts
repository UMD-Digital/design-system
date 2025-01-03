import { tokens, typography } from '@universityofmaryland/web-elements-styles';
import * as Utility from 'utilities';

const { colors, spacing } = tokens;

const { convertJSSObjectToStyles } = Utility.styles;

const ELEMENT_BUTTON = 'button-full-screen';

// prettier-ignore
const STYLES_FULL_SCREEN_BUTTON = `
  .${ELEMENT_BUTTON} {
    position: absolute;
    bottom: 0;
    left: 0;
    color: ${colors.white};
    text-transform: uppercase;
    font-weight: 700;
    padding: ${spacing.min};
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BUTTON}`]: typography.sans.min,
    },
  })}

  .${ELEMENT_BUTTON} > span {
    display: block;
    height: 12px;
    width: 1px;
    background-color: ${colors.gray.mediumAA};
    margin: 0 4px;
  }
`;

const CreateFullScreenButton = ({
  callback,
  index,
}: {
  callback: (arg: number) => void;
  index: number;
}) =>
  (() => {
    const button = document.createElement('button');
    button.classList.add(ELEMENT_BUTTON);
    button.setAttribute('data-index', index.toString());
    button.addEventListener('click', () => {
      callback(index);
    });
    button.innerHTML = `Full Screen <span></span>${Utility.asset.icon.FULL_SCREEN}`;

    return button;
  })();

export default {
  CreateElement: CreateFullScreenButton,
  Styles: STYLES_FULL_SCREEN_BUTTON,
  Elements: {
    button: ELEMENT_BUTTON,
  },
};
