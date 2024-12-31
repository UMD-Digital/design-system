import { Colors, Spacing, Media } from './tokens';

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
        marginTop: Spacing.min,
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
      [`@media (${Media.queries.highDef.min})`]: {
        top: '-11vw',
        height: '50vw',
      },
    },
  }),
  ...['article', 'card', 'card-overlay', 'event'].reduce(
    (acc, type) => ({
      ...acc,
      ...createElementStyles(`umd-element-${type}`, {
        custom: {
          [`umd-element-${type}[display="list"] + umd-element-${type}[display="list"]`]:
            {
              marginTop: Spacing.md,
            },
        },
      }),
    }),
    {},
  ),
};

// Footer with specific styling
const footer = createElementStyles('umd-element-footer', {
  notDefined: {
    backgroundColor: Colors.black,
    height: `calc(${Spacing.md} * 20)`,
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
      backgroundColor: Colors.white,
      height: '44px',
      width: '44px',
      '& > *': { display: 'none' },
    },
  }),
};

// Scroll top component with responsive styling
const scrollTop = createElementStyles('umd-element-scroll-top', {
  defined: {
    height: '40px',
    width: '40px',
  },
  custom: {
    '[fixed]': {
      position: 'fixed',
      right: '8px',
      bottom: '10vh',
      zIndex: '9999',
      [`@media (${Media.queries.tablet.min})`]: {
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
        defined: {
          marginBottom: `${Spacing.lg}`,

          [`@media (${Media.queries.tablet.min})`]: {
            marginBottom: `${Spacing['2xl']}`,
          },
        },
      }),
    }),
    {},
  ),
};

// Social sharing with responsive layout
const socialSharing = createElementStyles('umd-element-social-sharing', {
  custom: {
    '* + &': { marginTop: Spacing.md },
    '[fixed], [data-layout-fixed="true"]': {
      [`@media (${Media.queries.tablet.min})`]: {
        position: 'fixed',
        left: '0',
        top: '30vh',
        zIndex: '9999',
      },
      [`@media (${Media.queries.desktop.min})`]: {
        left: '40px',
      },
    },
  },
});

export default {
  ...elements,
  ...footer,
  ...navigation,
  ...scrollTop,
  ...sectionIntro,
  ...socialSharing,
};
