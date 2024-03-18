import {
  Animations,
  Tokens,
  Layout,
  Typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { CheckForAnimationLinkSpan, CreateLinkWithSpan } from 'helpers/ui';
import { BREAKPOINTS, ELEMENTS, VARIABLES, SLOTS } from '../../globals';

const { Colors, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { Lock } = Layout;

const { large } = BREAKPOINTS;
const { ELEMENT_NAME, THEME_OPTION_LIGHT } = VARIABLES;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { UTILITY } = SLOTS;

const UTILITY_CONTAINER = 'umd-footer-utility-container';
const UTILITY_CONTAINER_LOCK = 'umd-footer-utility-container-lock';
const UTILITY_CONTAINER_LINK = 'umd-footer-utility-container-link';

// prettier-ignore
const LinkStyles = `
  .${UTILITY_CONTAINER} a {
    display: block;
  }

  .${UTILITY_CONTAINER} a span {
    color: ${Colors.gray.light};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} a`]:
      LinkLineSlide['.slidein-underline-white'],
    },
  })}

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} a {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} a`]:
      LinkLineSlide['.slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} p {
    color: ${Colors.gray.light};
    display: flex;
    align-items: center;
  }

  .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} a {
    color: ${Colors.gray.light};
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} p {
    color: ${Colors.black};
  }
`;

// prettier-ignore
export const UtilityContainerStyles = `
  .${UTILITY_CONTAINER} {
    padding: ${Spacing.sm} 0;
    background-color: ${Colors.gray.darker};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER_LOCK}`]: Lock['.base']
    },
  })}

  @container ${ELEMENT_NAME} (min-width: ${large}px) {
    .${UTILITY_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} *`]: Typography.SansSmaller
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${large - 1}px) {
    .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-top: ${Spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${large}px) {
    .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-left: ${Spacing.sm};
      padding-left: ${Spacing.sm};
      background-position: ${Spacing.sm} 100%;
      border-left: 1px solid ${Colors.gray.dark};
    }
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} {
    background-color: ${Colors.gray.light};
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
      CheckForAnimationLinkSpan({ element: link });
      link.classList.add(UTILITY_CONTAINER_LINK);

      wrapper.appendChild(link);
    });
  }

  requiredSubLinks.forEach((link) =>
    wrapper.appendChild(CreateLinkWithSpan(link)),
  );
  copyRight.classList.add(UTILITY_CONTAINER_LINK);
  copyRight.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;
  wrapper.appendChild(copyRight);
  container.appendChild(wrapper);

  return container;
};
