import { Tokens } from '@universityofmaryland/variables';
import { STYLES_BODY, CreateBody } from './body';
import { REFERENCES, ELEMENTS, BREAKPOINTS, VARIABLES } from '../globals';
import { UMDHeroElement } from '../index';

const { Spacing, Colors } = Tokens;

const { TABLET, DESKTOP } = BREAKPOINTS;
const { HERO_CONTAINER, HERO_EYEBROW } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const {
  IS_TYPE_DEFAULT,
  IS_TEXT_CENTER,
  IS_TYPE_STACKED,
  IS_TYPE_OVERLAY,
  IS_TYPE_MINIMAL,
  IS_TYPE_LOGO,
  IS_THEME_DARK,
  IS_THEME_MARYLAND,
  IS_WITH_IMAGE,
} = REFERENCES;

const HERO_WRAPPER = 'umd-hero-wrapper';
const HERO_WRAPPER_CHILD = 'umd-hero-child';

// prettier-ignore
const DefaultOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_WRAPPER} {
    display: flex;
    align-items: flex-end;
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_WRAPPER} {
      padding-top: ${Spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${TABLET - 1}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_WRAPPER}:has(.${HERO_EYEBROW}) {
      margin-top: -14px;
      padding-top: 0;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_WRAPPER} {
      max-width: 736px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_WRAPPER} {
      max-width: 808px;
    }
  }

  .${HERO_CONTAINER}${IS_TEXT_CENTER} .${HERO_WRAPPER} {
    justify-content: center;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 928px;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TEXT_CENTER} .${HERO_WRAPPER} {
      width: 80vw;
    }
  }
`;

// prettier-ignore
const LogoTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_LOGO} .${HERO_WRAPPER} {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

// prettier-ignore
const StackTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_WRAPPER} {
    padding: ${Spacing['5xl']} 0 ${Spacing.lg};
    display: flex;
    justify-content: center;
    text-align: center;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_STACKED} .${HERO_WRAPPER} {
      padding: ${Spacing['5xl']} 0 ${Spacing['3xl']};
    }
  
  }
`;

// prettier-ignore
const OverlayTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_WRAPPER} {
    padding: ${Spacing.lg} 0;
    display: flex;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_WRAPPER} {
      width: 60%;
      padding: ${Spacing['5xl']} 0;
    }
  }
`;

// prettier-ignore
const MinimalTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_WRAPPER} {
    padding: ${Spacing.xl} 0;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_MINIMAL}${IS_WITH_IMAGE} .${HERO_WRAPPER} {
      padding: ${Spacing['4xl']} 0;
      width: calc(50% - ${Spacing['4xl']});
    }
  }

  .${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_WRAPPER_CHILD} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.red};
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_MINIMAL}${IS_TEXT_CENTER} .${HERO_WRAPPER_CHILD} {
      padding-left: ${Spacing.lg};
    }
  }

  .${HERO_CONTAINER}${IS_TYPE_MINIMAL}${IS_THEME_DARK} .${HERO_WRAPPER_CHILD},
  .${HERO_CONTAINER}${IS_TYPE_MINIMAL}${IS_THEME_MARYLAND} .${HERO_WRAPPER_CHILD} {;
    border-left: 2px solid ${Colors.gold};
  }
`;

// prettier-ignore
export const STYLES_WRAPPER = `
  .${HERO_WRAPPER}  {
    position: relative;
    height: 100%;
  }

  ${STYLES_BODY}
  ${DefaultOverwrite}
  ${StackTypeOverwrite}
  ${OverlayTypeOverwrite}
  ${MinimalTypeOverwrite}
  ${LogoTypeOverwrite}
`;

export const CreateWrapper = ({ element }: { element: UMDHeroElement }) => {
  const wrapper = document.createElement('div');
  const childWrapper = document.createElement('div');
  const body = CreateBody({ element });

  wrapper.classList.add(HERO_WRAPPER);
  childWrapper.classList.add(HERO_WRAPPER_CHILD);
  childWrapper.appendChild(body);

  wrapper.appendChild(childWrapper);

  return wrapper;
};
