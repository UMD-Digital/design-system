import { Reset } from 'helpers/styles';
import { UMDNavDrawer } from 'components/nav-drawer';
import { CreateButton, buttonStyles } from './button';
import { CreateDrawer, drawerStyles } from './drawer';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${buttonStyles}
  ${drawerStyles}
`;

export const CreateShadowDom = ({ element }: { element: UMDNavDrawer }) => {
  const container = document.createElement('div');
  const openButton = CreateButton({ element });

  const drawer = CreateDrawer({ element });

  container.appendChild(openButton);
  container.appendChild(drawer);

  return container;
};
