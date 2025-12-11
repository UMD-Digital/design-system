import { setLocalStorageTimestamp } from '../../source/storage/setLocalStorageTimestamp';

describe('setLocalStorageTimestamp', () => {
  let originalDate: typeof Date;

  beforeEach(() => {
    localStorage.clear();
    originalDate = global.Date;
  });

  afterEach(() => {
    localStorage.clear();
    global.Date = originalDate;
  });

  describe('happy path', () => {
    it('should store timestamp in localStorage', () => {
      const mockTime = 1632249600000; // Sept 21, 2021
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(mockTime);
        }
        static now() {
          return mockTime;
        }
        getTime() {
          return mockTime;
        }
      } as any;

      setLocalStorageTimestamp({ key: 'test-timestamp' });

      const stored = localStorage.getItem('test-timestamp');
      expect(stored).toBe('1632249600000');
    });

    it('should store current time as string', () => {
      setLocalStorageTimestamp({ key: 'current-time' });

      const stored = localStorage.getItem('current-time');
      expect(stored).toBeTruthy();
      expect(typeof stored).toBe('string');
      expect(Number(stored)).toBeGreaterThan(0);
    });

    it('should overwrite existing timestamp', () => {
      localStorage.setItem('test-key', 'old-value');

      const mockTime = 1632249600000;
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(mockTime);
        }
        getTime() {
          return mockTime;
        }
      } as any;

      setLocalStorageTimestamp({ key: 'test-key' });

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe('1632249600000');
      expect(stored).not.toBe('old-value');
    });

    it('should store milliseconds since epoch', () => {
      const before = Date.now();
      setLocalStorageTimestamp({ key: 'time-check' });
      const after = Date.now();

      const stored = localStorage.getItem('time-check');
      const storedTime = Number(stored);

      expect(storedTime).toBeGreaterThanOrEqual(before);
      expect(storedTime).toBeLessThanOrEqual(after);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string key', () => {
      const mockTime = 1632249600000;
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(mockTime);
        }
        getTime() {
          return mockTime;
        }
      } as any;

      setLocalStorageTimestamp({ key: '' });

      const stored = localStorage.getItem('');
      expect(stored).toBe('1632249600000');
    });

    it('should handle special characters in key', () => {
      const mockTime = 1632249600000;
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(mockTime);
        }
        getTime() {
          return mockTime;
        }
      } as any;

      setLocalStorageTimestamp({ key: 'special-!@#$%^&*()' });

      const stored = localStorage.getItem('special-!@#$%^&*()');
      expect(stored).toBe('1632249600000');
    });

    it('should handle very long key names', () => {
      const longKey = 'a'.repeat(1000);

      setLocalStorageTimestamp({ key: longKey });

      const stored = localStorage.getItem(longKey);
      expect(stored).toBeTruthy();
    });

    it('should work with Unicode key names', () => {
      const mockTime = 1632249600000;
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(mockTime);
        }
        getTime() {
          return mockTime;
        }
      } as any;

      setLocalStorageTimestamp({ key: '测试-🚀' });

      const stored = localStorage.getItem('测试-🚀');
      expect(stored).toBe('1632249600000');
    });

    it('should handle consecutive calls with different keys', () => {
      setLocalStorageTimestamp({ key: 'time1' });
      setLocalStorageTimestamp({ key: 'time2' });
      setLocalStorageTimestamp({ key: 'time3' });

      expect(localStorage.getItem('time1')).toBeTruthy();
      expect(localStorage.getItem('time2')).toBeTruthy();
      expect(localStorage.getItem('time3')).toBeTruthy();
    });

    it('should handle consecutive calls with same key', () => {
      setLocalStorageTimestamp({ key: 'same-key' });
      const first = localStorage.getItem('same-key');

      // Wait a tiny bit
      const start = Date.now();
      while (Date.now() - start < 10) {
        // busy wait
      }

      setLocalStorageTimestamp({ key: 'same-key' });
      const second = localStorage.getItem('same-key');

      expect(Number(second)).toBeGreaterThanOrEqual(Number(first));
    });

    it('should handle zero timestamp', () => {
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(0);
        }
        getTime() {
          return 0;
        }
      } as any;

      setLocalStorageTimestamp({ key: 'zero-time' });

      const stored = localStorage.getItem('zero-time');
      expect(stored).toBe('0');
    });

    it('should handle future timestamp', () => {
      const futureTime = Date.now() + 1000000000; // way in the future
      global.Date = class extends Date {
        constructor() {
          super();
          return new originalDate(futureTime);
        }
        getTime() {
          return futureTime;
        }
      } as any;

      setLocalStorageTimestamp({ key: 'future' });

      const stored = localStorage.getItem('future');
      expect(Number(stored)).toBe(futureTime);
    });
  });

  describe('error conditions', () => {
    it('should handle null key', () => {
      expect(() =>
        setLocalStorageTimestamp({ key: null as any }),
      ).not.toThrow();
    });

    it('should handle undefined key', () => {
      expect(() =>
        setLocalStorageTimestamp({ key: undefined as any }),
      ).not.toThrow();
    });
  });

  describe('localStorage interaction', () => {
    it('should not clear other localStorage items', () => {
      localStorage.setItem('other-key', 'other-value');

      setLocalStorageTimestamp({ key: 'timestamp-key' });

      expect(localStorage.getItem('other-key')).toBe('other-value');
    });

    it('should be retrievable as integer', () => {
      setLocalStorageTimestamp({ key: 'int-test' });

      const stored = localStorage.getItem('int-test');
      const asNumber = parseInt(stored!, 10);

      expect(isNaN(asNumber)).toBe(false);
      expect(asNumber).toBeGreaterThan(0);
    });

    it('should be retrievable and parseable', () => {
      setLocalStorageTimestamp({ key: 'parseable' });

      const stored = localStorage.getItem('parseable');
      const parsed = Number(stored);

      expect(Number.isInteger(parsed)).toBe(true);
      expect(parsed).toBeGreaterThan(0);
    });
  });

  describe('timestamp format', () => {
    it('should store as string of digits', () => {
      setLocalStorageTimestamp({ key: 'format-test' });

      const stored = localStorage.getItem('format-test');
      expect(stored).toMatch(/^\d+$/);
    });

    it('should store value that can be used with Date constructor', () => {
      const mockTime = 1632249600000;
      global.Date = class extends Date {
        constructor(value?: any) {
          if (value === undefined) {
            super();
            this.setTime(mockTime);
          } else {
            super(value);
          }
        }
        getTime() {
          if (this.valueOf() === 0) {
            return mockTime;
          }
          return super.getTime();
        }
      } as any;

      setLocalStorageTimestamp({ key: 'date-test' });

      const stored = localStorage.getItem('date-test');
      const date = new originalDate(Number(stored));

      expect(date.getTime()).toBe(mockTime);
    });

    it('should store 13-digit timestamp', () => {
      setLocalStorageTimestamp({ key: 'digit-test' });

      const stored = localStorage.getItem('digit-test');
      expect(stored!.length).toBe(13);
    });
  });

  describe('consistency', () => {
    it('should store value equal to Date.now()', () => {
      const before = Date.now();
      setLocalStorageTimestamp({ key: 'now-test' });
      const after = Date.now();

      const stored = Number(localStorage.getItem('now-test'));

      expect(stored).toBeGreaterThanOrEqual(before);
      expect(stored).toBeLessThanOrEqual(after);
    });

    it('should be consistent with new Date().getTime()', () => {
      const before = new Date().getTime();
      setLocalStorageTimestamp({ key: 'gettime-test' });
      const after = new Date().getTime();

      const stored = Number(localStorage.getItem('gettime-test'));

      expect(stored).toBeGreaterThanOrEqual(before);
      expect(stored).toBeLessThanOrEqual(after);
    });
  });
});