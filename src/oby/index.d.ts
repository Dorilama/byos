import { HKT, SignalFunctions } from "../index";
import $ from "oby";

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof $<this["_T"]>>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ReturnType<typeof $.memo<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
