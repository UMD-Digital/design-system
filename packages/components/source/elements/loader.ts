export const UMD_LOADER = 'umd-loader-container';

export const STYLES_LOADER = `
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

  .${UMD_LOADER} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    min-height: 40px;
    position: relative;
    grid-column: 1 / -1;
  }

  .${UMD_LOADER} > div {
    position: relative;
  }

  .${UMD_LOADER} > div > div {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--grayDark);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .${UMD_LOADER} > div > div:first-child {
    left: 5px;
    animation: loader-first-animation 0.6s infinite;
  }

  .${UMD_LOADER} > div > div:nth-child(2) {
    left: 5px;
    animation: loader-middle-animation 0.6s infinite;
  }

  .${UMD_LOADER} > div > div:nth-child(3) {
    left: 24px;
    animation: loader-middle-animation 0.6s infinite;
  }

  .${UMD_LOADER} > div > div:last-child {
    left: 45px;
    animation: loader-last-animation 0.6s infinite;
  }
`;

export const MakeLoader = () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const innerElmOne = document.createElement('div');
  const innerElmTwo = document.createElement('div');
  const innerElmThree = document.createElement('div');
  const innerElmFour = document.createElement('div');

  container.classList.add(UMD_LOADER);

  wrapper.appendChild(innerElmOne);
  wrapper.appendChild(innerElmTwo);
  wrapper.appendChild(innerElmThree);
  wrapper.appendChild(innerElmFour);

  container.appendChild(wrapper);

  return container;
};
