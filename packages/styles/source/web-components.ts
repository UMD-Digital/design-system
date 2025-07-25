import { color, media, spacing } from './token';

type ElementStyles = Record<string, any>;

const createElementStyles = (
  elementName: string,
  additionalStyles: ElementStyles = {},
) => ({
  [`${elementName}:not(:defined)`]: {
    display: 'none',
    ...additionalStyles.notDefined,
  },
  [`${elementName}:defined`]: {
    display: 'block',
    containerType: 'inline-size',
    ...additionalStyles.defined,
  },

  ...additionalStyles.custom,
});

// Base elements with simple display toggle
const baseElements = [
  'alert-page',
  'alert-site',
  'banner-promo',
  'carousel-cards',
  'carousel-image',
  'carousel-multiple-image',
  'carousel-people',
  'carousel-thumbnail',
  'carousel',
  'hero-brand-video',
  'hero-expand',
  'hero-logo',
  'hero-minimal',
  'hero',
  'logo',
  'media-inline',
  'media-gif',
  'pathway-highlight',
  'pathway',
  'person-bio',
  'person-hero',
  'quote',
  'slider-events-feed',
  'slider-events',
].reduce(
  (acc, name) => ({
    ...acc,
    ...createElementStyles(`umd-element-${name}`),
  }),
  {},
);

// Feed elements with simple display toggle
const feedElements = ['events', 'news'].reduce(
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
          [`umd-element-${type}[display="tabular"] + umd-element-${type}[display="tabular"]`]:
            {
              marginTop: spacing.md,
            },
          [`umd-element-${type}[data-display="tabular"] + umd-element-${type}[data-display="tabular"]`]:
            {
              marginTop: spacing.md,
            },
        },
      }),
    }),
    {},
  ),
};

// Footer with specific styling
const breadcrumb = createElementStyles('umd-element-breadcrumb', {
  defined: {
    display: 'block',
    marginTop: `${spacing.sm}`,
  },
});

// Call To ACtion with specific styling
const action = createElementStyles('umd-element-call-to-action', {
  defined: {
    containerType: 'normal',
  },
});

// Footer with specific styling
const footer = createElementStyles('umd-element-footer', {
  notDefined: {
    backgroundColor: color.black,
    height: `calc(${spacing.md} * 20)`,
    '& > *': { display: 'none' },
  },
});

// Navigation components
const navigation = {
  ...['nav-item', 'navigation-header'].reduce(
    (acc, name) => ({
      ...acc,
      ...createElementStyles(`umd-element-${name}`, {
        defined: {
          containerType: 'normal',
        },
      }),
    }),
    {},
  ),
  ...createElementStyles('umd-element-nav-drawer', {
    notDefined: {
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

const tabsTag = 'umd-element-tabs';
const tabs = createElementStyles(tabsTag, {
  custom: {
    [`${tabsTag} + *`]: { marginTop: spacing.lg },
  },
});

export default {
  ...elements,
  ...feedElements,
  ...breadcrumb,
  ...action,
  ...footer,
  ...navigation,
  ...navigationSticky,
  ...scrollTop,
  ...sectionIntro,
  ...socialSharing,
  ...tabs,
};
