import { Tokens } from '@universityofmaryland/web-elements-styles';
import postcss from 'postcss';

const { Colors } = Tokens;

const postcssNesting = require('postcss-nesting');
const postcssJs = require('postcss-js');

export const reset = `
  :host {
    color: ${Colors.black};
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
    color: ${Colors.black};
  }

  p {
    color: ${Colors.gray.dark};
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  address {
    font-style: normal;
  }

  date {
    color: ${Colors.gray.medium};
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

export const convertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) =>
  postcss(postcssNesting).process(styleObj, {
    parser: postcssJs,
  }).css;
