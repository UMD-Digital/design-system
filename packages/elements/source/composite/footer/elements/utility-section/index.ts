import {
  token,
  layout,
  animation,
  typography,
} from '@universityofmaryland/web-styles-library';
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';
import { ElementModel } from 'model';
import { BREAKPOINTS } from '../../globals';
import { FooterProps } from '../../options';
import { type ElementVisual } from '../../../../_types';

export interface UtilityProps {
  slotUtilityLinks?: HTMLElement | null;
}

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
  return ElementModel.create({
    element: link,
    className: 'umd-footer-utility-container-link',
  });
};

const createSubLink = ({ title, url }: { title: string; url: string }) => {
  const span = ElementModel.createSpan({
    className: 'umd-footer-utility-container-sublink-text',
  });

  const link = ElementModel.create({
    element: document.createElement('a'),
    className: 'umd-footer-utility-container-sublink',
    children: [span],
    attributes: [
      {
        href: url,
      },
      {
        target: '_blank',
      },
      { rel: 'noopener noreferrer' },
    ],
  });

  span.element.innerText = title;

  return ElementModel.createDiv({
    className: 'umd-footer-utility-container-link-wrapper',
    children: [createUtilityContainerLink(link.element)],
  });
};

export default (props: FooterProps): ElementVisual => {
  const { isThemeLight, slotUtilityLinks } = props;
  const linkElements: ElementVisual[] = [];
  const copyRightElement = ElementModel.createParagraph({
    className: 'umd-footer-utility-container-copyright',
  });
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

  copyRightElement.element.innerHTML = `©${new Date().getFullYear()} UNIVERSITY OF MARYLAND`;

  linkElements.push(copyRight);

  const wrapper = ElementModel.createDiv({
    className: 'umd-footer-utility-container-lock',
    children: linkElements,
    elementStyles: {
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
    },
  });

  const container = ElementModel.createDiv({
    className: 'umd-footer-utility-container',
    children: [wrapper],
    elementStyles: {
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
    },
  });

  return container;
};
