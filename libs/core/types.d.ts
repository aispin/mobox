export type MoboxSceneData = Record<string, unknown>;
export interface MoboxOptions {
    /** Effect name. Built-ins: fade zoom flip slide blur glitch liquid warp elastic sparkle. Default: 'zoom' */
    effect?: string;
    /** Close when the overlay is clicked. Default: true */
    closeOnOverlay?: boolean;
    /** Close on Escape key. Default: true */
    closeOnEsc?: boolean;
    /** Lock body scroll while open. Default: true */
    lockScroll?: boolean;
    /** Keep Tab focus inside the dialog while open. Default: true */
    trapFocus?: boolean;
    /** Remove the element from the DOM after the close animation. Default: false */
    autoDestroy?: boolean;
    /** Hide bound elements whose data value is null. Default: true */
    hideNullValues?: boolean;
    onOpen?: (inst: MoboxInstance) => void;
    onOpened?: (inst: MoboxInstance) => void;
    onClose?: (inst: MoboxInstance) => void;
    onClosed?: (inst: MoboxInstance) => void;
}
export interface MoboxCreateOptions extends MoboxOptions {
    /** Existing element or element id */
    el?: HTMLElement | string;
    /** HTML string, <script> template element or element id */
    tpl?: HTMLElement | string;
    /** Show immediately after creation. Default: true */
    autoShow?: boolean;
}
export interface MoboxInstance {
    readonly el: HTMLElement;
    readonly isOpen: boolean;
    readonly effect: string;
    show(data?: MoboxSceneData): MoboxInstance;
    hide(): MoboxInstance;
    toggle(): MoboxInstance;
    showScene(name: string, data?: MoboxSceneData): MoboxInstance;
    /** Release listeners/animations without removing the element (framework adapters) */
    dispose(): void;
    /** Release and remove the element from the DOM */
    destroy(): void;
}
