/**
 * Test to understand current priority/cascade behavior
 */

import { ElementBuilder } from '../core/ElementBuilder';

describe('Priority and CSS Cascade Analysis', () => {
  test('should show current behavior with conflicting properties', () => {
    const element = document.createElement('div');

    const model = new ElementBuilder(element)
      .withClassName('test')
      .styled({  // Priority 2 (currently applied LAST in merge)
        className: 'test',
        color: 'black',
        fontSize: '14px',
        '@media (min-width: 768px)': {
          fontSize: '16px',
        },
      })
      .withStyles({  // Priority 1 (currently applied FIRST in merge)
        element: {
          color: 'green',
          '@media (min-width: 768px)': {
            fontSize: '14px',
          },
        },
      })
      .build();

    console.log('=== CURRENT CSS OUTPUT ===');
    console.log(model.styles);
    console.log('=== END OUTPUT ===');

    // Just log for analysis
    expect(model.styles).toBeTruthy();
  });

  test('should show what user expects', () => {
    // User expects CSS output like this (with duplicates preserved):
    const expectedCSS = `
.test {
  color: black;
  color: green; /* higher priority - comes last */
  font-size: 14px;
}

@media (min-width: 768px) {
  .test {
    font-size: 16px;
    font-size: 14px; /* higher priority - comes last */
  }
}`;

    console.log('=== EXPECTED CSS (User\'s requirement) ===');
    console.log(expectedCSS);
    console.log('=== END EXPECTED ===');

    expect(expectedCSS).toBeTruthy();
  });
});
