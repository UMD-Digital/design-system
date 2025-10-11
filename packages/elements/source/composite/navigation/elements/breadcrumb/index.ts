import * as token from '@universityofmaryland/web-styles-library/token';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library/styles';
import { animationLinkSpan } from '@universityofmaryland/web-utilities-library/animation';

export interface BreadcrumbProps {
  isThemeDark?: boolean;
  linkListSlot: HTMLElement;
}

const Attributes = {
  names: {
    theme: 'theme',
  },
  values: {
    theme: {
      DARK: 'dark',
    },
  },
};

const ELEMENT_NAME = 'umd-element-breadcrumb';

const IS_THEME_DARK = `[${Attributes.names.theme}=${Attributes.values.theme.DARK}]`;

const ELEMENT_CONTAINER = 'breadcrumb-container';
const ELEMENT_PATH = 'breadcrumb-path';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_PATH = `${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_PATH}`;

const OverwriteThemeStyles = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_PATH} + *::before {
    background-color: ${token.color.gray.dark};
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_PATH}:not(:last-child)`]:
        animation.line.slideUnderGrayDarkRed,
    },
  })}
`;

const PathStyles = `
  .${ELEMENT_PATH}::-webkit-scrollbar { 
    display: none;
  }

  .${ELEMENT_PATH}:last-child {
    color: ${token.color.black};
  }

  .${ELEMENT_PATH}:not(:last-child) {
    margin-right: 14px;
  }

  .${ELEMENT_PATH} + *::before {
    content: '';
    display: inline-block;
    height: 14px;
    background-color: ${token.color.gray.dark};
    left: -8px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(15deg);
    width: 1px;
  }
`;

const ContainerStyles = `
  .${ELEMENT_CONTAINER} {
    display: flex;
    padding-right: 24px;
    font-size: 12px;
    padding-bottom: 1px;
    overflow-x: auto;
    scrollbar-width: none;
    white-space: nowrap;
    mask-image: linear-gradient(90deg, ${
      token.color.white
    } calc(100% - 24px), transparent);
  }

  .${ELEMENT_CONTAINER} * {
    color: ${token.color.gray.mediumAA};
    position: relative;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CONTAINER} a:not(:last-child)`]:
        animation.line.slideUnderGrayRed,
    },
  })}
`;

export default ({ isThemeDark, linkListSlot }: BreadcrumbProps) => {
  const links = linkListSlot.querySelectorAll('a') as NodeListOf<HTMLElement>;
  let styles = `
    ${ContainerStyles}
    ${PathStyles}
    ${OverwriteThemeStyles}
  `;

  if (isThemeDark)
    linkListSlot.setAttribute(
      Attributes.names.theme,
      Attributes.values.theme.DARK,
    );
  linkListSlot.classList.add(ELEMENT_CONTAINER);

  for (const linkElement of links) {
    linkElement.classList.add(ELEMENT_PATH);
    animationLinkSpan({
      element: linkElement,
    });
  }

  return { element: linkListSlot, styles };
};
