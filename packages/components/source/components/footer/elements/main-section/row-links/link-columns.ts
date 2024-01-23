import {
  animatedLinks,
  colors,
  spacing,
  fontWeight,
  typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  VARIABLES,
} from 'components/footer/globals';
import { SlotDefaultStyling } from 'helpers/ui';

const HEADLINE_ATTRIBUTE = 'data-headline';
const HEADLINE_ATTRIBUTE_EMPTY = 'data-empty';
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

  @media (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LINKS_COLUMN_HEADLINE}[${HEADLINE_ATTRIBUTE_EMPTY}="true"] {
      display: none;
    }
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
  @media (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 ${spacing.md};
    }
  }

  @media (max-width: ${BREAKPOINTS.medium - 1}px) {
    .${ROW_LINKS_COLUMN_WRAPPER}:not(:last-child) {
      margin-bottom: ${spacing.lg};
    }
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} {
      padding-right: ${spacing.xs};
    }
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER}:not(:first-child) {
      margin-left: ${spacing.lg};
      padding-left: ${spacing.lg};
      border-left: 1px solid ${colors.gray.dark};
    }
  }

  @media (min-width: ${BREAKPOINTS.medium}px) and (max-width: ${BREAKPOINTS.large}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} > p {
      grid-column: 1 / span 2;
    }
  }
`

// prettier-ignore
export const LinkColumnStyles = `
  @media (max-width: ${BREAKPOINTS.large - 1}px) {
    .${ROW_LINKS_COLUMNS_CONTAINER} {
      padding-top: ${spacing.md};
    }
  }

  @media (min-width: ${BREAKPOINTS.large}px) {
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
  slotRef,
  hasHeadlines,
}: {
  element: HTMLElement;
  slotRef: string;
  hasHeadlines: boolean;
}) => {
  const slot = SlotDefaultStyling({
    element,
    slotRef,
  });

  if (slot) {
    const isElementSlot = slot.hasAttribute('slot');
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

      if (hasHeadlines) {
        const headline = slot.getAttribute(HEADLINE_ATTRIBUTE) as string;

        const headlineElement = document.createElement('p');
        headlineElement.classList.add(ROW_LINKS_COLUMN_HEADLINE);
        headlineElement.innerHTML = headline;

        if (!headline)
          headlineElement.setAttribute(HEADLINE_ATTRIBUTE_EMPTY, 'true');

        wrapper.appendChild(headlineElement);
      }

      links.forEach((link) => {
        wrapper.appendChild(link);
      });

      elementToAppend = wrapper;
    } else {
    }

    elementToAppend.classList.add(ROW_LINKS_COLUMN_WRAPPER);

    return elementToAppend;
  }
};

export const CreateLinkColumns = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');

  const slotList = [
    { slotRef: SLOTS.LINK_COLUMN_ONE },
    { slotRef: SLOTS.LINK_COLUMN_TWO },
    { slotRef: SLOTS.LINK_COLUMN_THREE },
  ];
  const hasSlot = slotList.some(
    ({ slotRef }) =>
      element.querySelector(`[slot="${slotRef}"]`) as HTMLSlotElement,
  );

  if (hasSlot) {
    const hasHeadlines = slotList.some(({ slotRef }) => {
      const slot = element.querySelector(`[slot="${slotRef}"]`);
      if (slot) return slot.hasAttribute(HEADLINE_ATTRIBUTE);
      return false;
    });

    slotList.forEach(({ slotRef }) => {
      const slotToAppend = CreateSlotColumn({ element, slotRef, hasHeadlines });
      if (slotToAppend) container.appendChild(slotToAppend);
    });

    if (hasHeadlines) {
      setTimeout(() => {
        const shadowRoot = element.shadowRoot as ShadowRoot;
        const headlines = Array.from(
          shadowRoot.querySelectorAll(`.${ROW_LINKS_COLUMN_HEADLINE}`),
        ) as HTMLDivElement[];

        const renderedHeadlinesSize = headlines.reduce((acc, headline) => {
          return headline.offsetHeight > acc ? headline.offsetHeight : acc;
        }, 10);

        headlines.forEach((headline) => {
          headline.style.height = `${renderedHeadlinesSize}px`;
        });
      }, 200);
    }
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
