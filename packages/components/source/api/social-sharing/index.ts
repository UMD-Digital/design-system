import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';

const { SocialSharing } = Components;

const tagName = 'umd-element-social-sharing';

const Load = () => {
  const element = (element: HTMLElement) =>
    SocialSharing({
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

export default {
  Load,
};
