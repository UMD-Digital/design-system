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

const preRender = {
  ...root,
  ...reset,
  ...webComponentsNamespace,
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

const styles = {
  accessibility: accessibilityNamespace,
  animation: animationsNamespace,
  element: elementNamespace,
  layout: layoutNamespace,
  typography: typographyNamespace,
  token: tokenNamespace,
  webComponents: webComponentsNamespace,
  utilities: utilitiesNamespace,
  root,
  reset,
  variables,
  preRender,
  preRenderCss,
  postRender,
  postRenderCss,
  outputStyles,
};

export const {
  accessibility,
  animation,
  element,
  layout,
  typography,
  token,
  webComponents,
  utilities,
} = styles;

export { root, reset, variables, preRender, preRenderCss, postRender, postRenderCss, outputStyles };

export default styles;
