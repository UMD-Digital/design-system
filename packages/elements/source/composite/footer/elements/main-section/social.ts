import { token, typography } from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  facebook as iconFacebook,
  x as iconX,
  linkedin as iconLinkedIn,
  twitter as iconTwitter,
  youtube as iconYoutube,
  instagram as iconInstagram,
  threads as iconThreads,
} from '@universityofmaryland/web-icons-library/social';
import createCampaignRow from './campaign';
import { BREAKPOINTS } from '../../globals';
import { BaseProps } from '../../_types';
import { type UMDElement } from '../../../../_types';

interface SocialProps extends BaseProps {
  slotSocialLinks?: HTMLSlotElement;
}

export interface SocialCampaignColumnsProps extends SocialProps {}

const ATTRIBUTE_LAYOUT = 'layout';
const LAYOUT_GRID = 'grid';
const { LARGE } = BREAKPOINTS;

const GetSocialIcon = ({ link }: { link: HTMLAnchorElement }) => {
  const url = link.getAttribute('href') || null;
  if (!url) return link;

  if (url.match(/facebook.com/)) link.innerHTML = iconFacebook;
  if (url.match(/x.com/)) link.innerHTML = iconX;
  if (url.match(/instagram.com/)) link.innerHTML = iconInstagram;
  if (url.match(/youtube.com/)) link.innerHTML = iconYoutube;
  if (url.match(/twitter.com/)) link.innerHTML = iconTwitter;
  if (url.match(/linkedin.com/)) link.innerHTML = iconLinkedIn;
  if (url.match(/threads.net/)) link.innerHTML = iconThreads;

  return link;
};

const CreateSocialRow = (props: SocialProps): UMDElement => {
  const { isThemeLight, slotSocialLinks } = props;

  let socialLinks: HTMLAnchorElement[] = [];

  if (slotSocialLinks) {
    const socialLinksClone = slotSocialLinks.cloneNode(true) as HTMLSlotElement;
    socialLinks = Array.from(
      socialLinksClone.querySelectorAll('a'),
    ) as HTMLAnchorElement[];
  }

  if (socialLinks.length === 0) {
    const socialLink = ({ url, label }: { label: string; url: string }) => {
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('aria-label', label);
      return link;
    };

    socialLinks.push(
      socialLink({
        url: 'https://www.youtube.com/user/UMD2101',
        label: 'Link to the youtube channel for the University of Maryland',
      }),
    );
    socialLinks.push(
      socialLink({
        url: 'https://www.facebook.com/UnivofMaryland',
        label: 'Link to the facebook page for the University of Maryland',
      }),
    );
    socialLinks.push(
      socialLink({
        url: 'https://www.instagram.com/univofmaryland',
        label: 'Link to the instagram page for the University of Maryland',
      }),
    );
  }

  const headline = new ElementBuilder('p')
    .withClassName('umd-footer-social-container_headline')
    .withStyles({
      element: {
        paddingTop: '3px',
        fontWeight: 700,
        ...typography.elements.interativeMedium,
      },
    })
    .withText('Stay Connected')
    .build();

  const socialLinkChildren = socialLinks.map((link) =>
    new ElementBuilder(GetSocialIcon({ link }))
      .withClassName('umd-footer-social-link')
      .withStyles({
        element: {
          backgroundColor: token.color.gray.darker,
          height: '32px',
          width: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color .5s',

          ['& > *, & path']: {
            fill: `${token.color.white} !important`,
            transition: 'fill .5s',
            maxHeight: '20px !important',
          },

          ['&:hover']: {
            backgroundColor: token.color.gray.light,

            ['& path']: {
              fill: `${token.color.gray.dark} !important`,
            },
          },

          ...(isThemeLight && {
            backgroundColor: token.color.gray.light,

            ['&:hover']: {
              backgroundColor: token.color.gray.dark,

              ['& path']: {
                fill: `${token.color.gray.light} !important`,
              },
            },

            ['& > *, & path']: {
              fill: `${token.color.black} !important`,
            },
          }),
        },
      })
      .build(),
  );

  const gridColumns = Math.min(socialLinks.length, 3);

  const linksWrapper = new ElementBuilder()
    .withClassName('umd-footer-social-container_wrapper')
    .withStyles({
      element: {
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        gridGap: token.spacing.xs,
        marginLeft: token.spacing.xs,
      },
    })
    .withChildren(...socialLinkChildren)
    .withAttribute('count', `${socialLinks.length}`)
    .build();

  return new ElementBuilder()
    .withClassName('umd-footer-social-container')
    .withStyles({
      element: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',

        ['& > p']: {
          alignSelf: 'flex-start',
          paddingTop: '3px',
          fontWeight: 700,
        },

        [`@container (min-width: 1000px)`]: {
          justifyContent: 'flex-end',
          paddingLeft: token.spacing['2xl'],
        },
      },
    })
    .withChildren(headline, linksWrapper)
    .withModifier((el) => {
      if (socialLinks.length >= 4) {
        el.setAttribute(ATTRIBUTE_LAYOUT, LAYOUT_GRID);
      }
    })
    .build();
};

export default (props: SocialCampaignColumnsProps): UMDElement => {
  const socialContainer = CreateSocialRow(props);
  const campaignContainer = createCampaignRow(props);
  const { isTypeSimple } = props;

  return new ElementBuilder()
    .withClassName('umd-footer-social-column_wrapper')
    .withStyles({
      element: {
        [`@container  (max-width: ${LARGE - 1}px)`]: {
          marginTop: token.spacing.md,

          [`& > .campaign-column-wrapper`]: {
            display: 'none',
          },

          ...(isTypeSimple && {
            display: 'none',
          }),
        },

        [`@container (min-width: ${LARGE}px)`]: {
          marginLeft: 'auto',

          [`.umd-footer-contact-container &`]: {
            display: 'none',
          },
        },
      },
    })
    .withChildren(socialContainer, campaignContainer)
    .build();
};
