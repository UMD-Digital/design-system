import { CardOverlay, CardOverlayImage } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';
import { UMDCardOverlayElement } from '../index';
import { SLOTS, VARIABLES } from '../globals';

const { SlotWithDefaultStyling } = MarkupCreate;

const { IMAGE, EYEBROW, HEADLINE, TEXT, ACTIONS, CTAICON, DATE } = SLOTS;
const { TYPE_IMAGE, ATTRIBUTE_TYPE } = VARIABLES;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CardOverlay.Styles}
  ${CardOverlayImage.Styles}
`;

const GetImage = ({ element }: { element: UMDCardOverlayElement }) => {
  const isProperImage = MarkupValidate.ImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

const MakeOverlayContent = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  return {
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    date: SlotWithDefaultStyling({ element, slotRef: DATE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
    ctaIcon: SlotWithDefaultStyling({ element, slotRef: CTAICON }),
    theme: element._theme,
  };
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDCardOverlayElement;
}) => {
  const type = element.getAttribute(ATTRIBUTE_TYPE);

  if (type === TYPE_IMAGE) {
    return CardOverlayImage.CreateElement({
      ...MakeOverlayContent({ element }),
      image: GetImage({ element }),
    });
  }

  return CardOverlay.CreateElement({ ...MakeOverlayContent({ element }) });
};
