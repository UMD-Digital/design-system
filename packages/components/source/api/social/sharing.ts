import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';

const tagName = 'umd-element-social-sharing';

export default () => {
  const element = (element: HTMLElement) =>
    Composite.social.sharing({
      isFixed: Attributes.isLayout.fixed({ element }),
      title: Attributes.getValue.title({ element }),
      url: Attributes.getValue.url({ element }),
      includeFacebook: Attributes.includesSharing.facebook({ element }),
      includeTwitter: Attributes.includesSharing.twitter({ element }),
      includePrint: Attributes.isSharing.print({ element }),
      includeEmail: Attributes.isSharing.email({ element }),
    });

  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent: element,
      afterConnect: (element: Model.ElementRef) => element?.events?.load(),
    }),
  });
};
