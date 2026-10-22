export interface MoboxVueProps {
    open?: boolean;
    effect?: string;
    closeOnOverlay?: boolean;
    closeOnEsc?: boolean;
    lockScroll?: boolean;
    trapFocus?: boolean;
    autoDestroy?: boolean;
    hideNullValues?: boolean;
}
/**
 * Vue 3 adapter for MOBOX. Render-function component (no SFC compiler needed).
 *
 * <Mobox v-model:open="visible" effect="liquid">...</Mobox>
 */
export declare const Mobox: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    open: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        type: StringConstructor;
        default: string;
    };
    closeOnOverlay: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeOnEsc: {
        type: BooleanConstructor;
        default: undefined;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: undefined;
    };
    trapFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoDestroy: {
        type: BooleanConstructor;
        default: undefined;
    };
    hideNullValues: {
        type: BooleanConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("closed" | "opened" | "update:open")[], "closed" | "opened" | "update:open", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    open: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        type: StringConstructor;
        default: string;
    };
    closeOnOverlay: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeOnEsc: {
        type: BooleanConstructor;
        default: undefined;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: undefined;
    };
    trapFocus: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoDestroy: {
        type: BooleanConstructor;
        default: undefined;
    };
    hideNullValues: {
        type: BooleanConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onClosed?: ((...args: any[]) => any) | undefined;
    onOpened?: ((...args: any[]) => any) | undefined;
    "onUpdate:open"?: ((...args: any[]) => any) | undefined;
}>, {
    open: boolean;
    effect: string;
    closeOnOverlay: boolean;
    closeOnEsc: boolean;
    lockScroll: boolean;
    trapFocus: boolean;
    autoDestroy: boolean;
    hideNullValues: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
