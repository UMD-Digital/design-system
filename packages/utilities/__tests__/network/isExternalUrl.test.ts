import { isExternalUrl } from '../../source/network/isExternalUrl';

describe('isExternalUrl', () => {
  const mockLocation = (href: string, hostname: string) => {
    delete (window as any).location;
    (window as any).location = { href, hostname };
  };

  beforeEach(() => {
    mockLocation(
      'https://beta.localhost.dev/components/navigation',
      'beta.localhost.dev',
    );
  });

  describe('happy path - internal URLs', () => {
    it('should return false for same hostname with different path', () => {
      expect(isExternalUrl('https://beta.localhost.dev/giving')).toBe(false);
    });

    it('should return false for relative paths', () => {
      expect(isExternalUrl('/giving')).toBe(false);
      expect(isExternalUrl('/components/buttons')).toBe(false);
      expect(isExternalUrl('about')).toBe(false);
    });

    it('should return false for relative paths with parent directory', () => {
      expect(isExternalUrl('../about')).toBe(false);
      expect(isExternalUrl('../../home')).toBe(false);
    });

    it('should return false for same hostname with query params', () => {
      expect(
        isExternalUrl('https://beta.localhost.dev/search?q=test'),
      ).toBe(false);
    });

    it('should return false for same hostname with hash', () => {
      expect(isExternalUrl('https://beta.localhost.dev/page#section')).toBe(
        false,
      );
    });

    it('should return false for same hostname with different protocol', () => {
      expect(isExternalUrl('http://beta.localhost.dev/page')).toBe(false);
    });

    it('should return false for hash-only links', () => {
      expect(isExternalUrl('#section')).toBe(false);
    });

    it('should return false for query-only links', () => {
      expect(isExternalUrl('?query=value')).toBe(false);
    });
  });

  describe('happy path - external URLs', () => {
    it('should return true for different hostname', () => {
      expect(isExternalUrl('https://giving.umd.edu')).toBe(true);
    });

    it('should return true for different hostname with path', () => {
      expect(isExternalUrl('https://giving.umd.edu/campaign')).toBe(true);
    });

    it('should return true for completely different domain', () => {
      expect(isExternalUrl('https://www.google.com')).toBe(true);
      expect(isExternalUrl('https://github.com')).toBe(true);
    });

    it('should return true for subdomain differences', () => {
      expect(isExternalUrl('https://www.localhost.dev')).toBe(true);
      expect(isExternalUrl('https://alpha.localhost.dev')).toBe(true);
    });

    it('should return true for different port on same hostname', () => {
      expect(isExternalUrl('https://beta.localhost.dev:3000')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return false for empty string', () => {
      expect(isExternalUrl('')).toBe(false);
    });

    it('should return false for invalid URLs', () => {
      expect(isExternalUrl('not a url')).toBe(false);
      expect(isExternalUrl('javascript:alert(1)')).toBe(false);
    });

    it('should return false for malformed URLs', () => {
      expect(isExternalUrl('ht!tp://invalid')).toBe(false);
      expect(isExternalUrl('://')).toBe(false);
    });

    it('should handle URLs with special characters', () => {
      expect(
        isExternalUrl('https://beta.localhost.dev/path?a=1&b=2#section'),
      ).toBe(false);
      expect(isExternalUrl('https://example.com/path?a=1&b=2#section')).toBe(
        true,
      );
    });

    it('should handle URLs with encoded characters', () => {
      expect(
        isExternalUrl('https://beta.localhost.dev/path%20with%20spaces'),
      ).toBe(false);
      expect(isExternalUrl('https://example.com/path%20with%20spaces')).toBe(
        true,
      );
    });
  });

  describe('protocol edge cases', () => {
    it('should return false for protocol-relative URLs to same host', () => {
      expect(isExternalUrl('//beta.localhost.dev/page')).toBe(false);
    });

    it('should return true for protocol-relative URLs to different host', () => {
      expect(isExternalUrl('//example.com/page')).toBe(true);
    });

    it('should handle mailto links as external', () => {
      expect(isExternalUrl('mailto:test@example.com')).toBe(true);
    });

    it('should handle tel links as external', () => {
      expect(isExternalUrl('tel:+1234567890')).toBe(true);
    });
  });

  describe('different base locations', () => {
    it('should work correctly with different base hostname', () => {
      mockLocation('https://www.umd.edu/about', 'www.umd.edu');

      expect(isExternalUrl('https://www.umd.edu/contact')).toBe(false);
      expect(isExternalUrl('https://giving.umd.edu')).toBe(true);
      expect(isExternalUrl('/home')).toBe(false);
    });

    it('should work correctly with localhost', () => {
      mockLocation('http://localhost:3000/app', 'localhost');

      expect(isExternalUrl('http://localhost:3000/about')).toBe(false);
      expect(isExternalUrl('http://127.0.0.1:3000/about')).toBe(true);
      expect(isExternalUrl('/dashboard')).toBe(false);
    });

    it('should work correctly with IP addresses', () => {
      mockLocation('http://192.168.1.1/admin', '192.168.1.1');

      expect(isExternalUrl('http://192.168.1.1/settings')).toBe(false);
      expect(isExternalUrl('http://192.168.1.2/settings')).toBe(true);
      expect(isExternalUrl('/config')).toBe(false);
    });
  });

  describe('real-world scenarios', () => {
    it('should correctly identify UMD internal vs external links', () => {
      mockLocation(
        'https://beta.localhost.dev/components',
        'beta.localhost.dev',
      );

      expect(isExternalUrl('https://beta.localhost.dev/components')).toBe(
        false,
      );
      expect(isExternalUrl('https://beta.localhost.dev/giving')).toBe(false);
      expect(isExternalUrl('/elements')).toBe(false);

      expect(isExternalUrl('https://giving.umd.edu')).toBe(true);
      expect(isExternalUrl('https://www.umd.edu')).toBe(true);
      expect(isExternalUrl('https://github.com/umd')).toBe(true);
    });
  });
});
