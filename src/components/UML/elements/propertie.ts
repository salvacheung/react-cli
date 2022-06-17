import { functionType } from "./function";
import { classItemType } from "./class-item";
import { variableType } from "./variable";

/**
 * 类的成员属性
 */
export type propertieType = {
    // 是否是静态属性,默认 false
    isStatic?: boolean;
    // 是否是常量,默认 false
    isConst?: boolean;
    // 是否可被继承重写;
    isFinal?: boolean;
    // 属性访问控制,默认 null
    visibility?: 'public' | 'private' | 'protected' | null;
    valueType?: variableType | functionType | classItemType;
}