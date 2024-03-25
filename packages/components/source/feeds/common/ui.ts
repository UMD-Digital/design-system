import { MakeLoader, STYLES_LOADER, ID_UMD_LOADER } from '../common/loader';
import {
  CreateNoResultsInterface,
  STYLES_NO_RESULTS,
} from '../common/no-results';
import {
  CreateGridGapLayout,
  STYLES_GRID_LAYOUT,
  ID_GRID_LAYOUT_CONTAINER,
} from '../common/grid';
import {
  CreateLazyLoadButton,
  STYLES_LAZY_LOAD_BUTTON,
  ID_LAZY_LOAD_BUTTON,
} from './elements';

type NoResultsContentType = {
  message: string;
  linkUrl: string;
  linkText: string;
};

type ContainerType = {
  container: HTMLDivElement;
};

export type TypeAppendGridEntries = ContainerType & {
  entries: HTMLDivElement[];
};

export type TypeDisplayNoResults = ContainerType & {
  NoResultsContent: NoResultsContentType;
};

export type TypeGridDisplay = ContainerType & {
  count?: number;
};

export type TypeLazyLoad = ContainerType & {
  isLazyLoad: boolean;
  totalEntries: number | null;
  offset: number;
  lazyLoadCallback: { callback: (args: any) => void };
};

export const STYLES_FEEDS_COMMON = `
  ${STYLES_GRID_LAYOUT}
  ${STYLES_LAZY_LOAD_BUTTON}
  ${STYLES_NO_RESULTS}
  ${STYLES_LOADER}
`;

export const RemoveLazyLoad = ({ container }: ContainerType) => {
  const button = container.querySelector(
    `.${ID_LAZY_LOAD_BUTTON}`,
  ) as HTMLDivElement;

  if (button) button.remove();
};

export const RemoveLoader = ({ container }: ContainerType) => {
  const loader = container.querySelector(`.${ID_UMD_LOADER}`) as HTMLDivElement;

  if (loader) loader.remove();
};

export const DisplayLazyLoad = ({
  container,
  isLazyLoad,
  totalEntries,
  offset,
  lazyLoadCallback,
}: TypeLazyLoad) => {
  if (!isLazyLoad) return;
  if (!totalEntries) return;
  if (!offset) return;
  if (!lazyLoadCallback) return;
  if (offset >= totalEntries) return;

  const lazyLoadButton = CreateLazyLoadButton(lazyLoadCallback);
  container.appendChild(lazyLoadButton);
};

export const DisplayNoResults = ({
  container,
  NoResultsContent,
}: TypeDisplayNoResults) => {
  container.innerHTML = '';
  CreateNoResultsInterface({ container, ...NoResultsContent });
};

export const DisplayLoader = ({ container }: ContainerType) => {
  const loader = MakeLoader();

  container.appendChild(loader);
};

export const DisplayGrid = ({ container, count = 2 }: TypeGridDisplay) => {
  const grid = CreateGridGapLayout({ count });

  container.appendChild(grid);
};

export const AppendGridEntries = ({
  container,
  entries,
}: TypeAppendGridEntries) => {
  const grid = container.querySelector(
    `.${ID_GRID_LAYOUT_CONTAINER}`,
  ) as HTMLDivElement;

  entries.forEach((entry) => {
    grid.appendChild(entry);
  });
};
