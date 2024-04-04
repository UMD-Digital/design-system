import { PersonBlock, PersonList, PersonTabular } from 'elements';
import { MarkupCreate, MarkupValidate, Styles } from 'utilities';
import { UMDPersonElement } from './index';

const { SlotWithDefaultStyling } = MarkupCreate;

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_DISPLAY = 'display';
const THEME_LIGHT = 'light';
const DISPLAY_LIST = 'list';
const DISPLAY_TABULAR = 'tabular';

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${PersonBlock.Styles}
  ${PersonList.Styles}
  ${PersonTabular.Styles}
`;

const GetImage = ({ element }: { element: UMDPersonElement }) => {
  const { IMAGE } = element._slots;
  const isProperImage = MarkupValidate.ImageAlt({ element, slotRef: IMAGE });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: IMAGE });

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
    name: SlotWithDefaultStyling({ element, slotRef: NAME }),
    job: SlotWithDefaultStyling({ element, slotRef: JOB_TITLE }),
    association: SlotWithDefaultStyling({ element, slotRef: ASSOCIATION }),
    pronouns: SlotWithDefaultStyling({ element, slotRef: PRONOUNS }),
    phone: SlotWithDefaultStyling({ element, slotRef: PHONE }),
    email: SlotWithDefaultStyling({ element, slotRef: EMAIL }),
    address: SlotWithDefaultStyling({ element, slotRef: ADDRESS }),
    linkendIn: SlotWithDefaultStyling({ element, slotRef: LINKEDIN }),
    additionalContact: SlotWithDefaultStyling({
      element,
      slotRef: ADDITIONAL_CONTACT,
    }),
    subText: SlotWithDefaultStyling({ element, slotRef: SUB_TEXT }),
    actions: SlotWithDefaultStyling({ element, slotRef: ACTIONS }),
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
