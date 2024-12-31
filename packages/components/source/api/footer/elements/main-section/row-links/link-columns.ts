import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/web-elements-styles';
import { Styles, Markup } from 'utilities';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  VARIABLES,
  REFERENCES,
} from '../../../globals';

const { Colors, Spacing } = Tokens;

const { convertJSSObjectToStyles } = Styles;
const { SlotWithDefaultStyling } = Markup.create;
const { AnimationLinkSpan } = Markup.modify;

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { LINK_COLUMN_ONE, LINK_COLUMN_TWO, LINK_COLUMN_THREE } = SLOTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

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
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_COLUMN_HEADLINE}`]: Typography.elements.interativeMedium,
    },
  })}

  .${ROW_LINKS_COLUMN_HEADLINE} {
    margin-bottom: ${Spacing.sm};
    font-weight: 700;
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LINKS_COLUMN_HEADLINE}[${HEADLINE_ATTRIBUTE_EMPTY}="true"] {
      display: none;
    }
  }
`;

// prettier-ignore
const LinkStyles = `
  .${ROW_LINKS_COLUMN_LINKS}:not(:last-child) {
    margin-bottom: ${Spacing.sm};
  }

  .${ROW_LINKS_COLUMN_LINKS} > * {
    margin-bottom: ${Spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_COLUMN_LINKS} a`]: Typography.sans.smaller,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ROW_LINKS_COLUMN_LINKS} a`]:
      Animations.line.slideUnderWhite
    },
  })}

  .${ROW_LINKS_COLUMN_LINKS} a,
  .${ROW_LINKS_COLUMN_LINKS} span {
    color: ${Colors.gray.light};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${ROW_LINKS_COLUMN_LINKS} a`]:
      Animations.line.slideUnderBlack
    },
  })}
`;

// prettier-ignore
const ColumnWrapper = `
  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${ROW_LINKS_COLUMN_WRAPPER}:not(:last-child) {
      margin-bottom: ${Spacing.lg};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} {
      padding-right: ${Spacing.xs};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LINKS_COLUMN_WRAPPER}:not(:first-child) {
      margin-left: ${Spacing.lg};
      padding-left: ${Spacing.lg};
      border-left: 1px solid ${Colors.gray.dark};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px) {
    .${ROW_LINKS_COLUMN_WRAPPER} > p {
      grid-column: 1 / span 2;
    }
  }
`

// prettier-ignore
export const LinkColumnStyles = `
  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${ROW_LINKS_COLUMNS_CONTAINER} {
      padding-top: ${Spacing.md};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${ROW_LINKS_COLUMNS_CONTAINER} {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
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
  isColumnOne,
}: {
  element: HTMLElement;
  slotRef: string;
  hasHeadlines: boolean;
  isColumnOne: boolean;
}) => {
  const slot = SlotWithDefaultStyling({
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
          AnimationLinkSpan({ element: link });
          linkWrapper.appendChild(link);
          return linkWrapper;
        },
      );

      if (hasHeadlines) {
        const headline = slot.getAttribute(HEADLINE_ATTRIBUTE) as string;
        const headlineElement = document.createElement('p');
        headlineElement.classList.add(ROW_LINKS_COLUMN_HEADLINE);
        headlineElement.innerHTML = headline;

        if (!headline && !isColumnOne) {
          headlineElement.setAttribute(HEADLINE_ATTRIBUTE_EMPTY, 'true');
          wrapper.appendChild(headlineElement);
        }

        if (headline) {
          wrapper.appendChild(headlineElement);
        }
      }

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

  const slotList = [
    { slotRef: LINK_COLUMN_ONE },
    { slotRef: LINK_COLUMN_TWO },
    { slotRef: LINK_COLUMN_THREE },
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

    slotList.forEach(({ slotRef }, index) => {
      const slotToAppend = CreateSlotColumn({
        element,
        slotRef,
        hasHeadlines,
        isColumnOne: index === 0,
      });
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
