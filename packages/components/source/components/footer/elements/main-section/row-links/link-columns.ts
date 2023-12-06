import {
  animatedLinks,
  colors,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { fontWeight } from '@universityofmaryland/umd-web-configuration/dist/tokens/fonts';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  VARIABLES,
} from 'components/footer/globals';
import { SlotDefaultStyling } from 'helpers/ui';

const LINK_TYPE = 'link';
const HEADLINE_TYPE = 'headline';

type ColumnRow = {
  elmentType: string;
  title: string;
  url?: string;
};

const ROW_LINKS_COLUMNS_CONTAINER = 'umd-footer-row-links-columns';
const ROW_LINKS_COLUMN_WRAPPER = 'umd-footer-row-links-column-wrapper';
const ROW_LINKS_COLUMN_HEADLINE = `link-column-headline`;
const ROW_LINKS_COLUMN_LINKS = `link-column-fonts`;

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
const HeadlineStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_COLUMN_HEADLINE}`]:
        typography['.umd-interactive-sans-medium'],
    },
  })}
  
  .${ROW_LINKS_COLUMN_HEADLINE} {
    margin-bottom: ${spacing.sm};
    font-weight: ${fontWeight.extraBold};
  }
`;

// prettier-ignore
const LinkStyles = `
  .${ROW_LINKS_COLUMN_LINKS}:not(:last-child) {
    margin-bottom: ${spacing.sm};
  }

  .${ROW_LINKS_COLUMN_LINKS} > * {
    margin-bottom: ${spacing.sm};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_COLUMN_LINKS} a`]: typography['.umd-sans-smaller'],
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_COLUMN_LINKS} a`]:
        animatedLinks['.umd-slidein-underline-white'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.ELEMENT_WRAPPER}[theme="${VARIABLES.THEME_OPTION_LIGHT}"] .${ROW_LINKS_COLUMN_LINKS} a`]:
        animatedLinks['.umd-slidein-underline-black'],
    },
  })}
`;

// prettier-ignore
const ColumnWrapper = `
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
`

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

  ${ColumnWrapper}
  ${HeadlineStyles}
  ${LinkStyles}
`;

const CreateDefaultColumn = ({
  defaultContent,
}: {
  defaultContent: ColumnRow[];
}) => {
  const container = document.createElement('div');

  container.classList.add(ROW_LINKS_COLUMN_WRAPPER);

  defaultContent.forEach((row) => {
    if (row.elmentType === LINK_TYPE) {
      if (row.url) {
        const wrapper = document.createElement('div');
        const link = document.createElement('a');
        const span = document.createElement('span');

        span.textContent = row.title;
        link.appendChild(span);

        link.href = row.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        wrapper.classList.add(ROW_LINKS_COLUMN_LINKS);
        wrapper.appendChild(link);
        container.appendChild(wrapper);
      }
    } else if (row.elmentType === HEADLINE_TYPE) {
      const headline = document.createElement('p');
      headline.textContent = row.title;
      headline.classList.add(ROW_LINKS_COLUMN_HEADLINE);
      container.appendChild(headline);
    }
  });

  return container;
};

const CreateSlotColumn = ({
  element,
  ref,
}: {
  element: HTMLElement;
  ref: string;
}) => {
  const slot = SlotDefaultStyling({
    element,
    slotRef: ref,
  });

  if (slot) {
    const isElementSlot = slot?.hasAttribute('slot');
    let elementToAppend = slot;

    if (!isElementSlot) {
      const wrapper = document.createElement('div');
      const links = Array.from(elementToAppend.querySelectorAll('a')).map(
        (link) => {
          const linkWrapper = document.createElement('div');
          linkWrapper.classList.add(ROW_LINKS_COLUMN_LINKS);
          linkWrapper.appendChild(link);
          return linkWrapper;
        },
      );

      links.forEach((link) => {
        wrapper.appendChild(link);
      });

      elementToAppend = wrapper;
    }

    elementToAppend.classList.add(ROW_LINKS_COLUMN_WRAPPER);

    return elementToAppend;
  }
};

export const CreateLinkColumns = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  const slotOne = element.querySelector(
    `[slot="${SLOTS.LINK_COLUMN_ONE}"]`,
  ) as HTMLSlotElement;
  const slotTwo = element.querySelector(
    `[slot="${SLOTS.LINK_COLUMN_TWO}"]`,
  ) as HTMLSlotElement;
  const slotThree = element.querySelector(
    `[slot="${SLOTS.LINK_COLUMN_THREE}"]`,
  ) as HTMLSlotElement;
  const slots = [
    { slotElement: slotOne, ref: SLOTS.LINK_COLUMN_ONE },
    { slotElement: slotTwo, ref: SLOTS.LINK_COLUMN_TWO },
    { slotElement: slotThree, ref: SLOTS.LINK_COLUMN_THREE },
  ];
  const hasSlot = slotOne || slotTwo || slotThree;

  if (hasSlot) {
    slots.forEach(({ slotElement, ref }) => {
      if (slotElement) {
        const slotToAppend = CreateSlotColumn({ element, ref });
        if (slotToAppend) container.appendChild(slotToAppend);
      }
    });
  } else {
    container.appendChild(
      CreateDefaultColumn({ defaultContent: COLUMN_ONE_DEFAULT_LINKS }),
    );
    container.appendChild(
      CreateDefaultColumn({ defaultContent: COLUMN_TWO_DEFAULT_LINKS }),
    );
    container.appendChild(
      CreateDefaultColumn({ defaultContent: COLUMN_THREE_DEFAULT_LINKS }),
    );
  }

  container.classList.add(ROW_LINKS_COLUMNS_CONTAINER);

  return container;
};
