import { Layout, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/footer';
import { BREAKPOINTS, VARIABLES, ELEMENTS } from 'components/footer/globals';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';
import { CreateLinkColumns, LinkColumnStyles } from './link-columns';

const { Colors, Spacing } = Tokens;
const { Lock } = Layout;

const { large } = BREAKPOINTS;
const { THEME_OPTION_LIGHT } = VARIABLES;
const { ELEMENT_WRAPPER } = ELEMENTS;

export const ROW_LINKS_CONTAINER = 'umd-footer-row-links';
export const ROW_LINKS_CONTAINER_WRAPPER = 'umd-footer-row-links-wrapper';
const ROW_LINKS_CONTAINER_LOCK = 'umd-footer-row-links-lock';

const socialOverwriteStyles = `
  @container umd-footer (max-width: ${large - 1}px) {
    .${ROW_LINKS_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container umd-footer (min-width: ${large}px) {
    .${ROW_LINKS_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: block !important;
    }
  }
`;

// prettier-ignore
export const RowLinkStyles = `
  .${ROW_LINKS_CONTAINER} {
    padding-bottom: ${Spacing.lg};
    background-color: ${Colors.black};
  }

  @container umd-footer (min-width: ${large}px) {
    .${ROW_LINKS_CONTAINER}  {
      padding-bottom: ${Spacing['2xl']};
    }
  }

  .${ELEMENT_WRAPPER}[theme="${THEME_OPTION_LIGHT}"] .${ROW_LINKS_CONTAINER} {
    background-color: ${Colors.gray.lightest};
  }

  .${ROW_LINKS_CONTAINER_WRAPPER}  {
    display: flex;
  }

  @container umd-footer (max-width: ${large - 1}px) {
    .${ROW_LINKS_CONTAINER_WRAPPER}  {
      flex-direction: column-reverse;
      flex-wrap: wrap;
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_CONTAINER_LOCK}`]: Lock['.base']
    },
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
