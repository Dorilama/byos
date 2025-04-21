import { HKT, SignalFunctions } from "../index";
import { Atom, Computed } from "signia";

export interface SignalHKT extends HKT {
  readonly signal: Atom<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: Computed<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
