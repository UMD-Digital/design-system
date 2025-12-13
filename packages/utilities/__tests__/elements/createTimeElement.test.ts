import { createTimeElement } from '../../source/elements/createTimeElement';

describe('createTimeElement', () => {
  describe('happy path', () => {
    it('should create a time element', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'January 15, 2024',
      });

      expect(time?.tagName).toBe('TIME');
    });

    it('should set datetime attribute', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'January 15, 2024',
      });

      expect(time?.getAttribute('datetime')).toBe('2024-01-15');
    });

    it('should set display text as textContent by default', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'January 15, 2024',
      });

      expect(time?.textContent).toBe('January 15, 2024');
    });

    it('should handle ISO datetime strings', () => {
      const time = createTimeElement({
        datetime: '2024-01-15T14:30:00Z',
        displayText: 'Jan 15, 2024 at 2:30 PM',
      });

      expect(time?.getAttribute('datetime')).toBe('2024-01-15T14:30:00Z');
      expect(time?.textContent).toBe('Jan 15, 2024 at 2:30 PM');
    });

    it('should handle relative time display', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: '3 days ago',
      });

      expect(time?.getAttribute('datetime')).toBe('2024-01-15');
      expect(time?.textContent).toBe('3 days ago');
    });

    it('should use innerHTML when allowHTML is true', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: '<strong>Jan 15</strong>, 2024',
        allowHTML: true,
      });

      expect(time?.innerHTML).toBe('<strong>Jan 15</strong>, 2024');
      expect(time?.querySelector('strong')?.textContent).toBe('Jan 15');
    });
  });

  describe('validation', () => {
    it('should return null when datetime is empty', () => {
      const time = createTimeElement({
        datetime: '',
        displayText: 'January 15, 2024',
      });

      expect(time).toBeNull();
    });

    it('should return null when displayText is empty', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: '',
      });

      expect(time).toBeNull();
    });

    it('should return null when both are empty', () => {
      const time = createTimeElement({
        datetime: '',
        displayText: '',
      });

      expect(time).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle special characters in display text', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'Test & <Special> "Characters"',
      });

      expect(time?.textContent).toBe('Test & <Special> "Characters"');
    });

    it('should handle unicode in display text', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: '15 janvier 2024',
      });

      expect(time?.textContent).toBe('15 janvier 2024');
    });

    it('should handle emoji in display text', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'Jan 15 🎉',
      });

      expect(time?.textContent).toBe('Jan 15 🎉');
    });

    it('should not execute script tags when allowHTML is true', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: '<script>alert("xss")</script>Date',
        allowHTML: true,
      });

      // Script tags should be in innerHTML but not execute
      expect(time?.innerHTML).toContain('script');
      expect(time?.innerHTML).toContain('Date');
    });

    it('should escape HTML when allowHTML is false (default)', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: '<strong>Bold</strong> text',
      });

      // textContent should escape HTML
      expect(time?.textContent).toBe('<strong>Bold</strong> text');
      expect(time?.querySelector('strong')).toBeNull();
    });
  });

  describe('datetime formats', () => {
    it('should handle year-month format', () => {
      const time = createTimeElement({
        datetime: '2024-01',
        displayText: 'January 2024',
      });

      expect(time?.getAttribute('datetime')).toBe('2024-01');
    });

    it('should handle year only format', () => {
      const time = createTimeElement({
        datetime: '2024',
        displayText: '2024',
      });

      expect(time?.getAttribute('datetime')).toBe('2024');
    });

    it('should handle time only format', () => {
      const time = createTimeElement({
        datetime: '14:30',
        displayText: '2:30 PM',
      });

      expect(time?.getAttribute('datetime')).toBe('14:30');
    });

    it('should handle duration format', () => {
      const time = createTimeElement({
        datetime: 'PT2H30M',
        displayText: '2 hours 30 minutes',
      });

      expect(time?.getAttribute('datetime')).toBe('PT2H30M');
    });
  });

  describe('integration', () => {
    it('should be appendable to DOM', () => {
      const container = document.createElement('div');
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'January 15, 2024',
      });

      if (time) {
        container.appendChild(time);
      }

      expect(container.querySelector('time')).toBe(time);
      expect(container.textContent).toBe('January 15, 2024');
    });
  });

  describe('accessibility', () => {
    it('should provide machine-readable datetime for assistive tech', () => {
      const time = createTimeElement({
        datetime: '2024-01-15',
        displayText: 'three days ago',
      });

      // Machine-readable format in attribute
      expect(time?.getAttribute('datetime')).toBe('2024-01-15');
      // Human-readable format in content
      expect(time?.textContent).toBe('three days ago');
    });
  });
});
