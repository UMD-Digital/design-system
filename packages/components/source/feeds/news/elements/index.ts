import { Reset } from 'helpers/styles';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
`;

const CreateCallToAction = () => {
  const wrapper = document.createElement('umd-element-call-to-action');
  const link = document.createElement('a');

  link.setAttribute('href', 'https://google.com');
  link.setAttribute('target', '_blank');
  link.innerHTML = 'View Article';

  wrapper.setAttribute('size', 'large');
  wrapper.setAttribute('type', 'outline');

  wrapper.appendChild(link);

  return wrapper;
};

export const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const container = document.createElement('div');
  const linkWrapper = CreateCallToAction();

  container.appendChild(linkWrapper);

  return container;
};
