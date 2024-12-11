import {
  Animations,
  Tokens,
  Layout,
  Typography,
} from '@universityofmaryland/variables';
import { MarkupCreate, MarkupModify, Styles } from 'utilities';
import {
  BREAKPOINTS,
  ELEMENTS,
  VARIABLES,
  SLOTS,
  REFERENCES,
} from '../../globals';

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { LockMax } = Layout;

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
    color: ${Colors.gray.light};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER} a`]:
      Link.LineSlideUnder.white,
    },
  })}

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a {
    color: ${Colors.black};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a`]:
      Link.LineSlideUnder.black,
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

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} p {
    color: ${Colors.black};
  }
`;

// prettier-ignore
export const UtilityContainerStyles = `
  .${UTILITY_CONTAINER} {
    padding: ${Spacing.sm} 0;
    background-color: ${Colors.gray.darker};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${UTILITY_CONTAINER_LOCK}`]: LockMax 
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
      [`.${UTILITY_CONTAINER} *`]: Typography.SansSmaller
    },
  })}

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-top: ${Spacing.sm};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
      margin-left: ${Spacing.sm};
      padding-left: ${Spacing.sm};
      background-position: ${Spacing.sm} 100%;
      border-left: 1px solid ${Colors.gray.dark};
    }
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${UTILITY_CONTAINER} {
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
      MarkupModify.AnimationLinkSpan({ element: link });
      link.classList.add(UTILITY_CONTAINER_LINK);

      wrapper.appendChild(link);
    });
  }

  requiredSubLinks.forEach((link) =>
    wrapper.appendChild(MarkupCreate.Node.linkWithSpan(link)),
  );
  copyRight.classList.add(UTILITY_CONTAINER_LINK);
  copyRight.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;
  wrapper.appendChild(copyRight);
  container.appendChild(wrapper);

  return container;
};
