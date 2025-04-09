import { HKT, SignalFunctions } from "../index";
import { signal } from "alien-signals";

type IsFunction = (val: unknown) => val is Function;

interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof signal<this["_T"]>>;
}

type SFN = SignalFunctions<SignalHKT>;

export const signalFunctions: SFN;
