/**
 * Test utilities for element components
 */

import type { ContentElement, ElementModel } from '../../_types';

export interface TestElementConfig {
  element?: HTMLElement;
  className?: string;
  styles?: string;
  attributes?: Record<string, string>;
}

/**
 * Creates an element for testing
 */
export function createElement(
  tagName: string = 'div',
  content?: string,
  attributes?: Record<string, string>,
): HTMLElement {
  const element = document.createElement(tagName);

  if (content) {
    element.textContent = content;
  }

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  return element;
}

/**
 * Creates a content element for testing
 */
export function createContentElement(
  tagName: string = 'p',
  content?: string,
): ContentElement {
  if (!content) return null;
  return createElement(tagName, content);
}

/**
 * Creates an image element for testing
 */
export function createImageElement(
  src: string = 'test.jpg',
  alt: string = 'Test image',
): HTMLImageElement {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  return img;
}

/**
 * Creates a video element for testing
 */
export function createVideoElement(src: string = 'test.mp4'): HTMLVideoElement {
  const video = document.createElement('video');
  video.src = src;
  return video;
}

/**
 * Creates a link element for testing
 */
export function createLinkElement(
  href: string = '#',
  text: string = 'Test link',
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  return link;
}

/**
 * Validates that an element has expected structure
 */
export function validateElementStructure(
  result: any,
  expectedConfig: {
    hasElement?: boolean;
    hasStyles?: boolean;
    className?: string;
    tagName?: string;
  },
): void {
  if (expectedConfig.hasElement !== false) {
    expect(result).toHaveProperty('element');
    expect(result.element).toBeInstanceOf(HTMLElement);

    if (expectedConfig.tagName) {
      expect(result.element.tagName.toLowerCase()).toBe(
        expectedConfig.tagName.toLowerCase(),
      );
    }

    if (expectedConfig.className) {
      expect(result.element.classList.contains(expectedConfig.className)).toBe(
        true,
      );
    }
  }

  if (expectedConfig.hasStyles !== false) {
    expect(result).toHaveProperty('styles');
    expect(typeof result.styles).toBe('string');
  }
}

/**
 * Gets child elements by class name
 */
export function getChildByClass(
  parent: HTMLElement,
  className: string,
): HTMLElement | null {
  return parent.querySelector(`.${className}`);
}

/**
 * Counts child elements
 */
export function countChildren(parent: HTMLElement): number {
  return parent.children.length;
}

/**
 * Validates element contains expected text
 */
export function containsText(element: HTMLElement, text: string): boolean {
  return element.textContent?.includes(text) || false;
}

/**
 * Creates a mock ElementModel result
 */
export function createMockElementModel(
  config: TestElementConfig = {},
): ElementModel {
  return {
    element: config.element || document.createElement('div'),
    styles: config.styles || '.mock-class { color: red; }',
  };
}
