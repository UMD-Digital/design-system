import { Styles } from 'utilities';
import { MarkupCreate } from 'utilities';
import { HeroMinimal, HeroElements } from 'elements';
import { UMDHeroMinimalElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroMinimal.Styles}
`;

const MakeHeroData = ({ element }: { element: UMDHeroMinimalElement }) => {
  const { IMAGE, HEADLINE, EYEBROW, TEXT, ACTIONS } = element._slots;
  const theme = element.getAttribute('theme');

  return {
    theme,
    eyebrow: SlotWithDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotWithDefaultStyling({ element, slotRef: HEADLINE }),
    richText: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    imageRef: SlotWithDefaultStyling({ element, slotRef: IMAGE }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
  };
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroMinimalElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;

  shadow.appendChild(element._styles.content.cloneNode(true));

  shadow.appendChild(
    HeroMinimal.CreateElement({
      ...MakeHeroData({ element }),
    }),
  );
};
