import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { CreateSocialCampaignColumns } from '../social';
import { CreateLinkColumns, LinkColumnStyles } from './link-columns';
import {
  BREAKPOINTS,
  ELEMENT_WRAPPER,
  THEME_OPTION_LIGHT,
} from '../../../variables';

export const ROW_LINKS_CONTAINER = 'umd-footer-row-links';
export const ROW_LINKS_CONTAINER_WRAPPER = 'umd-footer-row-links-wrapper';

export const RowLinkStyles = `
  .${ROW_LINKS_CONTAINER} {
    padding-bottom: ${spacing['md']};
    background-color: ${colors.black};
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_CONTAINER}  {
      padding-bottom: ${spacing['2xl']};
    }
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${ROW_LINKS_CONTAINER} {
    background-color: ${colors.gray.lightest};
  }

  .${ROW_LINKS_CONTAINER_WRAPPER}  {
    display: flex;
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LINKS_CONTAINER_WRAPPER}  {
      flex-direction: column-reverse;
      flex-wrap: wrap;
    }
  }

  ${LinkColumnStyles}
`;

export const CreateRowLinks = ({
  element,
  theme,
}: {
  element: HTMLElement;
  theme: string;
}) => {
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');
  const socialColumnWrapper = CreateSocialCampaignColumns({ element, theme });
  const linkColumnWrapper = CreateLinkColumns({ element });

  lock.classList.add('umd-lock');
  container.classList.add(ROW_LINKS_CONTAINER);
  wrapper.classList.add(ROW_LINKS_CONTAINER_WRAPPER);

  wrapper.appendChild(linkColumnWrapper);
  wrapper.appendChild(socialColumnWrapper);
  lock.appendChild(wrapper);
  container.appendChild(lock);

  return container;
};
