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

export type MaybeSignal<SignalHKT extends HKT, T> = T | Kind<SignalHKT, T>;

export interface SignalFunctions<SignalHKT extends HKT = HKT> {
  readonly signal: <T>(t: T, ...args: any) => Kind<SignalHKT, T>;
  readonly computed: <T>(
    fn: (...args: any) => T,
    deps?: Kind<SignalHKT, any>[],
    ...args: any
  ) => Kind<SignalHKT, T>;
  readonly toValue: <T>(t: MaybeSignal<SignalHKT, T>, ...args: any) => T;
  readonly setValue: <T>(s: Kind<SignalHKT, T>, t: T, ...args: any) => void;
  readonly effect: (
    fn: (onCleanup?: (cb: () => void) => void) => void | (() => void),
    deps?: Kind<SignalHKT, any>[],
    ...args: any
  ) => () => void;
}
