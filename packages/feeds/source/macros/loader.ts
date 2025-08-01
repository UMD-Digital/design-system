import * as Styles from '@universityofmaryland/web-styles-library';
import { Model } from '@universityofmaryland/web-elements-library';

const ID_UMD_LOADER = 'umd-loader-container';

const keyframes = `
  @keyframes loader-first-animation {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes loader-last-animation {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  
  @keyframes loader-middle-animation {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const create = ({ isThemeDark }: { isThemeDark?: boolean }) => {
  const defaultDotStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: `${Styles.token.color.gray.dark}`,
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',

    ...(isThemeDark && {
      background: `${Styles.token.color.gray.light}`,
    }),
  };

  const innerElmOne = Model.ElementModel.createDiv({
    className: `${ID_UMD_LOADER}-one`,
    elementStyles: {
      element: {
        ...defaultDotStyles,
        left: '5px',
        animation: 'loader-first-animation 0.6s infinite',
      },
    },
  });

  const innerElmTwo = Model.ElementModel.createDiv({
    className: `${ID_UMD_LOADER}-two`,
    elementStyles: {
      element: {
        ...defaultDotStyles,
        left: '5px',
        animation: 'loader-middle-animation 0.6s infinite',
      },
    },
  });

  const innerElmThree = Model.ElementModel.createDiv({
    className: `${ID_UMD_LOADER}-three`,
    elementStyles: {
      element: {
        ...defaultDotStyles,
        left: '24px',
        animation: 'loader-middle-animation 0.6s infinite',
      },
    },
  });
  const innerElmFour = Model.ElementModel.createDiv({
    className: `${ID_UMD_LOADER}-four`,
    elementStyles: {
      element: {
        ...defaultDotStyles,
        left: '45px',
        animation: 'loader-last-animation 0.6s infinite',
      },
    },
  });

  const wrapper = Model.ElementModel.createDiv({
    className: `${ID_UMD_LOADER}-wrapper`,
    children: [innerElmOne, innerElmTwo, innerElmThree, innerElmFour],
    elementStyles: {
      element: {
        position: 'relative',
      },
    },
  });

  const composite = Model.ElementModel.createDiv({
    className: ID_UMD_LOADER,
    children: [wrapper],
    elementStyles: {
      element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        minHeight: '40px',
        position: 'relative',
        gridColumn: '1 / -1',
      },
    },
  });

  composite.styles += keyframes;

  return composite;
};

const remove = ({ container }: { container: HTMLElement }) => {
  const loader = container.querySelector(`.${ID_UMD_LOADER}`) as HTMLDivElement;

  if (loader) loader.remove();
};

const display = ({
  container,
  isThemeDark,
}: {
  container: HTMLElement;
  isThemeDark?: boolean;
}) => {
  const loader = create({ isThemeDark });

  container.appendChild(loader.element);
};

export default {
  create,
  display,
  remove,
};
