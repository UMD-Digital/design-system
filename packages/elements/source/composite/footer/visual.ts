import createMain from './elements/main-section';
import createUtility from './elements/utility-section';
import { FooterProps } from './_types';
import buildFooter from './base';

export default (props: FooterProps) => {
  const main = createMain(props);
  const utility = createUtility(props);

  return buildFooter(props, [main, utility]);
};
