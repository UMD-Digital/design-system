import { Styles } from 'utilities';
import { HeroMinimal, HeroElements } from 'elements';
import { UMDHeroMinimalElement } from './index';
import { CommonHeroData } from '../common';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroElements.Image.Styles}
  ${HeroElements.Text.Styles}
  ${HeroMinimal.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroMinimalElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;

  shadow.appendChild(element._styles.content.cloneNode(true));

  shadow.appendChild(
    HeroMinimal.CreateElement({
      theme: element.getAttribute('theme'),
      ...CommonHeroData({
        element,
      }),
    }),
  );
};
