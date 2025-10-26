import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementModel } from '../_types';

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

const create = ({ isThemeDark }: { isThemeDark?: boolean }): ElementModel => {
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

  const innerElmOne = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-one`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '5px',
        animation: 'loader-first-animation 0.6s infinite',
      },
    })
    .build();

  const innerElmTwo = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-two`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '5px',
        animation: 'loader-middle-animation 0.6s infinite',
      },
    })
    .build();

  const innerElmThree = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-three`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '24px',
        animation: 'loader-middle-animation 0.6s infinite',
      },
    })
    .build();

  const innerElmFour = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-four`)
    .withStyles({
      element: {
        ...defaultDotStyles,
        left: '45px',
        animation: 'loader-last-animation 0.6s infinite',
      },
    })
    .build();

  const wrapper = new ElementBuilder()
    .withClassName(`${ID_UMD_LOADER}-wrapper`)
    .withChild(innerElmOne)
    .withChild(innerElmTwo)
    .withChild(innerElmThree)
    .withChild(innerElmFour)
    .withStyles({
      element: {
        position: 'relative',
      },
    })
    .build();

  const composite = new ElementBuilder()
    .withClassName(ID_UMD_LOADER)
    .withChild(wrapper)
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 0',
        minHeight: '40px',
        position: 'relative',
        gridColumn: '1 / -1',
      },
    })
    .build();

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
