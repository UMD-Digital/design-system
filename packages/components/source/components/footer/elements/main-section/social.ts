import { colors, spacing, typography } from '@universityofmaryland/variables';
import {
  FACEBOOK_ICON,
  X_ICON,
  INSTAGRAM_ICON,
  YOUTUBE_ICON,
  TWITTER_ICON,
} from 'assets/social';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/footer/component';
import {
  BREAKPOINTS,
  VARIABLES,
  ELEMENTS,
  SLOTS,
} from 'components/footer/globals';
import { CreateCampaignRow, CAMPAIGN_COLUMN_WRAPPER } from './campaign';

export const SOCIAL_COLUMN_WRAPPER = 'umd-footer-social-column_wrapper';
const SOCIAL_CONTAINER = 'umd-footer-social-container';
const SOCIAL_CONTAINER_WRAPPER = 'umd-footer-social-container_wrapper';
const SOCIAL_CONTAINER_HEADLINE = 'umd-footer-social-container_headline';

const campaignOverwriteStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${SOCIAL_COLUMN_WRAPPER} .${CAMPAIGN_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${SOCIAL_COLUMN_WRAPPER} .${CAMPAIGN_COLUMN_WRAPPER} {
      display: flex;
      justify-content: flex-end;
      margin-left: auto;
    }
  }
`;

const themeOverwriteStyles = `
  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"]  .${SOCIAL_CONTAINER_WRAPPER} a {
    background-color: ${colors.gray.light};
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${SOCIAL_CONTAINER_WRAPPER} a > *,
  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${SOCIAL_CONTAINER_WRAPPER} a path {
    fill: ${colors.black} !important;
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"]  .${SOCIAL_CONTAINER_WRAPPER} a:hover {
    background-color: ${colors.gray.dark};
  }

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${SOCIAL_CONTAINER_WRAPPER} a:hover path {
    fill: ${colors.gray.light} !important;
  }
`;

// prettier-ignore
export const SocialContainerStyles = `
  .${SOCIAL_CONTAINER} {
    margin-left: auto;
    display: flex;
    align-items: center;
    align-self: flex-start;
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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SOCIAL_CONTAINER_HEADLINE}`]: typography['.umd-interactive-sans-medium'],
    },
  })}

  ${campaignOverwriteStyles}
  ${themeOverwriteStyles}
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
  const socialLinksSlot = element.querySelector(
    `[slot="${SLOTS.SOCIAL}"]`,
  ) as HTMLSlotElement;
  const container = document.createElement('div');
  const linksWrapper = document.createElement('div');
  const headline = document.createElement('p');
  let socialLinks: HTMLAnchorElement[] = [];

  if (socialLinksSlot) {
    const socialLinksClone = socialLinksSlot.cloneNode(true) as HTMLSlotElement;
    const slottedSocialLinks = Array.from(
      socialLinksClone.querySelectorAll(`a`),
    ) as HTMLAnchorElement[];
    socialLinks = slottedSocialLinks;
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

  socialLinks.forEach((link) =>
    linksWrapper.appendChild(GetSocialIcon({ link })),
  );

  container.classList.add(SOCIAL_CONTAINER);
  linksWrapper.classList.add(SOCIAL_CONTAINER_WRAPPER);
  linksWrapper.setAttribute('count', `${socialLinks.length}`);

  headline.classList.add(SOCIAL_CONTAINER_HEADLINE);
  headline.innerText = 'Stay Connected';

  container.appendChild(headline);
  container.appendChild(linksWrapper);

  return container;
};

export const CreateSocialCampaignColumns = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const socialColumnWrapper = document.createElement('div');
  const socialContainer = CreateSocialRow({ element });
  const campaignContainer = CreateCampaignRow({ element });

  socialColumnWrapper.classList.add(SOCIAL_COLUMN_WRAPPER);

  socialColumnWrapper.appendChild(socialContainer);
  socialColumnWrapper.appendChild(campaignContainer);

  return socialColumnWrapper;
};
