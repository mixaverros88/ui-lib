import { AlertEnum } from '../enums/AlertEnum';
import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: false;
        default: AlertEnum;
    };
    color: {
        type: PropType<AlertEnum>;
        required: false;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: false;
        default: AlertEnum;
    };
    color: {
        type: PropType<AlertEnum>;
        required: false;
    };
}>> & Readonly<{}>, {
    title: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, HTMLDivElement>;
export default _default;
