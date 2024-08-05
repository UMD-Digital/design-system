import {
  Tokens,
  Elements,
  Layout,
  Typography,
} from '@universityofmaryland/variables';
import Actions from 'elements/call-to-action';
import { AssetIcon, Network, Styles } from 'utilities';

type TypeAlertCTA = {
  title: string;
  alt: string;
  entry: {
    url: string;
  }[];
  url: string;
};

type TypeAlertId = {
  id: string;
};

type TypeAlertData = TypeAlertId & {
  type: string;
  title: string;
  headline: string;
  message: string;
  cta: TypeAlertCTA[];
};

type TypeAlertResponse = {
  data: TypeAlertData[];
};

export type TypeAlertProps = {
  alertUrl?: string | null;
};

const { FetchGraphQL } = Network;
const { ConvertJSSObjectToStyles } = Styles;
const { Colors, Spacing } = Tokens;
const { LockFull } = Layout;
const { SansLarge } = Typography;
const { Text } = Elements;

const QUERY = `
  query CampusAlertsQuery {
    data: entries(section: "mainCampusAlerts") {
      ... on mainElementsCampusAlert_Entry {
        id: uid
        alert_type: type
        alert_headline: headline
        alert_title: title
        alert_message: text
        cta {
          ... on umdElementsLink_Entry {
            title
            alt: linksAlt
            entry(limit: 1) {
              url
            }
            url: linksUrl
          }
        }
      }
    }
  }
`;

const DEFAULT_ALERT_URL = 'https://umd-staging.com/api/alerts';
const ALERT_ELEMENT_ID = 'umd-global-alert';
const ALERT_TIME_REF = 'umd-alert-time';
const ALERT_REF = 'umd-alert';
const ALERT_ID_REF = 'umd-alert-id';
const ANIMATION_IN_SPEED = 800;
const MEDIUM = 768;

const ATTRIBUTE_TYPE = 'type';
const TYPE_GENERAL = 'general';
const TYPE_CLOSED = 'closed';
const TYPE_OPEN = 'open';

const ELEMENT_NAME = 'umd-element-nav-alert';
const ELEMENT_ALERT_DECLARATION = 'umd-element-nav-alert-declaration';
const ELEMENT_ALERT_CONTAINER = 'umd-element-nav-alert-container';
const ELEMENT_ALERT_LOCK = 'umd-element-nav-alert-lock';
const ELEMENT_ALERT_WRAPPER = 'umd-element-nav-alert-wrapper';
const ELEMENT_ALERT_TITLE = 'umd-element-nav-alert-title';
const ELEMENT_ALERT_TEXT = 'umd-element-nav-alert-text';
const ELEMENT_ALERT_CTA = 'umd-element-nav-alert-cta';
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
    background-color: ${Colors.black};
  }

  ${OVERWRITE_CONTAINER_TYPE_GENERAL} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_CONTAINER_TYPE_GENERAL} .${ELEMENT_ALERT_TITLE} {
    color: ${Colors.gold};
  }

   ${OVERWRITE_CONTAINER_TYPE_GENERAL} .${ELEMENT_ALERT_CLOSE_BUTTON} > svg {
    fill: ${Colors.white};
  }
`

// prettier-ignore
const OverwriteTypeOpen = `
  ${OVERWRITE_CONTAINER_TYPE_OPEN} {

  }
`

// prettier-ignore
const OverwriteTypeClosed = `
  ${OVERWRITE_CONTAINER_TYPE_CLOSED} {
    background-color: ${Colors.gold};
  }

  ${OVERWRITE_CONTAINER_TYPE_CLOSED} * {
    color: ${Colors.black};
  }

   ${OVERWRITE_CONTAINER_TYPE_CLOSED} .${ELEMENT_ALERT_CLOSE_BUTTON} > svg {
    fill: ${Colors.black};
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

  .${ELEMENT_ALERT_CLOSE_BUTTON} > svg {
    fill: ${Colors.black};
    width: 24px;
    height: 24px;
  }
`

// prettier-ignore
const TextStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TITLE}`]: SansLarge,
    },
  })}

  .${ELEMENT_ALERT_TITLE} {
    text-transform: uppercase;
  }

  * + .${ELEMENT_ALERT_TEXT} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT}`]: Text.RichText,
    },
  })}

  .${ELEMENT_ALERT_TEXT},
  .${ELEMENT_ALERT_TEXT} * {
    font-size: 16px;;
  }

  .${ELEMENT_ALERT_TEXT} + * {
    margin-top: ${Spacing.lg};
  }

  .${ELEMENT_ALERT_CTA} {
    text-decoration: none;
  }
`

