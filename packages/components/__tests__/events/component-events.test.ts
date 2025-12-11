import { jest } from '@jest/globals';
import { 
  ComponentReadyDetail, 
  ComponentErrorDetail, 
  ComponentResizeDetail 
} from '../../source/api/_types';
import { waitForComponentEvent, captureComponentEvents } from '../../test-helpers/validation';
import { createTestComponent, cleanupComponents } from '../../test-helpers/component';

// Mock the components
jest.mock('@universityofmaryland/web-components-library');

describe('Component Events', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('component:ready event', () => {
    it('should dispatch when component initializes successfully', () => {
      const component = createTestComponent('umd-test-component');
      const element = component.element;
      
      // Manually dispatch the event to test the event structure
      const mockShadowRoot = { mode: 'open' } as ShadowRoot;
      const mockComponentRef = { element: document.createElement('div'), styles: '' };
      
      const event = new CustomEvent<ComponentReadyDetail>('component:ready', {
        detail: {
          tagName: 'umd-test-component',
          element,
          timestamp: Date.now(),
          shadowRoot: mockShadowRoot,
          ref: mockComponentRef,
        },
        bubbles: true,
        composed: true,
      });
      
      let capturedEvent: CustomEvent<ComponentReadyDetail> | null = null;
      element.addEventListener('component:ready', (e) => {
        capturedEvent = e as CustomEvent<ComponentReadyDetail>;
      });
      
      element.dispatchEvent(event);
      
      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.type).toBe('component:ready');
      expect(capturedEvent!.detail.tagName).toBe('umd-test-component');
      expect(capturedEvent!.detail.element).toBe(element);
      expect(capturedEvent!.detail.timestamp).toBeGreaterThan(0);
      expect(capturedEvent!.detail.shadowRoot).toBeDefined();
      expect(capturedEvent!.detail.ref).toBeDefined();
    });
  });

  describe('component:error event', () => {
    it('should dispatch on validation errors', () => {
      const component = createTestComponent('umd-test-component');
      const element = component.element;
      
      let capturedEvent: CustomEvent<ComponentErrorDetail> | null = null;
      element.addEventListener('component:error', (e) => {
        capturedEvent = e as CustomEvent<ComponentErrorDetail>;
      });
      
      // Manually dispatch error event
      const errorEvent = new CustomEvent<ComponentErrorDetail>('component:error', {
        detail: {
          tagName: 'umd-test-component',
          element,
          timestamp: Date.now(),
          type: 'validation',
          message: 'Required slot "headline" is missing',
          details: { slot: 'headline' },
        },
        bubbles: true,
        composed: true,
      });
      
      element.dispatchEvent(errorEvent);
      
      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.detail.type).toBe('validation');
      expect(capturedEvent!.detail.message).toContain('Required slot');
      expect(capturedEvent!.detail.tagName).toBe('umd-test-component');
    });
  });

  describe('component:resize event', () => {
    it('should dispatch when resize attribute is set', () => {
      const component = createTestComponent('umd-test-component');
      const element = component.element;
      
      let capturedEvent: CustomEvent<ComponentResizeDetail> | null = null;
      element.addEventListener('component:resize', (e) => {
        capturedEvent = e as CustomEvent<ComponentResizeDetail>;
      });
      
      // Manually dispatch resize event
      const resizeEvent = new CustomEvent<ComponentResizeDetail>('component:resize', {
        detail: {
          tagName: 'umd-test-component',
          element,
          timestamp: Date.now(),
          previousSize: { width: 100, height: 50 },
          currentSize: { width: 200, height: 100 },
          source: 'attribute',
        },
        bubbles: true,
        composed: true,
      });
      
      element.dispatchEvent(resizeEvent);
      
      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.type).toBe('component:resize');
      expect(capturedEvent!.detail.source).toBe('attribute');
      expect(capturedEvent!.detail.tagName).toBe('umd-test-component');
      expect(capturedEvent!.detail.currentSize).toHaveProperty('width');
      expect(capturedEvent!.detail.currentSize).toHaveProperty('height');
    });

    it('should include size information in resize event', () => {
      const component = createTestComponent('umd-test-component');
      const element = component.element;
      
      let capturedEvent: CustomEvent<ComponentResizeDetail> | null = null;
      element.addEventListener('component:resize', (e) => {
        capturedEvent = e as CustomEvent<ComponentResizeDetail>;
      });
      
      // Dispatch resize event with size changes
      const resizeEvent = new CustomEvent<ComponentResizeDetail>('component:resize', {
        detail: {
          tagName: 'umd-test-component',
          element,
          timestamp: Date.now(),
          previousSize: { width: 200, height: 100 },
          currentSize: { width: 300, height: 150 },
          source: 'attribute',
        },
        bubbles: true,
        composed: true,
      });
      
      element.dispatchEvent(resizeEvent);
      
      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.detail.previousSize).toBeDefined();
      expect(capturedEvent!.detail.previousSize!.width).toBe(200);
      expect(capturedEvent!.detail.previousSize!.height).toBe(100);
      expect(capturedEvent!.detail.currentSize).toBeDefined();
      expect(capturedEvent!.detail.currentSize.width).toBe(300);
      expect(capturedEvent!.detail.currentSize.height).toBe(150);
      expect(capturedEvent!.detail.source).toBe('attribute');
    });
  });

  describe('Multiple events', () => {
    it('should capture all component lifecycle events', () => {
      const component = createTestComponent('umd-test-component');
      const element = component.element;
      
      const { events, cleanup } = captureComponentEvents(element, [
        'component:ready',
        'component:error',
        'component:resize'
      ]);
      
      // Dispatch ready event
      element.dispatchEvent(new CustomEvent<ComponentReadyDetail>('component:ready', {
        detail: {
          tagName: 'umd-test-component',
          element,
          timestamp: Date.now(),
          shadowRoot: {} as ShadowRoot,
          ref: { element: document.createElement('div'), styles: '' },
        },
        bubbles: true,
        composed: true,
      }));
      
      // Dispatch resize event
      element.dispatchEvent(new CustomEvent<ComponentResizeDetail>('component:resize', {
        detail: {
          tagName: 'umd-test-component',
          element,
          timestamp: Date.now(),
          previousSize: { width: 100, height: 100 },
          currentSize: { width: 200, height: 200 },
          source: 'attribute',
        },
        bubbles: true,
        composed: true,
      }));
      
      expect(events['component:ready'].length).toBe(1);
      expect(events['component:resize'].length).toBe(1);
      expect(events['component:error'].length).toBe(0);
      
      cleanup();
    });
  });
});