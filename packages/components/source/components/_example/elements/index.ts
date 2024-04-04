import { Styles } from 'utilities';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
`;

export const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  return container;
};
