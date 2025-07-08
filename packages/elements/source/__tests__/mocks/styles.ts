/**
 * Mock implementations for @universityofmaryland/web-styles-library
 * This extends the basic mock in setup.ts with more comprehensive patterns
 */

export const mockStyles = {
  element: {
    composite: {
      card: {
        block: {
          borderDark: { className: 'card-block-border-dark' },
          border: { className: 'card-block-border' },
          person: { className: 'card-block-person' },
          personDark: { className: 'card-block-person-dark' },
          dark: { className: 'card-block-dark' },
          light: { className: 'card-block-light' },
          transparent: { className: 'card-block-transparent' },
        },
        list: {
          container: { className: 'card-list-container' },
          item: { className: 'card-list-item' },
        },
        overlay: {
          base: { className: 'card-overlay' },
          color: { className: 'card-overlay-color' },
          icon: { className: 'card-overlay-icon' },
          image: { className: 'card-overlay-image' },
        },
      },
      hero: {
        minimal: { className: 'hero-minimal' },
        standard: { className: 'hero-standard' },
        overlay: { className: 'hero-overlay' },
        stacked: { className: 'hero-stacked' },
        logo: { className: 'hero-logo' },
      },
      footer: {
        container: { className: 'footer-container' },
        mainSection: { className: 'footer-main' },
        utilitySection: { className: 'footer-utility' },
      },
      person: {
        bio: {
          full: { className: 'person-bio-full' },
          small: { className: 'person-bio-small' },
        },
        block: { className: 'person-block' },
        list: { className: 'person-list' },
        hero: { className: 'person-hero' },
        tabular: { className: 'person-tabular' },
      },
    },
    text: {
      decoration: {
        ribbon: { className: ['ribbon-class'] },
      },
      rich: {
        simpleLargest: { className: 'simple-largest' },
        simpleLargeDark: { className: 'simple-large-dark' },
        simpleLarge: { className: 'simple-large' },
        simpleMedium: { className: 'simple-medium' },
        simpleSmall: { className: 'simple-small' },
      },
    },
    event: {
      meta: {
        container: { className: 'event-meta-container' },
        date: { className: 'event-meta-date' },
        location: { className: 'event-meta-location' },
      },
    },
    layout: {
      grid: {
        container: { className: 'grid-container' },
        item: { className: 'grid-item' },
      },
      wrapper: {
        default: { className: 'wrapper' },
        narrow: { className: 'wrapper-narrow' },
        wide: { className: 'wrapper-wide' },
      },
    },
  },
  token: {
    color: {
      white: '#ffffff',
      black: '#000000',
      red: '#e21833',
      gold: '#ffd200',
      gray: {
        lightest: '#f5f5f5',
        lighter: '#e5e5e5',
        light: '#cccccc',
        base: '#999999',
        dark: '#666666',
        darker: '#333333',
        darkest: '#1a1a1a',
      },
    },
    spacing: {
      min: '4px',
      xs: '6px',
      sm: '8px',
      base: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px',
      '3xl': '64px',
      '4xl': '80px',
      '5xl': '96px',
      '6xl': '112px',
    },
    media: {
      queries: {
        mobile: {
          max: 'max-width: 767px',
        },
        tablet: {
          min: 'min-width: 768px',
          max: 'max-width: 1023px',
        },
        desktop: {
          min: 'min-width: 1024px',
        },
        large: {
          min: 'min-width: 1280px',
          max: 'max-width: 1439px',
        },
        highDef: {
          min: 'min-width: 1440px',
        },
      },
    },
    font: {
      family: {
        sans: 'Arial, sans-serif',
        serif: 'Georgia, serif',
        mono: 'Monaco, monospace',
      },
      size: {
        min: '12px',
        sm: '14px',
        base: '16px',
        md: '18px',
        lg: '20px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
      },
      weight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
    },
  },
};

export default mockStyles;