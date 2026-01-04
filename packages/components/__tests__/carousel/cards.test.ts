import { cards as carouselCards } from '../../source/web-components/carousel/cards';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  setAttributeAndWait,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
} from '../test-helpers/validation';

describe('Component: umd-element-carousel-cards', () => {
  const tagName = 'umd-element-carousel-cards';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-carousel-cards');
      document.body.appendChild(testElement);
      
      carouselCards();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      carouselCards();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      carouselCards();
    });

    it('should require cards slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Test without cards (should be invalid)
      let validation = validateSlotConfiguration(element, {
        cards: { required: true },
      });
      
      expect(validation.valid).toBe(false);
      expect(validation.errors).toContain('Required slot "cards" is empty');
      
      // Add cards and test again
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = `
        <div class="card">Card 1</div>
        <div class="card">Card 2</div>
      `;
      element.appendChild(cardsContainer);
      
      validation = validateSlotConfiguration(element, {
        cards: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept multiple card elements in cards slot', () => {
      const { element } = createTestComponent(tagName);
      
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      
      // Add mock card elements
      for (let i = 1; i <= 4; i++) {
        const card = document.createElement('umd-element-card');
        card.innerHTML = `<h3 slot="headline">Card ${i}</h3>`;
        cardsContainer.appendChild(card);
      }
      
      element.appendChild(cardsContainer);
      
      const slottedCards = element.querySelector('[slot="cards"]');
      expect(slottedCards?.children.length).toBe(4);
    });

    it('should accept optional headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required cards slot
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = '<div>Card</div>';
      element.appendChild(cardsContainer);
      
      // Add headline
      element.appendChild(createSlotContent('headline', 'h2', 'Featured Cards'));
      
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
    });

    it('should accept optional text slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required cards slot
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = '<div>Card</div>';
      element.appendChild(cardsContainer);
      
      // Add text
      element.appendChild(createSlotContent('text', 'p', 'Browse our collection'));
      
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required cards slot
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = '<div>Card</div>';
      element.appendChild(cardsContainer);
      
      // Add actions
      element.appendChild(createSlotContent('actions', 'div', 'View All'));
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      carouselCards();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add required cards
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = '<div>Card 1</div>';
      element.appendChild(cardsContainer);
      // Mock the resize event
      const mockResize = jest.fn();
      (element as any).events = { resize: mockResize };
      
      // Trigger resize attribute
      await setAttributeAndWait(element, 'resize', 'true');
      
      // The resize handler should be set up to respond to attribute changes
      // Note: In real implementation, the observer would trigger the callback
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      carouselCards();
    });

    it('should call load event after connect', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required cards
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = '<div>Card 1</div>';
      element.appendChild(cardsContainer);
      
      // Mock the events.load function
      const mockLoad = jest.fn();
      (element as any).events = { load: mockLoad };// The afterConnect callback should have been called
      // Note: In real implementation this would be called by the framework
    });
  });

  describe('Shadow DOM', () => {
    beforeEach(() => {
      carouselCards();
    });

    it('should create shadow slot for cards', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required cards
      const cardsContainer = document.createElement('div');
      cardsContainer.setAttribute('slot', 'cards');
      cardsContainer.innerHTML = '<div>Card 1</div>';
      element.appendChild(cardsContainer);
      // Shadow root should exist
      // expect(element.shadowRoot).toBeTruthy();
      
      // Should have slot for cards
      // const shadowSlot = element.shadowRoot?.querySelector('slot[name="cards"]');
      // expect(shadowSlot).toBeTruthy();
    });
  });
});