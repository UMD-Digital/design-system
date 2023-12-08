import { colors } from '@universityofmaryland/umd-web-configuration';
import postcss, { Declaration, Postcss } from 'postcss';

export const Reset = `
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
    color: ${colors.black};
  }

  p {
    color: ${colors.gray.dark};
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  address {
    font-style: normal;
  }

  date {
    color: ${colors.gray.medium};
  }

  strong, b {
    font-weight: 900;
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

const postcssJs = require('postcss-js');
const tailwindcssNesting = require('tailwindcss/nesting');

export const ConvertJSSObjectToStyles = ({ styleObj }: { styleObj: any }) =>
  postcss(tailwindcssNesting).process(styleObj, {
    parser: postcssJs,
  }).css;

export const MakeDefaultStyleTag = ({
  styleString,
}: {
  styleString: string;
}) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const style = document.createElement('style');
  style.innerHTML = `${styleString.replace(/\s\s+/g, ' ')}`;

  body.appendChild(style);
};
