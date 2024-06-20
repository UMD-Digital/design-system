# University of Maryland Design System: Web Components & Theme

## Getting Started

### Requirements

- Package manager for JavaScript (like Yarn or NPM)

### Installation

https://www.npmjs.com/package/@universityofmaryland/web-components-library
https://www.npmjs.com/package/@universityofmaryland/theme

### Importing Web Components

There are 3 ways to import web components into your project:

1. Import all web components
2. Import individual web components (Tree shaking)
3. Import parts that compose web components

#### Import all web components

Place the following in the entry point of your project

```
import LoadUmdComponents from '@universityofmaryland/web-components-library';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
});
```

#### Import individual web components

```
import { Components }

const { CallToAction } = Components;

CallToAction.Load();
```

#### Import parts to compose web components

This method allows a developer to use parts that compose web components to implement them, instead of the "ready to use" solutions for the other methods of importing web components into your project.

There are 2 parts that can be imported, the function to create the element, and the styles.

```
import { Elements }

const { CallToAction } = Elements;
const styles = CallToAction.Styles;

CallToAction.CreateElement({});

```
