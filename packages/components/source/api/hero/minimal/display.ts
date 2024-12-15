import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { Styles } from 'utilities';
import { UMDHeroMinimalElement } from './index';
import { CommonHeroData } from '../common';

const { HeroMinimal, HeroElements } = Composite;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.resetString}
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
  const isThemeLight = Attributes.isTheme.light({
    element,
  });
  const isThemeDark = Attributes.isTheme.dark({
    element,
  });
  const isThemeMaryland = Attributes.isTheme.maryland({
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
