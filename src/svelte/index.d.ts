import { HKT, SignalFunctions } from "../index";

export type IsFunction = (val: unknown) => val is Function;

declare class Signal<T> {
  constructor(t: T);
  get value(): T;
  set value(t: T);
  __s: true;
}

declare class Computed<T> {
  constructor(fn: () => T);
  get value(): () => T;
  __s: true;
}

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: Computed<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
