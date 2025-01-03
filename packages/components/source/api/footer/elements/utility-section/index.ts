import {
  animation,
  token,
  layout,
  typography,
} from '@universityofmaryland/web-elements-styles';
import { Markup, Styles } from 'utilities';
import {
  BREAKPOINTS,
  ELEMENTS,
  VARIABLES,
  SLOTS,
  REFERENCES,
} from '../../globals';

const { convertJSSObjectToStyles } = Styles;

const { LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { UTILITY } = SLOTS;
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

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} a`]:
      animation.line.slideUnderWhite,
    },
  })}

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a {
    color: ${token.color.black};
  }

  ${convertJSSObjectToStyles({
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

  ${convertJSSObjectToStyles({
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

  ${convertJSSObjectToStyles({
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

export const CreateUtility = ({ element }: { element: HTMLElement }) => {
  const slot = element.querySelector(`[slot="${UTILITY}"]`);
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const copyRight = document.createElement('p');

  container.classList.add(UTILITY_CONTAINER);
  wrapper.classList.add(UTILITY_CONTAINER_LOCK);

  if (slot) {
    const slottedLinks = Array.from(
      slot.querySelectorAll(`a`),
    ) as HTMLAnchorElement[];

    slottedLinks.forEach((link) => {
      Markup.modify.AnimationLinkSpan({ element: link });
      link.classList.add(UTILITY_CONTAINER_LINK);

      wrapper.appendChild(link);
    });
  }

  requiredSubLinks.forEach((link) =>
    wrapper.appendChild(Markup.create.Node.linkWithSpan(link)),
  );
  copyRight.classList.add(UTILITY_CONTAINER_LINK);
  copyRight.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;
  wrapper.appendChild(copyRight);
  container.appendChild(wrapper);

  return container;
};
