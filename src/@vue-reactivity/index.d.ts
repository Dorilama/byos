import { HKT, SignalFunctions } from "../index";
import { ref } from "@vue/reactivity";

export interface SignalHKT extends HKT {
  readonly signal: ReturnType<typeof ref<this["_T"]>>;
}

export type SFN = SignalFunctions<SignalHKT>;

export const signalFunctions: SFN;
