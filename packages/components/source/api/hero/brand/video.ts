import { Composite } from '@universityofmaryland/web-elements-library';
import { Model, Register, Slots } from 'model';

const tagName = 'umd-element-hero-brand-video';

const createComponent = (element: HTMLElement) => {
  const animationTriggerAttribute = element.getAttribute('animation-trigger');
  const video = element.querySelector('video') as HTMLVideoElement;

  return Composite.hero.brand.video.CreateElement({
    video,
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    isAnimationOnLoad: animationTriggerAttribute === 'load',
  });
};

const Load = () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (element) => {
        element?.events?.load();
      },
    }),
  });
};

export default {
  Load,
};
