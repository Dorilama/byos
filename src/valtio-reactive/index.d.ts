import { HKT, SignalFunctions } from "../index";
import { proxy } from "valtio/vanilla";
import { computed } from "valtio-reactive";

export interface SignalStore<T> {
  value: T;
  __s: true;
}

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof proxy<SignalStore<this["_T"]>>>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ReturnType<typeof computed<SignalStore<this["_T"]>>>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
