import { Styles, MarkupCreate } from 'utilities';
import {
  HeroDefault,
  HeroElements,
  HeroMinimal,
  HeroOverlay,
  HeroStacked,
} from 'elements';
import { UMDHeroElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

const TYPE_DEFAULT_INTERIOR = 'default-interior';
const TYPE_DEFAULT_CENTERED = 'default-centered';
const TYPE_STACKED = 'stacked';
const TYPE_STACKED_INTERIOR = 'stacked-interior';
const TYPE_MINIMAL = 'minimal';
const TYPE_OVERLAY = 'overlay';
const TEXT_ALIGN_CENTER = 'center';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroOverlay.Styles}
  ${HeroMinimal.Styles}
  ${HeroStacked.Styles}
  ${HeroDefault.Styles}
`;

const MakeHeroData = ({ element }: { element: UMDHeroElement }) => {
  const { IMAGE, HEADLINE, EYEBROW, TEXT, ACTIONS } = element._slots;
  const type = element.getAttribute('type');
  const theme = element.getAttribute('theme');
  let isTextCenter = element.getAttribute('text-align') === TEXT_ALIGN_CENTER;
  let isInterior = false;
  let isWithLock = false;

  if (type === TYPE_DEFAULT_CENTERED) {
    isTextCenter = true;
  }

  if (type === TYPE_DEFAULT_INTERIOR) {
    isInterior = true;
  }

  if (type === TYPE_STACKED_INTERIOR) {
    isWithLock = true;
  }

  return {
    theme,
    isTextCenter,
    isInterior,
    isWithLock,
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    richText: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    imageRef: SlotWithDefaultStyling({ element, slotRef: IMAGE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
  };
};

export const CreateShadowDom = ({ element }: { element: UMDHeroElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const { VIDEO } = element._slots;
  const type = element.getAttribute('type');
  const videoRef = SlotWithDefaultStyling({ element, slotRef: VIDEO });

  shadow.appendChild(element._styles.content.cloneNode(true));

  if (type === TYPE_STACKED || type === TYPE_STACKED_INTERIOR) {
    shadow.appendChild(
      HeroStacked.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );
    return;
  }

  if (type === TYPE_MINIMAL) {
    shadow.appendChild(
      HeroMinimal.CreateElement({
        ...MakeHeroData({ element }),
      }),
    );

    return;
  }

  if (type === TYPE_OVERLAY) {
    shadow.appendChild(
      HeroOverlay.CreateElement({
        ...MakeHeroData({ element }),
        videoRef,
      }),
    );

    return;
  }

  shadow.appendChild(
    HeroDefault.CreateElement({
      ...MakeHeroData({ element }),
      videoRef,
    }),
  );
};
