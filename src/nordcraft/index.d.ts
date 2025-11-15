import { HKT, SignalFunctions, Kind } from "../index";
import { Signal } from "@nordcraft/runtime/dist/signal/signal";

export interface SignalHKT extends HKT {
  readonly signal: Signal<this["_T"]>;
}

export type SFN = SignalFunctions<SignalHKT, SignalHKT>;

export const signalFunctions: SFN;

export declare function nordcraftSignalFunctions(
  signal: <T>(value: T) => Kind<SignalHKT, T>
): SFN;
