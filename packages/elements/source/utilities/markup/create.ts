import * as AssetIcon from '../assets/icons';

const Node = {
  span: ({ text }: { text: string }) => {
    const span = document.createElement('span');
    span.innerHTML = text;

    return span;
  },

  slot: ({ type }: { type: string }) => {
    const slot = document.createElement('slot');
    slot.setAttribute('name', type);

    return slot;
  },

  imageFromSvg: ({ SVG }: { SVG: string }) => {
    const image = document.createElement('img');

    image.src = `data:image/svg+xml;base64,${btoa(SVG)}`;
    return image;
  },

  linkWithSpan: ({
    url,
    title,
    label,
  }: {
    url: string;
    title: string;
    label?: string;
  }) => {
    const link = document.createElement('a');
    const span = document.createElement('span');

    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');

    span.innerText = title;
    link.appendChild(span);

    if (label) link.setAttribute('aria-label', label);

    return link;
  },
  stylesTemplate: ({ styles }: { styles: string }) => {
    const template = document.createElement('template');

    template.innerHTML = `<style>${styles}</style>`;

    return template;
  },
};

export const CreateGif = ({
  container,
}: {
  container: HTMLDivElement | null;
}) => {
  if (!container) return;
  const image = container.querySelector('img');
  const isGif = image?.src.includes('.gif');

  if (!image || !isGif) return;
  const canvas = document.createElement('canvas');
  const button = document.createElement('button');
  const setButtonPlay = () => {
    button.setAttribute('aria-label', 'Pause');
    button.innerHTML = AssetIcon.PAUSE;
    canvas.style.opacity = '0';
    image.style.opacity = '1';
  };
  const setButtonPause = () => {
    button.setAttribute('aria-label', 'Play');
    button.innerHTML = AssetIcon.PLAY;
    canvas.style.opacity = '1';
    image.style.opacity = '0';
  };
  const SizeCanvas = ({ container }: { container: HTMLDivElement | null }) => {
    if (!container) return;
    const image = container.querySelector('img');
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;

    if (!container || !canvas || !image) return;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const width = image.width;
    const height = image.height;

    const clientWidth = Math.ceil(width);
    const clientHeight = Math.ceil(height);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.setAttribute('width', clientWidth.toString());
    canvas.setAttribute('height', clientHeight.toString());

    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(image, 0, 0, clientWidth, clientHeight);
  };
  let isPlaying = true;

  button.setAttribute('type', 'button');
  button.addEventListener('click', () => {
    if (isPlaying) {
      setButtonPause();
      isPlaying = false;
    } else {
      setButtonPlay();
      isPlaying = true;
    }
  });

  image.addEventListener('load', () => {
    canvas.classList.add('gif-canvas');
    container.appendChild(canvas);
    container.appendChild(button);
    setButtonPlay();
    SizeCanvas({ container });
  });
};

export const SlotWithDefaultStyling = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const elementRef = element.querySelector(
    `:scope > [slot=${slotRef}]`,
  ) as HTMLSlotElement;

  if (!elementRef) return null;
  const isStyled = elementRef.hasAttribute('styled');

  if (isStyled) {
    return Node.slot({ type: slotRef });
  }

  const clonedElement = elementRef.cloneNode(true) as HTMLElement;
  clonedElement.removeAttribute('slot');
  return clonedElement;
};

const SlotOberserver = ({
  element,
  shadowDom,
  slots,
  CreateShadowDom,
}: {
  element: HTMLElement;
  shadowDom: ShadowRoot;
  slots: { [key: string]: string };
  CreateShadowDom: ({ element }: { element: any }) => void;
}) => {
  const isProduction = process?.env?.NODE_ENV === 'production';

  if (isProduction) return;

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const ReloadElement = () => {
        shadowDom.innerHTML = '';
        CreateShadowDom({ element });
      };

      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'styled') {
          ReloadElement();
        }
      }

      if (mutation.type === 'childList') {
        ReloadElement();
      }
    });
  });

  Object.values(slots).forEach((slotName) => {
    const slot = element.querySelector(
      `[slot="${slotName}"]`,
    ) as HTMLSlotElement;

    if (slot) {
      observer.observe(slot, { attributes: true, childList: true });
    }
  });
};

export default {
  CreateGif,
  Node,
  SlotWithDefaultStyling,
  SlotOberserver,
};
