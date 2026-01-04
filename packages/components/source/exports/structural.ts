/**
 * Structural Components Bundle
 *
 * Components for page structure and layout including hero sections and navigation.
 * These are typically above-the-fold components that should load first.
 */

import * as actions from '../web-components/actions';
import * as hero from '../web-components/hero';
import * as pathway from '../web-components/pathway';
import * as navigation from '../web-components/navigation';
import { loadComponentClass, ComponentMap } from './loader';

export const structuralComponents: ComponentMap = {
  actions,
  hero,
  pathway,
  navigation,
};

export const LoadStructuralComponents = () => {
  loadComponentClass(structuralComponents);
};

export { actions, hero, pathway, navigation };
