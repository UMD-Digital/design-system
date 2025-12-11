/**
 * Custom assertion utilities for element testing
 */

import type { ElementModel } from '../../_types';

/**
 * Asserts that an ElementModel has the expected structure
 */
export function assertElementModel(
  result: unknown,
  options: {
    hasElement?: boolean;
    hasStyles?: boolean;
    hasUpdate?: boolean;
    hasDestroy?: boolean;
  } = {}
): asserts result is ElementModel {
  const { 
    hasElement = true, 
    hasStyles = true, 
    hasUpdate = false, 
    hasDestroy = false 
  } = options;

  expect(result).toBeDefined();
  expect(result).toBeInstanceOf(Object);

  if (hasElement) {
    expect(result).toHaveProperty('element');
    expect((result as any).element).toBeInstanceOf(HTMLElement);
  }

  if (hasStyles) {
    expect(result).toHaveProperty('styles');
    expect(typeof (result as any).styles).toBe('string');
    expect((result as any).styles.length).toBeGreaterThan(0);
  }

  if (hasUpdate) {
    expect(result).toHaveProperty('update');
    expect(typeof (result as any).update).toBe('function');
  }

  if (hasDestroy) {
    expect(result).toHaveProperty('destroy');
    expect(typeof (result as any).destroy).toBe('function');
  }
}

/**
 * Asserts that an element has specific CSS classes
 */
export function assertHasClasses(
  element: HTMLElement,
  classes: string | string[],
  exact: boolean = false
): void {
  const expectedClasses = Array.isArray(classes) ? classes : [classes];
  
  expectedClasses.forEach(className => {
    expect(element.classList.contains(className)).toBe(true);
  });

  if (exact) {
    expect(element.classList.length).toBe(expectedClasses.length);
  }
}

/**
 * Asserts that an element has specific attributes
 */
export function assertHasAttributes(
  element: HTMLElement,
  attributes: Record<string, string | null>
): void {
  Object.entries(attributes).forEach(([name, value]) => {
    if (value === null) {
      expect(element.hasAttribute(name)).toBe(false);
    } else {
      expect(element.getAttribute(name)).toBe(value);
    }
  });
}

/**
 * Asserts that an element contains specific child elements
 */
export function assertHasChildren(
  parent: HTMLElement,
  selectors: string[],
  options: { exact?: boolean; ordered?: boolean } = {}
): void {
  const { exact = false, ordered = false } = options;

  selectors.forEach((selector, index) => {
    const child = parent.querySelector(selector);
    expect(child).toBeTruthy();

    if (ordered && index > 0) {
      const previousSelector = selectors[index - 1];
      const previousChild = parent.querySelector(previousSelector);
      const children = Array.from(parent.children);
      const previousIndex = children.indexOf(previousChild as Element);
      const currentIndex = children.indexOf(child as Element);
      expect(currentIndex).toBeGreaterThan(previousIndex);
    }
  });

  if (exact) {
    expect(parent.children.length).toBe(selectors.length);
  }
}

/**
 * Asserts that an element's text content matches expected value
 */
export function assertTextContent(
  element: HTMLElement,
  expected: string | RegExp,
  options: { exact?: boolean; trim?: boolean } = {}
): void {
  const { exact = false, trim = true } = options;
  const content = trim ? element.textContent?.trim() : element.textContent;

  if (typeof expected === 'string') {
    if (exact) {
      expect(content).toBe(expected);
    } else {
      expect(content).toContain(expected);
    }
  } else {
    expect(content).toMatch(expected);
  }
}

/**
 * Asserts that styles contain expected CSS rules
 */
export function assertStylesContain(
  styles: string,
  patterns: string[] | RegExp[]
): void {
  patterns.forEach(pattern => {
    if (typeof pattern === 'string') {
      expect(styles).toContain(pattern);
    } else {
      expect(styles).toMatch(pattern);
    }
  });
}

/**
 * Asserts element visibility
 */
export function assertVisibility(
  element: HTMLElement,
  visible: boolean = true
): void {
  const style = window.getComputedStyle(element);
  
  if (visible) {
    expect(style.display).not.toBe('none');
    expect(style.visibility).not.toBe('hidden');
    expect(element.hidden).toBe(false);
  } else {
    const isHidden = 
      style.display === 'none' || 
      style.visibility === 'hidden' || 
      element.hidden === true;
    expect(isHidden).toBe(true);
  }
}

/**
 * Asserts ARIA attributes for accessibility
 */
export function assertAccessibility(
  element: HTMLElement,
  requirements: {
    role?: string;
    label?: string;
    labelledBy?: string;
    describedBy?: string;
    expanded?: boolean;
    selected?: boolean;
    hidden?: boolean;
    live?: string;
  }
): void {
  if (requirements.role !== undefined) {
    expect(element.getAttribute('role')).toBe(requirements.role);
  }

  if (requirements.label !== undefined) {
    expect(element.getAttribute('aria-label')).toBe(requirements.label);
  }

  if (requirements.labelledBy !== undefined) {
    expect(element.getAttribute('aria-labelledby')).toBe(requirements.labelledBy);
  }

  if (requirements.describedBy !== undefined) {
    expect(element.getAttribute('aria-describedby')).toBe(requirements.describedBy);
  }

  if (requirements.expanded !== undefined) {
    expect(element.getAttribute('aria-expanded')).toBe(String(requirements.expanded));
  }

  if (requirements.selected !== undefined) {
    expect(element.getAttribute('aria-selected')).toBe(String(requirements.selected));
  }

  if (requirements.hidden !== undefined) {
    expect(element.getAttribute('aria-hidden')).toBe(String(requirements.hidden));
  }

  if (requirements.live !== undefined) {
    expect(element.getAttribute('aria-live')).toBe(requirements.live);
  }
}