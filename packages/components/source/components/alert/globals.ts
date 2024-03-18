export const BREAKPOINTS = {
  SMALL: 500,
};
export const SLOTS = {
  HEADLINE: 'headline',
  BODY: 'body',
  CTA: 'cta',
};
export const ELEMENTS = {
  ICON_CLASS: 'umd-element-alert-icon',
};
export const VARIABLES = {
  ELEMENT_NAME: 'umd-element-alert',
  ALERT_LOCAL_STORAGE_KEY: 'umd-alert-closed-time',
  ATTRIBUTE_TYPE: 'type',
  ATTRIBUTE_DAYS: 'days',
  ATTRIBUTE_ICON: 'icon',
  TYPE_ALERT: 'alert',
  TYPE_NOTIFICATION: 'notification',
  TYPE_EMERGENCY: 'emergency',
};
export const REFERENCES = {
  IS_TYPE_ALERT: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.TYPE_ALERT}"]`,
  IS_TYPE_NOTIFICATION: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.TYPE_NOTIFICATION}"]`,
  IS_TYPE_EMEMERGENCY: `[${VARIABLES.ATTRIBUTE_TYPE}="${VARIABLES.TYPE_EMERGENCY}"]`,
  IS_WITH_ICON: `[${VARIABLES.ATTRIBUTE_ICON}="true"]`,
  IS_WITHOUT_ICON: `[${VARIABLES.ATTRIBUTE_ICON}="false"]`,
};
