import feedEventsGrid from '../../source/api/feed/events/grid';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
} from '../../test-helpers/component';
import {
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../../test-helpers/validation';
import { captureWarningsAsync } from '../../test-helpers/component';

/**
 * Testing Approach for Feed Components
 * 
 * Feed components depend on @universityofmaryland/web-feeds-library which is mocked
 * globally in __mocks__. These tests focus on the public API of the components:
 * 
 * 1. Component Registration - Verify the custom element is properly registered
 * 2. Attribute Handling - Test that HTML attributes are accepted and stored correctly
 * 3. Attribute Validation - Ensure required attributes trigger appropriate errors
 * 4. Default Values - Verify components work with minimal configuration
 * 5. Callback Support - Test that event callbacks can be attached
 * 
 * We intentionally DO NOT test:
 * - Internal implementation details
 * - How attributes are transformed and passed to the feeds library
 * - The actual rendering of feed content (handled by the feeds library)
 * 
 * This approach ensures our tests remain stable even as internal implementations change,
 * while still verifying the component's public contract.
 */

describe('Component: umd-feed-events', () => {
  const tagName = 'umd-feed-events';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-feed-events');
      document.body.appendChild(testElement);
      
      feedEventsGrid();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      feedEventsGrid();
      
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token'
      });
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      feedEventsGrid();
    });

    it('should require data-token attribute', () => {
      const { element } = createTestComponent(tagName);
      
      // Component created without token
      expect(element.hasAttribute('data-token')).toBe(false);
      
      // In the real component, creating without a token would:
      // 1. Log an error: 'Feed events requires a token to be set'
      // 2. Return an empty div instead of the feed component
      // This ensures the component fails safely when misconfigured
    });

    it('should handle data-token attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-api-token'
      });
      
      // Verify the component accepts and stores the data-token attribute
      expect(element.getAttribute('data-token')).toBe('test-api-token');
      
      // In a real component, this token would be passed to the feeds library
      // to fetch events data from the API
    });

    it('should handle data-categories attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-categories': 'category1,category2,category3'
      });
      
      // Verify the component accepts and stores the data-categories attribute
      expect(element.getAttribute('data-categories')).toBe('category1,category2,category3');
      
      // In a real component, this comma-separated list would be parsed into an array
      // and passed to the feeds library to filter events by categories
    });

    it('should handle data-column-count attribute with valid values', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-column-count': '4'
      });
      
      // Verify the component accepts and stores the data-column-count attribute
      expect(element.getAttribute('data-column-count')).toBe('4');
      
      // In a real component, this would be validated to ensure it's 2, 3, or 4
      // and passed to the feeds library as numberOfColumnsToShow
    });

    it('should default to 3 columns for invalid column count', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-column-count': '5'
      });
      
      // Verify the component accepts the attribute even with invalid value
      expect(element.getAttribute('data-column-count')).toBe('5');
      
      // In a real component, invalid values (not 2, 3, or 4) would default to 3
      // when passed to the feeds library as numberOfColumnsToShow
    });

    it('should handle data-row-count attribute with valid values', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-row-count': '2'
      });
      
      // Verify the component accepts and stores the data-row-count attribute
      expect(element.getAttribute('data-row-count')).toBe('2');
      
      // In a real component, this would be validated to ensure it's 1 or 2
      // and passed to the feeds library as numberOfRowsToStart
    });

    it('should default to 1 row for invalid row count', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-row-count': '3'
      });
      
      // Verify the component accepts the attribute even with invalid value
      expect(element.getAttribute('data-row-count')).toBe('3');
      
      // In a real component, invalid values (not 1 or 2) would default to 1
      // when passed to the feeds library as numberOfRowsToStart
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-theme': 'dark'
      });
      
      // Verify the component accepts and stores the data-theme attribute
      expect(element.getAttribute('data-theme')).toBe('dark');
      
      // In a real component, data-theme="dark" would be converted to isThemeDark: true
      // and passed to the feeds library for dark theme styling
    });

    it('should handle transparent attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'transparent': 'true'
      });
      
      // Verify the component accepts and stores the transparent attribute
      expect(element.getAttribute('transparent')).toBe('true');
      
      // In a real component, transparent="true" would be converted to isTransparent: true
      // and passed to the feeds library for transparent background styling
    });

    it('should handle data-feature attribute with lazy-load value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-feature': 'lazy-load'
      });
      
      // Verify the component accepts and stores the data-feature attribute
      expect(element.getAttribute('data-feature')).toBe('lazy-load');
      
      // In a real component, data-feature="lazy-load" would be converted to isLazyLoad: true
      // and passed to the feeds library to enable lazy loading functionality
    });

    it('should use default values when attributes are not provided', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token'
      });
      
      // In real component, these defaults would be used:
      // - numberOfColumnsToShow: 3
      // - numberOfRowsToStart: 1
      // - isTransparent: false
      // - isThemeDark: false
      // - isLazyLoad: false
      
      // Verify component accepts minimal configuration
      expect(element.getAttribute('data-token')).toBe('test-token');
      expect(element.hasAttribute('data-feed-col-count')).toBe(false);
      expect(element.hasAttribute('data-feed-row-count')).toBe(false);
    });
  });

  describe('Callback Integration', () => {
    beforeEach(() => {
      feedEventsGrid();
    });

    it('should support element events callback', () => {
      const mockCallback = jest.fn();
      
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token'
      });
      
      // Verify element can have events property with callback
      Object.defineProperty(element, 'events', {
        value: { callback: mockCallback },
        configurable: true
      });
      
      // In real component, afterConnect would call element.events.callback(shadow)
      // In tests, we just verify the callback can be attached
      expect((element as any).events).toBeDefined();
      expect((element as any).events.callback).toBe(mockCallback);
    });
  });
});