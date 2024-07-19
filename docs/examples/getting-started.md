# Getting Started

## Recommondations

- Package manager for JavaScript (like Yarn or NPM)

### Web Components Library: Installation

NPM - [@universityofmaryland/web-components-library](https://www.npmjs.com/package/@universityofmaryland/web-components-library)

### Theme Package: Installation

The theme objects are optional, but highly recommended. The theme is a JSS object model that can be applied to modern frameworks like [Tailwindcss](https://tailwindcss.com/)

NPM - [https://www.npmjs.com/package/@universityofmaryland/theme](@universityofmaryland/theme)

[Configuration options with Tailwind](/docs/examples/tailwind.md)

### Loading Web Components for HTML

There are 2 ways to load the web components into your project:

1. Import all web components
2. Import individual web components (Tree shaking)

#### Loading all web components

Place the following in the entry point of your project

```js
import LoadUmdComponents from '@universityofmaryland/web-components-library';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
});
```

#### Loading individual web components

```js
import { Components }

const { CallToAction } = Components;

CallToAction.Load();
```

#### Advanced loading is avilable for the [Web Components with Javascript](/docs/examples/components-javascript.md)
