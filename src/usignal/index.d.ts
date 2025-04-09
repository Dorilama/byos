import { HKT, SignalFunctions } from "../index";
import { signal } from "usignal";

interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof signal<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT>;

export const signalFunctions: SFN;
