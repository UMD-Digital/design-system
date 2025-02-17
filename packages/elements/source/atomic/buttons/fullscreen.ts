import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

const { convertJSSObjectToStyles } = Utility.styles;

const ELEMENT_BUTTON = 'button-full-screen';

// prettier-ignore
const STYLES_FULL_SCREEN_BUTTON = `
  .${ELEMENT_BUTTON} {
    position: absolute;
    bottom: 0;
    left: 0;
    color: ${token.color.white};
    text-transform: uppercase;
    font-weight: 700;
    padding: ${token.spacing.min};
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
    background-color: ${token.color.gray.mediumAA};
    margin: 0 4px;
  }
`;

const create = ({
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
    let styles = STYLES_FULL_SCREEN_BUTTON;

    return {
      element: button,
      styles,
    };
  })();

export default {
  create,
  reference: {
    className: ELEMENT_BUTTON,
  },
};
