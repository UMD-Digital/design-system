import {
  type ContentElement,
  type UMDElement,
  type ThemeProps,
} from '../_types';

export interface PersonCtaProps {
  actions?: ContentElement;
}

// ===== Person Component Types =====

// Contact information with HTML elements
export interface PersonContactProps
  extends PersonCtaProps,
    Pick<ThemeProps, 'isThemeDark'> {
  additionalContact?: ContentElement;
  address?: ContentElement;
  email?: ContentElement;
  linkedin?: ContentElement;
  substack?: ContentElement;
  bluesky?: ContentElement;
  phone?: ContentElement;
}

// Person details/text lockup information
export interface PersonTextLockupProps
  extends PersonCtaProps,
    Pick<ThemeProps, 'isThemeDark'> {
  slotTwo?: ContentElement;
  slotOne?: ContentElement;
  name?: ContentElement;
  nameComposite?: UMDElement | null;
  slotThreeItalic?: ContentElement;
  slotFour?: ContentElement;
}

// For layout components that need custom styles
export interface PersonContactPropsWithStyles extends PersonContactProps {
  customStyles?: Record<string, any>;
}

export interface PersonTextLockupPropsWithStyles extends PersonTextLockupProps {
  customStyles?: Record<string, any>;
}

// Combined props for components that use both contact and details
export interface PersonFullProps
  extends PersonTextLockupProps,
    PersonContactProps {
  customStyles?: Record<string, any>;
}

// For components that include an image
export interface PersonWithImageProps extends PersonFullProps {
  image?: HTMLImageElement;
}
