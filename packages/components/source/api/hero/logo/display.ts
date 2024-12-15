import { Composite } from '@universityofmaryland/web-elements-library';
import { Styles } from 'utilities';
import { Attributes } from 'model';
import { UMDHeroLogoElement } from './index';
import { CommonHeroData } from '../common';

const { HeroLogo, HeroElements } = Composite;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.reset}
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
      isThemeDark: Attributes.isTheme.dark({
        element,
      }),
      ...CommonHeroData({
        element,
      }),
    }),
  );
};
