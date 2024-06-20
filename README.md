# University of Maryland Design System

**Includes Web Components & Theme Classes**

The University of Maryland's Design System is intended for use by university campus entities and partners. The packages of Web Components and Theme prompt consistency in brand, design, and accessibility compliance. The web components package contains common UI elements for interfaces, interactivity, layout, and data feeds. The theme package has consistent classes for typography, layout, and common UI elements like rich text.

### For documentation, visit the offical [UMD Design Site Website](https://designsystem.umd.edu)

## Getting Started

### Requirements

- Package manager for JavaScript (like Yarn or NPM)

### Installation

#### Web Components Library

NPM - https://www.npmjs.com/package/@universityofmaryland/web-components-library
UNPKG - https://unpkg.com/@universityofmaryland/web-components-library
(Note: You can also specify a version with UNPKG like the following example having 1.0.0: https://unpkg.com/@universityofmaryland/web-components-library@1.0.0/dist/index.js)

#### Theme Package (Optional, but highly recommended)

NPM - https://www.npmjs.com/package/@universityofmaryland/theme

### Importing Web Components

There are 3 ways to import web components into your project:

1. Import all web components
2. Import individual web components (Tree shaking)
3. Import parts that compose web components

#### Import all web components

Place the following in the entry point of your project

```js
import LoadUmdComponents from '@universityofmaryland/web-components-library';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
});
```

#### Import individual web components

```js
import { Components }

const { CallToAction } = Components;

CallToAction.Load();
```

#### Import parts to compose web components

This method allows a developer to use parts that compose web components to implement them, instead of the "ready to use" solutions for the other methods of importing web components into your project.

There are 2 parts that can be imported, the function to create the element, and the styles.

The function signature for `CreateElement` of a Call To Action is like so (Typescript):

```js
CreateElement({
cta,
type = TYPE_PRIMARY,
size = null,
theme = null,
styleProps = null,
}: {
cta?: HTMLElement | null;
type?: string;
size?: string | null;
theme?: string | null;
styleProps?: string | null;
})
```

Below is an example of creating a Call To Action. We did not pass any parameters in this example, as they all optional. But you are welcome to customize the component via the parameters of you so choose.

```js
import { Elements } from '@universityofmaryland/web-components-library';

const { CallToAction } = Elements;
const styles = CallToAction.Styles;

CallToAction.CreateElement({});
```
