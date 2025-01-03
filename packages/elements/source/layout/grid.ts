import { layout, token } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeGridDisplay = {
  count?: number;
  container: HTMLElement;
  isTypeGap?: boolean;
};

const { media } = token;
const { convertJSSObjectToStyles } = Utility.styles;

const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

const STYLES_GRID_LAYOUT = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-gap-count="2"]`]: layout.grid.gap.two,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-gap-count="3"]`]:
        layout.grid.gap.three,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-gap-count="4"]`]:
        layout.grid.gap.four,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="2"]`]: layout.grid.columnsTwo,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="3"]`]:
        layout.grid.columnsThree,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="4"]`]: layout.grid.columnsFour,
    },
  })}

  @media (${token.media.queries.large.min}) {
    .${ID_GRID_LAYOUT_CONTAINER}[grid-count] > * {
      min-height: 560px;
    }
  }

  @media (${token.media.queries.large.min}) {
    .umd-grid-column-double {
      grid-column: span 2;
      min-height: 560px;
    }
  }

  @media (${token.media.queries.highDef.min}) {
    .${ID_GRID_LAYOUT_CONTAINER}[data-reversed] > *:first-child {
      order: 2;
    }
  }
`;

const CreateLayoutGridGap = ({
  container,
  count = 2,
  isTypeGap = true,
}: TypeGridDisplay) => {
  const grid = document.createElement('div');

  grid.classList.add(ID_GRID_LAYOUT_CONTAINER);

  if (isTypeGap) {
    grid.setAttribute('grid-gap-count', `${count}`);
  }

  if (!isTypeGap) {
    grid.setAttribute('grid-count', `${count}`);
  }

  container.appendChild(grid);
};

export default {
  CreateElement: CreateLayoutGridGap,
  Styles: STYLES_GRID_LAYOUT,
  ID: ID_GRID_LAYOUT_CONTAINER,
};
