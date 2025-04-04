import { JssEntry, JssObject } from './transform';

/**
 * Creates a JSS object with type checking.
 * @template T Type extending JssEntry
 * @param {T} style The style object
 * @returns {T} The JSS object with the same type
 */
export const jssObject = <T extends JssEntry>(style: T): T => style;

export const jssObjectFromString = (cssString: string): Record<string, any> => {
  if (!cssString || typeof cssString !== 'string') {
    return {};
  }

  return cssString
    .split(';')
    .filter((style) => style.trim())
    .reduce((acc, declaration) => {
      const [property, value] = declaration.split(':').map((str) => str.trim());

      if (!property || !value) {
        return acc;
      }

      // Convert kebab-case to camelCase
      const camelProperty = property.replace(/-([a-z])/g, (g) =>
        g[1].toUpperCase(),
      );

      // Convert numeric strings to numbers where appropriate
      const processedValue = value.match(/^\d+$/)
        ? parseInt(value, 10)
        : value.match(/^\d*\.\d+$/)
        ? parseFloat(value)
        : value;

      return {
        ...acc,
        [camelProperty]: processedValue,
      };
    }, {});
};
