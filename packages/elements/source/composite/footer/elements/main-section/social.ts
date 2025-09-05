import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import createCampaignRow, { CAMPAIGN_COLUMN_WRAPPER } from './campaign';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../globals';
import { BaseProps } from '../../_types';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../../_types';

// const { LARGE, MEDIUM } = BREAKPOINTS;
// const { ELEMENT_NAME } = VARIABLES;
// const { IS_THEME_LIGHT } = REFERENCES;

const ATTRIBUTE_LAYOUT = 'layout';
const LAYOUT_GRID = 'grid';

export const SOCIAL_COLUMN_WRAPPER = 'umd-footer-social-column_wrapper';
const SOCIAL_CONTAINER = 'umd-footer-social-container';
const SOCIAL_CONTAINER_WRAPPER = 'umd-footer-social-container_wrapper';
const SOCIAL_CONTAINER_HEADLINE = 'umd-footer-social-container_headline';
const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_NAME, ATTRIBUTE_THEME, ATTRIBUTE_TYPE } = VARIABLES;
const { IS_THEME_LIGHT, IS_VERSION_SIMPLE } = REFERENCES;
const IS_LAYOUT_GRID = `[${ATTRIBUTE_LAYOUT}="${LAYOUT_GRID}"]`;

/* old overwrite style constants (will be replaced by ElementModel styles later)
const OVERWRITE_GRID_CONTAINER = `.${SOCIAL_CONTAINER}${IS_LAYOUT_GRID}`;
const OVERWRITE_GRID_WRAPPER = `${OVERWRITE_GRID_CONTAINER} .${SOCIAL_CONTAINER_WRAPPER}`;

const OverwriteGridStyle = `
  ${OVERWRITE_GRID_CONTAINER} {
    flex-direction: column;
    padding-left: 0;
    align-items: flex-start;
    margin-left: 0;
  }

  @media (min-width: ${LARGE}px) {
    ${OVERWRITE_GRID_CONTAINER} {
      align-items: center;
    }
  }

  @media (min-width: ${LARGE}px) {
    ${OVERWRITE_GRID_CONTAINER} > p {
      align-self: center;
    }
  }

  ${OVERWRITE_GRID_WRAPPER} {
    grid-template-columns: repeat(3, 1fr);
    margin-left: 0;
    margin-top: ${token.spacing.sm};
  }
`;

const campaignOverwriteStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${SOCIAL_COLUMN_WRAPPER} .${CAMPAIGN_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${SOCIAL_COLUMN_WRAPPER} .${CAMPAIGN_COLUMN_WRAPPER} {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
    }
  }
`;

const themeOverwriteStyles = `
  .umd-footer-element-wrapper${IS_THEME_LIGHT}  .${SOCIAL_CONTAINER_WRAPPER} a {
    background-color: ${token.color.gray.light};
  }

  .umd-footer-element-wrapper${IS_THEME_LIGHT} .${SOCIAL_CONTAINER_WRAPPER} a > *,
  .umd-footer-element-wrapper${IS_THEME_LIGHT} .${SOCIAL_CONTAINER_WRAPPER} a path {
    fill: ${token.color.black} !important;
  }

  .umd-footer-element-wrapper${IS_THEME_LIGHT}  .${SOCIAL_CONTAINER_WRAPPER} a:hover {
    background-color: ${token.color.gray.dark};
  }

  .umd-footer-element-wrapper${IS_THEME_LIGHT} .${SOCIAL_CONTAINER_WRAPPER} a:hover path {
    fill: ${token.color.gray.light} !important;
  }
`;
*/

/*  old CSS export (will later be replaced with inline ElementModel styles)
export const SocialContainerStyles = `
  .${SOCIAL_CONTAINER} {
    margin-left: auto;
    display: flex;
    align-items: center;
    align-self: flex-start;
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${SOCIAL_CONTAINER} {
      justify-content: flex-end;
      padding-left: ${token.spacing['2xl']};
    }
  }

  .${SOCIAL_CONTAINER} > p {
    align-self: flex-start;
    padding-top: 3px;
    font-weight: 700;
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px) {
    .${SOCIAL_COLUMN_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column: 1 / span 2;
      gap: ${token.spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${SOCIAL_COLUMN_WRAPPER} {
      margin-left: auto;
    }
  }

  .${SOCIAL_CONTAINER_WRAPPER} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: ${token.spacing.xs};
    margin-left: ${token.spacing.xs};
  }

  .${SOCIAL_CONTAINER_WRAPPER}[count="4"] {
    grid-template-columns: repeat(4, 1fr);
  }

  .${SOCIAL_CONTAINER_WRAPPER} a {
    background-color: ${token.color.gray.darker};
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color .5s;
  }

  .${SOCIAL_CONTAINER_WRAPPER} a > *,
  .${SOCIAL_CONTAINER_WRAPPER} a path {
    max-height: 20px !important;
    fill: ${token.color.white} !important;
    transition: fill .5s;
  }

  .${SOCIAL_CONTAINER_WRAPPER} a:hover {
    background-color: ${token.color.gray.light};
  }

  .${SOCIAL_CONTAINER_WRAPPER} a:hover path {
    fill: ${token.color.gray.dark} !important;
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${SOCIAL_CONTAINER_HEADLINE}`]: typography.elements.interativeMedium,
    },
  })}

  ${campaignOverwriteStyles}
  ${themeOverwriteStyles}
  ${OverwriteGridStyle}
`;
*/

