import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { STYLES_IMAGE, CreateImage } from './image';
import { STYLES_WRAPPER, CreateWrapper } from './wrapper';
import { HeroType } from '../index';
import { NAMING, ELEMENTS, VARIABLES } from '../globals';

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;

const {
  DEFAULT_ATTR,
  STACKED_ATTR,
  OVERLAY_ATTR,
  MINIMAL_ATTR,
  DARK_ATTR,
  LIGHT_ATTR,
  MD_ATTR,
  TEXT_ALIGN_CENTER,
} = NAMING;
const {
  TYPE_DEFAULT,
  TYPE_STACKED,
  TYPE_MINIMAL,
  TYPE_OVERLAY,
  ATTRIBUTE_THEME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_TEXT_ALIGN,
} = VARIABLES;
const { HERO_CONTAINER } = ELEMENTS;

const HERO_LOCK = 'umd-hero-lock';

const StackDefaultOverwrite = `
  .${HERO_CONTAINER}${DEFAULT_ATTR} {
    height: 80vh;
    max-height: 800px;
  }

  .${HERO_CONTAINER}${DEFAULT_ATTR} * {
    color: ${Colors.white};
  }

  .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_LOCK} {
    padding-bottom: ${Spacing.md};
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

  .${HERO_LOCK} {
    height: 100%;
    position: relative;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_LOCK}`]: Lock['.base'],
    },
  })}

  ${StackDefaultOverwrite}
  ${StackTypeOverwrite}
  ${OverlayTypeOverwrite}
  ${MinimalTypeOverwrite}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CONTAINER}
  ${STYLES_WRAPPER}
  ${STYLES_IMAGE}
`;

export const CreateShadowDom = ({ element }: { element: HeroType }) => {
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = CreateWrapper({ element });
  const image = CreateImage({ element });

  console.log(element._type);

  container.classList.add(HERO_CONTAINER);
  container.setAttribute(ATTRIBUTE_TYPE, element._type);
  container.setAttribute(ATTRIBUTE_THEME, element._theme);
  container.setAttribute(ATTRIBUTE_TEXT_ALIGN, element._textAlignment);

  lock.classList.add(HERO_LOCK);
  lock.appendChild(wrapper);

  container.appendChild(image);
  container.appendChild(lock);

  return container;
};
