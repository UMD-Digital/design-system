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
    ...additionalStyles.defined,
  },

  ...additionalStyles.custom,
});

// Base elements with simple display toggle
const baseElements = [
  'alert-page',
  'alert-site',
  'banner-promo',
  'call-to-action',
  'carousel-cards',
  'carousel',
  'carousel-image',
  'carousel-multiple-image',
  'carousel-people',
  'feed-news',
  'hero-brand-video',
  'hero',
  'hero-logo',
  'hero-minimal',
  'logo',
  'media-inline',
  'pathway',
  'pathway-highlight',
  'quote',
  'slider-events',
  'slider-events-feed',
  'tabs',
].reduce(
  (acc, name) => ({
    ...acc,
    ...createElementStyles(`umd-element-${name}`),
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
      [`@media (${media.queries.highDef.min})`]: {
        top: '-11vw',
        height: '50vw',
      },
    },
  }),
  ...['article', 'card', 'card-overlay', 'event', 'person'].reduce(
    (acc, type) => ({
      ...acc,
      ...createElementStyles(`umd-element-${type}`, {
        custom: {
          [`umd-element-${type}[display="list"] + umd-element-${type}[display="list"]`]:
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
      ...createElementStyles(`umd-element-${name}`),
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

export default {
  ...elements,
  ...breadcrumb,
  ...footer,
  ...navigation,
  ...scrollTop,
  ...sectionIntro,
  ...socialSharing,
};
