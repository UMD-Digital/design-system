import { Typography, Tokens, Layout } from '@universityofmaryland/variables';

type TypeStickyProps = {
  stickyColumn?: HTMLElement | null;
  staticColumn?: HTMLElement | null;
  isStickyLast?: boolean | null;
};

const { Spacing, Breakpoints } = Tokens;

const ELEMENT_NAME = 'umd-sticky-columns';
const ATTRIBUTE_STICKY_LAST = 'sticky-last';

const ELEMENT_STICKY_CONTAINER = 'sticky-columns-container';
const ELEMENT_STICKY_CONTAINER_WRAPPER = 'sticky-columns-container-wrapper';

const ELEMENT_STICKY_COLUMN = 'sticky-column';
const ELEMENT_STATIC_COLUMN = 'static-column';

const OVERWRITE_STICKY_LAST_STICKY = `.${ELEMENT_STICKY_CONTAINER}[${ATTRIBUTE_STICKY_LAST}] .${ELEMENT_STICKY_COLUMN}`;

// prettier-ignore
const OverwriteStickyLast = `
  @media (min-width: ${Breakpoints.tablet.min}) {
    ${OVERWRITE_STICKY_LAST_STICKY} {
       order: 2;
     }
  }
`;

// prettier-ignore
const ColumnSticky = `
  @media (min-width: ${Breakpoints.tablet.min}) {
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

  .${ELEMENT_STICKY_CONTAINER_WRAPPER} {
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
    grid-gap: ${Spacing.md};
  }

  @media (min-width: ${Breakpoints.tablet.min}) {
    .${ELEMENT_STICKY_CONTAINER_WRAPPER} {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: ${Breakpoints.desktop.min}) {
    .${ELEMENT_STICKY_CONTAINER_WRAPPER} {
      grid-gap: ${Spacing.lg};
    }
  }

  ${ColumnSticky}
  ${OverwriteStickyLast}
`;

const CreateStickyColumnsElement = (element: TypeStickyProps) => {
  const { stickyColumn, staticColumn, isStickyLast } = element;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');

  if (isStickyLast) container.setAttribute(ATTRIBUTE_STICKY_LAST, '');
  container.classList.add(ELEMENT_STICKY_CONTAINER);
  wrapper.classList.add(ELEMENT_STICKY_CONTAINER_WRAPPER);

  if (stickyColumn) {
    const stickyElement = document.createElement('div');
    stickyElement.classList.add(ELEMENT_STICKY_COLUMN);
    stickyElement.appendChild(stickyColumn);
    wrapper.appendChild(stickyElement);
  }

  if (staticColumn) {
    staticColumn.classList.add(ELEMENT_STATIC_COLUMN);
    wrapper.appendChild(staticColumn);
  }

  container.appendChild(wrapper);

  return container;
};

export default {
  CreateElement: CreateStickyColumnsElement,
  Styles: STYLES_STICKY_COLUMNS_ELEMENT,
};
