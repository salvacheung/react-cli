import classItem from "./class-item"
import { functionType } from "./function"
import { variableType } from "./variable"

/**
 * 函数可接入的参数类型
 */
export type argType = {
    name?: string;
    valueType: variableType | classItem | functionType;
}