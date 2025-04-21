import { HKT, SignalFunctions } from "../index";
import { atom, computed } from "compostate";

export type IsFunction = (val: unknown) => val is Function;

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof atom<this["_T"]>>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ReturnType<typeof computed<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
