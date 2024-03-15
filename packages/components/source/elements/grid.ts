import { Layout } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { Grid } = Layout;

export const GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

export const GridGapStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${GRID_LAYOUT_CONTAINER}[grid-count="2"]`]: Grid['.base'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${GRID_LAYOUT_CONTAINER}[grid-count="3"]`]: Grid['.base-three'],
    },
  })}


  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${GRID_LAYOUT_CONTAINER}[grid-count="4"]`]: Grid['.base-four'],
    },
  })}
`;

export const CreateGridGapLayout = ({ count }: { count: number }) => {
  const container = document.createElement('div');

  container.classList.add(GRID_LAYOUT_CONTAINER);
  container.setAttribute('grid-count', `${count}`);

  return container;
};
