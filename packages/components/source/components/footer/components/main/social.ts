import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import {
  BREAKPOINTS,
  ELEMENT_WRAPPER,
  THEME_OPTION_LIGHT,
} from '../../variables';
import {
  FACEBOOK_ICON,
  X_ICON,
  INSTAGRAM_ICON,
  YOUTUBE_ICON,
  TWITTER_ICON,
} from 'assets/social';
import { CAMPAIGN_LOGO, CAMPAIGN_LOGO_DARK } from 'assets/logos';

const SLOT_SOCIAL_NAME = 'social-links';
const SOCIAL_CONTAINER = 'umd-footer-social-container';
const SOCIAL_CONTAINER_WRAPPER = 'umd-footer-social-container_wrapper';
const SOCIAL_COLUMN_WRAPPER = 'umd-footer-social-column_wrapper';

export const SocialContainerStyles = `
  .${SOCIAL_CONTAINER} {
    margin-left: auto;
    display: flex;
    align-items: center;
    align-self: flex-start;
  }

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_CONTAINER} {
      margin-left: 0;
      order: 2;
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_CONTAINER} {
      justify-content: flex-end;
      padding-left: ${spacing['2xl']};
    }
  }

  .${SOCIAL_CONTAINER} > p {
    align-self: flex-start;
    padding-top: 3px;
  }

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_COLUMN_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column: 1 / span 2;
      gap: ${spacing.md};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_COLUMN_WRAPPER} {
      margin-left: auto;
    }
  }
  
  .${SOCIAL_COLUMN_WRAPPER} > a {
    display: block;
    margin-top: ${spacing.lg};
    max-width: 250px;
  }

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_COLUMN_WRAPPER} > a {
      margin-top: -${spacing.lg};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_COLUMN_WRAPPER} > a {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
    }
  }

  .${SOCIAL_CONTAINER_WRAPPER} {
    display: grid;
    grid-gap: ${spacing.xs};
    grid-template-columns: repeat(3, 1fr);
    margin-left: ${spacing.xs};
  }
  
  .${SOCIAL_CONTAINER_WRAPPER}[count="4"] {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  
  .${SOCIAL_CONTAINER_WRAPPER} a {
    background-color: ${colors.gray.darker};
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
    fill: ${colors.white} !important;
    transition: fill .5s;
  }

  .${SOCIAL_CONTAINER_WRAPPER} a:hover {
    background-color: ${colors.gray.light};
  }

  .${SOCIAL_CONTAINER_WRAPPER} a:hover path {
    fill: ${colors.gray.dark} !important;
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"]  .${SOCIAL_CONTAINER_WRAPPER} a {
    background-color: ${colors.gray.light};
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${SOCIAL_CONTAINER_WRAPPER} a > *,
  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${SOCIAL_CONTAINER_WRAPPER} a path {
    fill: ${colors.black} !important;
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"]  .${SOCIAL_CONTAINER_WRAPPER} a:hover {
    background-color: ${colors.gray.dark};
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${SOCIAL_CONTAINER_WRAPPER} a:hover path {
    fill: ${colors.gray.light} !important;
  }
`;

// Enforce known social link types logos
const GetSocialIcon = ({ link }: { link: HTMLAnchorElement }) => {
  const url = link.getAttribute('href') || null;

  if (!url) return link;

  if (url.match(/facebook.com/)) {
    link.innerHTML = FACEBOOK_ICON;
  }

  if (url.match(/x.com/)) {
    link.innerHTML = X_ICON;
  }

  if (url.match(/instagram.com/)) {
    link.innerHTML = INSTAGRAM_ICON;
  }

  if (url.match(/youtube.com/)) {
    link.innerHTML = YOUTUBE_ICON;
  }

  if (url.match(/twitter.com/)) {
    link.innerHTML = TWITTER_ICON;
  }

  return link;
};

const CreateSocialRow = ({ element }: { element: HTMLElement }) => {
  const socialLinks = Array.from(
    element.querySelectorAll(`[slot="${SLOT_SOCIAL_NAME}"] a`),
  ) as HTMLAnchorElement[];
  const container = document.createElement('div');
  const linksWrapper = document.createElement('div');
  const headline = document.createElement('p');

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

  socialLinks.forEach((link) =>
    linksWrapper.appendChild(GetSocialIcon({ link })),
  );

  container.classList.add(SOCIAL_CONTAINER);
  linksWrapper.classList.add(SOCIAL_CONTAINER_WRAPPER);
  linksWrapper.setAttribute('count', `${socialLinks.length}`);

  headline.classList.add('umd-interactive-sans-medium');
  headline.innerText = 'Stay Connected';

  container.appendChild(headline);
  container.appendChild(linksWrapper);

  return container;
};

const CreateCampaignRow = ({ theme }: { theme: string }) => {
  const container = document.createElement('a');
  container.href = 'https://fearlesslyforward.umd.edu';
  container.setAttribute('target', '_blank');
  container.setAttribute('rel', 'noopener noreferrer');

  container.innerHTML =
    theme === THEME_OPTION_LIGHT ? CAMPAIGN_LOGO_DARK : CAMPAIGN_LOGO;

  return container;
};

export const CreateSocialCampaignColumns = ({
  element,
  theme,
}: {
  element: HTMLElement;
  theme: string;
}) => {
  const socialColumnWrapper = document.createElement('div');
  const socialContainer = CreateSocialRow({ element });
  const campaignContainer = CreateCampaignRow({ theme });

  socialColumnWrapper.classList.add(SOCIAL_COLUMN_WRAPPER);

  socialColumnWrapper.appendChild(socialContainer);
  socialColumnWrapper.appendChild(campaignContainer);

  return socialColumnWrapper;
};
