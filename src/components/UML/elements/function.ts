import { argType } from "./argument";
import classItem, { classItemType } from "./class-item";


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
    // 是否是接口方法
    isInterface: boolean;
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
    // 哈希
    hash?: string;
    // 函数名称
    name?: string;
    // 功能说明
    remark?: string;
    // 是否是抽象方法
    isAbstract: boolean;
    // 是否是静态方法
    isStatic: boolean;                                  // 默认 false
    // 是否是接口方法
    isInterface: boolean;
    // 访问控制
    visibility?: visibilityType | null;   // 默认 public
    // 是否为最终方法（不可被继承重写）
    isFinal?: boolean;
    // 方法参数
    args?: argType[];
    // 返回类型
    returnType?: 'void' | 'int' | classItemType

    // 当前方法所属类
    public classItem?: classItem = null;

    constructor (props: functionType) {
        let { name, args, isAbstract, isInterface, isStatic, isFinal, returnType, remark, visibility } = props;
        this.name = name;
        this.args = args;
        this.isAbstract = isAbstract;
        this.isInterface = isInterface;
        this.isStatic = isStatic;
        this.isFinal = isFinal;
        this.remark = remark;
        this.returnType = returnType;
        this.visibility = visibility;
    }

    setClass (class_: classItem) {
        this.classItem = class_;
    }
}

export default FunctionItem;
