import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import { animationLinkSpan } from '@universityofmaryland/web-utilities-library/animation';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../../../_types';
import { BREAKPOINTS } from '../../../globals';
import { BaseProps } from 'composite/footer/_types';

const { MEDIUM, LARGE } = BREAKPOINTS;

type ColumnRow = {
  elmentType: string;
  title: string;
  url?: string;
};

const COLUMN_ONE_DEFAULT_LINKS: ColumnRow[] = [
  { elmentType: 'link', title: 'Careers', url: 'https://ejobs.umd.edu' },
  {
    elmentType: 'link',
    title: 'Office of Civil Rights & Sexual Misconduct',
    url: 'https://ocrsm.umd.edu',
  },
  {
    elmentType: 'link',
    title: 'UMD Police Department',
    url: 'https://www.umpd.umd.edu',
  },
  {
    elmentType: 'link',
    title: 'Public Records Request',
    url: 'https://umd.edu/administration/public-information-request',
  },
  {
    elmentType: 'link',
    title: 'Report Fraud and Waste',
    url: 'https://finance.umd.edu/ethics-integrity-and-compliance-reporting',
  },
  {
    elmentType: 'link',
    title: 'Policies and Procedures',
    url: 'https://umd.edu/policies-and-procedures',
  },
];

const COLUMN_TWO_DEFAULT_LINKS: ColumnRow[] = [
  { elmentType: 'headline', title: 'Information for' },
  {
    elmentType: 'link',
    title: 'Prospective Undergraduate Students',
    url: 'https://admissions.umd.edu/',
  },
  {
    elmentType: 'link',
    title: 'Prospective Graduate Students',
    url: 'https://gradschool.umd.edu/',
  },
  {
    elmentType: 'link',
    title: 'Parents & Families',
    url: 'https://admissions.umd.edu/persona/parent-families',
  },
  { elmentType: 'link', title: 'Alumni', url: 'https://alumni.umd.edu/' },
];

const COLUMN_THREE_DEFAULT_LINKS: ColumnRow[] = [
  { elmentType: 'headline', title: 'Academics' },
  {
    elmentType: 'link',
    title: 'Academic Calendars',
    url: 'https://provost.umd.edu/node/3876',
  },
  {
    elmentType: 'link',
    title: 'Course Catalogs',
    url: 'https://academiccatalog.umd.edu',
  },
  { elmentType: 'link', title: 'Libraries', url: 'https://www.lib.umd.edu' },
  {
    elmentType: 'link',
    title: 'Terp Portals',
    url: 'https://testudo.umd.edu',
  },
];

const createLinkColumn = (
  props: slotColumnsProps,
  children: ElementVisual[],
) => {
  const { isThemeLight } = props;

  return ElementModel.createDiv({
    className: 'link-column-fonts',
    children: children,
    elementStyles: {
      element: {
        marginBottom: token.spacing.sm,

        ['& > *']: {
          marginBottom: token.spacing.sm,
        },

        ['& a']: {
          ...animation.line.slideUnderWhite,
          ...typography.sans.smaller,

          ...(isThemeLight && {
            ...animation.line.slideUnderBlack,
          }),
        },

        ['& a, & span, & p']: {
          color: token.color.gray.light,

          ...(isThemeLight && {
            color: token.color.gray.dark,
          }),
        },

        [`@container (max-width: ${MEDIUM - 1}px)`]: {
          ['&:last-child']: {
            marginBottom: 0,
          },
        },
      },
    },
  });
};

const createLinkColumnFontsLink = (element: HTMLElement) => {
  return ElementModel.create({
    element: element,
    className: `link-column-fonts-link`,
    elementStyles: {
      element: {
        [`&p`]: {
          gridColumn: '1 / span 2',
        },
      },
    },
  });
};

const createDefaultColumn = (
  props: slotColumnsProps,
  defaultContent: ColumnRow[],
): ElementVisual => {
  const children: ElementVisual[] = defaultContent
    .map((row) => {
      if (row.elmentType === 'link' && row.url) {
        const link = document.createElement('a');
        const span = document.createElement('span');
        const columnLinkChildren = [createLinkColumnFontsLink(link)];

        span.textContent = row.title;
        link.appendChild(span);
        link.href = row.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        return createLinkColumn(props, columnLinkChildren);
      }

      if (row.elmentType === 'headline') {
        const headline = document.createElement('p');

        headline.textContent = row.title;

        return createLinkColumnHeadline(headline);
      }

      return undefined as unknown as ElementVisual;
    })
    .filter(Boolean) as ElementVisual[];

  return createRowLinksColumnWrapper({ children: children });
};

