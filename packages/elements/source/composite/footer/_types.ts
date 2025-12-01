export interface ThemeProps {
  isThemeLight: boolean;
}

export interface TypeProps {
  isTypeSimple?: boolean;
  isTypeVisual?: boolean;
  isTypeMega?: boolean;
}

export interface CampaignNameProps {
  isCampaignForward?: boolean;
}

export interface HeadlineProps {
  slotHeadline: HTMLSlotElement;
}

export interface AddressProps {
  slotAddress: HTMLSlotElement;
}

export interface LinksProps {
  slotContentLinks: HTMLSlotElement;
}

export interface CallToActionProps
  extends TypeProps,
    CampaignNameProps,
    ThemeProps {
  slotCta?: HTMLAnchorElement;
}

export interface SocialProps extends ThemeProps {
  slotSocialLinks?: HTMLSlotElement;
}

export interface UtilityProps extends ThemeProps {
  slotUtilityLinks?: HTMLElement;
}

export interface SocialCampaignColumnsProps extends SocialProps, TypeProps {}

export interface CampaignProps extends ThemeProps, CampaignNameProps {}

export interface LogoProps extends CampaignNameProps, TypeProps, ThemeProps {
  slotLogo: HTMLImageElement | HTMLAnchorElement;
}

export interface slotColumnsProps
  extends CampaignNameProps,
    TypeProps,
    ThemeProps {
  slotColumns?: HTMLSlotElement[];
}

export interface RowLogoProps
  extends CampaignNameProps,
    ContactProps,
    TypeProps,
    LogoProps,
    ThemeProps {}

export interface ContactProps
  extends CampaignNameProps,
    TypeProps,
    ThemeProps,
    SocialCampaignColumnsProps,
    AddressProps,
    HeadlineProps,
    LinksProps {}

export interface RowLinksProps
  extends SocialCampaignColumnsProps,
    CampaignNameProps,
    TypeProps,
    ThemeProps,
    slotColumnsProps {}

export interface MainSectionProps
  extends CampaignNameProps,
    TypeProps,
    ThemeProps,
    RowLinksProps,
    RowLogoProps {
  slotVisualImage: HTMLImageElement;
}

export interface FooterProps
  extends TypeProps,
    CampaignNameProps,
    ThemeProps,
    UtilityProps,
    CallToActionProps,
    MainSectionProps {}
