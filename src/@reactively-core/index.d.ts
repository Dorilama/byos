import { HKT, SignalFunctions } from "../index";
import { Reactive } from "@reactively/core";

export interface SignalHKT extends HKT {
  readonly signal: Reactive<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: Reactive<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
