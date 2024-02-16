# University of Maryland Design System: _Theming, and Components_

| Package Name | Published? | Details                                                                                                                                                        |
| ------------ | :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Variables    |     ❌     | Base tokens, and styles for use in the University of Maryland Design System Component Library and Theme.                                                       |
| Theme        |     ✅     | A configuration of the tokens and other styles from UMD Design system for use with CSS frameworks that support JSS (CSS-in-JS)                                 |
| Components   |     ✅     | Web Components built for the University of Maryland Design system on the [Web Components API](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) |
| Kitchen Sink |     ❌     | Kitchen Sink testing site for internal review and validation                                                                                                   |

## Requirements

Project requires yarn, and webpack to compile themes, components, and the "Kitchen Sink" testing site.

- [yarn documentation](https://classic.yarnpkg.com/en/docs)
- [webpack documentation](https://webpack.js.org/concepts/)

Project required Typescript to compile packages for distribution, including the base variables for ingestion into the theme and components.

- [Typescript documentation](https://www.typescriptlang.org/)

**Local Env:**

_The Kitchen Sink testing site requires a local server environment to view/preview components and theming._

- [nginx](https://nginx.org/en/docs/) _(Preferred)_
- [PHP 7.4 _(or greater)_](https://www.php.net/manual/en/features.commandline.webserver.php) _(Run `php -S 127.0.0.1:8080 -t ./packages/kitchen-sink/build` from the project root)_

## Installation

1. Clone and enter the project.

```bash
cd [desired_local_directory]
git clone git@github.com:UMD-Digital/design-system.git
cd design-system
```

2. Install required node modules

```bash
yarn install --frozen-lock
```

3. Run Scaffolding to initially build project

_Packages are built in order of dependancy_

```bash
yarn scaffold
```

## Development

### Start

Transpile packages using webpack and typescript, and watch for changes

```bash
yarn start
```

_Individually build and watch for changes to packages as follows:_

```bash
yarn variables   # Build and watch for changes on the variables
yarn theme       # Build and watch for changes on the theme and kitchen sink
yarn components  # Build and watch for changes on components
yarn kitchen     # build and watch for changes on the kitchen sink
```

### Build

Build a specific package, and stop.

```bash
yarn variables:build
yarn theme:build
yarn components:build
yarn kitchen:build
```

### Clean

Remove all `dist` or `build` directories

```bash
yarn clean
```

### Reset

Remove all `dist` or `build` folders, as well as delete all `node_module` directories

```bash
yarn reset
```

## Deployment

### Kitchen Sink

Deploy the kitchen sink to the staging server at [kitchen-sink.umd-staging.com](https://kitchen-sink.umd-staging.com). You must have granted access to the staging server to deploy there. _**CAUTION:** Running this script will delete and replace all Kitchen sink content on staging with your deployment_

```bash
./packages/kitchen-sink/deployStaging.sh
```

### Components and theme

The components and theme packages are published to the team's [npm organization](https://www.npmjs.com/). _**Note:** You must have access to the team's npm registry to publish these packages._
