import { HKT, SignalFunctions } from "../index";
import { signal, computed } from "@angular/core";

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof signal<this["_T"]>>;
}

export interface ComputedHKT extends HKT {
  readonly signal: ReturnType<typeof computed<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT, ComputedHKT>;

export const signalFunctions: SFN;
