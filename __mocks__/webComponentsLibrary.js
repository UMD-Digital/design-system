// Mock for @universityofmaryland/web-components-library
// This mock provides stubs for web components that can be registered and tested

const createMockWebComponent = (tagName) => {
  class MockComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<div class="mock-${tagName}">Mock ${tagName} Component</div>`;
    }

    static get observedAttributes() {
      return ['resize', 'is-visual-open', 'is-visual-closed'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // Mock attribute change handling
    }

    connectedCallback() {
      // Mock connected callback
    }

    disconnectedCallback() {
      // Mock disconnected callback
    }
  }

  return () => {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, MockComponent);
    }
  };
};

// Mock the LoadUmdComponents function
const LoadUmdComponents = jest.fn(() => {
  // Mock registration of all components
  console.log('Mock: All UMD components registered');
});

// Mock Components namespace with all component registration functions
const Components = {
  accordion: {
    item: createMockWebComponent('umd-element-accordion-item')
  },
  actions: {
    display: createMockWebComponent('umd-element-actions')
  },
  alert: {
    page: createMockWebComponent('umd-element-alert-page'),
    promo: createMockWebComponent('umd-element-alert-promo'),
    site: createMockWebComponent('umd-element-alert-site')
  },
  brand: {
    chevronScroll: createMockWebComponent('umd-element-brand-chevron-scroll')
  },
  card: {
    standard: createMockWebComponent('umd-element-card'),
    article: createMockWebComponent('umd-element-card-article'),
    event: createMockWebComponent('umd-element-card-event'),
    icon: createMockWebComponent('umd-element-card-icon'),
    overlay: createMockWebComponent('umd-element-card-overlay')
  },
  carousel: {
    base: createMockWebComponent('umd-element-carousel'),
    cards: createMockWebComponent('umd-element-carousel-cards'),
    imageMultiple: createMockWebComponent('umd-element-carousel-image-multiple'),
    imageSingle: createMockWebComponent('umd-element-carousel-image-single'),
    thumbnail: createMockWebComponent('umd-element-carousel-thumbnail')
  },
  feed: {
    eventsGrid: createMockWebComponent('umd-element-events-grid'),
    eventsList: createMockWebComponent('umd-element-events-list'),
    newsFeatured: createMockWebComponent('umd-element-news-featured'),
    newsGrid: createMockWebComponent('umd-element-news-grid'),
    newsList: createMockWebComponent('umd-element-news-list')
  },
  footer: {
    options: createMockWebComponent('umd-element-footer')
  },
  hero: {
    base: createMockWebComponent('umd-element-hero'),
    brandVideo: createMockWebComponent('umd-element-hero-brand-video'),
    expand: createMockWebComponent('umd-element-hero-expand'),
    logo: createMockWebComponent('umd-element-hero-logo'),
    minimal: createMockWebComponent('umd-element-hero-minimal')
  },
  layout: {
    boxLogo: createMockWebComponent('umd-element-box-logo'),
    imageExpand: createMockWebComponent('umd-element-image-expand'),
    modal: createMockWebComponent('umd-element-modal'),
    scrollTop: createMockWebComponent('umd-element-scroll-top'),
    sectionIntroSmall: createMockWebComponent('umd-element-section-intro-small'),
    sectionIntroWide: createMockWebComponent('umd-element-section-intro-wide'),
    stickyColumns: createMockWebComponent('umd-element-sticky-columns')
  },
  media: {
    inline: createMockWebComponent('umd-element-media-inline')
  },
  navigation: {
    breadcrumb: createMockWebComponent('umd-element-breadcrumb'),
    drawer: createMockWebComponent('umd-element-drawer'),
    header: createMockWebComponent('umd-element-header'),
    item: createMockWebComponent('umd-element-navigation-item'),
    slider: createMockWebComponent('umd-element-navigation-slider'),
    sticky: createMockWebComponent('umd-element-sticky-navigation'),
    utility: createMockWebComponent('umd-element-utility-header')
  },
  pathway: {
    highlight: createMockWebComponent('umd-element-pathway-highlight'),
    image: createMockWebComponent('umd-element-pathway-image')
  },
  person: {
    bio: createMockWebComponent('umd-element-person-bio'),
    display: createMockWebComponent('umd-element-person-display'),
    hero: createMockWebComponent('umd-element-person-hero')
  },
  quote: {
    display: createMockWebComponent('umd-element-quote')
  },
  slider: {
    eventDisplay: createMockWebComponent('umd-element-events-display'),
    eventFeed: createMockWebComponent('umd-element-events-feed')
  },
  social: {
    sharing: createMockWebComponent('umd-element-social-sharing')
  },
  stat: {
    display: createMockWebComponent('umd-element-stat')
  },
  tab: {
    display: createMockWebComponent('umd-element-tab')
  },
  text: {
    eventLockup: createMockWebComponent('umd-element-event-lockup')
  }
};

// Mock Elements namespace (re-export from web-elements-library)
const Elements = {
  Atomic: {
    // Mocked atomic elements
  },
  Composite: {
    // Mocked composite elements
  },
  Layout: {
    // Mocked layout elements
  },
  Model: {
    // Mocked model utilities
  },
  Utilities: {
    // Mocked utilities
  }
};

// Mock Utilities namespace
const Utilities = {
  Animations: {
    loadIntersectionObserver: jest.fn()
  },
  Markup: {
    create: {
      element: jest.fn(({ elementType, attributes = {} }) => {
        const element = document.createElement(elementType);
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        return element;
      })
    }
  }
};

module.exports = {
  default: LoadUmdComponents,
  LoadUmdComponents,
  Components,
  Elements,
  Utilities
};