# Changelog

## 0.8.0 (2026-11-01)

### ⚠ BREAKING CHANGES

* the package is renamed from @armscye/hooks to
  @armscye/hook. It is ESM-only with an exports map and requires Node.js
  22.12 or later. CommonJS consumers need the resolution-mode import
  attribute or "module": "nodenext". StartupHook and ShutdownHook methods
  now return unknown instead of any, HookProvider is now
  string | symbol | object, and @armscye/core is no longer a dependency.

### Features

* publish as a standalone ESM package ([e86a555](https://github.com/armscye/hook/commit/e86a555b63420116879ef4c8ad8c283928251cf8))
