import { BaseButtonEnum } from '../enums/BaseButtonEnum';
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    description: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: BaseButtonEnum;
    };
    to: {
        type: StringConstructor;
        required: false;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    icon: {
        type: StringConstructor;
        required: false;
    };
    iconSize: {
        type: StringConstructor;
        required: false;
    };
    iconLeft: {
        type: StringConstructor;
        required: false;
    };
    isRounded: {
        type: BooleanConstructor;
        required: false;
    };
    isDisable: {
        type: BooleanConstructor;
        required: false;
    };
    size: {
        type: StringConstructor;
        required: false;
    };
    isLoading: {
        type: BooleanConstructor;
        required: false;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    description: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
        required: false;
        default: BaseButtonEnum;
    };
    to: {
        type: StringConstructor;
        required: false;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    icon: {
        type: StringConstructor;
        required: false;
    };
    iconSize: {
        type: StringConstructor;
        required: false;
    };
    iconLeft: {
        type: StringConstructor;
        required: false;
    };
    isRounded: {
        type: BooleanConstructor;
        required: false;
    };
    isDisable: {
        type: BooleanConstructor;
        required: false;
    };
    size: {
        type: StringConstructor;
        required: false;
    };
    isLoading: {
        type: BooleanConstructor;
        required: false;
    };
}>> & Readonly<{}>, {
    color: string;
    type: string;
    isRounded: boolean;
    isDisable: boolean;
    isLoading: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
