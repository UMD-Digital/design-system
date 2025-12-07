#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * This script generates Jest mocks for UMD Design System packages
 * by loading the actual built packages and creating mock structures
 * that preserve the exports while converting functions to jest.fn()
 *
 * Run this script after building packages: npm run generate:mocks
 */

// Package configuration for mock generation
const PACKAGES_TO_MOCK = [
  {
    name: 'tokens',
    npmName: '@universityofmaryland/web-token-library',
    mockFileName: 'webTokenLibrary.js',
    distPath: 'packages/tokens/dist/index.js',
    description: 'Design tokens (colors, spacing, fonts, media queries)',
  },
  {
    name: 'styles',
    npmName: '@universityofmaryland/web-styles-library',
    mockFileName: 'webStylesLibrary.js',
    distPath: 'packages/styles/dist/index.js',
    description: 'JSS style objects and design tokens',
    specialHandlers: {
      'convertJSSObjectToStyles': true,
    },
  },
  {
    name: 'utilities',
    npmName: '@universityofmaryland/web-utilities-library',
    mockFileName: 'webUtilitiesLibrary.js',
    distPath: 'packages/utilities/dist/index.js',
    description: 'Shared utility functions for DOM, styles, and validation',
  },
  {
    name: 'builder',
    npmName: '@universityofmaryland/web-builder-library',
    mockFileName: 'webBuilderLibrary.js',
    distPath: 'packages/builder/dist/index.js',
    description: 'Element builder utilities with fluent API',
    specialHandlers: {
      'ElementBuilder': 'class',
      'StyleManager': 'class',
      'LifecycleManager': 'class',
    },
  },
  {
    name: 'model',
    npmName: '@universityofmaryland/web-model-library',
    mockFileName: 'webModelLibrary.js',
    distPath: 'packages/model/dist/index.js',
    description: 'Web component model utilities',
  },
  {
    name: 'elements',
    npmName: '@universityofmaryland/web-elements-library',
    mockFileName: 'webElementsLibrary.js',
    distPath: 'packages/elements/dist/index.js',
    description: 'Foundational UI element builders',
  },
  {
    name: 'feeds',
    npmName: '@universityofmaryland/web-feeds-library',
    mockFileName: 'webFeedsLibrary.js',
    distPath: 'packages/feeds/dist/index.js',
    description: 'Dynamic content feed components',
  },
  {
    name: 'components',
    npmName: '@universityofmaryland/web-components-library',
    mockFileName: 'webComponentsLibrary.js',
    distPath: 'packages/components/dist/index.js',
    description: 'Web Components (Custom Elements)',
  },
];

// Helper to check if value is a plain object
function isPlainObject(obj) {
  return obj !== null &&
         typeof obj === 'object' &&
         obj.constructor === Object &&
         !Array.isArray(obj);
}

// Helper to check if a value is a class
function isClass(value) {
  return typeof value === 'function' && /^class\s/.test(value.toString());
}

// Helper to convert functions to jest mocks
function mockifyValue(value, path = '', specialHandlers = {}) {
  // Check if this path has a special handler
  const handlerKey = path.split('.').pop();

  if (typeof value === 'function') {
    // Check if this is a class or has a special handler
    if (specialHandlers[handlerKey] === 'class' || isClass(value)) {
      return `jest.fn().mockImplementation(function(...args) {
        return { __mockClass: '${handlerKey}', args };
      })`;
    }

    // Special handling for convertJSSObjectToStyles
    if (handlerKey === 'convertJSSObjectToStyles' || specialHandlers[handlerKey]) {
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
      const mockedValue = mockifyValue(val, `${path}.${key}`, specialHandlers);
      // Handle special characters in keys - use JSON.stringify for complex keys
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      return `    ${safeKey}: ${mockedValue}`;
    });

    return `{\n${entries.join(',\n')}\n  }`;
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  if (typeof value === 'string') {
    // For property keys that contain quotes (like CSS selectors), use double quotes
    if (value.includes("'") || value.includes('"')) {
      return JSON.stringify(value);
    }
    return `'${value.replace(/'/g, "\\'")}'`;
  }

  return JSON.stringify(value);
}

