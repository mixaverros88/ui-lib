declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
    to: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    mode: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    closeModal: (...args: any[]) => void;
    confirmModal: (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
    to: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    mode: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & Readonly<{
    onCloseModal?: ((...args: any[]) => any) | undefined;
    onConfirmModal?: ((...args: any[]) => any) | undefined;
}>, {
    to: string;
    mode: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
