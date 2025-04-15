import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-carousel';

const slots = {
  blocks: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.resize(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isTheme.dark({
    element,
  });
  const attributeLeftButton = element.getAttribute('left-button');
  const attributeRightButton = element.getAttribute('right-button');
  const attributeMobileHint = element.getAttribute('mobile-hint');
  const attributeHint = element.getAttribute('hint');
  const tabletSize = element.getAttribute('tablet-size');
  const desktopSize = element.getAttribute('desktop-size');
  const tabletCount = element.getAttribute('tablet-count');
  const desktopCount = element.getAttribute('desktop-count');
  const maxCount = element.getAttribute('max-count');
  const gridGap = element.getAttribute('grid-gap-pixels');
  const slide = element.querySelector(
    `[slot="${Slots.name.BLOCKS}"]`,
  ) as HTMLElement;
  const blocks = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];
  let hasLeftButton = true;
  let hasRightButton = true;
  let mobileHint = true;
  let hint = true;

  if (attributeLeftButton === 'false') hasLeftButton = false;
  if (attributeRightButton === 'false') hasRightButton = false;
  if (attributeMobileHint === 'false') mobileHint = false;
  if (attributeHint === 'false') hint = false;

  const createCardShadowRef = () => {
    const slot = Markup.create.Node.slot({ type: Slots.name.BLOCKS });
    shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.name.BLOCKS}"]`,
  ) as HTMLElement;

  return Composite.carousel.macro({
    slide,
    shadowRef,
    blocks,
    isThemeDark,
    hasLeftButton,
    hasRightButton,
    mobileHint,
    hint,
    tabletSize: tabletSize ? parseInt(tabletSize) : undefined,
    desktopSize: desktopSize ? parseInt(desktopSize) : undefined,
    tabletCount: tabletCount ? parseInt(tabletCount) : undefined,
    desktopCount: desktopCount ? parseInt(desktopCount) : undefined,
    maxCount: maxCount ? parseInt(maxCount) : undefined,
    gridGap,
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      attributes,
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};
