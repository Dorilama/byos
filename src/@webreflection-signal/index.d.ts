import { HKT, SignalFunctions } from "../index";
import { Signal, Computed } from "@webreflection/signal";

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: Computed<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
