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

export type MaybeSignal<SignalHKT extends HKT, ComputedHKT extends HKT, T> =
  | T
  | Kind<SignalHKT, T>
  | Kind<ComputedHKT, T>;

export interface SignalFunctions<
  SignalHKT extends HKT,
  ComputedHKT extends HKT
> {
  readonly signal: <T>(t: T) => Kind<SignalHKT, T>;
  readonly computed: <T>(
    fn: () => T,
    deps: MaybeSignal<SignalHKT, ComputedHKT, any>[]
  ) => Kind<ComputedHKT, T>;
  readonly toValue: <T>(t: MaybeSignal<SignalHKT, ComputedHKT, T>) => T;
  readonly setValue: <T>(s: Kind<SignalHKT, T>, t: T) => void;
  readonly effect: (
    fn: () => void | (() => void),
    deps: MaybeSignal<SignalHKT, ComputedHKT, any>[]
  ) => () => void;
}
