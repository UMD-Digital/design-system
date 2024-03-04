import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { STYLES_ASSET, CreateAsset } from './image';
import { STYLES_WRAPPER, CreateWrapper } from './wrapper';
import { HeroType } from '../index';
import { NAMING, ELEMENTS, VARIABLES, BREAKPOINTS } from '../globals';

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;

const {
  DEFAULT_ATTR,
  STACKED_ATTR,
  OVERLAY_ATTR,
  MINIMAL_ATTR,
  LOGO_ATTR,
  DARK_ATTR,
  LIGHT_ATTR,
  MD_ATTR,
  WHITE_ATTR,
} = NAMING;
const {
  ATTRIBUTE_THEME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_TEXT_ALIGN,
  ATTRIBUTE_HAS_IMAGE,
  ATTRIBUTE_WITHIN_LOCK,
} = VARIABLES;
const { HERO_CONTAINER } = ELEMENTS;
const { tablet, desktop } = BREAKPOINTS;

const HERO_DECLARATION = 'umd-hero-declaration';
const HERO_LOCK = 'umd-hero-lock';

// prettier-ignore
const ThemeOverwrite = `
  .${HERO_CONTAINER}${DARK_ATTR} {
    background-color: ${Colors.black};
  }

  .${HERO_CONTAINER}${DARK_ATTR} * {
    color: ${Colors.white};
  }

  .${HERO_CONTAINER}${LIGHT_ATTR} {
    background-color: ${Colors.gray.lightest};
  }

  .${HERO_CONTAINER}${LIGHT_ATTR} * {
    color: ${Colors.black};
  }

  .${HERO_CONTAINER}${MD_ATTR} {
    background-color: ${Colors.red};
  }

  .${HERO_CONTAINER}${MD_ATTR} * {
    color: ${Colors.white};
  }

  .${HERO_CONTAINER}${WHITE_ATTR} * {
    color: ${Colors.black};
  }
`;

// prettier-ignore
const DefaultOverwrite = `
  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} {
      height: 80vh;
      max-height: 800px;
    }
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} * {
      color: ${Colors.white};
    }
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${DEFAULT_ATTR} .${HERO_LOCK} {
      padding-top: ${Spacing['2xl']};
      padding-bottom: ${Spacing['2xl']};
    }
  }
`;

// prettier-ignore
const LogoTypeOverwrite = `
  .${HERO_CONTAINER}${LOGO_ATTR} {
    padding: ${Spacing['5xl']} 0 ${Spacing.lg};
  }
`;

// prettier-ignore
const StackTypeOverwrite = `
  .${HERO_CONTAINER}${STACKED_ATTR} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

// prettier-ignore
const OverlayTypeOverwrite = `
  .${HERO_CONTAINER}${OVERLAY_ATTR} {
    position: relative;
  }

  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_LOCK} {
      min-height: 640px;
      display: flex;
      align-items: center;
    }
  }

  @container umd-hero (min-width: ${desktop}px) {
    .${HERO_CONTAINER}${OVERLAY_ATTR} .${HERO_LOCK} {
      min-height: 764px;
    }
  }
`;

// prettier-ignore
const MinimalTypeOverwrite = `
  @container umd-hero (min-width: ${tablet}px) {
    .${HERO_CONTAINER}${MINIMAL_ATTR} .${HERO_LOCK} {
      min-height: 288px;
      display: flex;
      align-items: center;
    }
  }
`;

// prettier-ignore
const STYLES_CONTAINER = `
  .${HERO_DECLARATION} {
    container: umd-hero / inline-size;
  }

  .${HERO_LOCK} {
    height: 100%;
    width: 100%;
    position: relative;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${HERO_LOCK}`]: Lock['.base'],
    },
  })}

  ${ThemeOverwrite}
  ${DefaultOverwrite}
  ${StackTypeOverwrite}
  ${OverlayTypeOverwrite}
  ${MinimalTypeOverwrite}
  ${LogoTypeOverwrite}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_CONTAINER}
  ${STYLES_WRAPPER}
  ${STYLES_ASSET}
`;

export const CreateShadowDom = ({ element }: { element: HeroType }) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = CreateWrapper({ element });
  const asset = CreateAsset({ element });

  container.classList.add(HERO_CONTAINER);
  container.setAttribute(ATTRIBUTE_TYPE, element._type);
  container.setAttribute(ATTRIBUTE_THEME, element._theme);
  container.setAttribute(ATTRIBUTE_TEXT_ALIGN, element._textAlignment);

  lock.classList.add(HERO_LOCK);
  lock.appendChild(wrapper);

  if (asset) {
    container.setAttribute(ATTRIBUTE_HAS_IMAGE, '');

    if (element._withLock) {
      lock.appendChild(asset);
      container.setAttribute(ATTRIBUTE_WITHIN_LOCK, '');
    } else {
      container.appendChild(asset);
    }
  }

  container.appendChild(lock);

  declaration.classList.add(HERO_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};
