import postcss, { Declaration, Postcss } from 'postcss';

export const Reset = `
  :host * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  button {
    border: none;
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }

  div {
    line-height: 1;
  }

  strong, b {
    font-weight: 900;
  }

  em, i {
    font-style: italic;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  address {
    font-style: normal;
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
