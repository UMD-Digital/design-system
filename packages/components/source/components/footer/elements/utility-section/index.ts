import {
  colors,
  spacing,
  umdLock,
  typography,
  animatedLinks,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  BREAKPOINTS,
  ELEMENTS,
  VARIABLES,
  SLOTS,
} from 'components/footer/globals';
import { CheckForAnimationLinkSpan, CreateLinkWithSpan } from 'helpers/ui';

const UTILITY_CONTAINER = 'umd-footer-utility-container';
const UTILITY_CONTAINER_LOCK = 'umd-footer-utility-container-lock';
const UTILITY_CONTAINER_LINK = 'umd-footer-utility-container-link';

// prettier-ignore
const LinkStyles = `
  .${UTILITY_CONTAINER} a {
    display: block;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} a`]:
        animatedLinks['.umd-slidein-underline-white'],
    },
  })}

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} a {
    color: ${colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} a`]:
        animatedLinks['.umd-slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const TextStyles = `
  .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} p {
    color: ${colors.white};
    display: flex;
    align-items: center;
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} p {
    color: ${colors.black};
  }
`;

// prettier-ignore
export const UtilityContainerStyles = `
  .${UTILITY_CONTAINER} {
    padding: ${spacing.sm} 0;
    background-color: ${colors.gray.darker};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER_LOCK}`]: umdLock['.umd-lock']
    },
  })}

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${UTILITY_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} *`]: typography['.umd-sans-min']
    },
  })}

  @media (max-width: ${BREAKPOINTS.large - 1}px) {
    .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-top: ${spacing.sm};
    }
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-left: ${spacing.sm};
      padding-left: ${spacing.sm};
      background-position: ${spacing.sm} 100%;
      border-left: 1px solid ${colors.gray.dark};
    }
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} {
    background-color: ${colors.gray.light};
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
  const slot = element.querySelector(`[slot="${SLOTS.UTILITY}"]`);
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
