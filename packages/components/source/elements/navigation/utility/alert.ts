import { Tokens, Elements, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeAlertDataType = {
  alert_title: string;
  alert_message: string;
  alert_type: string;
  alert_id: string;
};

export type TypeAlertProps = {
  alertUrl?: string | null;
};

const { ConvertJSSObjectToStyles } = Styles;
const { Colors, Spacing } = Tokens;
const { LockMax } = Layout;
const { Text } = Elements;

const DEFAULT_ALERT_URL = 'https://umd.edu/api/alerts';
const ALERT_ELEMENT_ID = 'umd-global-alert';
const ALERT_TIME_REF = 'umd-alert-time';
const ALERT_REF = 'umd-alert';
const ALERT_ID_REF = 'umd-alert-id';
const ANIMATION_IN_SPEED = 800;
const MEDIUM = 768;

const ATTRIBUTE_TYPE = 'type';
const TYPE_GENERAL = 'general';
const TYPE_CLOSED = 'close';
const TYPE_OPEN = 'open';

const ELEMENT_NAME = 'umd-element-nav-alert';
const ELEMENT_ALERT_DECLARATION = 'umd-element-nav-alert-declaration';
const ELEMENT_ALERT_CONTAINER = 'umd-element-nav-alert-container';
const ELEMENT_ALERT_LOCK = 'umd-element-nav-alert-lock';
const ELEMENT_ALERT_TITLE = 'umd-element-nav-alert-title';
const ELEMENT_ALERT_TEXT = 'umd-element-nav-alert-text';
const ELEMENT_ALERT_CLOSE_BUTTON = 'umd-element-nav-alert-close';

const IS_TYPE_GENERAL = `[${ATTRIBUTE_TYPE}=${TYPE_GENERAL}]`;
const IS_TYPE_OPEN = `[${ATTRIBUTE_TYPE}=${TYPE_OPEN}]`;
const IS_TYPE_CLOSED = `[${ATTRIBUTE_TYPE}=${TYPE_CLOSED}]`;

const OVERWRITE_CONTAINER_TYPE_GENERAL = `.${ELEMENT_ALERT_CONTAINER}${IS_TYPE_GENERAL}`;
const OVERWRITE_CONTAINER_TYPE_OPEN = `.${ELEMENT_ALERT_CONTAINER}${IS_TYPE_OPEN}`;
const OVERWRITE_CONTAINER_TYPE_CLOSED = `.${ELEMENT_ALERT_CONTAINER}${IS_TYPE_CLOSED}`;

// prettier-ignore
const OverwriteTypeGeneral = `
  ${OVERWRITE_CONTAINER_TYPE_GENERAL} {
    background-color: ${Colors.gray.lighter};
  }
`

// prettier-ignore
const OverwriteTypeOpen = `
  ${OVERWRITE_CONTAINER_TYPE_OPEN} {
    background-color: ${Colors.gold};
  }
`

// prettier-ignore
const OverwriteTypeClosed = `
  ${OVERWRITE_CONTAINER_TYPE_CLOSED} {
    background-color:  #70ebd6;
  }
`

// prettier-ignore
const CloseButtonStyles = `
  .${ELEMENT_ALERT_CLOSE_BUTTON} {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_ALERT_CLOSE_BUTTON} {
      top: 5px;
      right: 5px;
    }
  }
  
  .${ELEMENT_ALERT_CLOSE_BUTTON}:before,
  .${ELEMENT_ALERT_CLOSE_BUTTON}:after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 20px;
    background-color: ${Colors.gray};
  }
  
  .${ELEMENT_ALERT_CLOSE_BUTTON}:before {
    transform: rotate(135deg) translateX(-1px);
  }
  
  .${ELEMENT_ALERT_CLOSE_BUTTON}:after {
    transform: rotate(45deg) translateX(-1px);
  }
`

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TITLE}`]: LockMax,
    },
  })}

  * + .${ELEMENT_ALERT_TEXT} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT}`]: Text.RichText,
    },
  })}
`

// prettier-ignore
const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_LOCK}`]: LockMax,
    },
  })}

  .${ELEMENT_ALERT_LOCK} {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  @container (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_ALERT_LOCK} {
      padding-top: 40px;
    }
  }
