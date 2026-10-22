import { type MoboxInstance, type MoboxOptions, type MoboxSceneData } from '@aifire/mobox-core';
export type UseMoboxOptions = MoboxOptions;
/**
 * Imperative MOBOX composable. Bind the returned `el` ref with `ref="el"`
 * (or `:ref="el"`) on any element; the engine normalizes the structure.
 */
export declare function useMobox(options?: UseMoboxOptions): {
    el: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    show: (data?: MoboxSceneData) => MoboxInstance | undefined;
    hide: () => MoboxInstance | undefined;
    toggle: () => MoboxInstance | undefined;
    readonly instance: MoboxInstance | null;
};
