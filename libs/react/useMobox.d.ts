import { type MoboxInstance, type MoboxOptions, type MoboxSceneData } from '@aifire/mobox-core';
export type UseMoboxOptions = MoboxOptions;
/**
 * Imperative MOBOX hook. Attach the returned `ref` to any element;
 * the engine normalizes it into the .mobox structure.
 */
export declare function useMobox(options?: UseMoboxOptions): {
    ref: (el: HTMLElement | null) => void;
    show: (data?: MoboxSceneData) => MoboxInstance | undefined;
    hide: () => MoboxInstance | undefined;
    toggle: () => MoboxInstance | undefined;
    readonly instance: MoboxInstance | null;
};
