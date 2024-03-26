import {
  PersonBlock,
  PersonList,
  PersonTabular,
} from '@universityofmaryland/custom-elements-library';
import { Reset } from 'helpers/styles';
import { CheckForImageAlt, SlotDefaultStyling } from 'helpers/ui';
import { UMDPersonElement } from './index';

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';
const DISPLAY_TABULAR = 'tabular';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${PersonBlock.Styles}
  ${PersonList.Styles}
  ${PersonTabular.Styles}
`;

const GetImage = ({ element }: { element: UMDPersonElement }) => {
  const { IMAGE } = element._slots;
  const isProperImage = CheckForImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotDefaultStyling({ element, slotRef: IMAGE });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};

const MakePersonData = ({ element }: { element: UMDPersonElement }) => {
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const {
    NAME,
    JOB_TITLE,
    ASSOCIATION,
    PRONOUNS,
    PHONE,
    EMAIL,
    LINKEDIN,
    ADDRESS,
    ADDITIONAL_CONTACT,
    SUB_TEXT,
    ACTIONS,
  } = element._slots;

  return {
    image: GetImage({ element }),
    name: SlotDefaultStyling({ element, slotRef: NAME }),
    job: SlotDefaultStyling({ element, slotRef: JOB_TITLE }),
    association: SlotDefaultStyling({ element, slotRef: ASSOCIATION }),
    pronouns: SlotDefaultStyling({ element, slotRef: PRONOUNS }),
    phone: SlotDefaultStyling({ element, slotRef: PHONE }),
    email: SlotDefaultStyling({ element, slotRef: EMAIL }),
    address: SlotDefaultStyling({ element, slotRef: ADDRESS }),
    linkendIn: SlotDefaultStyling({ element, slotRef: LINKEDIN }),
    additionalContact: SlotDefaultStyling({
      element,
      slotRef: ADDITIONAL_CONTACT,
    }),
    subText: SlotDefaultStyling({ element, slotRef: SUB_TEXT }),
    actions: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    theme,
  };
};

export const CreateShadowDom = ({ element }: { element: UMDPersonElement }) => {
  const isDisplayList =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_LIST;
  const isDisplayTabular =
    element.getAttribute(ATTRIBUTE_DISPLAY) === DISPLAY_TABULAR;

  if (isDisplayList) {
    return PersonList.CreateElement(MakePersonData({ element }));
  }

  if (isDisplayTabular) {
    return PersonTabular.CreateElement(MakePersonData({ element }));
  }

  return PersonBlock.CreateElement(MakePersonData({ element }));
};
