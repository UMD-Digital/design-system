export const ComponentStyles = `
  :host {
    display: block !important;
    container: umd-nav-dropdown / inline-size; 
  }
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');

  return container;
};
