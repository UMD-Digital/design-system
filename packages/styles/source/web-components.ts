import { color, media, spacing } from '@universityofmaryland/web-token-library';

type ElementStyles = Record<string, any>;

const createElementStyles = (
  elementName: string,
  additionalStyles: ElementStyles = {},
) => ({
  [`${elementName}:not(:defined)`]: {
    contentVisibility: 'hidden',
    containIntrinsicSize: 'auto 10vh',
    minHeight: '10vh',
    ...additionalStyles.notDefined,
  },
  [`${elementName}:defined`]: {
    contentVisibility: 'visible',
    containerType: 'inline-size',
    display: 'block',
    position: 'relative',
    ...additionalStyles.defined,
  },

  ...additionalStyles.custom,
});

const createBatchStyles = (
  names: string[],
  prefix: string,
  overrides: ElementStyles = {},
) =>
  names.reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`${prefix}${name}`, overrides),
    }),
    {},
  );

// ---------------------------------------------------------------------------
// Simple elements (umd-element-*) with default display toggle
// ---------------------------------------------------------------------------

const simpleElements = createBatchStyles(
  [
    'alert-page',
    'alert-site',
    'banner-promo',
    'card-video',
    'events-date',
    'logo',
    'nav-slider',
    'media-inline',
    'media-gif',
    'modal',
    'pathway-highlight',
    'person-bio',
    'quote',
    'slider-events-feed',
    'slider-events',
    'stat',
  ],
  'umd-element-',
);

// ---------------------------------------------------------------------------
// Feed elements (umd-feed-*)
// ---------------------------------------------------------------------------

const feedElements = createBatchStyles(
  [
    'expert-bio',
    'experts-list',
    'experts-grid',
    'expert-in-the-news',
    'events',
    'events-grouped',
    'events-list',
    'in-the-news-grid',
    'in-the-news-list',
    'news',
    'news-list',
    'news-featured',
  ],
  'umd-feed-',
);

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

// Cards need per-element custom selectors, so we build them individually
const cardListStyles = [
  'article',
  'card',
  'card-icon',
  'event',
  'event-time',
  'person',
].reduce(
  (acc, type) => ({
    ...acc,
    ...createElementStyles(`umd-element-${type}`, {
      notDefined: {
        contentVisibility: 'hidden',
        minHeight: `5vh`,
        display: 'block',
      },
      defined: {
        contentVisibility: 'visible',
        containerType: 'inline-size',
        display: 'block',
      },
      custom: {
        [`umd-element-${type}[display="list"] + umd-element-${type}[display="list"]`]:
          {
            marginTop: spacing.md,
            paddingTop: spacing.md,
            borderTop: `1px solid ${color.gray.light}`,
          },
        [`umd-element-${type}[display="list"][data-theme="dark"]  + umd-element-${type}[data-theme="dark"]`]:
          {
            marginTop: spacing.md,
            paddingTop: spacing.md,
            borderTop: `1px solid ${color.gray.dark}`,
          },
        [`umd-element-${type}[data-display="list"] + umd-element-${type}[data-display="list"]`]:
          {
            marginTop: spacing.md,
            paddingTop: spacing.md,
            borderTop: `1px solid ${color.gray.light}`,
          },
        [`umd-element-${type}[data-display="list"][data-theme="dark"] + umd-element-${type}[data-display="list"][data-theme="dark"]`]:
          {
            marginTop: spacing.md,
            paddingTop: spacing.md,
            borderTop: `1px solid ${color.gray.dark}`,
          },
      },
    }),
  }),
  {},
);

const cardOverlay = createElementStyles('umd-element-card-overlay', {
  custom: {
    ['umd-element-card-overlay.size-large']: {
      minHeight: '320px',

      [`@media (${media.queries.tablet.min})`]: {
        minHeight: '560px',
      },
    },

    ['umd-element-card-overlay[display="list"] + umd-element-card-overlay[display="list"]']:
      {
        marginTop: spacing.md,
      },
    ['umd-element-card-overlay[data-display="list"] + umd-element-card-overlay[data-display="list"]']:
      {
        marginTop: spacing.md,
      },
  },
});

const brandCardStack = createElementStyles('umd-element-brand-card-stack', {
  notDefined: {
    contentVisibility: 'hidden',
    containIntrinsicSize: 'auto 100vh',
    minHeight: `100vh`,
    display: 'block',
  },
  defined: {
    contentVisibility: 'visible',
    containerType: 'inline-size',
    display: 'block',
  },
});

// ---------------------------------------------------------------------------
// Carousels (bare tag names, no prefix)
// ---------------------------------------------------------------------------

