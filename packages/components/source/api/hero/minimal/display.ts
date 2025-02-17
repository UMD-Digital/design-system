import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { Styles } from 'utilities';
import { UMDHeroMinimalElement } from './index';
import { CommonHeroData } from '../common';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.hero.elements.image.Styles}
  ${Composite.hero.elements.text.Styles}
  ${Composite.hero.minimal.Styles}
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
    Composite.hero.minimal.CreateElement({
      isThemeDark,
      isThemeLight,
      isThemeMaryland,
      ...CommonHeroData({
        element,
      }),
    }),
  );
};
