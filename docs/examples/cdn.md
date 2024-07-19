# CDN Usage

We discourage the use of a CDN in a production application. A content delivery network has significant performance and reliability issues.

The example provided should be used to prototype rapidly as proof of concept.

#### HTML Base Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Page Meta Data -->
  </head>

  <body>
    <umd-utility-header size="1400px" padding="20"></umd-utility-header>
    <main>
      <!-- Insert components and theme class here -->
    </main>

    <script src="https://unpkg.com/@universityofmaryland/web-components-library"></script>
    <link
      href="https://unpkg.com/@universityofmaryland/theme/dist/compiled.css"
      rel="stylesheet"
    />
    <script>
      window.addEventListener('load', () => {
        const UmdComponents = window.Components;

        for (const key in UmdComponents) {
          UmdComponents[key].Load();
        }
      });
    </script>
  </body>
</html>
```
