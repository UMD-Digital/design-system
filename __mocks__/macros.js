// Mock for common UI macro patterns (loaders, lazy loading, accessibility features)
// These are higher-level UI patterns that combine multiple elements

module.exports = {
  // Loader pattern for showing loading states
  loader: {
    create: jest.fn().mockImplementation((options = {}) => {
      const loader = document.createElement('div');
      loader.className = 'loader';
      loader.setAttribute('role', 'status');
      loader.setAttribute('aria-live', 'polite');
      return {
        element: loader,
        styles: '.loader { display: flex; align-items: center; justify-content: center; }'
      };
    }),
    remove: jest.fn().mockImplementation((loader) => {
      if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }),
    display: jest.fn().mockImplementation((container, loader) => {
      if (container && loader) {
        container.appendChild(loader);
      }
    }),
  },
  loaderStyles: '.loader { display: flex; align-items: center; justify-content: center; }',
  
  // Lazy load button for pagination
  buttonLazyLoad: {
    create: jest.fn().mockReturnValue({
      element: (() => {
        const button = document.createElement('button');
        button.className = 'lazy-load-button';
        button.textContent = 'Load More';
        return button;
      })(),
      styles: '.mock-style-button',
    }),
    remove: jest.fn(),
  },
  
  // ARIA live region for screen reader announcements
  ariaLive: {
    create: jest.fn().mockImplementation((politeness = 'polite') => {
      const region = document.createElement('div');
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', politeness);
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      return region;
    }),
    update: jest.fn().mockImplementation((region, message) => {
      if (region && message) {
        region.textContent = message;
      }
    }),
  },
  
  // No results message display
  noResults: jest.fn().mockImplementation((message = 'No results found') => ({
    element: (() => {
      const container = document.createElement('div');
      container.className = 'no-results';
      container.setAttribute('role', 'status');
      container.textContent = message;
      return container;
    })(),
    styles: '.mock-style-no-results',
  })),
  
  // Lazy loading container
  lazy: {
    create: jest.fn().mockReturnValue({
      element: document.createElement('div'), 
      styles: '.mock-style-lazy',
    }),
    remove: jest.fn(),
  },
  
  // Lazy load implementation with conditional rendering
  lazyLoad: {
    create: jest.fn().mockImplementation(({ isLazyLoad, buttonText = 'Load More' }) => {
      if (!isLazyLoad) return undefined;
      
      const container = document.createElement('div');
      container.className = 'lazy-load-container';
      
      const button = document.createElement('button');
      button.className = 'lazy-load-button';
      button.textContent = buttonText;
      container.appendChild(button);
      
      return {
        element: container,
        styles: '.aligned-center .outline-button',
      };
    }),
    remove: jest.fn(),
  },
  
  // Slider/carousel macro
  slider: jest.fn().mockImplementation((options = {}) => {
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', options.label || 'Carousel');
    
    return {
      element: slider,
      styles: '.mock-slider-styles',
      events: {
        load: jest.fn(),
        callback: jest.fn(),
        next: jest.fn(),
        previous: jest.fn(),
        goToSlide: jest.fn(),
      },
      destroy: jest.fn(),
    };
  }),
};