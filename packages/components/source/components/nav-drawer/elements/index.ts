import { Styles } from 'utilities';
import { CreateButton, buttonStyles } from './button';
import { CreateDrawer, drawerStyles } from './drawer';
import { UMDNavDrawer } from '../index';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
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
