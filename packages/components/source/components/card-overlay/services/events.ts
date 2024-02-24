import { UMDCardOverlayElement } from '../index';
import { VARIABLES, ELEMENTS, SLOTS } from '../globals';

const CONTAINER_WIDTH_TEXT_BREAKPOINT_MAX = 600;
const CONTAINER_WIDTH_TEXT_BREAKPOINT_LARGE = 400;
const TEXT_CHARACTER_LIMIT_SMALL = 80;
const TEXT_CHARACTER_LIMIT_LARGE = 110;
const TEXT_CHARACTER_LIMIT_MAX = 232;

const TruncateText = ({ element }: { element: UMDCardOverlayElement }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const hasImage = element.hasAttribute(VARIABLES.ATTR_IMAGE);
  const textSlot = element.querySelector(`[slot=${SLOTS.TEXT}]`);
  const textNode = shadowRoot.querySelector(`.${ELEMENTS.CARD_OVERLAY_TEXT}`);

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

export const EventResize = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  TruncateText({ element });
};
