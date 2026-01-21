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
    ...additionalStyles.defined,
  },

  ...additionalStyles.custom,
});

// Base elements with simple display toggle
const baseElements = [
  'alert-page',
  'alert-site',
  'banner-promo',
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
].reduce(
  (acc, name) => ({
    ...acc,
    ...createElementStyles(`umd-element-${name}`),
  }),
  {},
);

// Feed elements with simple display toggle
const feedElements = [
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
].reduce(
  (acc, name) => ({
    ...acc,
    ...createElementStyles(`umd-feed-${name}`),
  }),
  {},
);

// Complex elements with additional styles
const elements = {
  ...baseElements,
  ...createElementStyles('umd-element-accordion-item', {
    custom: {
      'umd-element-accordion-item + umd-element-accordion-item': {
        marginTop: spacing.min,
      },
    },
  }),
  ...createElementStyles('umd-element-brand-logo-animation', {
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
  }),
  ...['article', 'card', 'card-icon', 'event', 'person'].reduce(
    (acc, type) => ({
      ...acc,
      ...createElementStyles(`umd-element-${type}`, {
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
  ),
  ...['card-video'].reduce(
    (acc, type) => ({
      ...acc,
      ...createElementStyles(`umd-element-${type}`, {}),
    }),
    {},
  ),
  ...['card-overlay'].reduce(
    (acc, type) => ({
      ...acc,
      ...createElementStyles(`umd-element-${type}`, {
        custom: {
          [`umd-element-${type}.size-large`]: {
            minHeight: '320px',

            [`@media (${media.queries.tablet.min})`]: {
              minHeight: '560px',
            },
          },

          [`umd-element-${type}[display="list"] + umd-element-${type}[display="list"]`]:
            {
              marginTop: spacing.md,
            },
          [`umd-element-${type}[data-display="list"] + umd-element-${type}[data-display="list"]`]:
            {
              marginTop: spacing.md,
            },
        },
      }),
    }),
    {},
  ),
  ...['person'].reduce(
    (acc, type) => ({
      ...acc,
      ...createElementStyles(`umd-element-${type}`, {
        custom: {
          [`umd-element-${type}[data-display="tabular"] + umd-element-${type}[data-display="tabular"]`]:
            {
              marginTop: spacing.md,
              paddingTop: spacing.md,
              borderTop: `1px solid ${color.gray.light}`,
            },
          [`umd-element-${type}[data-display="tabular"][data-theme="dark"] + umd-element-${type}[data-display="tabular"][data-theme="dark"]`]:
            {
              marginTop: spacing.md,
              paddingTop: spacing.md,
              borderTop: `1px solid ${color.gray.dark}`,
            },
        },
      }),
    }),
    {},
  ),
};

// Call To ACtion with specific styling
const action = createElementStyles('umd-element-call-to-action', {
  defined: {
    containerType: 'normal',
  },
});

// Footer with specific styling
const breadcrumb = createElementStyles('umd-element-breadcrumb', {
  defined: {
    display: 'block',
    marginTop: `${spacing.sm}`,
  },
});

// Brand Cards
const brandCards = createElementStyles('umd-element-brand-card-stack', {
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

// Carousels
const carousels = [
  'carousel',
  'carousel-cards',
  'carousel-image',
  'carousel-image-wide',
  'carousel-multiple-image',
  'carousel-people',
  'carousel-thumbnail',
].reduce(
  (acc, element) => ({
    ...acc,
    ...createElementStyles(element, {
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
    }),
  }),
  {},
);

// Footer with specific styling
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

// Hero with specific styling
const hero = [
  'umd-element-hero',
  'umd-element-hero-expand',
  'umd-element-hero-logo',
  'umd-element-person-hero',
].reduce(
  (acc, element) => ({
    ...acc,
    ...createElementStyles(element, {
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
    }),
  }),
  {},
);

// Hero Large with specific styling
const heroLarge = [
  'umd-element-hero-brand-video',
  'umd-element-hero-grid',
].reduce(
  (acc, element) => ({
    ...acc,
    ...createElementStyles(element, {
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
    }),
  }),
  {},
);

// Hero Minimal with specific styling
const heroMinimal = createElementStyles('umd-element-hero-minimal', {
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
});

// Layout Expand with specific styling
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

// Pathway with specific styling
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

// Navigation components
const navigation = {
  ...['navigation-header'].reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`umd-element-${name}`, {
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
    }),
    {},
  ),
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
};

const navigationSticky = {
  ...['navigation-sticky'].reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`umd-element-${name}`, {
        custom: {
          [`umd-element-${name}`]: {
            position: 'relative',
            zIndex: '9999',
          },
        },
      }),
    }),
    {},
  ),
};

const navigationAlertUtility = {
  ...['navigation-utility'].reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`umd-element-${name}`, {
        notDefined: {
          display: 'block !important',
          minHeight: '44px !important',
          containIntrinsicSize: 'auto !important',
          '& > *': { display: 'none' },
        },
        defined: {
          '& > *': { display: 'block' },
        },
        custom: {
          [`umd-element-${name}`]: {
            minHeight: '44px',
            backgroundColor: color.red,
          },
        },
      }),
    }),
    {},
  ),
};

// Scroll top component with responsive styling
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

// Section Intro
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

// Social sharing with responsive layout
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

const stickyColumns = {
  ...['sticky-columns'].reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`umd-element-${name}`, {
        notDefined: {
          display: 'none',
        },
        defined: {
          display: 'block',
        },
      }),
    }),
    {},
  ),
};

const tabsTag = 'umd-element-tabs';
const tabs = createElementStyles(tabsTag, {
  custom: {
    [`${tabsTag} + *`]: { marginTop: spacing.lg },
  },
});

export const webComponentStyles = {
  ...elements,
  ...feedElements,
  ...action,
  ...breadcrumb,
  ...brandCards,
  ...carousels,
  ...footer,
  ...hero,
  ...heroLarge,
  ...heroMinimal,
  ...layoutExpand,
  ...pathway,
  ...navigation,
  ...navigationSticky,
  ...navigationAlertUtility,
  ...scrollTop,
  ...sectionIntro,
  ...socialSharing,
  ...stickyColumns,
  ...tabs,
};
