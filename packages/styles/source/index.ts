import * as accessibilityNamespace from './accessibility';
import * as animationsNamespace from './animation';
import * as elementNamespace from './element';
import * as layoutNamespace from './layout';
import * as tokenNamespace from './token';
import * as typographyNamespace from './typography';
import { default as webComponentsNamespace } from './web-components';
import * as utilitiesNamespace from './utilities';
import * as transformNamespace from './utilities/transform';

export { root } from './root';
export const accessibility = accessibilityNamespace;
export const animation = animationsNamespace;
export const element = elementNamespace;
export const layout = layoutNamespace;
export const typography = typographyNamespace;
export const token = tokenNamespace;
export const webComponents = webComponentsNamespace;
export const utilities = utilitiesNamespace;

export type JssEntry = transformNamespace.JssEntry;

export const outputStyles: string = {
  ...typographyNamespace.fontFace.browserString,
  ...utilitiesNamespace.transform.processNestedObjects(accessibilityNamespace),
  ...utilitiesNamespace.transform.processNestedObjects(animationsNamespace),
  ...utilitiesNamespace.transform.processNestedObjects(elementNamespace),
  ...utilitiesNamespace.transform.processNestedObjects(layoutNamespace),
  ...utilitiesNamespace.transform.processNestedObjects(typographyNamespace),
  ...webComponentsNamespace,
};