const carousels = createBatchStyles(
  [
    'carousel',
    'carousel-cards',
    'carousel-image',
    'carousel-image-wide',
    'carousel-multiple-image',
    'carousel-people',
    'carousel-thumbnail',
  ],
  '',
  {
    notDefined: {
      contentVisibility: 'hidden',
      containIntrinsicSize: 'auto 80vh',
      minHeight: `80vh`,
      display: 'block',
    },
    defined: {
      contentVisibility: 'visible',
      containerType: 'inline-size',
      display: 'block',
    },
  },
);

// ---------------------------------------------------------------------------
// Heroes
// ---------------------------------------------------------------------------

const heroes = {
  ...createBatchStyles(
    [
      'umd-element-hero',
      'umd-element-hero-expand',
      'umd-element-hero-logo',
      'umd-element-person-hero',
    ],
    '',
    {
      notDefined: {
        contentVisibility: 'hidden',
        containIntrinsicSize: 'auto 50vh',
        minHeight: `50vh`,
        display: 'block',
      },
      defined: {
        contentVisibility: 'visible',
        containerType: 'inline-size',
        display: 'block',
      },
    },
  ),
  ...createBatchStyles(
    ['umd-element-hero-brand-video', 'umd-element-hero-grid'],
    '',
    {
      notDefined: {
        contentVisibility: 'hidden',
        containIntrinsicSize: 'auto 100vh',
        minHeight: `100vh`,
        display: 'block',
      },
      defined: {
        contentVisibility: 'visible',
        containerType: 'inline-size',
        display: 'block',
      },
    },
  ),
  ...createElementStyles('umd-element-hero-minimal', {
    notDefined: {
      contentVisibility: 'hidden',
      containIntrinsicSize: 'auto 30vh',
      minHeight: `30vh`,
      display: 'block',
    },
    defined: {
      contentVisibility: 'visible',
      containerType: 'inline-size',
      display: 'block',
    },
  }),
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const navigation = {
  ...createElementStyles('umd-element-navigation-header', {
    notDefined: {
      contentVisibility: 'hidden',
      containIntrinsicSize: 'auto 44px',
      backgroundColor: color.white,
      height: '60px',
      '& > *': { display: 'none' },
    },
    defined: {
      containerType: 'normal',
    },
  }),
  ...createElementStyles('umd-element-nav-item', {
    notDefined: {
      display: 'none',
    },
    defined: {
      containerType: 'normal',
      display: 'block',
    },
  }),
  ...createElementStyles('umd-element-nav-drawer', {
    notDefined: {
      contentVisibility: 'hidden',
      containIntrinsicSize: '44px 44px',
      backgroundColor: color.white,
      height: '44px',
      width: '44px',
      '& > *': { display: 'none' },
    },
  }),
  ...createElementStyles('umd-element-navigation-sticky', {
    custom: {
      ['umd-element-navigation-sticky']: {
        position: 'relative',
        zIndex: '9999',
      },
    },
  }),
  ...createElementStyles('umd-element-navigation-utility', {
    notDefined: {
      display: 'block !important',
      minHeight: '44px !important',
      containIntrinsicSize: 'auto !important',
      '& > *': { display: 'none' },
    },
    defined: {
      position: 'relative',
      zIndex: '9999',

      '& > *': { display: 'block' },
    },
    custom: {
      ['umd-element-navigation-utility']: {
        minHeight: '44px',
        backgroundColor: color.red,
      },
    },
  }),
};

// ---------------------------------------------------------------------------
// Miscellaneous elements (alphabetical)
// ---------------------------------------------------------------------------

const accordion = createElementStyles('umd-element-accordion-item', {
  notDefined: {
    contentVisibility: 'hidden',
    minHeight: `5vh`,
    display: 'block',
  },
  defined: {
    contentVisibility: 'visible',
    containerType: 'inline-size',
    display: 'block',
  },
  custom: {
    'umd-element-accordion-item + umd-element-accordion-item': {
      marginTop: spacing.min,
    },
  },
});

const brandLogoAnimation = createElementStyles(
  'umd-element-brand-logo-animation',
  {
    defined: {
      position: 'absolute',
      right: '0',
      top: '-3vw',
      height: '25vw',
      zIndex: '9',
      overflow: 'clip',
      containerType: 'normal',

      [`@media (${media.queries.highDef.min})`]: {
        top: '-11vw',
        height: '50vw',
      },
    },
  },
);

// Breadcrumb
const breadcrumb = createElementStyles('umd-element-breadcrumb', {
  defined: {
    display: 'block',
    marginTop: `${spacing.sm}`,
  },
});

// Call to action
const callToAction = createElementStyles('umd-element-call-to-action', {
  defined: {
    containerType: 'normal',
  },
});

// Footer
const footer = createElementStyles('umd-element-footer', {
  notDefined: {
    contentVisibility: 'hidden',
    backgroundColor: color.black,
    containIntrinsicSize: 'auto 50vh',
    minHeight: '50vh',
    display: 'none',
  },
  defined: {
    display: 'block',
  },
});

// Layout expand
const layoutExpand = createElementStyles('umd-layout-image-expand', {
  notDefined: {
    contentVisibility: 'hidden',
    containIntrinsicSize: 'auto 100vh',
    minHeight: `100vh`,
  },
  defined: {
    contentVisibility: 'visible',
    containerType: 'inline-size',
  },
});

// Pathway
const pathway = createElementStyles('umd-element-pathway', {
  notDefined: {
    contentVisibility: 'hidden',
    containIntrinsicSize: 'auto 40vh',
    minHeight: `40vh`,
    display: 'block',
  },
  defined: {
    contentVisibility: 'visible',
    containerType: 'inline-size',
    display: 'block',
  },
});

// Scroll top
const scrollTopTag = 'umd-element-scroll-top';
const scrollTop = createElementStyles(scrollTopTag, {
  defined: {
    height: '40px',
    width: '40px',
  },
  custom: {
    [`* + ${scrollTopTag}`]: { marginTop: spacing.md },
    [`${scrollTopTag}[fixed], ${scrollTopTag}[data-layout-fixed="true"]`]: {
      position: 'fixed',
      right: '8px',
      bottom: '10vh',
      zIndex: '9999',

      [`@media (${media.queries.tablet.min})`]: {
        height: '52px',
        width: '52px',
        right: '40px',
      },
    },
  },
});

// Section intro
const sectionIntro = {
  ...['section-intro-wide', 'section-intro'].reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`umd-element-${name}`, {
        custom: {
          [`umd-element-section-intro-wide + *, umd-element-section-intro + *`]:
            {
              marginTop: spacing.lg,

              [`@media (${media.queries.tablet.min})`]: {
                marginTop: `${spacing['2xl']}`,
              },
            },
        },
      }),
    }),
    {},
  ),
};

