import { AssetIcon } from 'utilities';

export type TypeImageContainerProps = {
  imageRef?: HTMLElement | null;
  videoRef?: HTMLElement | null;
  isTypeMinimal?: boolean;
};

const DEFAULT_IMAGE = `<svg id="Fearlessly-Forward-Logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1032.8 400"><defs><style>.cls-1 {fill: none;}.cls-2 {  clip-path: url(#clippath);}.cls-3 {  fill: #fff;}.cls-4 {  fill: #ffd200;}.cls-5 {  fill: #e31933;}.cls-6 {  fill: #231f20;}</style><clipPath id="clippath"><rect class="cls-1" width="1032.8" height="400"/></clipPath></defs><g class="cls-2"><g><g><polygon class="cls-5" points="658.3 542.19 265.93 149.82 246.65 130.54 227.37 149.82 -157.8 534.99 -119.24 573.55 246.65 207.66 619.74 580.75 658.3 542.19"/><polygon class="cls-4" points="495.04 -220.31 177.58 97.15 -139.88 -220.31 -191.29 -168.9 151.88 174.27 177.58 199.97 203.29 174.27 546.45 -168.9 495.04 -220.31"/><polygon class="cls-5" points="-346.05 -117.45 -28.54 200.05 -345.37 517.51 -293.86 568.82 74.18 199.94 48.53 174.29 -294.64 -168.87 -346.05 -117.45"/><polygon class="cls-6" points="-2.48 -117.45 -4.98 200.05 -1.81 517.51 49.71 568.82 417.75 199.94 392.09 174.29 48.93 -168.87 -2.48 -117.45"/><polygon class="cls-4" points="87.54 530.28 417.85 199.97 87.54 -130.33 113.25 -156.04 456.41 187.12 469.26 199.97 456.41 212.82 113.25 555.99 87.54 530.28"/><polygon class="cls-6" points="-204.14 -130.31 126.17 200 -204.14 530.31 -178.43 556.01 164.73 212.85 177.58 200 -178.43 -156.01 -204.14 -130.31"/></g><g><polygon class="cls-6" points="207.33 -60.43 599.69 331.93 618.97 351.21 638.25 331.93 1023.42 -53.24 984.86 -91.8 618.97 274.09 245.89 -98.99 207.33 -60.43"/><polygon class="cls-5" points="1691.1 542.19 1298.73 149.82 1279.45 130.54 1260.17 149.82 875 534.99 913.56 573.55 1279.45 207.66 1652.54 580.75 1691.1 542.19"/><polygon class="cls-4" points="301.57 -148.97 262.92 -136.2 594.56 197 613.89 177.68 919.06 -127.49 880.5 -140.35 594.65 145.49 301.57 -148.97"/><polygon class="cls-4" points="770.05 618.11 808.7 605.34 477.05 272.14 457.73 291.46 152.56 596.63 191.11 609.5 476.96 323.65 770.05 618.11"/><polygon class="cls-4" points="533.1 -117.45 850.56 200 533.1 517.46 584.51 568.87 927.68 225.7 953.39 200 927.68 174.29 584.51 -168.87 533.1 -117.45"/><polygon class="cls-4" points="1527.84 -220.31 1210.38 97.15 892.93 -220.31 841.51 -168.9 1184.68 174.27 1210.38 199.97 1236.09 174.27 1579.25 -168.9 1527.84 -220.31"/><polygon class="cls-5" points="686.75 -117.45 1004.26 200.05 687.43 517.51 738.94 568.82 1106.98 199.94 1081.33 174.29 738.16 -168.87 686.75 -117.45"/><polygon class="cls-5" points="997.78 -309.11 680.28 8.4 362.82 -308.43 311.51 -256.92 680.38 111.12 706.04 85.47 1049.19 -257.7 997.78 -309.11"/><polygon class="cls-6" points="1030.32 -117.45 1347.82 200.05 1030.99 517.51 1082.51 568.82 1450.55 199.94 1424.89 174.29 1081.73 -168.87 1030.32 -117.45"/><polygon class="cls-6" points="622.98 530.31 953.29 200 622.98 -130.31 648.69 -156.01 991.85 187.14 1004.7 200 991.85 212.85 648.69 556.01 622.98 530.31"/><polygon class="cls-5" points="311.51 530.31 641.82 200 311.51 -130.31 337.22 -156.01 680.38 187.14 693.23 200 680.38 212.85 337.22 556.01 311.51 530.31"/><polygon class="cls-6" points="997.78 -378.98 680.28 -61.47 362.82 -378.31 311.51 -326.79 680.38 41.25 706.04 15.59 1049.19 -327.57 997.78 -378.98"/></g></g></g><polygon class="cls-3" points="787.14 136.08 651.06 0 392 0 592.85 200.84 393.07 400.62 652.13 400.62 787.14 265.61 851.91 200.84 787.14 136.08"/></svg>`;

export const ELEMENT_IMAGE_CONTINATER = 'hero-image-container';

// prettier-ignore
export const STYLES_HERO_ELEMENT_IMAGE_CONTAINER = `
  .${ELEMENT_IMAGE_CONTINATER} {
    position: relative;
  }

  .${ELEMENT_IMAGE_CONTINATER} video {
    display: block;
  }

  .${ELEMENT_IMAGE_CONTINATER} button {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 44px;
    height: 44px;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .${ELEMENT_IMAGE_CONTINATER} button svg {
    fill: white;
    width: 24px;
  }
`;

const makeDefaultImage = () => {
  const svgImage = document.createElement('img');
  svgImage.setAttribute(
    'src',
    `data:image/svg+xml,${encodeURIComponent(DEFAULT_IMAGE)}`,
  );
  svgImage.setAttribute('alt', 'Fearlessly Forward graphic');

  return svgImage;
};

export const CreateImageContainerElement = (
  element: TypeImageContainerProps,
) => {
  const { imageRef, videoRef, isTypeMinimal = false } = element;
  const container = document.createElement('div');

  container.classList.add(ELEMENT_IMAGE_CONTINATER);

  if (!imageRef && isTypeMinimal) {
    return null;
  }

  if (videoRef) {
    const video = videoRef.cloneNode(true) as HTMLVideoElement;
    const button = document.createElement('button');
    const setButtonPlay = () => {
      button.setAttribute('aria-label', 'Pause');
      button.innerHTML = AssetIcon.PAUSE;
      video.play();
    };
    const setButtonPause = () => {
      button.setAttribute('aria-label', 'Play');
      button.innerHTML = AssetIcon.PLAY;
      video.pause();
    };

    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      video.paused ? setButtonPlay() : setButtonPause();
    });

    container.appendChild(video);
    container.appendChild(button);
    setButtonPlay();
  }

  if (!videoRef && imageRef) {
    const image = imageRef.cloneNode(true) as HTMLImageElement;
    container.appendChild(image);
  }

  if (!imageRef && !videoRef && !isTypeMinimal) {
    container.appendChild(makeDefaultImage());
  }

  return container;
};

export default {
  CreateElement: CreateImageContainerElement,
  Styles: STYLES_HERO_ELEMENT_IMAGE_CONTAINER,
};
