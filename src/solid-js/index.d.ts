import { HKT, SignalFunctions } from "../index";
import { Signal, Accessor } from "solid-js";

export type IsFunction = (val: unknown) => val is Function;

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export interface ComputedHKT extends HKT {
  readonly signal: Accessor<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
