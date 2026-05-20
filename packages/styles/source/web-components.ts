import { color, media, spacing } from '@universityofmaryland/web-token-library';

type ElementStyles = Record<string, any>;

// CLS placeholder sizing.
// vh-based reservations virtually guarantee CLS because real component height
// scales with viewport width, not height. Use px per breakpoint instead.
// Numbers are conservative defaults; calibrate against measured render heights.
type Reservation = {
  mobile: number;
  tablet?: number;
  desktop?: number;
  highDef?: number;
};

const sizeReservation = ({
  mobile,
  tablet,
  desktop,
  highDef,
}: Reservation) => {
  const block = (px: number) => ({
    minHeight: `${px}px`,
    containIntrinsicSize: `auto ${px}px`,
  });
  return {
    ...block(mobile),
    ...(tablet != null && {
      [`@media (${media.queries.tablet.min})`]: block(tablet),
    }),
    ...(desktop != null && {
      [`@media (${media.queries.desktop.min})`]: block(desktop),
    }),
    ...(highDef != null && {
      [`@media (${media.queries.highDef.min})`]: block(highDef),
    }),
  };
};

const createElementStyles = (
  elementName: string,
  additionalStyles: ElementStyles = {},
) => ({
  [`${elementName}:not(:defined)`]: {
    ...additionalStyles.notDefined,
  },
  [`${elementName}:defined`]: {
    ...additionalStyles.defined,
  },

  ...additionalStyles.custom,
});

const createBatchStyles = (
  names: string[],
  prefix: string,
  overrides: ElementStyles = {},
) =>
  names.reduce((acc, name) => {
    const elementName = `${prefix}${name}`;
    return {
      ...acc,
      ...createElementStyles(elementName, overrides),
      [`${elementName}:not(:defined)`]: {
        contentVisibility: 'hidden',
        ...overrides.notDefined,

        '& > *': { display: 'none' },
      },
      [`${elementName}:defined`]: {
        contentVisibility: 'visible',
        containerType: 'inline-size',
        display: 'block',
        position: 'relative',
        ...overrides.defined,
      },

      ...overrides.custom,
    };
  }, {});

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
  {
    notDefined: sizeReservation({ mobile: 120, tablet: 160, desktop: 200 }),
  },
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
  {
    notDefined: sizeReservation({ mobile: 480, tablet: 640, desktop: 800 }),
  },
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
        display: 'block',
        ...sizeReservation({ mobile: 360, tablet: 420, desktop: 480 }),

        '& > *': { contentVisibility: 'hidden' },
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
    display: 'block',
    ...sizeReservation({ mobile: 600, tablet: 800, desktop: 1000 }),

    '& > *': { display: 'none' },
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
  'umd-element-',
  {
    notDefined: {
      contentVisibility: 'auto',
      display: 'block',
      ...sizeReservation({ mobile: 480, tablet: 600, desktop: 700 }),
      // Slot content is left visible: a carousel slide is a likely LCP
      // candidate, and the parent's min-height reservation already
      // prevents CLS. Hiding children would disqualify them from LCP.
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
    ['hero', 'hero-expand', 'hero-logo', 'person-hero'],
    'umd-element-',
    {
      notDefined: {
        contentVisibility: 'auto',
        display: 'block',
        ...sizeReservation({ mobile: 480, tablet: 560, desktop: 640 }),
        // Slot content (hero image / headline) is the LCP candidate on
        // most pages — leave it visible so it can be painted and counted.
        // CLS is protected by the parent's min-height reservation.
      },
      defined: {
        contentVisibility: 'visible',
        containerType: 'inline-size',
        display: 'block',
      },
    },
  ),
  ...createBatchStyles(['hero-brand-video', 'hero-grid'], 'umd-element-', {
    notDefined: {
      contentVisibility: 'hidden',
      display: 'block',
      ...sizeReservation({ mobile: 600, tablet: 720, desktop: 800 }),
    },
    defined: {
      contentVisibility: 'visible',
      containerType: 'inline-size',
      display: 'block',
    },
  }),
  ...createElementStyles('umd-element-hero-minimal', {
    notDefined: {
      contentVisibility: 'hidden',
      display: 'block',
      ...sizeReservation({ mobile: 240, tablet: 280, desktop: 320 }),
    },
    defined: {
      contentVisibility: 'visible',
      containerType: 'inline-size',
      display: 'block',
    },
  }),
};

