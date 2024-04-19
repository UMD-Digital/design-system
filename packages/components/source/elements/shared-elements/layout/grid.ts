import { Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

type TypeGridDisplay = {
  count?: number;
  container: HTMLElement;
};

const { GridColumnsWithGap } = Layout;
const { ConvertJSSObjectToStyles } = Styles;

const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

const STYLES_GRID_LAYOUT = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="2"]`]:
        GridColumnsWithGap['.base'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="3"]`]:
        GridColumnsWithGap['.base-three'],
    },
  })}


  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ID_GRID_LAYOUT_CONTAINER}[grid-count="4"]`]:
        GridColumnsWithGap['.base-four'],
    },
  })}
`;

const CreateLayoutGridGap = ({ container, count = 2 }: TypeGridDisplay) => {
  const grid = document.createElement('div');

  grid.classList.add(ID_GRID_LAYOUT_CONTAINER);
  grid.setAttribute('grid-count', `${count}`);

  container.appendChild(grid);
};

export default {
  CreateElement: CreateLayoutGridGap,
  Styles: STYLES_GRID_LAYOUT,
  ID: ID_GRID_LAYOUT_CONTAINER,
};
