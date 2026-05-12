import * as token from '@universityofmaryland/web-token-library';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

type TypeStickyProps = {
  stickyColumn?: HTMLElement | null;
  staticColumn?: HTMLElement | null;
  isStickyLast?: boolean | null;
  topPosition?: string | null;
};

const CreateStickyColumnsElement = (props: TypeStickyProps) => {
  const { stickyColumn, staticColumn, isStickyLast, topPosition } = props;
  let stickyColumnElement: HTMLElement | null = null;

  const setPosition = ({ value }: { value: string | null }) => {
    if (!stickyColumnElement) return;
    if (value) {
      stickyColumnElement.style.top = value;
    } else {
      stickyColumnElement.style.removeProperty('top');
    }
  };

  const createStickyColumn = () => {
    if (!stickyColumn) return null;
    return new ElementBuilder()
      .withClassName('sticky-column')
      .withStyles({
        element: {
          [`@media (${token.media.queries.highDef.min})`]: {
            position: 'sticky',
            top: '32px',
            ...(isStickyLast && { order: 2 }),
          },
        },
      })
      .withChild(stickyColumn)
      .ref((element) => {
        stickyColumnElement = element;
      });
  };

  const createStaticColumn = () => {
    if (!staticColumn) return null;
    return new ElementBuilder(staticColumn).withClassName('static-column');
  };

  const children = [createStickyColumn(), createStaticColumn()].filter((child) => child !== null);

  const wrapperModel = new ElementBuilder()
    .withClassName('sticky-columns-container-wrapper')
    .styled(layout.grid.gap.two)
    .withStyles({
      element: {
        alignItems: 'start',
        gridTemplateColumns: '1fr',
        [`@media (${token.media.queries.highDef.min})`]: {
          gridTemplateColumns: '1fr 1fr',
        },
      },
    })
    .withChildren(...children)
    .build();

  const containerModel = new ElementBuilder()
    .withClassName('sticky-columns-container')
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .withChild(wrapperModel)
    .build();

  if (topPosition) {
    setPosition({ value: topPosition });
  }

  return {
    element: containerModel.element,
    styles: containerModel.styles,
    events: {
      setPosition,
    },
  };
};

export const createCompositeLayoutStickyColumns = CreateStickyColumnsElement;
