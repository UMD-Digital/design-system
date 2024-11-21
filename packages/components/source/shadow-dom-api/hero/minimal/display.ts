import { Styles } from 'utilities';
import { HeroMinimal, HeroElements } from 'elements';
import { UMDHeroMinimalElement } from './index';
import { CommonHeroData } from '../common';

import { Attributes } from 'shadow-dom-model';

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
  const isThemeLight = Attributes.isThemeLight({
    element,
  });
  const isThemeDark = Attributes.isThemeDark({
    element,
  });
  const isThemeMaryland = Attributes.isThemeMaryland({
    element,
  });

  shadow.appendChild(element._styles.content.cloneNode(true));

  shadow.appendChild(
    HeroMinimal.CreateElement({
      isThemeDark,
      isThemeLight,
      isThemeMaryland,
      ...CommonHeroData({
        element,
      }),
    }),
  );
};
