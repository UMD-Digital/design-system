import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';
import { CommonPersonData } from './common';

const tagName = 'umd-element-person-hero';

const { Node } = Markup.create;

const createComponent = (element: HTMLElement) => {
  const isThemeDark = Attributes.isTheme.dark({
    element,
  });
  const breadcrumbSlot = Node.slot({ type: Slots.name.BREADCRUMB });

  if (breadcrumbSlot) {
    const breadcrumb = element.querySelector(
      `[slot="${Slots.name.BREADCRUMB}"]`,
    );
    if (breadcrumb) {
      const copy = breadcrumb.cloneNode(true);

      element.appendChild(copy);
      breadcrumb.setAttribute('slot', Slots.name.BREADCRUMB_COPY);
    }
  }

  return Composite.person.hero({
    ...CommonPersonData({ element, isThemeDark }),
    breadcrumbDesktop: Node.slot({ type: Slots.name.BREADCRUMB }),
    breadcrumbMobile: Node.slot({ type: Slots.name.BREADCRUMB_COPY }),
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};
