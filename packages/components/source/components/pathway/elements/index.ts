import { Reset } from 'helpers/styles';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  return container;
};
