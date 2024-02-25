import { Tokens } from '@universityofmaryland/variables';
import { STYLES_BODY, CreateBody } from './body';
import { HeroType } from '../index';
import { NAMING, ELEMENTS, VARIABLES } from '../globals';

const { Colors } = Tokens;

const {
  DEFAULT_ATTR,
  TEXT_ALIGN_CENTER,
  STACKED_ATTR,
  OVERLAY_ATTR,
  MINIMAL_ATTR,
  DARK_ATTR,
  LIGHT_ATTR,
  MD_ATTR,
} = NAMING;
const {
  TYPE_DEFAULT,
  TYPE_STACKED,
  TYPE_MINIMAL,
  TYPE_OVERLAY,
  ATTRIBUTE_THEME,
  ATTRIBUTE_TYPE,
} = VARIABLES;
const { HERO_CONTAINER } = ELEMENTS;

const HERO_WRAPPER = 'umd-hero-wrapper';
const HERO_WRAPPER_CHILD = 'umd-hero-child';

const StackDefaultOverwrite = `
  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_WRAPPER} {
    display: flex;
    align-items: flex-end;
  }

  .${HERO_CONTAINER}${TEXT_ALIGN_CENTER} .${HERO_WRAPPER} {
    justify-content: center;
    text-align: center;
  }
`;

const StackTypeOverwrite = `
  .${HERO_CONTAINER}${STACKED_ATTR} {

  }

  .${HERO_CONTAINER}${STACKED_ATTR}${DARK_ATTR} {

  }

  .${HERO_CONTAINER}${STACKED_ATTR}${LIGHT_ATTR} {

  }

  .${HERO_CONTAINER}${STACKED_ATTR}${MD_ATTR} {

  }
`;

const OverlayTypeOverwrite = `
  .${HERO_CONTAINER}${OVERLAY_ATTR} {

  }

  .${HERO_CONTAINER}${OVERLAY_ATTR}${DARK_ATTR} {

  }

  .${HERO_CONTAINER}${OVERLAY_ATTR}${LIGHT_ATTR} {

  }

  .${HERO_CONTAINER}${OVERLAY_ATTR}${MD_ATTR} {

  }
`;

const MinimalTypeOverwrite = `
  .${HERO_CONTAINER}${MINIMAL_ATTR} {

  }

  .${HERO_CONTAINER}${MINIMAL_ATTR}${DARK_ATTR} {

  }

  .${HERO_CONTAINER}${MINIMAL_ATTR}${LIGHT_ATTR} {

  }

  .${HERO_CONTAINER}${MINIMAL_ATTR}${MD_ATTR} {

  }
`;

export const STYLES_WRAPPER = `
  .${HERO_WRAPPER} {
    position: relative;
    height: 100%;
  }

  .${HERO_WRAPPER_CHILD} {

  }

  ${STYLES_BODY}
  ${StackDefaultOverwrite}
  ${StackTypeOverwrite}
  ${OverlayTypeOverwrite}
  ${MinimalTypeOverwrite}
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
