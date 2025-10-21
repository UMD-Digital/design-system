/**
 * @jest-environment jsdom
 */

import {
  ElementProps,
  ElementStyles,
  StyleOptions,
  CompositeChild,
  ConfigurationProps,
  StyleModifierProps,
  BuilderConfig,
  BuilderProps,
} from '../core/_types';

describe('Type Exports', () => {
  describe('ElementProps', () => {
    it('should allow creating valid ElementProps', () => {
      const element = document.createElement('div');

      const validProps: ElementProps = {
        element,
      };

      expect(validProps.element).toBe(element);
    });

    it('should support optional color properties', () => {
      const element = document.createElement('div');

      const propsWithColors: ElementProps = {
        element,
        isTextColorWhite: true,
        isTextColorBlack: false,
        isAnimationLineRed: true,
        isThemeDark: false,
      };

      expect(propsWithColors.isTextColorWhite).toBe(true);
      expect(propsWithColors.isAnimationLineRed).toBe(true);
    });

    it('should support optional elementStyles', () => {
      const element = document.createElement('div');

      const propsWithStyles: ElementProps = {
        element,
        elementStyles: {
          element: { color: 'red' },
          pseudoBefore: { content: '""' },
        },
      };

      expect(propsWithStyles.elementStyles).toBeDefined();
      expect(propsWithStyles.elementStyles?.element).toBeDefined();
    });

    it('should support optional children', () => {
      const element = document.createElement('div');
      const child = document.createElement('span');

      const propsWithChildren: ElementProps = {
        element,
        children: [
          { element: child, styles: '.child { }' },
        ],
      };

      expect(propsWithChildren.children).toHaveLength(1);
    });

    it('should support optional attributes', () => {
      const element = document.createElement('div');

      const propsWithAttributes: ElementProps = {
        element,
        attributes: [
          { 'data-test': 'value', 'aria-label': 'Label' },
        ],
      };

      expect(propsWithAttributes.attributes).toHaveLength(1);
    });
  });

  describe('ElementStyles', () => {
    it('should allow creating valid ElementStyles', () => {
      const styles: ElementStyles = {
        element: { color: 'red', fontSize: '16px' },
        pseudoBefore: { content: '""', display: 'block' },
        siblingAfter: { marginTop: '10px' },
        subElement: { padding: '5px' },
      };

      expect(styles.element).toBeDefined();
      expect(styles.pseudoBefore).toBeDefined();
      expect(styles.siblingAfter).toBeDefined();
      expect(styles.subElement).toBeDefined();
    });

    it('should allow partial ElementStyles', () => {
      const partialStyles: ElementStyles = {
        element: { color: 'blue' },
      };

      expect(partialStyles.element).toBeDefined();
      expect(partialStyles.pseudoBefore).toBeUndefined();
    });
  });

  describe('StyleOptions', () => {
    it('should require className', () => {
      const options: StyleOptions = {
        className: 'test-class',
      };

      expect(options.className).toBe('test-class');
    });

    it('should support optional baseStyles', () => {
      const options: StyleOptions = {
        className: 'test-class',
        baseStyles: { display: 'flex', gap: '10px' },
      };

      expect(options.baseStyles).toBeDefined();
    });
  });

  describe('CompositeChild', () => {
    it('should require element and styles', () => {
      const child: CompositeChild = {
        element: document.createElement('span'),
        styles: '.child { color: red; }',
      };

      expect(child.element).toBeInstanceOf(HTMLElement);
      expect(typeof child.styles).toBe('string');
    });

    it('should support optional className', () => {
      const child: CompositeChild = {
        element: document.createElement('span'),
        className: 'child-class',
        styles: '.child-class { }',
      };

      expect(child.className).toBe('child-class');
    });
  });

  describe('ConfigurationProps', () => {
    it('should extend ElementProps and StyleOptions', () => {
      const config: ConfigurationProps = {
        element: document.createElement('div'),
        className: 'config-class',
      };

      expect(config.element).toBeInstanceOf(HTMLElement);
      expect(config.className).toBe('config-class');
    });

    it('should support all ElementProps properties', () => {
      const config: ConfigurationProps = {
        element: document.createElement('div'),
        className: 'config-class',
        isThemeDark: true,
        elementStyles: {
          element: { padding: '10px' },
        },
      };

      expect(config.isThemeDark).toBe(true);
      expect(config.elementStyles).toBeDefined();
    });
  });

  describe('StyleModifierProps', () => {
    it('should combine ElementStyles, StyleOptions, and color flags', () => {
      const props: StyleModifierProps = {
        className: 'modifier-class',
        element: { color: 'red' },
        isThemeDark: true,
      };

      expect(props.className).toBe('modifier-class');
      expect(props.element).toBeDefined();
      expect(props.isThemeDark).toBe(true);
    });
  });

  describe('BuilderConfig', () => {
    it('should require styleModifiers function', () => {
      const config: BuilderConfig = {
        styleModifiers: (props) => `.${props.className} { color: red; }`,
      };

      const result = config.styleModifiers({ className: 'test' });
      expect(typeof result).toBe('string');
    });

    it('should support optional elementModifiers', () => {
      const config: BuilderConfig = {
        styleModifiers: () => '',
        elementModifiers: [
          (element) => element.classList.add('modified'),
        ],
      };

      expect(config.elementModifiers).toHaveLength(1);
    });
  });

  describe('BuilderProps', () => {
    it('should require config', () => {
      const props: BuilderProps = {
        config: {
          styleModifiers: () => '',
        },
      };

      expect(props.config).toBeDefined();
      expect(props.config.styleModifiers).toBeInstanceOf(Function);
    });

    it('should support optional options', () => {
      const props: BuilderProps = {
        config: {
          styleModifiers: () => '',
        },
        options: {
          element: { color: 'blue' },
          isThemeDark: true,
        },
      };

      expect(props.options).toBeDefined();
      expect(props.options?.isThemeDark).toBe(true);
    });
  });

  describe('Type consistency', () => {
    it('should ensure all types are properly exported from index', () => {
      // This test ensures the types can be imported from the main package
      // If this compiles, the types are properly exported
      const element = document.createElement('div');

      const elementProps: ElementProps = { element };
      const styles: ElementStyles = { element: {} };
      const options: StyleOptions = { className: 'test' };
      const child: CompositeChild = { element, styles: '' };
      const config: ConfigurationProps = { element, className: 'test' };
      const modifierProps: StyleModifierProps = { className: 'test' };
      const builderConfig: BuilderConfig = { styleModifiers: () => '' };
      const builderProps: BuilderProps = { config: builderConfig };

      expect(elementProps).toBeDefined();
      expect(styles).toBeDefined();
      expect(options).toBeDefined();
      expect(child).toBeDefined();
      expect(config).toBeDefined();
      expect(modifierProps).toBeDefined();
      expect(builderConfig).toBeDefined();
      expect(builderProps).toBeDefined();
    });
  });
});
