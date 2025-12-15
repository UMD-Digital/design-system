interface PersonTheme {
  isThemeDark?: boolean;
}

interface PersonDisplay extends PersonTheme {
  displayType?: string;
}

export interface PersonContact extends PersonTheme {
  phone?: HTMLElement | null;
  email?: HTMLElement | null;
  linkedin?: HTMLElement | null;
  address?: HTMLElement | null;
  additionalContact?: HTMLElement | null;
}

export interface Person extends PersonContact, PersonDisplay {
  name: HTMLElement | null;
  job?: HTMLElement | null;
  association?: HTMLElement | null;
  pronouns?: HTMLElement | null;
  subText?: HTMLElement | null;
  actions?: HTMLElement | null;
}

export interface PersonCard extends Person {
  image?: HTMLImageElement | HTMLAnchorElement | null;
}

export interface PersonBio extends PersonCard {
  description?: HTMLElement | null;
}
