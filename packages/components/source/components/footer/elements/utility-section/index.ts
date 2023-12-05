import {
  colors,
  spacing,
  umdLock,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  BREAKPOINTS,
  ELEMENTS,
  VARIABLES,
  SLOTS,
} from 'components/footer/globals';

const UTILITY_CONTAINER = 'umd-footer-utility-container';
const UTILITY_CONTAINER_LOCK = 'umd-footer-utility-container-lock';
const UTILITY_CONTAINER_LINK = 'umd-footer-utility-container-link';

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
  
  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${UTILITY_CONTAINER_LOCK} {
      display: flex;
      align-items: center;
    }
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-top: ${spacing.sm};
    }
  }

  .${UTILITY_CONTAINER} a:hover,
  .${UTILITY_CONTAINER} a:focus {
    background-size: 100% 1px;
    color: ${colors.white};
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-left: ${spacing.sm};
      padding-left: ${spacing.sm};
      background-position: ${spacing.sm} 100%;
      border-left: 1px solid ${colors.gray.dark};
    }
  }
  
  .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} p {
    color: ${colors.white};
    display: flex;
    align-items: center;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER_LINK}`]: typography['.umd-sans-min']
    },
  })}

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} {
    background-color: ${colors.gray.light};
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} a,
  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${UTILITY_CONTAINER} p {
    color: ${colors.black};
  }
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
      const divWrapper = document.createElement('div');

      link.classList.add(UTILITY_CONTAINER_LINK);
      divWrapper.appendChild(link);
      wrapper.appendChild(divWrapper);
    });
  }
  requiredSubLinks.forEach((link) => wrapper.appendChild(createSubLink(link)));
  copyRight.classList.add(UTILITY_CONTAINER_LINK);
  copyRight.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;
  wrapper.appendChild(copyRight);
  container.appendChild(wrapper);

  return container;
};
