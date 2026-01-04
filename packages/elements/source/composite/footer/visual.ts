import { createCompositeFooterMainSection as createMain } from './elements/main-section';
import { createCompositeFooterUtilitySection as createUtility } from './elements/utility-section';
import { FooterProps } from './_types';
import { createCompositeFooterBase as buildFooter } from './base';

const CreateFooterVisualElement = (props: FooterProps) => {
  const main = createMain(props);
  const utility = createUtility(props);

  return buildFooter(props, [main, utility]);
};

export const createCompositeFooterVisual = CreateFooterVisualElement;
