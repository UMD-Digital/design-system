import { Register } from '../source';
import * as registrationModule from '../source/model/registration';
import * as errorsModule from '../source/attributes/errors';

describe('Register', () => {
  beforeEach(() => {
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

  describe('Deprecation warnings', () => {
    it('registerWebComponent fires deprecation warning in dev mode', () => {
      const devWarningSpy = jest.spyOn(errorsModule, 'devWarning');
      (window.customElements.get as jest.Mock).mockReturnValue(undefined);

      Register.registerWebComponent({
        name: 'test-deprecation-el',
        element: class extends HTMLElement {} as any,
      });

      expect(devWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining('registerWebComponent() is deprecated'),
      );
      devWarningSpy.mockRestore();
    });

    it('webComponent fires deprecation warning when called', () => {
      const devWarningSpy = jest.spyOn(errorsModule, 'devWarning');
      (window.customElements.get as jest.Mock).mockReturnValue(undefined);

      const registration = Register.webComponent({
        tagName: 'test-deprecation-web-el',
        createComponent: () => ({
          element: document.createElement('div'),
          styles: '',
        }),
      });

      registration();

      expect(devWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining('Register.webComponent() is deprecated'),
      );
      devWarningSpy.mockRestore();
    });
  });

  describe('Registration migration', () => {
    it('webComponent uses registerComponent internally', () => {
      const registerSpy = jest.spyOn(registrationModule, 'registerComponent');
      (window.customElements.get as jest.Mock).mockReturnValue(undefined);

      const registration = Register.webComponent({
        tagName: 'test-migration-el',
        createComponent: () => ({
          element: document.createElement('div'),
          styles: '',
        }),
      });

      registration();

      expect(registerSpy).toHaveBeenCalledWith(
        'test-migration-el',
        expect.any(Function),
        { eager: false },
      );
      registerSpy.mockRestore();
    });

    it('falls back to legacy on validation error', () => {
      const registerSpy = jest
        .spyOn(registrationModule, 'registerComponent')
        .mockImplementation(() => {
          throw new Error('validation failed');
        });
      const devWarningSpy = jest.spyOn(errorsModule, 'devWarning');
      (window.customElements.get as jest.Mock).mockReturnValue(undefined);

      const registration = Register.webComponent({
        tagName: 'test-fallback-el',
        createComponent: () => ({
          element: document.createElement('div'),
          styles: '',
        }),
      });

      // Should not throw — falls back to legacy
      expect(() => registration()).not.toThrow();

      registerSpy.mockRestore();
      devWarningSpy.mockRestore();
    });

    it('maintains WebComponents global after successful registration', () => {
      jest
        .spyOn(registrationModule, 'registerComponent')
        .mockReturnValue(true);
      (window.customElements.get as jest.Mock).mockReturnValue(undefined);

      const registration = Register.webComponent({
        tagName: 'test-global-el',
        createComponent: () => ({
          element: document.createElement('div'),
          styles: '',
        }),
      });

      registration();

      expect(window.WebComponents['test-global-el']).toBeDefined();
      jest.restoreAllMocks();
    });
  });
});
