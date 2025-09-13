/**
 * Structural Components Bundle
 *
 * Components for page structure and layout including hero sections and navigation.
 * These are typically above-the-fold components that should load first.
 */

import { actions, hero, navigation } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

export const structuralComponents: ComponentMap = {
  actions,
  hero,
  navigation,
};

export const LoadStructuralComponents = () => {
  loadComponentClass(structuralComponents);
};

export default LoadStructuralComponents;