`

// prettier-ignore
const ContainerStyles = `
  .${ELEMENT_ALERT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    text-align: center;
    background-color: ${Colors.gray.lighter};
    transition: height ${ANIMATION_IN_SPEED}ms;
    overflow: hidden;
    position: relative;
  }
`

// prettier-ignore
const STYLES_NAV_ALERT = `
  .${ELEMENT_ALERT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_ALERT_DECLARATION} a {
    color: currentColor;
    text-transform: inherit;
    text-decoration: underline;
  }

  ${ContainerStyles}
  ${LockStyles}
  ${TextStyles}
  ${CloseButtonStyles}
  ${OverwriteTypeGeneral}
  ${OverwriteTypeOpen}
  ${OverwriteTypeClosed}
`;

const setAlertStorage = (alert: TypeAlertDataType) => {
  window.localStorage.setItem(ALERT_REF, JSON.stringify(alert));
};

const getAlertStorage = () => window.localStorage.getItem(ALERT_REF);

const shouldAlertHide = ({ alert_id }: { alert_id: string }) =>
  window.localStorage.getItem(ALERT_ID_REF) === alert_id;

const checkAlertTime = () => {
  const alertDate = window.localStorage.getItem(ALERT_TIME_REF);
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + 1000 * 60);

  const shouldCheckMessage = (alertDate: string) => {
    const storedDate = new Date(Date.parse(alertDate));

    if (storedDate instanceof Date && currentDate > storedDate) {
      localStorage.setItem(ALERT_TIME_REF, futureDate.toString());
      return true;
    }

    return false;
  };

  if (!alertDate) {
    localStorage.setItem(ALERT_TIME_REF, futureDate.toString());
    return true;
  }

  return shouldCheckMessage(alertDate);
};

const CreateAlertComponent = (data: TypeAlertDataType) => {
  const declaration = document.createElement('div');
  const wrapper = document.createElement('div');
  const lock = document.createElement('div');
  const titleElement = document.createElement('p');
  const textElement = document.createElement('div');
  const closeButton = document.createElement('button');

  titleElement.classList.add(ELEMENT_ALERT_TITLE);
  titleElement.innerHTML = data.alert_title;

  textElement.classList.add(ELEMENT_ALERT_TEXT);
  textElement.innerHTML = data.alert_message;

  closeButton.classList.add(ELEMENT_ALERT_CLOSE_BUTTON);
  closeButton.setAttribute('aria-label', 'remove alert');
  closeButton.addEventListener('click', () => {
    wrapper.style.height = `${wrapper.offsetHeight}px`;
    window.localStorage.setItem(ALERT_ID_REF, data.alert_id);

    setTimeout(() => {
      wrapper.style.height = '0px';
    }, 100);

    setTimeout(() => {
      wrapper.remove();
    }, ANIMATION_IN_SPEED + 100);
  });

  lock.classList.add(ELEMENT_ALERT_LOCK);
  lock.appendChild(closeButton);
  lock.appendChild(titleElement);
  lock.appendChild(textElement);

  wrapper.setAttribute('data-type', data.alert_type);
  wrapper.setAttribute('id', ALERT_ELEMENT_ID);
  wrapper.classList.add(ELEMENT_ALERT_CONTAINER);
  wrapper.appendChild(lock);

  declaration.appendChild(wrapper);
  declaration.classList.add(ELEMENT_ALERT_DECLARATION);

  return declaration;
};

const fetchAlerts = async ({ alertUrl }: TypeAlertProps) => {
  const ALERTS_URL = alertUrl || DEFAULT_ALERT_URL;

  try {
    const params: {
      method: 'GET';
      headers: {
        'Content-Type': string;
      };
      body?: string;
    } = {
      method: 'GET',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };

    const response = await fetch(ALERTS_URL, params);
    return response.json();
  } catch (ex) {
    throw ex;
  }
};

const CreateNavAlert = ({ alertUrl }: TypeAlertProps) =>
  (async () => {
    const { data = [] } = await fetchAlerts({ alertUrl });

    if (data.length === 0) return;
    if (data[0] == '') return;

    const alertResponse = data[0];

    // if (shouldAlertHide({ alert_id: data.alert_id })) return;

    return CreateAlertComponent(alertResponse);
  })();

export default {
  CreateElement: CreateNavAlert,
  Styles: STYLES_NAV_ALERT,
};
