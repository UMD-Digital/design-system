/**
 * Structural Components Bundle
 *
 * Components for page structure and layout including hero sections and navigation.
 * These are typically above-the-fold components that should load first.
 */

export * as hero from '../api/hero';
export * as navigation from '../api/navigation';
export * as footer from '../api/footer';
export * as layout from '../api/layout';

import { hero, navigation, footer, layout } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

export const structuralComponents: ComponentMap = {
  hero,
  navigation,
  footer,
  layout,
};

export const LoadStructuralComponents = () => {
  loadComponentClass(structuralComponents);
};

export default LoadStructuralComponents;
