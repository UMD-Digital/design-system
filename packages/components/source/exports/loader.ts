/**
 * Shared component loading utilities
 * Extracted to avoid circular dependencies
 */

/**
 * Type definition for a map of component registration functions.
 * Used to organize components by category and variant.
 */
export interface ComponentMap {
  [key: string]: {
    [subKey: string]: () => void;
  };
}

/**
 * Utility function to register a collection of UMD web components.
 * Iterates through a ComponentMap and calls each registration function.
 */
export const loadComponentClass = (componentMap: ComponentMap) => {
  for (const key in componentMap) {
    if (Object.prototype.hasOwnProperty.call(componentMap, key)) {
      const component = componentMap[key];

      for (const subKey in component) {
        if (Object.prototype.hasOwnProperty.call(component, subKey)) {
          component[subKey]();
        }
      }
    }
  }
};