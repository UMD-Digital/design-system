import { NavigationUtility } from 'elements';
import { Attributes, Model, Register } from 'shadow-dom-model';

const tagName = 'umd-element-navigation-utility';

const createComponent = (element: HTMLElement) =>
  NavigationUtility({
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

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyShow({
    name: Attributes.names.layout.ALERT_OFF,
    callback: (element) => element.events?.hideAlert(),
  }),
  Attributes.handler.observe.visuallyHide({
    name: Attributes.names.layout.ALERT_OFF,
    callback: (element) => element.events?.showAlert(),
  }),
);

const Load = () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      attributes,
      createComponent,
    }),
  });
};

export default {
  Load,
};