// ---------------------------------------------------------------------------
// Miscellaneous elements (alphabetical)
// ---------------------------------------------------------------------------

const accordion = createElementStyles('umd-element-accordion-item', {
  notDefined: {
    contentVisibility: 'hidden',
    display: 'block',
    ...sizeReservation({ mobile: 56, tablet: 64 }),
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
// Footer sits below the fold; pre-upgrade we keep it out of layout entirely
// (display: none) — any min-height/contain-intrinsic-size would be dead under
// display: none and only add noise. CLS impact is negligible because the
// shift happens off-screen on first paint.
const footer = createElementStyles('umd-element-footer', {
  notDefined: {
    backgroundColor: color.black,
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
    ...sizeReservation({ mobile: 600, tablet: 800, desktop: 1000 }),
  },
  defined: {
    contentVisibility: 'visible',
    containerType: 'inline-size',
  },
});

// Navigation Header
const navigationHeader = createElementStyles('umd-element-navigation-header', {
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
});

// Navigation Item
const navigationItem = createElementStyles('umd-element-nav-item', {
  notDefined: {
    display: 'none',
  },
  defined: {
    containerType: 'normal',
    display: 'block',
  },
});

// Navigation Drawer
const navigationDrawer = createElementStyles('umd-element-nav-drawer', {
  notDefined: {
    contentVisibility: 'hidden',
    containIntrinsicSize: '44px 44px',
    backgroundColor: color.white,
    height: '44px',
    width: '44px',
    '& > *': { display: 'none' },
  },
});

// Navigation Slider
const navigationSlider = createElementStyles('umd-element-navigation-slider', {
  notDefined: {
    contentVisibility: 'hidden',
    '& > *': { display: 'none' },
  },
  defined: {
    position: 'relative',
    zIndex: '99',
  },
});

// Navigation Sticky
const navigationSticky = createElementStyles('umd-element-navigation-sticky', {
  defined: {
    position: 'relative',
    zIndex: '99999',
  },
  custom: {
    ['umd-element-navigation-sticky']: {
      position: 'relative',
      zIndex: '99999',
    },
  },
});

// Navigation Utility Alert
const navigationUtilityAlert = createElementStyles(
  'umd-element-navigation-utility',
  {
    notDefined: {
      display: 'block !important',
      minHeight: '44px !important',
      containIntrinsicSize: 'auto !important',
      '& > *': { display: 'none' },
    },
    defined: {
      position: 'relative',
      zIndex: '99999',
      containerType: 'normal',

      '& > *': { display: 'block' },
    },
    custom: {
      ['umd-element-navigation-utility']: {
        minHeight: '44px',
        backgroundColor: color.red,
      },
    },
  },
);

// Pathway
const pathway = createElementStyles('umd-element-pathway', {
  notDefined: {
    contentVisibility: 'hidden',
    display: 'block',
    ...sizeReservation({ mobile: 360, tablet: 480, desktop: 560 }),
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
  ...accordion,
  ...brandCardStack,
  ...brandLogoAnimation,
  ...breadcrumb,
  ...callToAction,
  ...cardListStyles,
  ...cardOverlay,
  ...carousels,
  ...feedElements,
  ...footer,
  ...heroes,
  ...layoutExpand,
  ...navigationDrawer,
  ...navigationHeader,
  ...navigationItem,
  ...navigationSlider,
  ...navigationSticky,
  ...navigationUtilityAlert,
  ...pathway,
  ...personTabular,
  ...scrollTop,
  ...sectionIntro,
  ...simpleElements,
  ...socialSharing,
  ...stickyColumns,
  ...tabs,
};
