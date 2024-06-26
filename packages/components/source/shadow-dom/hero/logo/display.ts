import { Styles } from 'utilities';
import { HeroLogo, HeroElements } from 'elements';
import { UMDHeroLogoElement } from './index';
import { CommonHeroData } from '../common';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroLogo.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroLogoElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  shadow.appendChild(element._styles.content.cloneNode(true));

  shadow.appendChild(
    HeroLogo.CreateElement({
      theme: element.getAttribute('theme'),
      ...CommonHeroData({
        element,
        slots: element._slots,
      }),
    }),
  );
};
