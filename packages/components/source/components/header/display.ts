import { Tokens } from '@universityofmaryland/variables';
import { MarkupCreate, MarkupValidate } from 'utilities';
import { UMDHeaderElement } from './index';

const { Colors, Spacing, Breakpoints } = Tokens;
const { SlotOberserver, SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-header';
const ELEMENT_HEADER_DECLARATION = 'element-header-declaration';
const ELEMENT_HEADER_CONTAINTER = 'element-header-container';
const ELEMENT_HEADER_WRAPPER = 'element-header-wrapper';
const ELEMENT_HEADER_LOGO_COLUMN = 'element-header-logo-column';
const ELEMENT_HEADER_NAVIGATION_COLUMN = 'element-header-navigation-column';
const ELEMENT_HEADER_LOGO = 'element-header-logo';
const ELEMENT_HEADER_DRAWER = 'element-header-drawer';
const ELEMENT_HEADER_NAVIGATION_ROW = 'element-header-navigation-row';

const navigationColumnStyles = `
  .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
    display: flex;
    alignItems: center;
  }

  @container ${ELEMENT_NAME} (max-width: ${Breakpoints.tablet.max}) {
    .${ELEMENT_HEADER_NAVIGATION_COLUMN} {
      display: none;
    }
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} {
    display: flex;
    gap: ${Spacing.md};
    justify-content flex-end;
    align-items: center;
  }

  .${ELEMENT_HEADER_NAVIGATION_ROW} svg {
    width: 24px;
    height: 24px;
    fill: ${Colors.black};
  }
`;

const logoColumnStyles = `
  .${ELEMENT_HEADER_LOGO_COLUMN} {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .${ELEMENT_HEADER_DRAWER} {
    border-right: 1px solid ${Colors.gray.light};
    padding-right: ${Spacing.min};
    margin-right: ${Spacing.sm};
  }

  .${ELEMENT_HEADER_LOGO} {
    display: block;
  }

  .${ELEMENT_HEADER_LOGO} img {
    width: 100%;
    max-width: 160px;
    max-height: 48px;
  }

  @container ${ELEMENT_NAME} (min-width: ${Breakpoints.tablet.min}) {
    .${ELEMENT_HEADER_LOGO} img {
      max-width: 240px;
    }
  }
`;

const wrapperStyles = `
  .${ELEMENT_HEADER_WRAPPER} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${Spacing.lg};
  }
`;

const constainerStyles = `
  .${ELEMENT_HEADER_CONTAINTER} {
    background-color: ${Colors.white};
    display: block;
    padding: ${Spacing.md} 0;
    position: relative;
  }
`;

export const styles = `
  :host {
    display: block;
  }

  .${ELEMENT_HEADER_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${constainerStyles}
  ${wrapperStyles}
  ${logoColumnStyles}
  ${navigationColumnStyles}
`;

const CreateUtiltyRow = ({ element }: { element: UMDHeaderElement }) => {};

const CreateNavigationRow = ({ element }: { element: UMDHeaderElement }) => {
  const { NAVIGATION } = element._slots;
  const navigationSlot = SlotWithDefaultStyling({
    element,
    slotRef: NAVIGATION,
  });

  if (!navigationSlot) return null;

  navigationSlot.classList.add(ELEMENT_HEADER_NAVIGATION_ROW);
  return navigationSlot;
};

const CreateNavigationColumn = ({ element }: { element: UMDHeaderElement }) => {
  const container = document.createElement('div');
  const navigationRow = CreateNavigationRow({ element });

  if (!navigationRow) return null;

  if (navigationRow) {
    container.appendChild(navigationRow);
  }

  return container;
};

const CreateLogoColumn = ({ element }: { element: UMDHeaderElement }) => {
  const { LOGO, DRAWER } = element._slots;
  const logoSlot = MarkupValidate.ImageSlot({ element, ImageSlot: LOGO });
  const drawerSlot = SlotWithDefaultStyling({ element, slotRef: DRAWER });
  const container = document.createElement('div');

  if (drawerSlot) {
    drawerSlot.classList.add(ELEMENT_HEADER_DRAWER);
    container.appendChild(drawerSlot);
  }

  if (logoSlot) {
    logoSlot.classList.add(ELEMENT_HEADER_LOGO);
    container.appendChild(logoSlot);
  }

  container.classList.add(ELEMENT_HEADER_LOGO_COLUMN);

  return container;
};

const CreateHeaderContainer = ({ element }: { element: UMDHeaderElement }) => {
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const logoColumn = CreateLogoColumn({ element });
  const navigationColumn = CreateNavigationColumn({ element });

  wrapper.classList.add(ELEMENT_HEADER_WRAPPER);
  wrapper.appendChild(logoColumn);
  if (navigationColumn) wrapper.appendChild(navigationColumn);

  container.appendChild(wrapper);
  container.classList.add(ELEMENT_HEADER_CONTAINTER);

  declaration.classList.add(ELEMENT_HEADER_DECLARATION);
  declaration.appendChild(container);

  return declaration;
};

export const CreateShadowDom = ({ element }: { element: UMDHeaderElement }) => {
  const { LOGO } = element._slots;
  const logoSlot = element.querySelector(`[slot="${LOGO}"]`);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
    return null;
  }

  return CreateHeaderContainer({ element });
};
