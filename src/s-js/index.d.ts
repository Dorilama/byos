import { HKT, SignalFunctions } from "../index";
import { DataSignal } from "s-js";

export type IsFunction = (val: unknown) => val is Function;

export interface SignalHKT extends HKT {
  readonly signal: DataSignal<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: DataSignal<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
