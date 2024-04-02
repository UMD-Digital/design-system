import { Reset } from 'helpers/styles';
import { SlotDefaultStyling } from 'helpers/ui';
import { HeroMinimal, HeroElements } from 'elements';

import { UMDHeroMinimalElement } from './index';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroMinimal.Styles}
`;

const MakeHeroData = ({ element }: { element: UMDHeroMinimalElement }) => {
  const { IMAGE, HEADLINE, EYEBROW, TEXT, ACTIONS } = element._slots;
  const theme = element.getAttribute('theme');

  return {
    theme,
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    richText: SlotDefaultStyling({ element, slotRef: TEXT }),
    imageRef: SlotDefaultStyling({ element, slotRef: IMAGE }),
    actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
  };
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroMinimalElement;
}) =>
  HeroMinimal.CreateElement({
    ...MakeHeroData({ element }),
  });
