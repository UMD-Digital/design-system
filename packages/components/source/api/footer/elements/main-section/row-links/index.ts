import { layout, tokens } from '@universityofmaryland/web-elements-styles';
import { Styles } from 'utilities';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';
import { CreateLinkColumns, LinkColumnStyles } from './link-columns';
import { BREAKPOINTS, VARIABLES, ELEMENTS, REFERENCES } from '../../../globals';
import { UMDFooterElement } from '../../../index';

const { colors, spacing } = tokens;

const { convertJSSObjectToStyles } = Styles;

const { LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

export const ROW_LINKS_CONTAINER = 'umd-footer-row-links';
export const ROW_LINKS_CONTAINER_WRAPPER = 'umd-footer-row-links-wrapper';
const ROW_LINKS_CONTAINER_LOCK = 'umd-footer-row-links-lock';

const socialOverwriteStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LINKS_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LINKS_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: block !important;
    }
  }
`;

// prettier-ignore
export const RowLinkStyles = `
  .${ROW_LINKS_CONTAINER} {
    padding-bottom: ${spacing.lg};
    background-color: ${colors.black};
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LINKS_CONTAINER} {
      padding-bottom: ${spacing['2xl']};
    }
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${ROW_LINKS_CONTAINER} {
    background-color: ${colors.gray.lightest};
  }

  .${ROW_LINKS_CONTAINER_WRAPPER}  {
    display: flex;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LINKS_CONTAINER_WRAPPER}  {
      flex-direction: column-reverse;
      flex-wrap: wrap;
    }
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_CONTAINER_LOCK}`]: layout.space.horizontal.max, 
    },
  })}

  ${LinkColumnStyles}
  ${socialOverwriteStyles}
`;

export const CreateRowLinks = ({ element }: { element: UMDFooterElement }) => {
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
