export type ELEMENT_TYPE = HTMLElement & {
  _count: number;
  setCountBackward: () => void;
  setCountForward: () => void;
};

export const DATE_SLOT_NAME = 'date-list';
export const INTRODUCTION_SLOT_NAME = 'introduction';

export const CONTAINER_DARK_CLASS = 'umd-element-date-slider-container-dark';
export const DATES_CONTAINER_CLASS = 'umd-element-date-slider-dates-container';
export const DATES_WRAPPER_CONTAINER_CLASS =
  'umd-element-date-slider-dates-wrapper';
export const ARROW_CLASS = 'umd-element-date-slider-arrow';

export const BREAKPOINTS = {
  tablet: 550,
  desktop: 750,
  large: 950,
};
