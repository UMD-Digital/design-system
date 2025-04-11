import * as accessibility from '../index';
import { objectWithName } from '../../utilities/transform';

describe('accessibility transform tests', () => {
  it('should transform screenReader.only correctly', () => {
    const input = {
      only: accessibility.screenReader.only
    };
    
    const result = objectWithName(input);
    
    expect(result).toMatchSnapshot();
    expect(result['.sr-only']).toBeDefined();
    expect(result['.sr-only'].position).toBe('absolute');
    expect(result['.sr-only'].clip).toBe('rect(0,0,0,0)');
  });
  
  it('should transform skip.content correctly', () => {
    const input = {
      skipContent: accessibility.skip.content
    };
    
    const result = objectWithName(input);
    
    expect(result).toMatchSnapshot();
    expect(result['.umd-skip-content']).toBeDefined();
    expect(result['.umd-skip-content'].backgroundColor).toBe('#fff');
    expect(result['.umd-skip-content'].color).toBe('#e21833');
    expect(result['.umd-skip-content']['&:focus']).toBeDefined();
  });
  
  it('should transform multiple accessibility components correctly', () => {
    const input = {
      screenReaderOnly: accessibility.screenReader.only,
      skipContent: accessibility.skip.content
    };
    
    const result = objectWithName(input);
    
    expect(result).toMatchSnapshot();
    expect(result['.sr-only']).toBeDefined();
    expect(result['.umd-skip-content']).toBeDefined();
  });
});