const GetSocialIcon = ({ link }: { link: HTMLAnchorElement }) => {
  const url = link.getAttribute('href') || null;
  if (!url) return link;

  if (url.match(/facebook.com/)) link.innerHTML = Utils.asset.social.FACEBOOK;
  if (url.match(/x.com/)) link.innerHTML = Utils.asset.social.X;
  if (url.match(/instagram.com/)) link.innerHTML = Utils.asset.social.INSTAGRAM;
  if (url.match(/youtube.com/)) link.innerHTML = Utils.asset.social.YOUTUBE;
  if (url.match(/twitter.com/)) link.innerHTML = Utils.asset.social.TWITTER;
  if (url.match(/linkedin.com/)) link.innerHTML = Utils.asset.social.LINKEDIN;
  if (url.match(/threads.net/)) link.innerHTML = Utils.asset.social.THREADS;

  return link;
};

interface SocialProps {
  slotSocialLinks?: HTMLSlotElement;
}

const CreateSocialRow = ({ slotSocialLinks }: SocialProps): ElementVisual => {
  let socialLinks: HTMLAnchorElement[] = [];

  if (slotSocialLinks) {
    const socialLinksClone = slotSocialLinks.cloneNode(true) as HTMLSlotElement;
    socialLinks = Array.from(
      socialLinksClone.querySelectorAll(`a`),
    ) as HTMLAnchorElement[];
  }

  // Enforce university default links if none are provided
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

  const headline = ElementModel.create({
    element: document.createElement('p'),
    className: SOCIAL_CONTAINER_HEADLINE,
    elementStyles: {
      element: {
        paddingTop: '3px',
        fontWeight: 700,

        [`.${SOCIAL_CONTAINER_HEADLINE}`]: typography.elements.interativeMedium,
      },
    },
  });
  headline.element.innerText = 'Stay Connected';

  const linksWrapper = ElementModel.createDiv({
    className: SOCIAL_CONTAINER_WRAPPER,
    children: socialLinks.map((link) =>
      ElementModel.create({
        element: GetSocialIcon({ link }),
        className: 'umd-footer-social-link',
      }),
    ),
    elementStyles: {
      element: {
        display: 'grid',
        gridTemplateColumns: `repeat(${socialLinks.length >= 4 ? 4 : 3}, 1fr)`,
        gridGap: token.spacing.xs,
        marginLeft: token.spacing.xs,
      },
    },
  });
  linksWrapper.element.setAttribute('count', `${socialLinks.length}`);

  const container = ElementModel.createDiv({
    className: SOCIAL_CONTAINER,
    children: [headline, linksWrapper],
    elementStyles: {
      element: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',

        [`@container umd-element-footer (min-width: 1000px)`]: {
          justifyContent: 'flex-end',
          paddingLeft: token.spacing['2xl'],
        },
      },
    },
  });

  if (socialLinks.length >= 4) {
    container.element.setAttribute(ATTRIBUTE_LAYOUT, LAYOUT_GRID);
  }

  return container;
};

export interface SocialCampaignColumnsProps extends BaseProps, SocialProps {}

export default (props: SocialCampaignColumnsProps): ElementVisual => {
  const socialContainer = CreateSocialRow(props);
  const campaignContainer = createCampaignRow(props);

  return ElementModel.createDiv({
    className: SOCIAL_COLUMN_WRAPPER,
    children: [socialContainer, campaignContainer],
    elementStyles: {
      element: {
        // Small screen spacing
        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          paddingTop: token.spacing['2xl'],
          paddingBottom: token.spacing.md,

          // Social column visibility for "simple" type
          [`.umd-footer-element-wrapper${IS_VERSION_SIMPLE} & .${SOCIAL_COLUMN_WRAPPER}`]:
            { display: 'none' },
        },
      },
    },
  });
};
