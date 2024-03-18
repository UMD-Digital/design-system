import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { STYLES_ASSET, CreateAsset } from './assets';
import { STYLES_WRAPPER, CreateWrapper } from './wrapper';
import { REFERENCES, ELEMENTS, VARIABLES, BREAKPOINTS } from '../globals';
import { UMDHeroElement } from '../index';

const { Lock } = Layout;
const { Colors, Spacing } = Tokens;

const { TABLET, DESKTOP } = BREAKPOINTS;
const { HERO_CONTAINER } = ELEMENTS;
const {
  ELEMENT_NAME,
  ATTRIBUTE_THEME,
  ATTRIBUTE_TYPE,
  ATTRIBUTE_TEXT_ALIGN,
  ATTRIBUTE_HAS_IMAGE,
  ATTRIBUTE_WITHIN_LOCK,
  ATTRIBUTE_INTERIOR,
} = VARIABLES;
const {
  IS_TYPE_DEFAULT,
  IS_TYPE_STACKED,
  IS_TYPE_OVERLAY,
  IS_TYPE_MINIMAL,
  IS_TYPE_LOGO,
  IS_THEME_DARK,
  IS_THEME_LIGHT,
  IS_THEME_MARYLAND,
  IS_THEME_WHITE,
  IS_INTERIOR,
} = REFERENCES;

const HERO_DECLARATION = 'umd-hero-declaration';
const HERO_LOCK = 'umd-hero-lock';

// prettier-ignore
const ThemeOverwrite = `
  .${HERO_CONTAINER}${IS_THEME_DARK} {
    background-color: ${Colors.black};
  }

  .${HERO_CONTAINER}${IS_THEME_DARK} * {
    color: ${Colors.white};
  }

  .${HERO_CONTAINER}${IS_THEME_LIGHT} {
    background-color: ${Colors.gray.lightest};
  }

  .${HERO_CONTAINER}${IS_THEME_LIGHT} * {
    color: ${Colors.black};
  }

  .${HERO_CONTAINER}${IS_THEME_MARYLAND} {
    background-color: ${Colors.red};
  }

  .${HERO_CONTAINER}${IS_THEME_MARYLAND} * {
    color: ${Colors.white};
  }

  .${HERO_CONTAINER}${IS_THEME_WHITE} * {
    color: ${Colors.black};
  }
`;

// prettier-ignore
const DefaultOverwrite = `
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} {
      height: 75vh;
      min-height: 480px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} {
      min-height: 720px;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} * {
      color: ${Colors.white};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT} .${HERO_LOCK} {
      padding-top: ${Spacing['2xl']};
      padding-bottom: ${Spacing['2xl']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_DEFAULT}${IS_INTERIOR} {
      min-height: 400px;
      height: 40vh;
    }
  }
`;

// prettier-ignore
const LogoTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_LOGO} {
    padding: ${Spacing['5xl']} 0 ${Spacing.lg};
  }
`;

// prettier-ignore
const StackTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_STACKED} {
    display: flex;
    flex-direction: column-reverse;
  }
`;

// prettier-ignore
const OverlayTypeOverwrite = `
  .${HERO_CONTAINER}${IS_TYPE_OVERLAY} {
    position: relative;
  }

  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_LOCK} {
      min-height: 640px;
      display: flex;
      align-items: center;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${DESKTOP}px) {
    .${HERO_CONTAINER}${IS_TYPE_OVERLAY} .${HERO_LOCK} {
      min-height: 764px;
    }
  }
`;

// prettier-ignore
const MinimalTypeOverwrite = `
  @container ${ELEMENT_NAME} (min-width: ${TABLET}px) {
    .${HERO_CONTAINER}${IS_TYPE_MINIMAL} .${HERO_LOCK} {
      min-height: 288px;
      display: flex;
      align-items: center;
    }
  }
`;

// prettier-ignore
const STYLES_CONTAINER = `
  .${HERO_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
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

export const CreateShadowDom = ({ element }: { element: UMDHeroElement }) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = CreateWrapper({ element });
  const asset = CreateAsset({ element });

  container.classList.add(HERO_CONTAINER);
  container.setAttribute(ATTRIBUTE_TYPE, element._type);
  container.setAttribute(ATTRIBUTE_THEME, element._theme);
  container.setAttribute(ATTRIBUTE_TEXT_ALIGN, element._textAlignment);

  if (element._interior) container.setAttribute(ATTRIBUTE_INTERIOR, '');

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
