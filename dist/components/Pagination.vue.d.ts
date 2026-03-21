declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    totalItems: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
    itemsPerPage: {
        type: NumberConstructor;
        default: number;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "page-changed": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    totalItems: {
        type: NumberConstructor;
        required: true;
        default: number;
    };
    itemsPerPage: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    "onPage-changed"?: ((...args: any[]) => any) | undefined;
}>, {
    totalItems: number;
    itemsPerPage: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
