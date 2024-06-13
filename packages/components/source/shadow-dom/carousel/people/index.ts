declare global {
  interface Window {
    UMDCarouselPeopleElement: typeof UMDCarouselPeopleElement;
  }
}

import { CarouselPeople } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';

const { Node } = MarkupCreate;
const { ImageHasAlt } = MarkupValidate;

const ELEMENT_NAME = 'umd-element-carousel-people';
const ATTRIBUTE_RESIZE = 'resize';
const ATTRIBUTE_THEME = 'theme';

const SLOTS = {
  PEOPLE: 'people',
};

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${CarouselPeople.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });
const CreateShadowDom = ({
  element,
}: {
  element: UMDCarouselPeopleElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme = element.getAttribute(ATTRIBUTE_THEME);
  const slottedPeople = Array.from(
    element.querySelectorAll(`[slot="${SLOTS.PEOPLE}"] > *`),
  ) as HTMLElement[];

  const people = slottedPeople.map((person) =>
    person.cloneNode(true),
  ) as HTMLElement[];

  const carousel = CarouselPeople.CreateElement({
    people,
    theme,
  });

  element._elementRef = carousel;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(carousel.element);
  carousel.events.Load();
};

class UMDCarouselPeopleElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetEventReize: () => void;
      Load: () => void;
    };
  } | null;

  constructor() {
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._elementRef = null;
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name == ATTRIBUTE_RESIZE && newValue === 'true' && this._elementRef) {
      this._elementRef.events.SetEventReize();
    }
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDCarouselPeopleElement = UMDCarouselPeopleElement;
    window.customElements.define(ELEMENT_NAME, UMDCarouselPeopleElement);
  }
};

export default {
  Load,
};
