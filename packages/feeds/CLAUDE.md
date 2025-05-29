# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Run development build with watch mode
- `npm run build` - Create production build

### Testing
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- Run single test file: `npm test -- path/to/test.test.ts`

### Release
- `npm run release` - Run tests, build, and publish package

## Architecture

This is the University of Maryland Feeds Library - a web component library for displaying dynamic content feeds (news, events, academic content).

### Key Architectural Patterns

1. **Component Factory Pattern**: All components return an `ElementModel` containing:
   ```typescript
   interface ElementModel {
     element: HTMLElement | DocumentFragment;
     styles: string;
   }
   ```

2. **Shadow DOM Components**: Components use Shadow DOM for style encapsulation. Styles are injected into shadow roots.

3. **Modular Feed Architecture**: Each feed type (news, events) follows this structure:
   - `common/fetch.ts` - API integration
   - `common/data.ts` - Data transformation
   - `common/display.ts` - Shared display utilities
   - `common/queries.ts` - API query configuration
   - Component files (grid.ts, list.ts, etc.) - Specific layouts

4. **Event System**: Custom event management in `utilities/events/` with typed event handlers.

5. **Peer Dependencies**: This package depends on other UMD libraries:
   - `@universityofmaryland/web-elements-library`
   - `@universityofmaryland/web-styles-library`

### Testing Approach

- Components are tested with mocked DOM and dependencies
- Mock files are located in `__mocks__/` directory
- Tests focus on component creation, event handling, and data transformation