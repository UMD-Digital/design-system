export const ComponentStyles = `
  :host {
    display: block;
    container: umd-example / inline-size; 
  }

  :host * {
    box-sizing: border-box;
  }

  :host img {
    max-width: 100%;
  }
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  return container;
};
