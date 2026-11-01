/**
 * A value the host, the application or framework that runs the hooks, turns
 * into a {@link StartupHook} or {@link ShutdownHook}: a provider token, an
 * instance, a class, or a function that returns a hook.
 *
 * How each form is resolved is up to the host.
 *
 * @example
 * ```ts
 * import type { HookProvider, StartupHook } from '@armscye/hook';
 *
 * class ConnectDatabase implements StartupHook {
 *   onStartup(): void {}
 * }
 *
 * const hooks: HookProvider[] = [
 *   'database',
 *   Symbol('CACHE'),
 *   new ConnectDatabase(),
 *   ConnectDatabase,
 *   () => new ConnectDatabase(),
 * ];
 * ```
 */
export type HookProvider = string | symbol | object;

/**
 * A hook that runs while the application starts.
 *
 * @example
 * ```ts
 * import type { StartupHook } from '@armscye/hook';
 *
 * declare const database: { connect(): Promise<void> };
 *
 * class ConnectDatabase implements StartupHook {
 *   async onStartup(): Promise<void> {
 *     await database.connect();
 *   }
 * }
 * ```
 */
export interface StartupHook {
  /**
   * Called while the application starts, typically before it begins accepting
   * work.
   *
   * Hooks may run in parallel; do not depend on another hook having finished.
   *
   * @returns Ignored, but a host may wait for a returned promise.
   */
  onStartup(): unknown;
}

/**
 * A hook that runs while the application shuts down.
 *
 * @example
 * ```ts
 * import type { ShutdownHook } from '@armscye/hook';
 *
 * declare const database: { close(): Promise<void> };
 *
 * class CloseDatabase implements ShutdownHook {
 *   async onShutdown(signal?: string): Promise<void> {
 *     console.log(`Shutting down (${signal ?? 'no signal'})`);
 *     await database.close();
 *   }
 * }
 * ```
 */
export interface ShutdownHook {
  /**
   * Called when the application is shutting down.
   *
   * Hooks may run in parallel; do not depend on another hook having finished.
   *
   * @param signal - The system signal that triggered the shutdown, such as
   * `SIGTERM`, if there was one.
   * @returns Ignored, but a host may wait for a returned promise.
   */
  onShutdown(signal?: string): unknown;
}
