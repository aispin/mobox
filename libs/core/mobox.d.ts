import type { MoboxEffectComponent } from './effects';
import type { MoboxCreateOptions, MoboxInstance, MoboxOptions, MoboxSceneData } from './types';
export declare class Mobox implements MoboxInstance {
    /**
     * Create a mobox from an existing element (`el`) or a template (`tpl`),
     * optionally showing it immediately with bound `data`.
     */
    static create(opts?: MoboxCreateOptions, data?: MoboxSceneData): MoboxInstance | null;
    /** Register a custom effect component (see MoboxEffectComponent). */
    static registerEffect(effect: MoboxEffectComponent): void;
    /** Names of all registered effects. */
    static effectNames(): string[];
    readonly el: HTMLElement;
    readonly effect: string;
    private readonly options;
    private readonly overlay;
    private readonly inner;
    private readonly teardown;
    private anims;
    private _isOpen;
    private _cycle;
    constructor(el: HTMLElement, options?: MoboxOptions);
    get isOpen(): boolean;
    show(data?: MoboxSceneData): MoboxInstance;
    hide(): MoboxInstance;
    toggle(): MoboxInstance;
    /** Activate the `.mobox-scene-<name>` scene and bind `data` onto it. */
    showScene(name: string, data?: MoboxSceneData): MoboxInstance;
    /** Release listeners/animations without removing the element. */
    dispose(): void;
    destroy(): void;
    private _play;
    private _onKeydown;
}
