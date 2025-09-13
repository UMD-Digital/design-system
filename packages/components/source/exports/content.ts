/**
 * Content Components Bundle
 *
 * Components for displaying various types of content including cards, media, text, etc.
 * These are the most commonly used components for presenting information.
 *
 * This bundle includes all components that are not categorized as:
 * - Feed components (dynamic content feeds)
 * - Interactive components (user interaction)
 * - Structural components (page structure/layout)
 */

import * as components from '../api';
import { loadComponentClass, ComponentMap } from './loader';
import { feedComponents } from './feed';
import { interactiveComponents } from './interactive';
import { structuralComponents } from './structural';

const excludedKeys = new Set([
  ...Object.keys(feedComponents),
  ...Object.keys(interactiveComponents),
  ...Object.keys(structuralComponents),
]);

export const contentComponents: ComponentMap = Object.entries(components)
  .filter(([key, value]) => {
    // Only include component groups (objects with sub-components)
    // Exclude individual functions and already categorized components
    return (
      typeof value === 'object' && value !== null && !excludedKeys.has(key)
    );
  })
  .reduce((acc, [key, value]) => {
    acc[key] = value as ComponentMap[string];
    return acc;
  }, {} as ComponentMap);

export const LoadContentComponents = () => {
  loadComponentClass(contentComponents);
};

export default LoadContentComponents;
