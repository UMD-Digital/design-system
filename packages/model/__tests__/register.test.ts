import { Register } from '../source';
import * as registrationModule from '../source/model/registration';
import * as errorsModule from '../source/attributes/errors';

// swc's CommonJS output defines exports as non-configurable getters, so
// jest.spyOn cannot patch them — partial-mock the modules instead.
jest.mock('../source/model/registration', () => {
  const actual = jest.requireActual('../source/model/registration');
  return { ...actual, registerComponent: jest.fn(actual.registerComponent) };
});
jest.mock('../source/attributes/errors', () => {
  const actual = jest.requireActual('../source/attributes/errors');
  return { ...actual, devWarning: jest.fn(actual.devWarning) };
});

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
      const devWarningSpy = jest.mocked(errorsModule.devWarning);
      (window.customElements.get as jest.Mock).mockReturnValue(undefined);

      Register.registerWebComponent({
        name: 'test-deprecation-el',
        element: class extends HTMLElement {} as any,
      });

      expect(devWarningSpy).toHaveBeenCalledWith(
        expect.stringContaining('registerWebComponent() is deprecated'),
      );
      devWarningSpy.mockClear();
    });

    it('webComponent fires deprecation warning when called', () => {
      const devWarningSpy = jest.mocked(errorsModule.devWarning);
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
      devWarningSpy.mockClear();
    });
  });

  describe('Registration migration', () => {
    it('webComponent uses registerComponent internally', () => {
      const registerSpy = jest.mocked(registrationModule.registerComponent);
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
      registerSpy.mockClear();
    });

    it('falls back to legacy on validation error', () => {
      const registerSpy = jest
        .mocked(registrationModule.registerComponent)
        .mockImplementationOnce(() => {
          throw new Error('validation failed');
        });
      const devWarningSpy = jest.mocked(errorsModule.devWarning);
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

      registerSpy.mockClear();
      devWarningSpy.mockClear();
    });

    it('maintains WebComponents global after successful registration', () => {
      jest
        .mocked(registrationModule.registerComponent)
        .mockReturnValueOnce(true);
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
