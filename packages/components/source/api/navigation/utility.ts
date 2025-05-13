import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';

const tagName = 'umd-element-navigation-utility';

const createComponent = (element: HTMLElement) => {
  const hasLandmark = element.hasAttribute('role');
  const hasLabel = element.hasAttribute('aria-label');

  if (!hasLandmark) {
    element.setAttribute('role', 'navigation');
  }

  if (!hasLabel) {
    element.setAttribute('aria-label', 'Utility navigation');
  }

  return Composite.navigation.utility({
    alertUrl: Attributes.getValue.alertUrl({ element }),
    giftUrl:
      Attributes.getValue.giftUrl({
        element,
      }) || 'https://giving.umd.edu/giving',
    isAdmissionsFeed: Attributes.isInfo.admissions({ element }),
    isAlertOff: Attributes.isLayout.alertOff({ element }),
    isEventsFeed: Attributes.isInfo.events({ element }),
    isGiftsFeed: Attributes.hasInfo.gifts({ element }),
    isLockFull: Attributes.isLayout.lockFull({ element }),
    isNewsFeed: Attributes.isInfo.news({ element }),
    isSchoolsFeed: Attributes.isInfo.schools({ element }),
    isSearch: Attributes.hasInfo.search({ element }),
    isSearchDomain: Attributes.isInfo.searchDomain({ element }),
  });
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyShow({
    name: Attributes.names.layout.ALERT_OFF,
    callback: (element) => element.events?.showAlert(),
  }),
  Attributes.handler.observe.visuallyHide({
    name: Attributes.names.layout.ALERT_OFF,
    callback: (element) => element.events?.hideAlert(),
  }),
);

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      attributes,
      createComponent,
    }),
  });
};
