import { HKT, SignalFunctions } from "../index";
import { ShallowRef, ComputedRef } from "@vue/reactivity";

export interface SignalHKT extends HKT {
  readonly signal: ShallowRef<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ComputedRef<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
