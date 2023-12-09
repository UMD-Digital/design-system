import { Reset } from 'helpers/styles';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { CreateButton, buttonStyles } from './button';
import { CreateDrawer, drawerStyles } from './drawer.ts';

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
