import postcss from 'postcss';
import { token } from '@universityofmaryland/web-styles-library';
import postcssDuplicates from 'postcss-discard-duplicates';

const CreateStyleString = (styles: string): string => {
  const processor = postcss([postcssDuplicates]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = (processor.process as any)(styles, { from: undefined });
  return result.css;
};

const reset = `
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

export const stylesTemplate = ({ styles }: { styles: string }) => {
  const template = document.createElement('template');
  template.innerHTML = `<style>${reset}${CreateStyleString(styles)}</style>`;

  return template;
};
