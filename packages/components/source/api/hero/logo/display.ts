import { Composite } from '@universityofmaryland/web-elements-library';
import { Styles } from 'utilities';
import { Attributes } from 'model';
import { UMDHeroLogoElement } from './index';
import { CommonHeroData } from '../common';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.hero.elements.image.Styles}
  ${Composite.hero.elements.text.Styles}
  ${Composite.hero.logo.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroLogoElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  shadow.appendChild(element._styles.content.cloneNode(true));

  shadow.appendChild(
    Composite.hero.logo.CreateElement({
      isThemeDark: Attributes.isTheme.dark({
        element,
      }),
      ...CommonHeroData({
        element,
      }),
    }),
  );
};