// Social sharing
const socialSharingTag = 'umd-element-social-sharing';
const socialSharing = createElementStyles(socialSharingTag, {
  custom: {
    [`* + ${socialSharingTag}`]: { marginTop: spacing.md },
    [`${socialSharingTag}[fixed], ${socialSharingTag}[data-layout-fixed="true"]`]:
      {
        [`@media (${media.queries.tablet.min})`]: {
          position: 'fixed',
          left: '0',
          top: '30vh',
          zIndex: '9999',
        },
        [`@media (${media.queries.desktop.min})`]: {
          left: '40px',
        },
      },
  },
});

// Sticky columns
const stickyColumns = createElementStyles('umd-element-sticky-columns', {
  notDefined: {
    display: 'none',
  },
  defined: {
    display: 'block',
  },
});

// Tabs
const tabsTag = 'umd-element-tabs';
const tabs = createElementStyles(tabsTag, {
  custom: {
    [`${tabsTag} + *`]: { marginTop: spacing.lg },
  },
});

// ---------------------------------------------------------------------------
// Person tabular — must spread AFTER cardListStyles so its default
// :defined / :not(:defined) values overwrite the card-specific overrides
// for umd-element-person.
// ---------------------------------------------------------------------------

const personTabular = createElementStyles('umd-element-person', {
  custom: {
    ['umd-element-person[data-display="tabular"] + umd-element-person[data-display="tabular"]']:
      {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTop: `1px solid ${color.gray.light}`,
      },
    ['umd-element-person[data-display="tabular"][data-theme="dark"] + umd-element-person[data-display="tabular"][data-theme="dark"]']:
      {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTop: `1px solid ${color.gray.dark}`,
      },
  },
});

// ---------------------------------------------------------------------------
// Export — merge order matters (see personTabular comment above)
// ---------------------------------------------------------------------------

export const webComponentStyles = {
  ...simpleElements,
  ...accordion,
  ...brandLogoAnimation,
  ...cardOverlay,
  ...feedElements,
  ...callToAction,
  ...breadcrumb,
  ...brandCardStack,
  ...cardListStyles,
  ...carousels,
  ...footer,
  ...heroes,
  ...layoutExpand,
  ...pathway,
  ...personTabular,
  ...navigation,
  ...scrollTop,
  ...sectionIntro,
  ...socialSharing,
  ...stickyColumns,
  ...tabs,
};