async function generateMock(packageConfig) {
  const { name, npmName, mockFileName, distPath, description, specialHandlers = {} } = packageConfig;

  console.log(`\nGenerating mock for ${npmName}...`);

  try {
    const fullDistPath = path.join(__dirname, '..', distPath);
    const mockPath = path.join(__dirname, '..', '__mocks__', mockFileName);

    if (!fs.existsSync(fullDistPath)) {
      console.warn(`⚠️  Skipping ${name}: Package not built (${distPath})`);
      console.warn(`   Run: cd packages/${name} && npm run build`);
      return { skipped: true, reason: 'not built' };
    }

    // Clear require cache to ensure fresh load
    delete require.cache[require.resolve(fullDistPath)];

    // Load the actual package
    // Some packages use browser APIs (window, HTMLElement) and will fail in Node
    let packageExports;
    try {
      packageExports = require(fullDistPath);
    } catch (requireError) {
      // Check if existing manual mock exists
      if (fs.existsSync(mockPath)) {
        console.warn(`⚠️  Skipping ${name}: Requires browser APIs (using existing manual mock)`);
        console.warn(`   Error: ${requireError.message}`);
        return { skipped: true, reason: 'browser-apis', hasManualMock: true };
      }
      throw requireError;
    }

    // Create mock structure
    const mockContent = `// This file is auto-generated by source/generate-mocks.js
// Do not edit manually. Run 'npm run generate:mocks' to regenerate.
//
// Mock for: ${npmName}
// Description: ${description}

module.exports = ${mockifyValue(packageExports, '', specialHandlers)};
`;

    // Write to mock file
    fs.writeFileSync(mockPath, mockContent);

    console.log(`✅ Mock generated successfully at __mocks__/${mockFileName}`);
    return { success: true };

  } catch (error) {
    console.error(`❌ Error generating mock for ${name}:`, error.message);
    return { error: error.message };
  }
}

async function generateAllMocks() {
  console.log('='.repeat(60));
  console.log('UMD Design System - Mock Generation');
  console.log('='.repeat(60));

  const results = {
    success: [],
    skipped: [],
    failed: [],
  };

  for (const packageConfig of PACKAGES_TO_MOCK) {
    const result = await generateMock(packageConfig);

    if (result.success) {
      results.success.push(packageConfig.name);
    } else if (result.skipped) {
      results.skipped.push({
        name: packageConfig.name,
        reason: result.reason,
        hasManualMock: result.hasManualMock || false
      });
    } else if (result.error) {
      results.failed.push({ name: packageConfig.name, error: result.error });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`✅ Successfully generated: ${results.success.length} mocks`);
  if (results.success.length > 0) {
    results.success.forEach(name => console.log(`   - ${name}`));
  }

  if (results.skipped.length > 0) {
    const withManualMocks = results.skipped.filter(s => s.hasManualMock);
    const withoutMocks = results.skipped.filter(s => !s.hasManualMock);

    if (withManualMocks.length > 0) {
      console.log(`ℹ️  Using manual mocks: ${withManualMocks.length} packages`);
      withManualMocks.forEach(({ name, reason }) =>
        console.log(`   - ${name} (${reason === 'browser-apis' ? 'requires browser APIs' : reason})`)
      );
    }

    if (withoutMocks.length > 0) {
      console.log(`⚠️  Skipped (no mock): ${withoutMocks.length} packages`);
      withoutMocks.forEach(({ name, reason }) => console.log(`   - ${name} (${reason})`));
    }
  }

  if (results.failed.length > 0) {
    console.log(`❌ Failed: ${results.failed.length} packages`);
    results.failed.forEach(({ name, error }) => console.log(`   - ${name}: ${error}`));
    process.exit(1);
  }

  console.log('\n✨ Mock generation complete!');
  console.log('   Next steps:');
  console.log('   - Review generated mocks in __mocks__/');
  console.log('   - Run tests: npm test');
  console.log('   - See MOCKS.md for documentation\n');
}

// Run the script
generateAllMocks();
