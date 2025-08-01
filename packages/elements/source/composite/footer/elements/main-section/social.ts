import { token, typography } from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import createCampaignRow, { CAMPAIGN_COLUMN_WRAPPER } from './campaign';
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../../globals';
import { BaseProps } from '../../_types';

const { LARGE, MEDIUM } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

const ATTRIBUTE_LAYOUT = 'layout';
const LAYOUT_GRID = 'grid';

export const SOCIAL_COLUMN_WRAPPER = 'umd-footer-social-column_wrapper';
const SOCIAL_CONTAINER = 'umd-footer-social-container';
const SOCIAL_CONTAINER_WRAPPER = 'umd-footer-social-container_wrapper';
const SOCIAL_CONTAINER_HEADLINE = 'umd-footer-social-container_headline';

const IS_LAYOUT_GRID = `[${ATTRIBUTE_LAYOUT}="${LAYOUT_GRID}"]`;

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
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT}  .${SOCIAL_CONTAINER_WRAPPER} a {
    background-color: ${token.color.gray.light};
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${SOCIAL_CONTAINER_WRAPPER} a > *,
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${SOCIAL_CONTAINER_WRAPPER} a path {
    fill: ${token.color.black} !important;
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT}  .${SOCIAL_CONTAINER_WRAPPER} a:hover {
    background-color: ${token.color.gray.dark};
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${SOCIAL_CONTAINER_WRAPPER} a:hover path {
    fill: ${token.color.gray.light} !important;
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

// Enforce known social link types logos
const GetSocialIcon = ({ link }: { link: HTMLAnchorElement }) => {
  const url = link.getAttribute('href') || null;

  if (!url) return link;

  if (url.match(/facebook.com/)) {
    link.innerHTML = Utils.asset.social.FACEBOOK;
  }

  if (url.match(/x.com/)) {
    link.innerHTML = Utils.asset.social.X;
  }

  if (url.match(/instagram.com/)) {
    link.innerHTML = Utils.asset.social.INSTAGRAM;
  }

  if (url.match(/youtube.com/)) {
    link.innerHTML = Utils.asset.social.YOUTUBE;
  }

  if (url.match(/twitter.com/)) {
    link.innerHTML = Utils.asset.social.TWITTER;
  }

  if (url.match(/linkedin.com/)) {
    link.innerHTML = Utils.asset.social.LINKEDIN;
  }

  if (url.match(/threads.net/)) {
    link.innerHTML = Utils.asset.social.THREADS;
  }

  return link;
};

interface SocialProps {
  slotSocialLinks?: HTMLSlotElement;
}

const CreateSocialRow = ({ slotSocialLinks }: SocialProps) => {
  const container = document.createElement('div');
  const linksWrapper = document.createElement('div');
  const headline = document.createElement('p');
  let socialLinks: HTMLAnchorElement[] = [];

  if (slotSocialLinks) {
    const socialLinksClone = slotSocialLinks.cloneNode(true) as HTMLSlotElement;
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
  if (socialLinks.length >= 4) {
    container.setAttribute(ATTRIBUTE_LAYOUT, LAYOUT_GRID);
  }

  return container;
};

export interface SocialCampaignColumnsProps extends BaseProps, SocialProps {}

export default (props: SocialCampaignColumnsProps) => {
  const socialColumnWrapper = document.createElement('div');
  const socialContainer = CreateSocialRow(props);
  const campaignContainer = createCampaignRow(props);

  socialColumnWrapper.classList.add(SOCIAL_COLUMN_WRAPPER);

  socialColumnWrapper.appendChild(socialContainer);
  socialColumnWrapper.appendChild(campaignContainer);

  return socialColumnWrapper;
};
