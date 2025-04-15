import { HKT, SignalFunctions } from "../index";
import { Ref } from "vue";

export interface SignalHKT extends HKT {
  readonly signal: Ref<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT>;

export const signalFunctions: SFN;
