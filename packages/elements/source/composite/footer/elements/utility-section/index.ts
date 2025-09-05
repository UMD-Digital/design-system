import { ElementModel } from 'model';
import { token } from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../globals';
import { type ElementVisual } from '../../../../_types';

const { LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

const UTILITY_CONTAINER = 'umd-footer-utility-container';
const UTILITY_CONTAINER_LOCK = 'umd-footer-utility-container-lock';
const UTILITY_CONTAINER_LINK = 'umd-footer-utility-container-link';

// // prettier-ignore
// const LinkStyles = `
//   .${UTILITY_CONTAINER} a {
//     display: block;
//   }

//   .${UTILITY_CONTAINER} a span {
//     color: ${token.color.gray.light};
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${UTILITY_CONTAINER} a`]:
//       animation.line.slideUnderWhite,
//     },
//   })}

//   .umd-footer-element-wrapper${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a {
//     color: ${token.color.black};
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.umd-footer-element-wrapper${IS_THEME_LIGHT} .${UTILITY_CONTAINER} a`]:
//       animation.line.slideUnderBlack,
//     },
//   })}
// `;

// // prettier-ignore
// const TextStyles = `
//   .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} p {
//     color: ${token.color.gray.light};
//     display: flex;
//     align-items: center;
//   }

//   .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} a {
//     color: ${token.color.gray.light};
//   }

//   .umd-footer-element-wrapper${IS_THEME_LIGHT} .${UTILITY_CONTAINER} p {
//     color: ${token.color.black};
//   }
// `;

// // prettier-ignore
// export const UtilityContainerStyles = `
//   .${UTILITY_CONTAINER} {
//     padding: ${token.spacing.sm} 0;
//     background-color: ${token.color.gray.darker};
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${UTILITY_CONTAINER_LOCK}`]: layout.space.horizontal.larger,
//     },
//   })}

//   @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
//     .${UTILITY_CONTAINER_LOCK} {
//       display: flex;
//       align-items: center;
//     }
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${UTILITY_CONTAINER} *`]: typography.sans.smaller
//     },
//   })}

//   @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
//     .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
//       margin-top: ${token.spacing.sm};
//     }
//   }

//   @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
//     .${UTILITY_CONTAINER} .${UTILITY_CONTAINER_LOCK} > *:not(:first-child) {
//       margin-left: ${token.spacing.sm};
//       padding-left: ${token.spacing.sm};
//       background-position: ${token.spacing.sm} 100%;
//       border-left: 1px solid ${token.color.gray.dark};
//     }
//   }

//   .umd-footer-element-wrapper${IS_THEME_LIGHT} .${UTILITY_CONTAINER} {
//     background-color: ${token.color.gray.light};
//   }

//   ${LinkStyles}
//   ${TextStyles}
// `;

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
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.innerText = title;

  return ElementModel.createDiv({
    className: 'umd-footer-utility-container-link-wrapper',
    children: [
      ElementModel.create({
        element: link,
        className: 'umd-footer-utility-container-link',
      }),
    ],
  });
};

export interface UtilityProps {
  slotUtilityLinks?: HTMLElement | null;
}

export interface UtilityProps {
  slotUtilityLinks?: HTMLElement | null;
}

export default ({ slotUtilityLinks }: UtilityProps): ElementVisual => {
  const linkElements: ElementVisual[] = [];

  if (slotUtilityLinks) {
    const slottedLinks = Array.from(
      slotUtilityLinks.querySelectorAll('a'),
    ) as HTMLAnchorElement[];

    slottedLinks.forEach((link) => {
      Utils.markup.modify.animationLinkSpan({ element: link });
      link.classList.add('umd-footer-utility-container-link');
      linkElements.push(
        ElementModel.create({
          element: link,
          className: 'umd-footer-utility-container-link',
        }),
      );
    });
  }

  requiredSubLinks.forEach((link) => {
    linkElements.push(createSubLink(link));
  });

  const copyRightElement = document.createElement('p');
  copyRightElement.classList.add('umd-footer-utility-container-link');
  copyRightElement.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;

  const copyRight = ElementModel.create({
    element: copyRightElement,
    className: 'umd-footer-utility-container-link',
  });

  linkElements.push(copyRight);

  const wrapper = ElementModel.createDiv({
    className: 'umd-footer-utility-container-lock',
    children: linkElements,
    elementStyles: {
      element: {
        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          display: 'flex',
          alignItems: 'center',
        },
        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          '& > *:not(:first-child)': {
            marginTop: token.spacing.sm,
          },
        },
      },
    },
  });

  const container = ElementModel.createDiv({
    className: 'umd-footer-utility-container',
    children: [wrapper],
    elementStyles: {
      element: {
        padding: `${token.spacing.sm} 0`,
        backgroundColor: token.color.gray.darker,

        [`.umd-footer-element-wrapper${IS_THEME_LIGHT} &`]: {
          backgroundColor: token.color.gray.light,
        },

        [`@container ${ELEMENT_NAME} (min-width: ${LARGE}px)`]: {
          [`& .umd-footer-utility-container-lock > *:not(:first-child)`]: {
            marginLeft: token.spacing.sm,
            paddingLeft: token.spacing.sm,
            backgroundPosition: `${token.spacing.sm} 100%`,
            borderLeft: `1px solid ${token.color.gray.dark}`,
          },
        },
      },
    },
  });

  return container;
};
