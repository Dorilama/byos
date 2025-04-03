import { HKT, SignalFunctions } from "../index";
import { signal } from "alien-signals";

interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof signal<this["_T"]>>;
}

type SFN = SignalFunctions<SignalHKT>;

type IsFunction = (val: unknown) => val is Function;
