import * as token from '@universityofmaryland/web-token-library';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

import { type ThemeProps } from '_types';

export interface BreadcrumbProps extends Pick<ThemeProps, 'isThemeDark'> {
  linkListSlot: HTMLElement;
}

export const createCompositeNavigationBreadcrumb = ({
  isThemeDark,
  linkListSlot,
}: BreadcrumbProps) => {
  const links = linkListSlot.querySelectorAll('a') as NodeListOf<HTMLElement>;

  for (const linkElement of links) {
    linkElement.classList.add('breadcrumb-path');
    wrapLinkForAnimation({
      element: linkElement,
    });
  }

  const breadcrumbContainer = new ElementBuilder(linkListSlot)
    .withClassName('breadcrumb-container')
    .withStyles({
      element: {
        display: 'flex',
        paddingRight: '24px',
        fontSize: '12px',
        paddingBottom: '1px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        whiteSpace: 'nowrap',
        maskImage: `linear-gradient(90deg, ${token.color.white} calc(100% - 24px), transparent)`,

        '& *': {
          color: token.color.gray.mediumAA,
          position: 'relative',
        },

        '& a:not(:last-child)': {
          ...animation.line.slideUnderGrayRed,
        },

        '& .breadcrumb-path::-webkit-scrollbar': {
          display: 'none',
        },

        '& .breadcrumb-path:last-child': {
          color: token.color.black,
        },

        '& .breadcrumb-path:not(:last-child)': {
          marginRight: '14px',
        },

        '& .breadcrumb-path + *::before': {
          content: "''",
          display: 'inline-block',
          height: '14px',
          backgroundColor: token.color.gray.dark,
          left: '-8px',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%) rotate(15deg)',
          width: '1px',
        },

        ...(isThemeDark && {
          '& *': {
            color: token.color.white,
            position: 'relative',
          },

          '& a:not(:last-child)': {
            ...animation.line.slideUnderGrayDarkRed,
          },
        }),
      },
    });

  return breadcrumbContainer.build();
};
