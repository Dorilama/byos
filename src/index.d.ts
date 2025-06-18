// HKT from https://github.com/mikearnaldi/hkt-new
export interface HKT {
  readonly _T?: unknown;
  readonly signal?: unknown;
}

export type Kind<F extends HKT, T> = F extends {
  readonly signal: unknown;
}
  ? (F & {
      readonly _T: T;
    })["signal"]
  : {
      readonly _F: F;
      readonly _T: () => T;
    };

/**
 * Value or signal or computed
 */
export type MaybeSignal<SignalHKT extends HKT, ComputedHKT extends HKT, T> =
  | T
  | Kind<SignalHKT, T>
  | Kind<ComputedHKT, T>;

export interface SignalFunctions<
  SignalHKT extends HKT,
  ComputedHKT extends HKT
> {
  /**
   * Creates a writable signal.
   * It should default to a shallow signal **if supported** by the library.
   *
   * @param initialValue the initial value of the signal
   * @param options
   * @property name - used to aid debugging in some libraries
   * @property deep - create a deeply reactive signal **if supported** by the library
   */
  readonly signal: <T>(
    initialValue: T,
    options?: { name?: string; deep?: boolean }
  ) => Kind<SignalHKT, T>;

  /**
   * Creates a read-only signal computed by a function.
   *
   * @param fn the function that computes the signal value. runs every time dependencies change
   * @param deps explicit array of dependencies. needed by libraries without automatic tracking
   * @param options
   * @property name - used to aid debugging in some libraries
   */
  readonly computed: <T>(
    fn: () => T,
    deps: MaybeSignal<SignalHKT, ComputedHKT, any>[],
    options?: { name?: string }
  ) => Kind<ComputedHKT, T>;

  /**
   * Stops computed signal computation.
   *
   * @param signal the computed signal to stop
   */
  readonly computedCleanup: <T>(signal: Kind<ComputedHKT, T>) => void;

  /**
   * Create a function that will peek the value of a signal without tracking it in an effect
   * and a function that will cleanup any potential effect
   *
   * @param maybeSignal the signal or computed signal that will be used to peek its value
   */
  readonly usePeek: <T>(
    maybeSignal: MaybeSignal<SignalHKT, ComputedHKT, T>
  ) => [peek: () => T, stop: () => void];

  /**
   * Normalizes values, signals and computed to values.
   *
   * @param maybeSignal value, signal or computed
   */
  readonly toValue: <T>(
    maybeSignal: MaybeSignal<SignalHKT, ComputedHKT, T>
  ) => T;

  /**
   * Sets the value of the signal. The whole signal is updated, no partial deep updates.
   *
   * @param signal the signal to update
   * @param value the new value to assign
   */
  readonly setValue: <T>(signal: Kind<SignalHKT, T>, value: T) => void;

  /**
   * Runs a function and re-runs it when the dependencies change.
   *
   * @param fn the function to run
   * @param deps explicit array of dependencies. needed by libraries without automatic tracking
   * @param options
   * @property name - used to aid debugging in some libraries
   */
  readonly effect: (
    fn: () => void | (() => void),
    deps: MaybeSignal<SignalHKT, ComputedHKT, any>[],
    options?: { name?: string }
  ) => () => void;
}

export type SignalFunctionsPartial<
  SignalHKT extends HKT,
  ComputedHKT extends HKT
> = Omit<
  SignalFunctions<SignalHKT, ComputedHKT>,
  "computedCleanup" | "usePeek"
> &
  Partial<
    Pick<SignalFunctions<SignalHKT, ComputedHKT>, "computedCleanup" | "usePeek">
  >;

export declare function createUsePeek<
  SignalHKT extends HKT,
  ComputedHKT extends HKT
>(
  fns: SignalFunctionsPartial<SignalHKT, ComputedHKT>
): SignalFunctions<SignalHKT, ComputedHKT>["usePeek"];

export declare function createSignalFunctions<
  SignalHKT extends HKT,
  ComputedHKT extends HKT
>(
  fns: SignalFunctionsPartial<SignalHKT, ComputedHKT>
): SignalFunctions<SignalHKT, ComputedHKT>;

export declare function noop(): void;
