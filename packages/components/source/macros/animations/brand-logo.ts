import { Tokens } from '@universityofmaryland/variables';

type TypeAnimationBrandLogoProps = {};

const { Colors, Queries } = Tokens;

const ICON_CHEVRON_BIG = `<svg width="252" height="306" viewBox="0 0 252 306" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M126 0H0L126 152.706L0 305.411H126L252 152.706L126 0Z" /></svg>`;
const ICON_CHEVRON_SMALL = `<svg width="144" height="202" viewBox="0 0 144 202" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60.3972 0H0L83.6028 100.765L0 201.529H60.3972L144 100.765L60.3972 0Z" /></svg>`;

const ELEMENT_ANIMATION_BRAND_LOGO = 'brand-logo-container';
const ELEMENT_FIRST_CHEVRON = 'brand-logo-first-chevron';
const ELEMENT_SECOND_CHEVRON = 'brand-logo-second-chevron';
const ELEMENT_THIRD_CHEVRON = 'brand-logo-third-chevron';

const FirstChevronStyles = `
  @keyframes chevron-one {
    from { transform: translateX(30%); }
    to { transform: translateX(130%); }
  }

  .${ELEMENT_FIRST_CHEVRON} {
    top: 0;
    transform: translateX(30%);
  }

  .${ELEMENT_FIRST_CHEVRON} svg {
    fill: ${Colors.gold};
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_FIRST_CHEVRON} {
        transform: translateX(130%);
        animation: chevron-one forwards;
        animation-timeline: view();
        animation-range-start: cover;
        animation-range-end: contain;
      }
    }
  }
`;

const SecondChevronStyles = `
  @keyframes chevron-two {
    from { transform: translate(-30%, -50%); }
    to { transform: translate(30%, -50%); }
  }

  .${ELEMENT_SECOND_CHEVRON} {
    top: 50%;
    z-index: 99;
    transform: translate(-30%, -50%);
  }

  .${ELEMENT_SECOND_CHEVRON} svg {
    fill: ${Colors.red};
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_SECOND_CHEVRON} {
        transform: transform: translate(30%, -50%);
        animation: chevron-two forwards;
        animation-timeline: view();
        animation-range-start: cover;
       animation-range-end: contain;
      }
    }
  }
`;

const ThirdChevronStyles = `
  @keyframes chevron-three {
    from { transform: translateX(-50%); }
    to { transform: translateX(80%); }
  }

  .${ELEMENT_THIRD_CHEVRON} {
    top: 45%;
    transform: translateX(-50%);
  }

  .${ELEMENT_THIRD_CHEVRON} svg {
    fill: ${Colors.black};
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_THIRD_CHEVRON} {
        transform: translateX(80%);
        animation: chevron-three forwards;
        animation-timeline: view();
        animation-range-start: cover;
        animation-range-end: contain;
      }
    }
  }
`;

const STYLES_ANIMATION_BRAND_LOGO = `
  .${ELEMENT_ANIMATION_BRAND_LOGO} {
    position: relative;
    width: 278px;
    height: 514px;
  }

  .${ELEMENT_ANIMATION_BRAND_LOGO} > * {
    position: absolute;
    left: 0;
  }

  ${FirstChevronStyles} 
  ${SecondChevronStyles} 
  ${ThirdChevronStyles} 
`;

const CreateAnimationBrandLogo = ({}: TypeAnimationBrandLogoProps) =>
  (() => {
    const container = document.createElement('div');
    const first = document.createElement('div');
    const second = document.createElement('div');
    const third = document.createElement('div');

    first.classList.add(ELEMENT_FIRST_CHEVRON);
    first.innerHTML = ICON_CHEVRON_SMALL;

    second.classList.add(ELEMENT_SECOND_CHEVRON);
    second.innerHTML = ICON_CHEVRON_BIG;

    third.classList.add(ELEMENT_THIRD_CHEVRON);
    third.innerHTML = ICON_CHEVRON_BIG;

    container.classList.add(ELEMENT_ANIMATION_BRAND_LOGO);
    container.appendChild(first);
    container.appendChild(second);
    container.appendChild(third);
    return container;
  })();

export default {
  CreateElement: CreateAnimationBrandLogo,
  Styles: STYLES_ANIMATION_BRAND_LOGO,
};
