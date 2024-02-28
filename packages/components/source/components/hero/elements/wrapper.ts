import { Tokens } from '@universityofmaryland/variables';
import { STYLES_BODY, CreateBody } from './body';
import { HeroType } from '../index';
import { NAMING, ELEMENTS, BREAKPOINTS } from '../globals';

const { Spacing, Colors } = Tokens;

const {
  DEFAULT_ATTR,
  TEXT_ALIGN_CENTER,
  STACKED_ATTR,
  OVERLAY_ATTR,
  MINIMAL_ATTR,
  LOGO_ATTR,
  DARK_ATTR,
  MD_ATTR,
  HAS_IMAGE,
} = NAMING;
const { HERO_CONTAINER } = ELEMENTS;
const { tablet } = BREAKPOINTS;

const HERO_WRAPPER = 'umd-hero-wrapper';
const HERO_WRAPPER_CHILD = 'umd-hero-child';

// prettier-ignore
const DefaultOverwrite = `
  @container umd-hero (max-width: ${tablet - 1}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_WRAPPER} {
      margin-top: -14px;
    }
  }

  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_WRAPPER} {
    display: flex;
    align-items: flex-end;
  }

  .${HERO_CONTAINER}${TEXT_ALIGN_CENTER} .${HERO_WRAPPER} {
    justify-content: center;
    text-align: center;
  }
`;

// prettier-ignore
const LogoTypeOverwrite = `
  .${HERO_CONTAINER}${LOGO_ATTR} .${HERO_WRAPPER} {
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

// prettier-ignore
const StackTypeOverwrite = `
  .${HERO_CONTAINER}${STACKED_ATTR} .${HERO_WRAPPER} {
    padding: ${Spacing['5xl']} 0 ${Spacing['3xl']};
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

// prettier-ignore
const OverlayTypeOverwrite = `
  .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_WRAPPER} {
    padding: ${Spacing['5xl']} 0;
    display: flex;
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_WRAPPER} {
      width: 60%;
    }
  }
`;

// prettier-ignore
const MinimalTypeOverwrite = `
  .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_WRAPPER} {
    padding: ${Spacing.xl} 0;
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${MINIMAL_ATTR}${HAS_IMAGE} .${HERO_WRAPPER} {
      padding: ${Spacing['4xl']} 0;
      width: calc(50% - ${Spacing['4xl']});
    }
  }

  .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_WRAPPER_CHILD} {
    padding-left: ${Spacing.md};
    border-left: 2px solid ${Colors.red};
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${MINIMAL_ATTR}${HAS_IMAGE} .${HERO_WRAPPER_CHILD} {
      padding-left: ${Spacing.lg};
    }
  }

  .${HERO_CONTAINER}${MINIMAL_ATTR}${DARK_ATTR} .${HERO_WRAPPER_CHILD},
  .${HERO_CONTAINER}${MINIMAL_ATTR}${MD_ATTR} .${HERO_WRAPPER_CHILD} {;
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

export const CreateWrapper = ({ element }: { element: HeroType }) => {
  const wrapper = document.createElement('div');
  const childWrapper = document.createElement('div');
  const body = CreateBody({ element });

  wrapper.classList.add(HERO_WRAPPER);
  childWrapper.classList.add(HERO_WRAPPER_CHILD);
  childWrapper.appendChild(body);

  wrapper.appendChild(childWrapper);

  return wrapper;
};
