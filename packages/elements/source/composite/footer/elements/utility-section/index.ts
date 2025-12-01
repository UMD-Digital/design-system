import {
  token,
  layout,
  animation,
  typography,
} from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';
import { BREAKPOINTS } from '../../globals';
import { UtilityProps } from '../../_types';
import { type UMDElement } from '../../../../_types';

const { LARGE } = BREAKPOINTS;

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

const createUtilityContainerLink = (link: HTMLElement) => {
  return new ElementBuilder(link)
    .withClassName('umd-footer-utility-container-link')
    .build();
};

const createSubLink = ({ title, url }: { title: string; url: string }) => {
  const span = new ElementBuilder('span')
    .withClassName('umd-footer-utility-container-sublink-text')
    .withText(title)
    .build();

  const anchor = document.createElement('a');
  anchor.setAttribute('href', url);
  anchor.setAttribute('target', '_blank');
  anchor.setAttribute('rel', 'noopener noreferrer');

  const link = new ElementBuilder(anchor)
    .withClassName('umd-footer-utility-container-sublink')
    .withChild(span)
    .build();

  return new ElementBuilder()
    .withClassName('umd-footer-utility-container-link-wrapper')
    .withChild(createUtilityContainerLink(link.element))
    .build();
};

export default (
  props: Pick<UtilityProps, 'isThemeLight' | 'slotUtilityLinks'>,
) => {
  const { isThemeLight, slotUtilityLinks } = props;
  const linkElements: UMDElement[] = [];

  const copyRightPara = document.createElement('p');
  copyRightPara.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;

  const copyRightElement = new ElementBuilder(copyRightPara)
    .withClassName('umd-footer-utility-container-copyright')
    .build();

  if (slotUtilityLinks) {
    const slottedLinks = Array.from(
      slotUtilityLinks.querySelectorAll('a'),
    ) as HTMLAnchorElement[];

    slottedLinks.forEach((link) => {
      wrapLinkForAnimation({ element: link });
      linkElements.push(createUtilityContainerLink(link));
    });
  }

  const copyRight = createUtilityContainerLink(copyRightElement.element);

  requiredSubLinks.forEach((link) => {
    linkElements.push(createSubLink(link));
  });

  linkElements.push(copyRight);

  const wrapper = new ElementBuilder()
    .withClassName('umd-footer-utility-container-lock')
    .withStyles({
      element: {
        ...layout.space.horizontal.larger,

        [`@container (max-width: ${LARGE - 1}px)`]: {
          '& > *:not(:first-child)': {
            marginTop: token.spacing.sm,
          },
        },

        [`@container (min-width: ${LARGE}px)`]: {
          display: 'flex',
          alignItems: 'center',

          [`& > *:not(:first-child)`]: {
            marginLeft: token.spacing.sm,
            paddingLeft: token.spacing.sm,
            backgroundPosition: `${token.spacing.sm} 100%`,
            borderLeft: `1px solid ${token.color.gray.dark}`,
          },
        },

        ['& a, & p']: {
          color: token.color.gray.light,
        },

        ['& a']: {
          ...(isThemeLight && { color: token.color.gray.dark }),
        },

        ['& p']: {
          display: 'flex',
          alignItems: 'center',

          ...(isThemeLight && { color: token.color.black }),
        },
      },
    })
    .withChildren(...linkElements)
    .build();

  return new ElementBuilder()
    .withClassName('umd-footer-utility-container')
    .withStyles({
      element: {
        padding: `${token.spacing.sm} 0`,
        backgroundColor: token.color.gray.darker,

        ...(isThemeLight && {
          backgroundColor: token.color.gray.light,
        }),

        ['& *']: {
          ...typography.sans.smaller,
        },

        ['& a']: {
          display: 'block',
          ...animation.line.slideUnderWhite,

          ...(isThemeLight && {
            color: token.color.black,
            ...animation.line.slideUnderBlack,
          }),
        },
      },
    })
    .withChild(wrapper)
    .build();
};
