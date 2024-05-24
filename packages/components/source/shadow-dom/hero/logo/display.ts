import { Styles } from 'utilities';
import { MarkupCreate } from 'utilities';
import { HeroLogo, HeroElements } from 'elements';
import { UMDHeroLogoElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroLogo.Styles}
`;

const MakeHeroData = ({ element }: { element: UMDHeroLogoElement }) => {
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
  element: UMDHeroLogoElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  shadow.appendChild(element._styles.content.cloneNode(true));

  shadow.appendChild(
    HeroLogo.CreateElement({
      ...MakeHeroData({ element }),
    }),
  );
};
