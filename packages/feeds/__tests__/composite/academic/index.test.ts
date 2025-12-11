import * as academicModule from '../../../source/composite/academic/index';
import sliderImplementation from '../../../source/composite/academic/slider';

describe('Academic Module', () => {
  test('exports the slider component', () => {
    expect(academicModule.slider).toBeDefined();
    expect(academicModule.slider).toBe(sliderImplementation);
  });
});
