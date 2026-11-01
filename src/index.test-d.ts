import { describe, expectTypeOf, test } from 'vitest';
import type { HookProvider, ShutdownHook, StartupHook } from './index.js';

declare class Hook implements StartupHook, ShutdownHook {
  onStartup(): void;
  onShutdown(signal?: string): Promise<void>;
}

describe('HookProvider', () => {
  test('accepts tokens', () => {
    expectTypeOf<string>().toExtend<HookProvider>();
    expectTypeOf<symbol>().toExtend<HookProvider>();
  });

  test('accepts instances, classes and functions', () => {
    expectTypeOf<Hook>().toExtend<HookProvider>();
    expectTypeOf<typeof Hook>().toExtend<HookProvider>();
    expectTypeOf<() => Hook>().toExtend<HookProvider>();
  });

  test('rejects other values', () => {
    expectTypeOf<number>().not.toExtend<HookProvider>();
    expectTypeOf<boolean>().not.toExtend<HookProvider>();
    expectTypeOf<null>().not.toExtend<HookProvider>();
    expectTypeOf<undefined>().not.toExtend<HookProvider>();
  });
});

describe('StartupHook', () => {
  test('onStartup takes no arguments and returns anything', () => {
    expectTypeOf<StartupHook['onStartup']>().parameters.toEqualTypeOf<[]>();
    expectTypeOf<StartupHook['onStartup']>().returns.toBeUnknown();
  });

  test('accepts synchronous and asynchronous implementations', () => {
    expectTypeOf<Hook>().toExtend<StartupHook>();
    expectTypeOf<{ onStartup(): Promise<void> }>().toExtend<StartupHook>();
    expectTypeOf<{ onStartup(): number }>().toExtend<StartupHook>();
  });

  test('rejects objects without onStartup', () => {
    expectTypeOf<object>().not.toExtend<StartupHook>();
    expectTypeOf<ShutdownHook>().not.toExtend<StartupHook>();
  });
});

describe('ShutdownHook', () => {
  test('onShutdown takes an optional signal and returns anything', () => {
    expectTypeOf<Parameters<ShutdownHook['onShutdown']>>().toEqualTypeOf<
      [signal?: string | undefined]
    >();
    expectTypeOf<ShutdownHook['onShutdown']>().returns.toBeUnknown();
  });

  test('accepts implementations that ignore the signal', () => {
    expectTypeOf<Hook>().toExtend<ShutdownHook>();
    expectTypeOf<{ onShutdown(): void }>().toExtend<ShutdownHook>();
    expectTypeOf<{ onShutdown(): number }>().toExtend<ShutdownHook>();
  });

  test('rejects objects without onShutdown', () => {
    expectTypeOf<object>().not.toExtend<ShutdownHook>();
    expectTypeOf<StartupHook>().not.toExtend<ShutdownHook>();
  });
});
