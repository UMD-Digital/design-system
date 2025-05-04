import { root, reset, variables } from './root';
import * as accessibilityNamespace from './accessibility';
import * as animationsNamespace from './animation';
import * as elementNamespace from './element';
import * as layoutNamespace from './layout';
import * as tokenNamespace from './token';
import * as typographyNamespace from './typography';
import { default as webComponentsNamespace } from './web-components';
import * as utilitiesNamespace from './utilities';

export type { JssEntry, JssObject } from './_types';

export const accessibility = accessibilityNamespace;
export const animation = animationsNamespace;
export const element = elementNamespace;
export const layout = layoutNamespace;
export const typography = typographyNamespace;
export const token = tokenNamespace;
export const webComponents = webComponentsNamespace;
export const utilities = utilitiesNamespace;

export { root, reset, variables };

export const preRender = {
  ...typographyNamespace.fontFace.browserString,
  ...root,
  ...webComponentsNamespace,
};

export const postRender = {
  ...utilitiesNamespace.transform.jss.formatNestedObjects({
    accessibilityNamespace,
    animationsNamespace,
    elementNamespace,
    layoutNamespace,
    typographyNamespace,
  }),
};

export const outputStyles = {
  ...preRender,
  ...postRender,
};
