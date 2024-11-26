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

const Load = () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};

export default {
  Load,
};
