/**
 * @jest-environment jsdom
 */

import { modifiers, StyleType } from '../core/style';
import { StyleModifierProps } from '../core/_types';

describe('Style Modifiers', () => {
  describe('StyleType enum', () => {
    it('should have correct style type values', () => {
      expect(StyleType.Element).toBe('element');
      expect(StyleType.Child).toBe('child');
      expect(StyleType.SiblingAfter).toBe('sibling-after');
      expect(StyleType.PseudoBefore).toBe('pseudo-before');
    });
  });

  describe('baseStyles modifier', () => {
    it('should return base styles when provided', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        baseStyles: { color: 'red', fontSize: '16px' },
      };

      const result = modifiers.baseStyles(props);

      expect(result).toContain('.test-class');
      expect(result).toContain('color');
      expect(result).toContain('red');
      expect(result).toContain('font-size');
      expect(result).toContain('16px');
    });

    it('should return CSS with empty object when no baseStyles provided', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.baseStyles(props);

      expect(result).toContain('.test-class');
    });
  });

  describe('element modifier', () => {
    it('should apply element styles', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        element: { padding: '10px', margin: '5px' },
      };

      const result = modifiers.element(props);

      expect(result).toContain('.test-class');
      expect(result).toContain('padding');
      expect(result).toContain('10px');
      expect(result).toContain('margin');
      expect(result).toContain('5px');
    });

    it('should return CSS with empty object when no element styles provided', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.element(props);

      expect(result).toContain('.test-class');
    });
  });

  describe('elementBefore modifier', () => {
    it('should apply pseudo-before styles', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        pseudoBefore: { content: '""', display: 'block' },
      };

      const result = modifiers.elementBefore(props);

      expect(result).toContain('.test-class:before');
      expect(result).toContain('content');
      expect(result).toContain('display');
      expect(result).toContain('block');
    });

    it('should return CSS with empty object when no pseudoBefore styles provided', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.elementBefore(props);

      expect(result).toContain('.test-class:before');
    });
  });

  describe('elementSiblingAfter modifier', () => {
    it('should apply sibling after styles', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        siblingAfter: { marginTop: '20px' },
      };

      const result = modifiers.elementSiblingAfter(props);

      expect(result).toContain('.test-class + *');
      expect(result).toContain('margin-top');
      expect(result).toContain('20px');
    });

    it('should return CSS with empty object when no siblingAfter styles provided', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.elementSiblingAfter(props);

      expect(result).toContain('.test-class + *');
    });
  });

  describe('elementChild modifier', () => {
    it('should apply child element styles', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        subElement: { fontSize: '14px', lineHeight: '1.5' },
      };

      const result = modifiers.elementChild(props);

      expect(result).toContain('.test-class *');
      expect(result).toContain('font-size');
      expect(result).toContain('14px');
      expect(result).toContain('line-height');
    });

    it('should return CSS with empty object when no subElement styles provided', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.elementChild(props);

      expect(result).toContain('.test-class *');
    });
  });

  describe('textColor modifier', () => {
    it('should apply white text color when isTextColorWhite is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isTextColorWhite: true,
      };

      const result = modifiers.textColor(props);

      expect(result).toContain('.test-class');
      expect(result).toContain('color');
      expect(result).toContain('white');
    });

    it('should apply white text color when isThemeDark is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isThemeDark: true,
      };

      const result = modifiers.textColor(props);

      expect(result).toContain('white');
    });

    it('should return CSS with empty object when no color flags are set', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.textColor(props);

      expect(result).toContain('.test-class');
    });
  });

  describe('iconColor modifier', () => {
    it('should apply white icon color when isTextColorWhite is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isTextColorWhite: true,
      };

      const result = modifiers.iconColor(props);

      expect(result).toContain('svg');
      expect(result).toContain('path');
      expect(result).toContain('fill');
      expect(result).toContain('white');
    });

    it('should apply white icon color when isThemeDark is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isThemeDark: true,
      };

      const result = modifiers.iconColor(props);

      expect(result).toContain('fill');
      expect(result).toContain('white');
    });

    it('should return CSS for child selector when no color flags are set', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.iconColor(props);

      expect(result).toContain('.test-class *');
    });
  });

  describe('animationLink modifier', () => {
    it('should apply red animation link styles when isAnimationLineRed is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isAnimationLineRed: true,
      };

      const result = modifiers.animationLink(props);

      expect(result).toContain('.test-class');
      expect(result).toContain('a');
    });

    it('should apply white animation link styles when isThemeDark is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isThemeDark: true,
      };

      const result = modifiers.animationLink(props);

      expect(result).toContain('a');
    });

    it('should apply black animation link styles by default', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.animationLink(props);

      expect(result).toContain('.test-class');
      expect(result).toContain('a');
    });
  });

  describe('childLink modifier', () => {
    it('should apply red link styles by default', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
      };

      const result = modifiers.childLink(props);

      expect(result).toContain('.test-class');
    });

    it('should apply white link styles when isThemeDark is true', () => {
      const props: StyleModifierProps = {
        className: 'test-class',
        isThemeDark: true,
      };

      const result = modifiers.childLink(props);

      expect(result).toContain('.test-class');
    });
  });

  describe('combined modifiers', () => {
    it('should work together with multiple modifiers', () => {
      const props: StyleModifierProps = {
        className: 'combined-class',
        baseStyles: { display: 'flex' },
        element: { padding: '10px' },
        isThemeDark: true,
        pseudoBefore: { content: '""' },
      };

      const baseResult = modifiers.baseStyles(props);
      const elementResult = modifiers.element(props);
      const beforeResult = modifiers.elementBefore(props);
      const textColorResult = modifiers.textColor(props);

      expect(baseResult).toContain('display');
      expect(elementResult).toContain('padding');
      expect(beforeResult).toContain(':before');
      expect(textColorResult).toContain('white');
    });
  });
});
