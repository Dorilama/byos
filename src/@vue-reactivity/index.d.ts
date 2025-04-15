import { HKT, SignalFunctions } from "../index";
import { Ref, ComputedRef } from "@vue/reactivity";

export interface SignalHKT extends HKT {
  readonly signal: Ref<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ComputedRef<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
