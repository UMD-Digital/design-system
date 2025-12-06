import { Slots } from '../source';

describe('Slots', () => {
  it('should export slot utilities', () => {
    expect(Slots).toBeDefined();
    expect(Slots.actions).toBeDefined();
    expect(Slots.headline).toBeDefined();
    expect(Slots.text).toBeDefined();
  });

  it('should export slot element utilities', () => {
    expect(Slots.element).toBeDefined();
    expect(Slots.element.allowed).toBeDefined();
  });

  it('should export slot names', () => {
    expect(Slots.name).toBeDefined();
  });
});
