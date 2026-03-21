import { PropType } from 'vue';
import { BaseToastEnum } from '../enums/BaseToastEnum';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<BaseToastEnum>;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: true;
    };
    hasCloseIcon: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    positioning: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    mode: {
        type: PropType<BaseToastEnum>;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: true;
    };
    hasCloseIcon: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    positioning: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & Readonly<{}>, {
    hasCloseIcon: boolean;
    positioning: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
