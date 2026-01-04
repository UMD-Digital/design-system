import { root, reset, variables } from './root';
import * as accessibilityNamespace from './accessibility';
import * as animationsNamespace from './animation';
import * as elementNamespace from './element';
import * as layoutNamespace from './layout';
import * as tokenNamespace from '@universityofmaryland/web-token-library';
import * as typographyNamespace from './typography';
import { webComponentStyles } from './web-components';
import * as utilitiesNamespace from './utilities';

export type { JssEntry, JssObject } from './_types';

const preRender = {
  ...root,
  ...reset,
  ...webComponentStyles,
};

const preRenderCss = utilitiesNamespace.create.style.toString(preRender);

const postRender = {
  ...utilitiesNamespace.transform.jss.formatNestedObjects({
    accessibilityNamespace,
    animationsNamespace,
    elementNamespace,
    layoutNamespace,
    typographyNamespace,
  }),
};

const postRenderCss = utilitiesNamespace.create.style.toString(postRender);

const outputStyles = {
  ...typographyNamespace.fontFace.typographyFontFaceObject,
  ...preRender,
  ...postRender,
};

export const accessibility = accessibilityNamespace;
export const animation = animationsNamespace;
export const element = elementNamespace;
export const layout = layoutNamespace;
export const typography = typographyNamespace;
export const token = tokenNamespace;
export const webComponents = webComponentStyles;
export const utilities = utilitiesNamespace;

export { root, reset, variables, preRender, preRenderCss, postRender, postRenderCss, outputStyles };
