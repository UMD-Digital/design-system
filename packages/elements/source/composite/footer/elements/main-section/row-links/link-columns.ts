import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../../../_types';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../../globals';

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

const HEADLINE_ATTRIBUTE = 'data-headline';
const HEADLINE_ATTRIBUTE_EMPTY = 'data-empty';
const LINK_TYPE = 'link';
const HEADLINE_TYPE = 'headline';

const ROW_LINKS_COLUMNS_CONTAINER = 'umd-footer-row-links-columns';
const ROW_LINKS_COLUMN_WRAPPER = 'umd-footer-row-links-column-wrapper';
const ROW_LINKS_COLUMN_HEADLINE = 'link-column-headline';
const ROW_LINKS_COLUMN_LINKS = 'link-column-fonts';

type ColumnRow = {
  elmentType: string;
  title: string;
  url?: string;
};

const COLUMN_ONE_DEFAULT_LINKS: ColumnRow[] = [
  { elmentType: LINK_TYPE, title: 'Careers', url: 'https://ejobs.umd.edu' },
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

const COLUMN_TWO_DEFAULT_LINKS: ColumnRow[] = [
  { elmentType: HEADLINE_TYPE, title: 'Information for' },
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
  { elmentType: LINK_TYPE, title: 'Alumni', url: 'https://alumni.umd.edu/' },
];

const COLUMN_THREE_DEFAULT_LINKS: ColumnRow[] = [
  { elmentType: HEADLINE_TYPE, title: 'Academics' },
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
  { elmentType: LINK_TYPE, title: 'Libraries', url: 'https://www.lib.umd.edu' },
  {
    elmentType: LINK_TYPE,
    title: 'Terp Portals',
    url: 'https://testudo.umd.edu',
  },
];

const createDefaultColumn = (defaultContent: ColumnRow[]): ElementVisual => {
  const children: ElementVisual[] = defaultContent
    .map((row) => {
      if (row.elmentType === LINK_TYPE && row.url) {
        const link = document.createElement('a');
        const span = document.createElement('span');
        span.textContent = row.title;
        link.appendChild(span);
        link.href = row.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        return ElementModel.createDiv({
          className: ROW_LINKS_COLUMN_LINKS,
          children: [
            ElementModel.create({
              element: link,
              className: `${ROW_LINKS_COLUMN_LINKS}-link`,
            }),
          ],
        });
      }

      if (row.elmentType === HEADLINE_TYPE) {
        const headline = document.createElement('p');
        headline.textContent = row.title;
        return ElementModel.create({
          element: headline,
          className: ROW_LINKS_COLUMN_HEADLINE,
          elementStyles: {
            element: {
              ...typography.elements.interativeMedium,
              marginBottom: token.spacing.sm,
              fontWeight: 700,
            },
          },
        });
      }

      return undefined as unknown as ElementVisual;
    })
    .filter(Boolean) as ElementVisual[];

  return ElementModel.createDiv({
    className: ROW_LINKS_COLUMN_WRAPPER,
    children,
  });
};

const createSlotColumn = ({
  slot,
  hasHeadlines,
  isColumnOne,
}: {
  slot: HTMLElement;
  hasHeadlines: boolean;
  isColumnOne: boolean;
}): ElementVisual => {
  const linkChildren: ElementVisual[] = Array.from(
    slot.querySelectorAll('a'),
  ).map((link) => {
    Utils.markup.modify.animationLinkSpan({ element: link });
    return ElementModel.createDiv({
      className: ROW_LINKS_COLUMN_LINKS,
      children: [
        ElementModel.create({
          element: link,
          className: `${ROW_LINKS_COLUMN_LINKS}-link`,
        }),
      ],
    });
  });

  const wrapperChildren: ElementVisual[] = [];

  if (hasHeadlines) {
    const headlineAttr = slot.getAttribute(HEADLINE_ATTRIBUTE) ?? '';
    const headline = document.createElement('p');
    headline.innerHTML = headlineAttr;
    if (!headlineAttr && !isColumnOne) {
      headline.setAttribute(HEADLINE_ATTRIBUTE_EMPTY, 'true');
    }

    wrapperChildren.push(
      ElementModel.create({
        element: headline,
        className: ROW_LINKS_COLUMN_HEADLINE,
        elementStyles: {
          element: {
            ...typography.elements.interativeMedium,
            marginBottom: token.spacing.sm,
            fontWeight: 700,
          },
        },
      }),
    );
  }

  wrapperChildren.push(...linkChildren);

  return ElementModel.createDiv({
    className: ROW_LINKS_COLUMN_WRAPPER,
    children: wrapperChildren,
  });
};

export interface slotColumnsProps {
  slotColumns?: HTMLSlotElement[];
}

export default (props: slotColumnsProps): ElementVisual => {
  const { slotColumns } = props;

  let children: ElementVisual[];

  if (slotColumns) {
    const hasHeadlines = slotColumns.some((slot) =>
      slot.hasAttribute(HEADLINE_ATTRIBUTE),
    );

    children = slotColumns.map((slot, index) =>
      createSlotColumn({ slot, hasHeadlines, isColumnOne: index === 0 }),
    );

    if (hasHeadlines) {
      setTimeout(() => {
        const headlines = Array.from(
          document.querySelectorAll(`.${ROW_LINKS_COLUMN_HEADLINE}`),
        ) as HTMLElement[];
        const renderedHeadlinesSize = headlines.reduce(
          (acc, h) => Math.max(acc, h.offsetHeight),
          10,
        );
        headlines.forEach(
          (h) => (h.style.height = `${renderedHeadlinesSize}px`),
        );
      }, 200);
    }
  } else {
    children = [
      createDefaultColumn(COLUMN_ONE_DEFAULT_LINKS),
      createDefaultColumn(COLUMN_TWO_DEFAULT_LINKS),
      createDefaultColumn(COLUMN_THREE_DEFAULT_LINKS),
    ];
  }

  return ElementModel.createDiv({
    className: ROW_LINKS_COLUMNS_CONTAINER,
    children,
  });
};
