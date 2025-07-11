#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * This script generates Jest mocks for the web-styles-library package
 * by loading the actual built package and creating a mock structure
 * that preserves the exports while converting functions to jest.fn()
 */

// Helper to check if value is a plain object
function isPlainObject(obj) {
  return obj !== null && 
         typeof obj === 'object' && 
         obj.constructor === Object &&
         !Array.isArray(obj);
}

// Helper to convert functions to jest mocks
function mockifyValue(value, path = '') {
  if (typeof value === 'function') {
    // Special handling for specific functions
    if (path.includes('convertJSSObjectToStyles')) {
      return `jest.fn(({ styleObj }) => {
        // Mock implementation of convertJSSObjectToStyles
        return Object.entries(styleObj || {}).map(([selector, styles]) => {
          if (typeof styles === 'object' && !Array.isArray(styles)) {
            const styleString = Object.entries(styles).map(([prop, value]) => 
              \`\${prop}: \${value};\`
            ).join(' ');
            return \`\${selector} { \${styleString} }\`;
          }
          return '';
        }).join('\\n');
      })`;
    }
    return 'jest.fn()';
  }
  
  if (isPlainObject(value)) {
    const entries = Object.entries(value).map(([key, val]) => {
      const mockedValue = mockifyValue(val, `${path}.${key}`);
      // Handle special characters in keys
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
      return `    ${safeKey}: ${mockedValue}`;
    });
    
    return `{\n${entries.join(',\n')}\n  }`;
  }
  
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  
  if (typeof value === 'string') {
    return `'${value.replace(/'/g, "\\'")}'`;
  }
  
  return JSON.stringify(value);
}

async function generateMock() {
  console.log('Generating mock for @universityofmaryland/web-styles-library...');
  
  try {
    // First ensure the styles package is built
    const stylesPackagePath = path.join(__dirname, '../packages/styles');
    const distPath = path.join(stylesPackagePath, 'dist/index.js');
    
    if (!fs.existsSync(distPath)) {
      console.error('Error: Styles package not built. Run "npm run build" in packages/styles first.');
      process.exit(1);
    }
    
    // Load the actual styles library
    const styles = require(distPath);
    
    // Create mock structure
    const mockContent = `// This file is auto-generated by scripts/generate-style-mocks.js
// Do not edit manually. Run 'npm run generate:mocks' to regenerate.

module.exports = ${mockifyValue(styles)};
`;
    
    // Write to mock file
    const mockPath = path.join(__dirname, '../__mocks__/webStylesLibrary.js');
    fs.writeFileSync(mockPath, mockContent);
    
    console.log('✅ Mock generated successfully at __mocks__/webStylesLibrary.js');
    
    // Also add Utility property if it doesn't exist (for backward compatibility)
    const mockData = require(mockPath);
    if (!mockData.Utility && mockData.utilities) {
      const updatedContent = mockContent.replace(
        'module.exports = {',
        `module.exports = {
  Utility: {
    theme: {
      convertJSSObjectToStyles: jest.fn(({ styleObj }) => {
        // Mock implementation
        return Object.entries(styleObj || {}).map(([selector, styles]) => {
          if (typeof styles === 'object' && !Array.isArray(styles)) {
            const styleString = Object.entries(styles).map(([prop, value]) => 
              \`\${prop}: \${value};\`
            ).join(' ');
            return \`\${selector} { \${styleString} }\`;
          }
          return '';
        }).join('\\n');
      })
    }
  },`
      );
      fs.writeFileSync(mockPath, updatedContent);
    }
    
  } catch (error) {
    console.error('Error generating mock:', error);
    process.exit(1);
  }
}

// Run the script
generateMock();