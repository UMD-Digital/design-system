/**
 * Common Slot Configurations
 *
 * This module provides pre-defined slot configurations that are commonly used
 * across multiple components. These configurations ensure consistency in how
 * components accept and validate slotted content.
 */

import type { SlotConfig } from '../../api/_types';

const subHeadlineElements = ['h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

/**
 * Common slot configurations used across multiple components
 *
 * These pre-defined configurations promote consistency and reduce duplication
 * when defining component slots.
 */
export const allowed: Record<string, SlotConfig> = {
  /** Headline slot for headings */
  headline: {
    allowedElements: ['h1', ...subHeadlineElements],
  },
  /** Sub Headline slot for headings */
  subHeadline: {
    allowedElements: subHeadlineElements,
  },
  /** Text content slot */
  text: {
    allowedElements: ['div', 'p'],
  },
  /** Deprecated body slot - use text instead */
  body: {
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
    allowedElements: ['div', 'p'],
  },
  /** Actions slot for buttons and links */
  actions: {
    allowedElements: ['div', 'a', 'button'],
  },
  /** Image slot */
  image: {
    allowedElements: ['img', 'picture'],
  },
  /** Eyebrow text above headlines */
  eyebrow: {
    allowedElements: ['span', 'p'],
  },
  /** Generic content container */
  content: {
    allowedElements: ['div'],
  },
};
