import {
  colors,
  spacing,
  umdLock,
} from '@universityofmaryland/umd-web-configuration';
import {
  CovertObjectMediaQueriesToStyles,
  CovertObjectToStyles,
} from 'helpers/styles';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';
import { CreateLinkColumns, LinkColumnStyles } from './link-columns';
import { ELEMENT_TYPE } from '../../../component';
import { BREAKPOINTS, VARIABLES, ELEMENTS } from '../../../globals';

export const ROW_LINKS_CONTAINER = 'umd-footer-row-links';
export const ROW_LINKS_CONTAINER_WRAPPER = 'umd-footer-row-links-wrapper';
const ROW_LINKS_CONTAINER_LOCK = 'umd-footer-row-links-lock';

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

// prettier-ignore
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

  .${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${ROW_LINKS_CONTAINER} {
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

  .${ROW_LINKS_CONTAINER_LOCK} {
    ${CovertObjectToStyles({ styles: umdLock['.umd-lock'] })}
  }

  ${CovertObjectMediaQueriesToStyles({
    element: ROW_LINKS_CONTAINER_LOCK,
    styles: umdLock['.umd-lock'],
  })}

  ${LinkColumnStyles}
  ${socialOverwriteStyles}
`;

export const CreateRowLinks = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');
  const socialColumnWrapper = CreateSocialCampaignColumns({ element });
  const linkColumnWrapper = CreateLinkColumns({ element });

  lock.classList.add(ROW_LINKS_CONTAINER_LOCK);
  container.classList.add(ROW_LINKS_CONTAINER);
  wrapper.classList.add(ROW_LINKS_CONTAINER_WRAPPER);

  wrapper.appendChild(linkColumnWrapper);
  wrapper.appendChild(socialColumnWrapper);
  lock.appendChild(wrapper);
  container.appendChild(lock);

  return container;
};
