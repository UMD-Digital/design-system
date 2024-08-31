import { Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeStickyProps = {
  stickyColumn?: HTMLElement | null;
  staticColumn?: HTMLElement | null;
  isStickyLast?: boolean | null;
  topPosition?: string | null;
};

const { Spacing, Breakpoints } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_NAME = 'umd-sticky-columns';
const ATTRIBUTE_STICKY_LAST = 'sticky-last';

const ELEMENT_STICKY_CONTAINER = 'sticky-columns-container';
const ELEMENT_STICKY_CONTAINER_WRAPPER = 'sticky-columns-container-wrapper';

const ELEMENT_STICKY_COLUMN = 'sticky-column';
const ELEMENT_STATIC_COLUMN = 'static-column';

const OVERWRITE_STICKY_LAST_STICKY = `.${ELEMENT_STICKY_CONTAINER}[${ATTRIBUTE_STICKY_LAST}] .${ELEMENT_STICKY_COLUMN}`;

// prettier-ignore
const OverwriteStickyLast = `
  @media (min-width: ${Breakpoints.highDef.min}) {
    ${OVERWRITE_STICKY_LAST_STICKY} {
       order: 2;
     }
  }
`;

// prettier-ignore
const ColumnSticky = `
  @media (min-width: ${Breakpoints.highDef.min}) {
    .${ELEMENT_STICKY_COLUMN} {
      position: sticky;
      top: 32px;
    }
  }
`;

// prettier-ignore
const STYLES_STICKY_COLUMNS_ELEMENT = `
  .${ELEMENT_STICKY_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_STICKY_CONTAINER_WRAPPER}`]: Layout.GridColumnsBaseWithGap,
    },
  })}

  .${ELEMENT_STICKY_CONTAINER_WRAPPER} {
    align-items: start;
    grid-template-columns: 1fr;
  }

  @media (min-width: ${Breakpoints.highDef.min}) {
    .${ELEMENT_STICKY_CONTAINER_WRAPPER} {
      grid-template-columns: 1fr 1fr;
    }
  }

  ${ColumnSticky}
  ${OverwriteStickyLast}
`;

const CreateStickyColumnsElement = (element: TypeStickyProps) => {
  const { stickyColumn, staticColumn, isStickyLast, topPosition } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const stickyElement = document.createElement('div');

  const setPosition = ({ value }: { value: string | null }) => {
    if (value) {
      stickyElement.style.top = value;
    } else {
      stickyElement.style.removeProperty('top');
    }
  };

  if (isStickyLast) container.setAttribute(ATTRIBUTE_STICKY_LAST, '');
  container.classList.add(ELEMENT_STICKY_CONTAINER);
  wrapper.classList.add(ELEMENT_STICKY_CONTAINER_WRAPPER);

  if (stickyColumn) {
    stickyElement.classList.add(ELEMENT_STICKY_COLUMN);
    stickyElement.appendChild(stickyColumn);
    wrapper.appendChild(stickyElement);
  }

  if (staticColumn) {
    staticColumn.classList.add(ELEMENT_STATIC_COLUMN);
    wrapper.appendChild(staticColumn);
  }

  container.appendChild(wrapper);

  if (topPosition) {
    setPosition({ value: topPosition });
  }

  return {
    element: container,
    events: {
      SetPosition: setPosition,
    },
  };
};

export default {
  CreateElement: CreateStickyColumnsElement,
  Styles: STYLES_STICKY_COLUMNS_ELEMENT,
};
