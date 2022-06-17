import { argType } from "./argument";
import { classItemType } from "./class-item";


export enum visibilityType {'public', 'private', 'protected'}

export type extendsFunctionsType = {
    hash?: string;
    name?: string,
    namespace?: string,
    functions?: functionType[]
}

/**
 * 类的成员方法
 */
export type functionType = {
    // 函数名称
    name?: string;
    // 功能说明
    remark?: string;
    // 是否是抽象方法
    isAbstract: boolean;
    // 是否是静态方法
    isStatic: boolean;                                  // 默认 false
    // 访问控制
    visibility?: visibilityType | null;   // 默认 public
    // 是否为最终方法（不可被继承重写）
    isFinal?: boolean;
    // 方法参数
    args?: argType[];
    // 返回类型
    returnType?: 'void' | 'int' | classItemType
}

class FunctionItem
{
    // 当前方法所属类
    public classItem: classItemType | null = null;
}

export default FunctionItem;
