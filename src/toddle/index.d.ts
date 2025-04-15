import { HKT, SignalFunctions } from "../index";
import { Signal } from "./signal";

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, SignalHKT>;

export const signalFunctions: SFN;
