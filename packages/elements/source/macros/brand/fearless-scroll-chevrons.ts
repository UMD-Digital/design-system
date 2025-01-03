import { token } from '@universityofmaryland/web-styles-library';

const ICON_CHEVRON_BIG = `<svg width="252" height="306" aria-hidden="true" viewBox="0 0 252 306" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M126 0H0L126 152.706L0 305.411H126L252 152.706L126 0Z" /></svg>`;
const ICON_CHEVRON_SMALL = `<svg width="144" height="202" aria-hidden="true"  viewBox="0 0 144 202" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60.3972 0H0L83.6028 100.765L0 201.529H60.3972L144 100.765L60.3972 0Z" /></svg>`;

const ELEMENT_ANIMATION_BRAND_LOGO = 'brand-logo-container';
const ELEMENT_FIRST_CHEVRON = 'brand-logo-first-chevron';
const ELEMENT_SECOND_CHEVRON = 'brand-logo-second-chevron';
const ELEMENT_THIRD_CHEVRON = 'brand-logo-third-chevron';

const FirstChevronStyles = `
  @keyframes chevron-one {
    from { transform: translateX(-80%); }
    to { transform: translateX(40%); }
  }

  .${ELEMENT_FIRST_CHEVRON} {
    top: 0;
    transform: translateX(-80%);
  }

  .${ELEMENT_FIRST_CHEVRON} svg {
    fill: ${token.color.gold};
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_FIRST_CHEVRON} {
        transform: translateX(40%);
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
    from { transform: translateX(-40%); }
    to { transform: translateX(24%); }
  }

  .${ELEMENT_SECOND_CHEVRON} {
    top: 10%;
    z-index: 99;
    transform: translateX(-40%);
  }

  @media (${token.media.queries.highDef.min}) {
    .${ELEMENT_SECOND_CHEVRON} {
       top: 95px;
    }
  }

  .${ELEMENT_SECOND_CHEVRON} svg {
    fill: ${token.color.red};
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_SECOND_CHEVRON} {
        transform: translateX(24%);
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
    from { transform: translateX(-30%); }
    to { transform: translateX(60%); }
  }

  .${ELEMENT_THIRD_CHEVRON} {
    top: 25%;
    transform: translateX(-30%);
  }

  @media (${token.media.queries.highDef.min}) {
    .${ELEMENT_THIRD_CHEVRON} {
       top: 195px;
    }
  }

  .${ELEMENT_THIRD_CHEVRON} svg {
    fill: ${token.color.black};
  }

  @media (prefers-reduced-motion: no-preference) {
    @supports (animation-timeline: view()) {
      .${ELEMENT_THIRD_CHEVRON} {
        transform: translateX(60%);
        animation: chevron-three forwards;
        animation-timeline: view();
        animation-range-start: 0;
        animation-range-end: 100vh;
      }
    }
  }
`;

const STYLES_ANIMATION_BRAND_LOGO = `
  .${ELEMENT_ANIMATION_BRAND_LOGO} {
    position: relative;
    height: 50vw;
    width: 100vw;
  }

  .${ELEMENT_ANIMATION_BRAND_LOGO} > * {
    position: absolute;
    height: 100%;
    right: 0;
    transform: none;
  }

  .${ELEMENT_SECOND_CHEVRON} svg,
  .${ELEMENT_THIRD_CHEVRON} svg {
    height: 10vw;
    width: 8.2vw;
  }

  @media (${token.media.queries.highDef.min}) {
    .${ELEMENT_SECOND_CHEVRON} svg,
    .${ELEMENT_THIRD_CHEVRON} svg {
      height: 306px;
      width: 252px;
    }
  }

  .${FirstChevronStyles} svg {
    height: 7vw;
    width: 5vw;
  }

  @media (${token.media.queries.highDef.min}) {
    .${FirstChevronStyles} svg {
      height: 202px;
      width: 144px;
    }
  }

  ${FirstChevronStyles} 
  ${SecondChevronStyles} 
  ${ThirdChevronStyles} 
`;

const CreateFearlessScrollChevrons = () =>
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

    return {
      element: container,
      styles: STYLES_ANIMATION_BRAND_LOGO,
    };
  })();

export default CreateFearlessScrollChevrons;
