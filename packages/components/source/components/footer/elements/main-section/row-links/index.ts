import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { ELEMENT_TYPE } from '../../../component';
import { BREAKPOINTS, VARIABLES, ELEMENTS } from '../../../globals';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';
import { CreateLinkColumns, LinkColumnStyles } from './link-columns';

export const ROW_LINKS_CONTAINER = 'umd-footer-row-links';
export const ROW_LINKS_CONTAINER_WRAPPER = 'umd-footer-row-links-wrapper';

const socialOverwriteStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LINKS_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: block !important;
    }
  }


`;

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

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${
  VARIABLES.THEME_OPTION_LIGHT
}"] .${ROW_LINKS_CONTAINER} {
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
  ${socialOverwriteStyles}
`;

export const CreateRowLinks = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');
  const socialColumnWrapper = CreateSocialCampaignColumns({ element });
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
