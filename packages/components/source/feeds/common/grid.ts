import { Layout } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { GridColumnsWithGap } = Layout;

export const ID_GRID_LAYOUT_CONTAINER = 'umd-grid-gap-layout-container';

export const STYLES_GRID_LAYOUT = `
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

export const CreateGridGapLayout = ({ count }: { count: number }) => {
  const container = document.createElement('div');

  container.classList.add(ID_GRID_LAYOUT_CONTAINER);
  container.setAttribute('grid-count', `${count}`);

  return container;
};
