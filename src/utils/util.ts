import { AlertEnum } from "../enums/AlertEnum";
import { ColorsEnums } from "../enums/ColorsEnums";

function getBaseColor(c: AlertEnum): string {
    let color = "red";
    switch (c) {
        case (AlertEnum.ERROR):
            color = "red"
            break;
        case (AlertEnum.SUCCESS):
            color = "green"
            break;
        case (AlertEnum.INFROM):
            color = "gray"
            break;
        case (AlertEnum.WARNING):
            color = "yellow"
            break;
    }
    return color;
}

function getBaseColorOf(c: ColorsEnums): string {
    let color = 'red';
    switch (c) {
        case ColorsEnums.GREEN: {
            color = 'green';
            break;
        }
        case ColorsEnums.RED: {
            color = 'red';
            break;
        }
        case ColorsEnums.BLUE: {
            color = 'blue';
            break;
        }
        case ColorsEnums.YELLOW: {
            color = 'yellow';
            break;
        }
        case ColorsEnums.NONE: {
            color = '';
            break;
        }
    }
    return color;
}

export {
    getBaseColor,
    getBaseColorOf
};