// prettier-ignore
const WrapperStyles = `
  .${ELEMENT_ALERT_WRAPPER} {
    position: relative;
    padding-right: ${Spacing.lg};
  }
`

// prettier-ignore
const LockStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_LOCK}`]: LockFull,
    },
  })}
`

// prettier-ignore
const ContainerStyles = `
  .${ELEMENT_ALERT_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
    background-color: ${Colors.gray.lighter};
    border-left: 5px solid ${Colors.red};
    padding: ${Spacing.md} 0;
    transition: height ${ANIMATION_IN_SPEED}ms;
    overflow: hidden;
    position: relative;
  }

  @container (min-width: ${MEDIUM}px) {
    .${ELEMENT_ALERT_CONTAINER} {
      padding: ${Spacing.lg} 0 ;
    }
  }
`

// prettier-ignore
const STYLES_NAV_ALERT = `
  .${ELEMENT_ALERT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${Actions.Styles}
  ${ContainerStyles}
  ${LockStyles}
  ${WrapperStyles}
  ${TextStyles}
  ${CloseButtonStyles}
  ${OverwriteTypeGeneral}
  ${OverwriteTypeOpen}
  ${OverwriteTypeClosed}
`;

const setAlertStorage = (alert: TypeAlertId) => {
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

const CreateAlertComponent = ({ alerts }: { alerts: TypeAlertResponse }) => {
  const alert = alerts.data[0];

  if (!alert) return;

  const { id, title, headline, message, type, cta } = alert;
  const declaration = document.createElement('div');
  const container = document.createElement('div');
  const lock = document.createElement('div');
  const wrapper = document.createElement('div');
  const titleElement = document.createElement('p');
  const textElement = document.createElement('div');
  const closeButton = document.createElement('button');

  titleElement.classList.add(ELEMENT_ALERT_TITLE);
  titleElement.innerHTML = headline || title;

  textElement.classList.add(ELEMENT_ALERT_TEXT);
  textElement.innerHTML = message;

  closeButton.classList.add(ELEMENT_ALERT_CLOSE_BUTTON);
  closeButton.setAttribute('aria-label', 'remove alert');
  closeButton.innerHTML = AssetIcon.X;
  closeButton.addEventListener('click', () => {
    wrapper.style.height = `${wrapper.offsetHeight}px`;
    window.localStorage.setItem(ALERT_ID_REF, id);

    setTimeout(() => {
      wrapper.style.height = '0px';
    }, 100);

    setTimeout(() => {
      wrapper.remove();
    }, ANIMATION_IN_SPEED + 100);
  });

  wrapper.classList.add(ELEMENT_ALERT_WRAPPER);
  wrapper.appendChild(closeButton);
  wrapper.appendChild(titleElement);
  wrapper.appendChild(textElement);

  if (cta) {
    const link = cta[0];
    if (link) {
      const ctaElement = document.createElement('a');

      ctaElement.classList.add(ELEMENT_ALERT_CTA);
      ctaElement.href = link.url;
      ctaElement.innerHTML = link.title;
      ctaElement.setAttribute('rel', 'noopener noreferrer');

      wrapper.appendChild(
        Actions.CreateElement({
          cta: ctaElement,
          type: 'secondary',
        }),
      );
    }
  }

  lock.classList.add(ELEMENT_ALERT_LOCK);
  lock.appendChild(wrapper);

  container.setAttribute(ATTRIBUTE_TYPE, type);
  container.setAttribute('id', ALERT_ELEMENT_ID);
  container.classList.add(ELEMENT_ALERT_CONTAINER);
  container.appendChild(lock);

  declaration.appendChild(container);
  declaration.classList.add(ELEMENT_ALERT_DECLARATION);

  return declaration;
};

const fetchAlerts = async ({ alertUrl }: TypeAlertProps) => {
  if (alertUrl) {
    const response = await fetch(alertUrl);
    return response.json();
  }

  const feedData = await FetchGraphQL({
    query: QUERY,
    url: DEFAULT_ALERT_URL,
    token: '',
  });

  return feedData;
};

const CreateNavAlert = ({ alertUrl }: TypeAlertProps) =>
  (async () => {
    const { data = [] } = await fetchAlerts({ alertUrl });

    if (data.length === 0) return;
    if (data[0] == '') return;

    // if (shouldAlertHide({ alert_id: data.alert_id })) return;

    return CreateAlertComponent({ alerts: data });
  })();

export default {
  CreateElement: CreateNavAlert,
  Styles: STYLES_NAV_ALERT,
};