const createRowLinksColumnWrapper = ({
  children,
}: {
  children: ElementVisual[];
}) => {
  return ElementModel.createDiv({
    className: 'umd-footer-row-links-column-wrapper',
    children,
    elementStyles: {
      element: {
        [`@container (min-width: ${MEDIUM}px) and (max-width: ${LARGE}px)`]: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: `0 ${token.spacing.md}`,
        },

        [`@container (max-width: ${MEDIUM}px)`]: {
          ['&:not(:last-child)']: {
            marginBottom: token.spacing.lg,
          },
        },

        [`@container (min-width: ${LARGE}px)`]: {
          paddingRight: token.spacing.xs,
          minWidth: '240px',

          [`&:not(:first-child)`]: {
            marginLeft: token.spacing.lg,
            paddingLeft: token.spacing.lg,
            borderLeft: `1px solid ${token.color.gray.dark}`,
          },
        },
      },
    },
  });
};

const createSlotColumn = ({
  props,
  slot,
  slotHasHeadline,
  isColumnOne,
}: {
  props: slotColumnsProps;
  slot: HTMLElement;
  slotHasHeadline: boolean;
  isColumnOne: boolean;
}): ElementVisual => {
  const linkChildren: ElementVisual[] = Array.from(
    slot.querySelectorAll('a'),
  ).map((link) => {
    animationLinkSpan({ element: link });

    const slotColumnChild = [createLinkColumnFontsLink(link)];

    return createLinkColumn(props, slotColumnChild);
  });

  const wrapperChildren: ElementVisual[] = [];

  if (slotHasHeadline) {
    const headlineAttr = slot.getAttribute('data-headline') ?? '';
    const headline = document.createElement('p');

    headline.innerHTML = headlineAttr;

    if (!headlineAttr && !isColumnOne) {
      headline.setAttribute('data-empty', 'true');
    }

    wrapperChildren.push(createLinkColumnHeadline(headline));
  }

  wrapperChildren.push(...linkChildren);

  return createRowLinksColumnWrapper({ children: wrapperChildren });
};

const createLinkColumnHeadline = (element: HTMLElement) => {
  return ElementModel.create({
    element: element,
    className: 'link-column-headline',
    elementStyles: {
      element: {
        ...typography.elements.interativeMedium,
        marginBottom: token.spacing.sm,
        fontWeight: 700,
        gridColumn: '1 / span 2',
      },
    },
  });
};

export interface slotColumnsProps extends BaseProps {
  slotColumns?: HTMLSlotElement[];
}

export default (props: slotColumnsProps): ElementVisual => {
  const { slotColumns } = props;

  let children: ElementVisual[];

  if (slotColumns) {
    const hasHeadlines = slotColumns.some((slot) =>
      slot.hasAttribute('data-headline'),
    );

    children = slotColumns.map((slot, index) => {
      const slotHasHeadline = slot.hasAttribute('data-headline');
      return createSlotColumn({
        props,
        slot,
        slotHasHeadline,
        isColumnOne: index === 0,
      });
    });

    if (hasHeadlines) {
      setTimeout(() => {
        const headlines = Array.from(
          document.querySelectorAll(`.${'link-column-headline'}`),
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
      createDefaultColumn(props, COLUMN_ONE_DEFAULT_LINKS),
      createDefaultColumn(props, COLUMN_TWO_DEFAULT_LINKS),
      createDefaultColumn(props, COLUMN_THREE_DEFAULT_LINKS),
    ];
  }

  return ElementModel.createDiv({
    className: 'umd-footer-row-links-columns',
    children,
    elementStyles: {
      element: {
        [`@container (min-width: ${LARGE}px)`]: {
          [`&`]: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
          },
        },

        [`@container (max-width: ${LARGE - 1}px)`]: {
          paddingTop: token.spacing.md,
        },
      },
    },
  });
};
