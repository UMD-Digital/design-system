import { Tokens, Typography } from '@universityofmaryland/variables';
import { Asset, Styles } from 'utilities';

const { Colors, Spacing } = Tokens;

const { convertJSSObjectToStyles } = Styles;

const ELEMENT_BUTTON = 'button-full-screen';

// prettier-ignore
const STYLES_FULL_SCREEN_BUTTON = `
  .${ELEMENT_BUTTON} {
    position: absolute;
    bottom: 0;
    left: 0;
    color: ${Colors.white};
    text-transform: uppercase;
    font-weight: 700;
    padding: ${Spacing.min};
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_BUTTON}`]: Typography.sans.min,
    },
  })}

  .${ELEMENT_BUTTON} > span {
    display: block;
    height: 12px;
    width: 1px;
    background-color: ${Colors.gray.mediumAA};
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
    button.innerHTML = `Full Screen <span></span>${Asset.icon.FULL_SCREEN}`;

    return button;
  })();

export default {
  CreateElement: CreateFullScreenButton,
  Styles: STYLES_FULL_SCREEN_BUTTON,
  Elements: {
    button: ELEMENT_BUTTON,
  },
};
