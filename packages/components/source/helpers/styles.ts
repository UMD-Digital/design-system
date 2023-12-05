import postcss, { Declaration, Postcss } from 'postcss';

export const Reset = `
  :host * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :host button {
    border: none;
  }

  :host a {
    text-decoration: inherit;
    color: inherit;
  }

  :host strong,
  :host b {
    font-weight: 900;
  }

  :host em, 
  :host i {
    font-style: italic;
  }

  :host h1,
  :host h2,
  :host h3,
  :host h4,
  :host h5,
  :host h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  :host img {
    max-width: 100%;
    display: block;
  }

  :host .sr-only {
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
