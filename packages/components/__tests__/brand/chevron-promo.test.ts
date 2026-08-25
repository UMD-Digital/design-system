import { chevronPromo as brandChevronPromo } from '../../source/web-components/brand/chevron-promo';
import {
  createTestComponent,
  cleanupComponents,
  createSlotContent,
} from '../test-helpers/component';

describe('Component: umd-element-brand-chevron-promo', () => {
  const tagName = 'umd-element-brand-chevron-promo';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      const testElement = document.createElement(tagName);
      document.body.appendChild(testElement);

      brandChevronPromo();

      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function),
      );
    });

    it('should create custom element with correct tag name', () => {
      brandChevronPromo();

      const { element } = createTestComponent(tagName);

      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      brandChevronPromo();
    });

    it('should accept headline, eyebrow, text, and actions slots', () => {
      const { element } = createTestComponent(tagName);

      element.appendChild(createSlotContent('eyebrow', 'p', 'Fearlessly Forward'));
      element.appendChild(createSlotContent('headline', 'h2', 'Promo Headline'));
      element.appendChild(createSlotContent('text', 'div', 'Supporting text'));
      element.appendChild(createSlotContent('actions', 'div', 'Learn more'));

      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="eyebrow"]')).toBeTruthy();
      expect(element.querySelector('[slot="text"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      brandChevronPromo();
    });

    it('should accept the data-animation attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-animation': 'load',
      });

      expect(element.getAttribute('data-animation')).toBe('load');
    });
  });
});
