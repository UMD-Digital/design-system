import { Colors, Spacing, Media } from './tokens';

const baseElementNames = [
  'umd-element-alert-page',
  'umd-element-alert-site',
  'umd-element-banner-promo',
  'umd-element-call-to-action',
  'umd-element-carousel-cards',
  'umd-element-carousel',
  'umd-element-carousel-image',
  'umd-element-carousel-multiple-image',
  'umd-element-carousel-people',
  'umd-feed-news',
  'umd-element-hero-brand-video',
  'umd-element-hero',
  'umd-element-hero-logo',
  'umd-element-hero-minimal',
  'umd-element-logo',
  'umd-element-media-inline',
  'umd-element-quote',
  'umd-element-slider-events',
  'umd-element-slider-events-feed',
  'umd-element-tabs',
];

const baseElementStyles = (elementName: string) => ({
  [`${elementName}:not(:defined)`]: {
    display: 'none',
  },
  [`${elementName}:defined`]: {
    display: 'block',
  },
});

export const elements = [...baseElementNames].reduce(
  (acc, element) => ({
    ...acc,
    ...baseElementStyles(element),
  }),
  {},
);

export const accordion = {
  ...baseElementStyles('umd-element-accordion-item'),
  'umd-element-accordion-item + umd-element-accordion-item': {
    marginTop: Spacing.min,
  },
};

export const brandLogo = {
  ...baseElementStyles('umd-element-brand-logo-animation'),
  'umd-element-brand-logo-animation': {
    display: 'block',
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
};

export const breadcrumb = {
  ...baseElementStyles('umd-element-breadcrumb'),
  'umd-element-brand-logo-animation:defined': {
    display: 'block',
    marginTop: Spacing.sm,
  },
};

export const card = {
  ...baseElementStyles('umd-element-article'),
  ...baseElementStyles('umd-element-card'),
  ...baseElementStyles('umd-element-card-overlay'),
  ...baseElementStyles('umd-element-event'),
  'umd-element-article[display="list"] + umd-element-article[display="list"], umd-element-card[display="list"] + umd-element-card[display="list"], umd-element-event[display="list"] + umd-element-event[display="list"]':
    {
      marginTop: Spacing.md,
    },
  'umd-element-card-overlay.size-large': {
    minHeight: '560px',
  },
  'umd-element-event[display="feature"]': {
    [`@media (${Media.queries.large.max})`]: {
      borderBottom: `1px solid ${Colors.gray.light}`,
      paddingBottom: `${Spacing.md}`,
    },
  },
};

export const footer = {
  ...baseElementStyles('umd-element-footer'),
  'umd-element-footer:not(:defined)': {
    display: 'block',
    backgroundColor: Colors.black,
    height: `calc(${Spacing.md} * 20)`,

    '& > *': {
      display: 'none',
    },
  },
};

export const imageExpand = {
  ...baseElementStyles('umd-layout-image-expand'),
  'umd-layout-image-expand *[slot="content"]': {
    width: '100%',
  },
  'umd-layout-image-expand *[slot="content"] umd-element-quote': {
    width: '100%',
    maxWidth: '650px',
  },
};

export const navigation = {
  ...baseElementStyles('umd-element-nav-item'),
  ...baseElementStyles('umd-element-navigation-header'),
  'umd-element-nav-drawer:not(:defined)': {
    backgroundColor: Colors.white,
    display: 'block',
    height: '44px',
    width: '44px',

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-nav-drawer:defined': {
    display: 'block',
  },
  'umd-element-navigation-sticky:not(:defined), umd-element-navigation-utility:not(:defined)':
    {
      display: 'none',
    },
  'umd-element-navigation-sticky:defined, umd-element-navigation-utility:defined':
    {
      display: 'block',
      position: 'relative',
      zIndex: '99999',
    },
};

export const pathway = {
  ...baseElementStyles('umd-element-pathway'),
  'umd-element-pathway[type="sticky"] + umd-element-pathway[type="sticky"]': {
    marginTop: `${Spacing.max}`,
  },
};

export const person = {
  ...baseElementStyles('umd-element-person'),
  ...baseElementStyles('umd-element-person-bio'),
  ...baseElementStyles('umd-element-person-hero'),
  'umd-element-person[display="list"] + umd-element-person[display="list"], umd-element-person[display="tabular"] + umd-element-person[display="tabular"]':
    {
      marginTop: Spacing.md,
    },
};

export const scrollTop = {
  'umd-element-scroll-top:not(:defined)': {
    display: 'none',
  },
  'umd-element-scroll-top:defined': {
    display: 'block',
    height: '40px',
    width: '40px',
  },
  '* + umd-element-scroll-top': {
    marginTop: `${Spacing.md}`,
  },
  'umd-element-scroll-top[fixed]': {
    display: 'block',
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
};

export const sectionIntro = {
  ...baseElementStyles('umd-element-person'),
  'umd-element-section-intro:not(:defined), umd-element-section-intro-wide:not(:defined)':
    {
      display: 'none',
    },
  'umd-element-section-intro:defined, umd-element-section-intro-wide:defined': {
    display: 'block',
    marginBottom: `${Spacing.lg}`,

    [`@media (${Media.queries.tablet.min})`]: {
      marginBottom: `${Spacing['2xl']}`,
    },
  },
};

export const socialSharing = {
  'umd-element-social-sharing:not(:defined)': {
    display: 'none',
  },
  'umd-element-social-sharing:defined': {
    display: 'block',
  },
  '* + umd-element-social-sharing': {
    marginTop: `${Spacing.md}`,
  },
  'umd-element-social-sharing[fixed], umd-element-social-sharing[data-layout-fixed="true"]':
    {
      [`@media (${Media.queries.tablet.min})`]: {
        display: 'block',
        position: 'fixed',
        left: '0',
        top: '30vh',
        zIndex: '9999',
      },

      [`@media (${Media.queries.desktop.min})`]: {
        left: '40px',
      },
    },
};

export const stats = {
  'umd-element-stat:not(:defined)': {
    display: 'none',
  },
  'umd-element-stat:defined': {
    display: 'block',
    height: '100%',
  },
};
