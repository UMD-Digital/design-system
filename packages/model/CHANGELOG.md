# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - v1.1.0

### Added

- **Testing Module** (`./testing` export): Test fixture helpers, shadow DOM query utilities, event simulation helpers, slot test utilities
- **Utilities Enhancements**: `debug.ts` (`isDev`, `createLogger`), `events.ts` (`createCustomEvent`, `dispatchCustomEvent`, `defineEvents`, `createEventListener`, `delegate`)
- **Slots Enhancements**: `slot-validation.ts` (`SlotConfig`), `slot-query.ts` (query helpers), `slot-events.ts` (`createSlotchangeHandler`, `SlotCache`, `SlotchangeController`)
- **Attributes Enhancements**: `converters.ts` (`AttributeConverter`), `config.ts` (`AttributeConfig`), `change-detection.ts` (`ChangeDetectors`), `errors.ts` (`AttributeTypeError`, `AttributeValidationError`)
- **Model Enhancements**: `base-component.ts` (`firstConnected`, `willFirstUpdate`), `update-cycle.ts` (`requestUpdate`, `updateComplete`), `controllers.ts` (`ReactiveController`), `registration.ts` (`registerComponent`)

## [1.0.3] - 2026-01-13

### Added

- Loading priority attribute (`data-loading-priority`) with eager/lazy values
- Statement display type check with deprecation support

### Changed

- Social slot expansion: added bluesky and substack slot factories and mappings

## [1.0.2] - 2026-01-09

### Changed

- Migrated to named exports only pattern
- Removed CommonJS output; ES modules only
- Added default fallback in package.json exports

### Fixed

- PostCSS type error resolution
- Peer dependency structure updates

## [1.0.1] - 2025-12-18

### Added

- `webComponent()` registration helper
- Centralized `_types.ts` with shared type definitions

### Deprecated

- Footer `data-type` and `type` attributes in favor of `data-display`

## [1.0.0] - 2024-12-06

### Added

- Initial release of `@universityofmaryland/web-model-library`
- Extracted model utilities from `@universityofmaryland/web-components-library`
- Core model system with `createCustomElement` factory
- Comprehensive attribute handling system
- Slot management and validation utilities
- Component registration helpers
- Lifecycle hooks for component initialization
- Full TypeScript support with type definitions
- Complete test coverage
- Comprehensive documentation

### Changed

- N/A (initial release)

### Deprecated

- N/A (initial release)

### Removed

- N/A (initial release)

### Fixed

- N/A (initial release)

### Security

- N/A (initial release)
