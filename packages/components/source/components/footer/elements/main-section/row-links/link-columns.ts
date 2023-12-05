import {
  colors,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { fontWeight } from '@universityofmaryland/umd-web-configuration/dist/tokens/fonts';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { MakeSlot } from 'helpers/ui';
import { BREAKPOINTS } from '../../../globals';

const LINK_TYPE = 'link';
const HEADLINE_TYPE = 'headline';

type ColumnRow = {
  elmentType: string;
  title: string;
  url?: string;
};

const ROW_LINKS_COLUMNS_CONTAINER = 'umd-footer-row-links-columns';
const ROW_LINKS_COLUMN_WRAPPER = 'umd-footer-row-links-column-wrapper';
const SLOT_COLUMN_ONE_NAME = 'link-column-one';
const SLOT_COLUMN_TWO_NAME = 'link-column-two';
const SLOT_COLUMN_THREE_NAME = 'link-column-three';
const SLOT_COLUMN_HEADLINE = `link-column-headline`;
const SLOT_COLUMN_FONTS = `link-column-fonts`;

const COLUMN_ONE_DEFAULT_LINKS = [
  {
    elmentType: LINK_TYPE,
    title: 'Careers',
    url: 'https://ejobs.umd.edu',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Office of Civil Rights & Sexual Misconduct',
    url: 'https://ocrsm.umd.edu',
  },
  {
    elmentType: LINK_TYPE,
    title: 'UMD Police Department',
    url: 'https://www.umpd.umd.edu',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Public Records Request',
    url: 'https://umd.edu/administration/public-information-request',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Report Fraud and Waste',
    url: 'https://finance.umd.edu/ethics-integrity-and-compliance-reporting',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Policies and Procedures',
    url: 'https://umd.edu/policies-and-procedures',
  },
];

const COLUMN_TWO_DEFAULT_LINKS = [
  {
    elmentType: HEADLINE_TYPE,
    title: 'Information for',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Prospective Undergraduate Students',
    url: 'https://admissions.umd.edu/',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Prospective Graduate Students',
    url: 'https://gradschool.umd.edu/',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Parents & Families',
    url: 'https://admissions.umd.edu/persona/parent-families',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Alumni',
    url: 'https://alumni.umd.edu/',
  },
];

const COLUMN_THREE_DEFAULT_LINKS = [
  {
    elmentType: HEADLINE_TYPE,
    title: 'Academics',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Academic Calendars',
    url: 'https://provost.umd.edu/node/3876',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Course Catalogs',
    url: 'https://academiccatalog.umd.edu',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Libraries',
    url: 'https://www.lib.umd.edu',
  },
  {
    elmentType: LINK_TYPE,
    title: 'Terp Portals',
    url: 'https://testudo.umd.edu',
  },
];

// prettier-ignore
export const LinkColumnStyles = `
  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LINKS_COLUMNS_CONTAINER} {
      padding-top: ${spacing.md};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMNS_CONTAINER} {
      display: flex;
    }
  }

  .${ROW_LINKS_COLUMNS_CONTAINER} a:hover,
  .${ROW_LINKS_COLUMNS_CONTAINER} a:focus {
    background-size: 100% 1px;
    color: ${colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SLOT_COLUMN_HEADLINE}`]: typography['.umd-interactive-sans-medium'],
    },
  })}

  .${SLOT_COLUMN_HEADLINE} {
    font-weight: ${fontWeight.extraBold};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${SLOT_COLUMN_FONTS}`]: typography['.umd-sans-smaller']
    },
  })}

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 ${spacing.md};
    }
  }

  @container umd-footer (max-width: ${BREAKPOINTS.medium - 1}px) {
    .${ROW_LINKS_COLUMN_WRAPPER}:not(:last-child) {
      margin-bottom: ${spacing.lg};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} {
      padding-right: ${spacing.xs};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER}:not(:first-child) {
      margin-left: ${spacing.lg};
      padding-left: ${spacing.lg};
      border-left: 1px solid ${colors.gray.dark};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} > p {
      grid-column: 1 / span 2;
    }
  }

  .${ROW_LINKS_COLUMN_WRAPPER} > div:not(:last-child) {
    margin-bottom: ${spacing.sm};
  }

  .${ROW_LINKS_COLUMN_WRAPPER} > p {
    margin-bottom: ${spacing.sm};
  }
`;

const CreateColumn = ({
  slotElement,
  defaultContent,
}: {
  slotElement?: HTMLSlotElement;
  defaultContent?: ColumnRow[];
}) => {
  const container = document.createElement('div');

  container.classList.add(ROW_LINKS_COLUMN_WRAPPER);

  if (slotElement) {
    container.appendChild(slotElement);
  } else {
    if (defaultContent) {
      defaultContent.forEach((row) => {
        if (row.elmentType === LINK_TYPE) {
          if (row.url) {
            const wrapper = document.createElement('div');
            const link = document.createElement('a');
            link.textContent = row.title;
            link.href = row.url;
            link.classList.add(SLOT_COLUMN_FONTS);
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            wrapper.appendChild(link);
            container.appendChild(wrapper);
          }
        } else if (row.elmentType === HEADLINE_TYPE) {
          const headline = document.createElement('p');
          headline.textContent = row.title;
          headline.classList.add(SLOT_COLUMN_HEADLINE);
          container.appendChild(headline);
        }
      });
    }
  }

  return container;
};

export const CreateLinkColumns = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  const slotOne = element.querySelector(
    `[slot="${SLOT_COLUMN_ONE_NAME}"]`,
  ) as HTMLSlotElement;
  const slotTwo = element.querySelector(
    `[slot="${SLOT_COLUMN_TWO_NAME}"]`,
  ) as HTMLSlotElement;
  const slotThree = element.querySelector(
    `[slot="${SLOT_COLUMN_THREE_NAME}"]`,
  ) as HTMLSlotElement;
  const hasSlot = slotOne || slotTwo || slotThree;

  if (hasSlot) {
    if (slotOne) {
      const slotElement = MakeSlot({ type: SLOT_COLUMN_ONE_NAME });
      container.appendChild(CreateColumn({ slotElement }));
    }
    if (slotTwo) {
      const slotElement = MakeSlot({ type: SLOT_COLUMN_TWO_NAME });
      container.appendChild(CreateColumn({ slotElement }));
    }
    if (slotThree) {
      const slotElement = MakeSlot({ type: SLOT_COLUMN_THREE_NAME });
      container.appendChild(CreateColumn({ slotElement }));
    }
  } else {
    container.appendChild(
      CreateColumn({ defaultContent: COLUMN_ONE_DEFAULT_LINKS }),
    );
    container.appendChild(
      CreateColumn({ defaultContent: COLUMN_TWO_DEFAULT_LINKS }),
    );
    container.appendChild(
      CreateColumn({ defaultContent: COLUMN_THREE_DEFAULT_LINKS }),
    );
  }

  container.classList.add(ROW_LINKS_COLUMNS_CONTAINER);

  return container;
};
