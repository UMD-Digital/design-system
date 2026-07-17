import {
  type AssetProps,
  type ContentElement,
  type ThemeProps,
} from '../../_types';

interface PersonDisplay extends Pick<ThemeProps, 'isThemeDark'> {
  displayType?: string;
}

export interface PersonContact extends Pick<ThemeProps, 'isThemeDark'> {
  phone?: ContentElement;
  email?: ContentElement;
  linkedin?: ContentElement;
  bluesky?: ContentElement;
  substack?: ContentElement;
  address?: ContentElement;
  additionalContact?: ContentElement;
}

export interface Person extends PersonContact, PersonDisplay {
  name: ContentElement;
  slotOne?: ContentElement;
  slotTwo?: ContentElement;
  slotThreeItalic?: ContentElement;
  slotFour?: ContentElement;
  actions?: ContentElement;
}

export interface PersonCard extends Person {
  image?: AssetProps['image'];
}

export interface PersonBio extends PersonCard {
  description?: ContentElement;
}
