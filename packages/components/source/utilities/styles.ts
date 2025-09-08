import { token } from '@universityofmaryland/web-styles-library';
import postcss from 'postcss';
import postcssNesting from 'postcss-nesting';
import postcssJs from 'postcss-js';

export const reset = `
  :host {
    color: ${token.color.black};
  }
  
  :host * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  div {
    line-height: 1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: ${token.color.black};
  }

  p {
    color: ${token.color.gray.dark};
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  address {
    font-style: normal;
  }

  strong, b {
    font-weight: 700;
  }

  em, i {
    font-style: italic;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }

  .sr-only {
    clip: rect(0,0,0,0);
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export const convertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) => {
  const root = postcssJs.parse(styleObj);
  return postcss(postcssNesting).process(root as any).css;
};
