import {
  animation,
  token,
  layout,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../../globals';

const { LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

const UTILITY_CONTAINER = 'umd-footer-utility-container';
const UTILITY_CONTAINER_LOCK = 'umd-footer-utility-container-lock';
const UTILITY_CONTAINER_LINK = 'umd-footer-utility-container-link';

// prettier-ignore
const LinkStyles = `
  .${UTILITY_CONTAINER} a {
    display: block;
  }

  .${UTILITY_CONTAINER} a span {
    color: ${token.color.gray.light};
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} a`]:
      animation.line.slideUnderWhite,
    },
  })}

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a {
    color: ${token.color.black};
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a`]:
      animation.line.slideUnderBlack,
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} p {
    color: ${token.color.gray.light};
    display: flex;
    align-items: center;
  }

  .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} a {
    color: ${token.color.gray.light};
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} p {
    color: ${token.color.black};
  }
`;

// prettier-ignore
export const UtilityContainerStyles = `
  .${UTILITY_CONTAINER} {
    padding: ${token.spacing.sm} 0;
    background-color: ${token.color.gray.darker};
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER_LOCK}`]: layout.space.horizontal.max,
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${UTILITY_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
    }
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} *`]: typography.sans.smaller
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-top: ${token.spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-left: ${token.spacing.sm};
      padding-left: ${token.spacing.sm};
      background-position: ${token.spacing.sm} 100%;
      border-left: 1px solid ${token.color.gray.dark};
    }
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} {
    background-color: ${token.color.gray.light};
  }

  ${LinkStyles}
  ${TextStyles}
`;

const requiredSubLinks = [
  {
    title: 'Privacy Policy',
    url: 'https://www.umd.edu/privacy-notice',
  },
  {
    title: 'Web Accessibility',
    url: 'https://www.umd.edu/web-accessibility',
  },
];

const createSubLink = ({ title, url }: { title: string; url: string }) => {
  const wrapper = document.createElement('div');
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.innerText = title;
  link.classList.add(UTILITY_CONTAINER_LINK);

  wrapper.appendChild(link);
  return wrapper;
};

export interface UtilityProps {
  slotUtilityLinks?: HTMLElement | null;
}

export default ({ slotUtilityLinks }: UtilityProps) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const copyRight = document.createElement('p');

  container.classList.add(UTILITY_CONTAINER);
  wrapper.classList.add(UTILITY_CONTAINER_LOCK);

  if (slotUtilityLinks) {
    const slottedLinks = Array.from(
      slotUtilityLinks.querySelectorAll(`a`),
    ) as HTMLAnchorElement[];

    slottedLinks.forEach((link) => {
      Utils.markup.modify.animationLinkSpan({ element: link });
      link.classList.add(UTILITY_CONTAINER_LINK);

      wrapper.appendChild(link);
    });
  }

  requiredSubLinks.forEach((link) =>
    wrapper.appendChild(Utils.markup.create.linkWithSpan(link)),
  );
  copyRight.classList.add(UTILITY_CONTAINER_LINK);
  copyRight.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;
  wrapper.appendChild(copyRight);
  container.appendChild(wrapper);

  return container;
};
