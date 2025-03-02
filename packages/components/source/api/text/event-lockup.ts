declare global {
  interface Window {
    UMDEventsDateElement: typeof UMDEventsDateElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;

// prettier-ignore
const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.event.lockup.date.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDEventsDateElement }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });

  const headline = Slots.headline.default({ element });
  const startDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_END_ISO}"]`,
  );
  const startDate = Markup.event.createDate({ element: startDateSlot });
  const endDate = Markup.event.createDate({ element: endDateSlot });

  if (!startDate) {
    return Composite.event.lockup.date.CreateElement({
      headline,
      isThemeDark,
    });
  }

  const EventSignData = Markup.event.createDetailsData({
    startDate,
    endDate,
  });
  const dateSign = Composite.event.elements.sign.CreateElement({
    ...EventSignData,
    isThemeDark,
  });

  return Composite.event.lockup.date.CreateElement({
    headline,
    dateSign,
    isThemeDark,
  });
};

const ELEMENT_NAME = 'umd-element-events-date';
class UMDEventsDateElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({ styles });
    super();

    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDEventsDateElement = UMDEventsDateElement;
    window.customElements.define(ELEMENT_NAME, UMDEventsDateElement);
  }
};
