import { Register } from '../source';

describe('Register', () => {
  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();

    // Reset WebComponents registry
    (window as any).WebComponents = {};
  });

  describe('registerWebComponent', () => {
    it('should export registerWebComponent function', () => {
      expect(Register.registerWebComponent).toBeDefined();
      expect(typeof Register.registerWebComponent).toBe('function');
    });

    it('should not register if component already exists', () => {
      const mockElement = class extends HTMLElement {};
      (window.customElements.get as jest.Mock).mockReturnValue(mockElement);

      Register.registerWebComponent({
        name: 'test-component',
        element: mockElement as any,
      });

      expect(window.customElements.define).not.toHaveBeenCalled();
    });
  });

  describe('webComponent', () => {
    it('should export webComponent function', () => {
      expect(Register.webComponent).toBeDefined();
      expect(typeof Register.webComponent).toBe('function');
    });

    it('should create a registration function', () => {
      const mockCreateComponent = jest.fn(() => ({
        element: document.createElement('div'),
        styles: '',
      }));

      const registration = Register.webComponent({
        tagName: 'test-component',
        createComponent: mockCreateComponent,
      });

      expect(typeof registration).toBe('function');
    });
  });
});
