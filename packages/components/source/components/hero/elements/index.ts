import { Reset } from 'helpers/styles';
import { STYLES_BODY, CreateBody } from './body';
import { HeroType } from '../index';
import { VARIABLES, ELEMENTS } from '../globals';

const HERO_CONTAINER = `umd-hero-container`;

const DEFAULT_ATTR = `[${VARIABLES.ATTRIBUTE_TYPE}='${VARIABLES.TYPE_DEFAULT}']`;
const STACKED_ATTR = `[${VARIABLES.ATTRIBUTE_TYPE}='${VARIABLES.TYPE_STACKED}']`;
const OVERLAY_ATTR = `[${VARIABLES.ATTRIBUTE_TYPE}='${VARIABLES.TYPE_OVERLAY}']`;
const MINIMAL_ATTR = `[${VARIABLES.ATTRIBUTE_TYPE}='${VARIABLES.TYPE_MINIMAL}']`;

const DARK_ATTR = `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_DARK}']`;
const LIGHT_ATTR = `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_LIGHT}']`;
const MD_ATTR = `[${VARIABLES.ATTRIBUTE_THEME}='${VARIABLES.THEME_MARYLAND}']`;

const StackDefaultOverwrite = `
  .${HERO_CONTAINER}${DEFAULT_ATTR} {

  }

  .${HERO_CONTAINER}${DEFAULT_ATTR}${DARK_ATTR} {

  }

  .${HERO_CONTAINER}${DEFAULT_ATTR}${LIGHT_ATTR} {

  }

  .${HERO_CONTAINER}${DEFAULT_ATTR}${MD_ATTR} {

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

const STYLES_CONTAINER = `
  .${HERO_CONTAINER} {
    container: umd-hero / inline-size;
  }

  ${StackTypeOverwrite}
  ${StackDefaultOverwrite}
  ${OverlayTypeOverwrite}
  ${MinimalTypeOverwrite}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CONTAINER}
  ${STYLES_BODY}
`;

export const CreateShadowDom = ({ element }: { element: HeroType }) => {
  const container = document.createElement('div');
  const body = CreateBody({ element });

  container.classList.add(HERO_CONTAINER);
  container.setAttribute('data-type', element._type);
  container.setAttribute('data-theme', element._theme);

  container.appendChild(body);

  return container;
};
