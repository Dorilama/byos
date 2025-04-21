import { HKT, MaybeSignal, SignalFunctions } from "../index";
import { computed, observable } from "mobx";

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof observable.box<this["_T"]>>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ReturnType<typeof computed<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;

export type IsObservable<T> = (
  t: MaybeSignal<SignalHKT, ComputedHKT, T>
) => typeof t extends SignalHKT
  ? true
  : typeof t extends ComputedHKT
  ? true
  : false;
