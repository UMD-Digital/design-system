import { NavigationUtility } from 'elements';
import { Attributes, Model, Register } from 'shadow-dom-model';

const tagName = 'umd-element-navigation-utility';

const createComponent = (element: HTMLElement) => {
  const alertUrl = Attributes.getValue.alertUrl({ element });
  const giftUrl = Attributes.getValue.giftUrl({ element });
  const isAdmissionsFeed = Attributes.isInfo.admissions({ element });
  const isEventsFeed = Attributes.isInfo.events({ element });
  const isLockFull = Attributes.isLayout.lockFull({ element });
  const isNewsFeed = Attributes.isInfo.news({ element });
  const isSchoolsFeed = Attributes.isInfo.schools({ element });
  const isSearchDomain = Attributes.isInfo.searchDomain({ element });
  const isGiftsFeed = Attributes.hasInfo.gifts({ element });
  const isSearch = Attributes.hasInfo.search({ element });

  return NavigationUtility({
    alertUrl,
    isAdmissionsFeed,
    isEventsFeed,
    isGiftsFeed,
    isLockFull,
    isNewsFeed,
    isSchoolsFeed,
    isSearch,
    giftUrl,
    isSearchDomain,
  });
};

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
