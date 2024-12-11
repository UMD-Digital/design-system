import { Layout, Tokens } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeGridDisplay = {
  count?: number;
  container: HTMLElement;
  isTypeGap?: boolean;
};

const { Queries } = Tokens;

const {
  GridColumnsTwo,
  GridColumnsThree,
  GridColumnsFour,
  GridColumnsBaseWithGap,
  GridColumnsThreeWithGap,
  GridColumnsFourWithGap,
} = Layout;
const { convertJSSObjectToStyles } = Styles;

const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

const STYLES_GRID_LAYOUT = `
  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-gap-count="2"]`]:
        GridColumnsBaseWithGap,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-gap-count="3"]`]:
        GridColumnsThreeWithGap,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-gap-count="4"]`]:
        GridColumnsFourWithGap,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="2"]`]: GridColumnsTwo,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="3"]`]: GridColumnsThree,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="4"]`]: GridColumnsFour,
    },
  })}

  @media (${Queries.large.min}) {
    .${ID_GRID_LAYOUT_CONTAINER}[grid-count] > * {
      min-height: 560px;
    }
  }

  @media (${Queries.large.min}) {
    .umd-grid-column-double {
      grid-column: span 2;
      min-height: 560px;
    }
  }

  @media (${Queries.highDef.min}) {
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
