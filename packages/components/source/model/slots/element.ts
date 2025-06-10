/**
 * Common Slot Configurations
 *
 * This module provides pre-defined slot configurations that are commonly used
 * across multiple components. These configurations ensure consistency in how
 * components accept and validate slotted content.
 */

import type { SlotConfig } from '../../api/_types';

const subHeadlineElements = ['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];
const textElements = ['div', 'p', 'span', 'strong'];

/**
 * Common slot configurations used across multiple components
 *
 * These pre-defined configurations promote consistency and reduce duplication
 * when defining component slots.
 */
export const allowed: Record<string, SlotConfig> = {
  actions: {
    allowedElements: ['div', 'a', 'button', 'umd-element-call-to-action'],
  },
  body: {
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
    allowedElements: [...textElements],
  },
  content: {
    allowedElements: ['div'],
  },
  eyebrow: {
    allowedElements: ['span', 'p'],
  },
  headline: {
    allowedElements: ['h1', ...subHeadlineElements],
  },
  image: {
    allowedElements: ['a', 'img', 'svg', 'picture', 'figure'],
  },
  subHeadline: {
    allowedElements: subHeadlineElements,
  },
  text: {
    allowedElements: [...textElements],
  },
  time: {
    allowedElements: ['time'],
  },
};
