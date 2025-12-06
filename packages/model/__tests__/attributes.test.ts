import { Attributes } from '../source';

describe('Attributes', () => {
  describe('names', () => {
    it('should export attribute names', () => {
      expect(Attributes.names).toBeDefined();
      expect(Attributes.names.theme).toBeDefined();
    });
  });

  describe('values', () => {
    it('should export attribute values', () => {
      expect(Attributes.values).toBeDefined();
    });
  });

  describe('handler', () => {
    it('should export attribute handler', () => {
      expect(Attributes.handler).toBeDefined();
    });
  });
});
