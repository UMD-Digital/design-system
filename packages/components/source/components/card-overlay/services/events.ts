import { UMDCardOverlayElement } from '../index';
import { VARIABLES, ELEMENTS, SLOTS } from '../globals';

const { ATTR_IMAGE } = VARIABLES;
const { TEXT } = SLOTS;
const { CARD_OVERLAY_TEXT, CARD_OVERLAY_IMAGE_CONTAINER } = ELEMENTS;

const CONTAINER_WIDTH_TEXT_BREAKPOINT_MAX = 600;
const CONTAINER_WIDTH_TEXT_BREAKPOINT_LARGE = 400;
const TEXT_CHARACTER_LIMIT_SMALL = 80;
const TEXT_CHARACTER_LIMIT_LARGE = 110;
const TEXT_CHARACTER_LIMIT_MAX = 232;

const TruncateText = ({ element }: { element: UMDCardOverlayElement }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const hasImage = element.hasAttribute(ATTR_IMAGE);
  const textSlot = element.querySelector(`[slot=${TEXT}]`);
  const textNode = shadowRoot.querySelector(`.${CARD_OVERLAY_TEXT}`);

  if (hasImage && textSlot && textNode) {
    const containerWidth = element.offsetWidth;
    const isContainerLarge =
      containerWidth >= CONTAINER_WIDTH_TEXT_BREAKPOINT_LARGE;
    const isContainerMax =
      containerWidth >= CONTAINER_WIDTH_TEXT_BREAKPOINT_MAX;
    let textSize = TEXT_CHARACTER_LIMIT_SMALL;

    if (isContainerLarge) textSize = TEXT_CHARACTER_LIMIT_LARGE;
    if (isContainerMax) textSize = TEXT_CHARACTER_LIMIT_MAX;

    const isRequriesTrunciation = textSlot.innerHTML.length > textSize;

    if (isRequriesTrunciation) {
      let modifiedText = textSlot.innerHTML.substring(0, textSize);
      modifiedText += '...';
      textNode.innerHTML = modifiedText;
    }
  }
};

export const SizeCanvas = ({ element }: { element: UMDCardOverlayElement }) => {
  const shadowDom = element.shadowRoot as ShadowRoot;
  const container = shadowDom.querySelector(
    `.${CARD_OVERLAY_IMAGE_CONTAINER}`,
  ) as HTMLDivElement;
  const image = shadowDom.querySelector('img');
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

export const EventResize = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  TruncateText({ element });
  SizeCanvas({ element });
};
