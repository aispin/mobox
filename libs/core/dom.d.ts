export declare function qs<T extends HTMLElement = HTMLElement>(selector: string, root?: ParentNode): T | null;
type EventMap = HTMLElementEventMap & DocumentEventMap;
type EventTargetLike = HTMLElement | Document;
export declare function on<K extends keyof EventMap>(el: EventTargetLike, type: K, fn: (ev: EventMap[K]) => void): () => void;
export declare function prefersReducedMotion(): boolean;
export declare function focusables(root: HTMLElement): HTMLElement[];
export {};
