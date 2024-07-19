# Loading components via Javascript to compose web components

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
