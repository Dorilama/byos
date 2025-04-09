import { HKT, SignalFunctions } from "../index";
import { signal } from "alien-signals";

export type IsFunction = (val: unknown) => val is Function;

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof signal<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT>;

export const signalFunctions: SFN;
