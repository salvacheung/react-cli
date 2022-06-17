import { propertieType } from "./propertie";
import { functionType } from "./function";

export enum classType {'interface', '_class', 'trait', 'final','abstract'}

export type classItemType = {
    name?: string;
    // 命名空间
    namespace?: string;                                                         
    type?: classType;              // 默认 class
    properties?: propertieType[];                                                // 对象下的属性
    functions?: functionType[];                                                  // 对象下的方法
    implementsInterfaces?: classItemType[];                                                // 接口实现
    extendsClass?: classItemType;                                                      // 继承
}

class classItem
{
    public name: string | undefined = '';

    public type: classType | undefined = classType._class;

    public namespace: string | undefined | null = null;

    public functions: functionType[] | undefined | null = null;
    
    public properties: propertieType[] | undefined | null = null;

    public implements: classItemType[] | undefined | null = null;

    public extends: classItemType | undefined | null = null;

    // 构造函数接受传递的参数类型

    // 对外暴露的方法

    // 对外暴露的属性

    // 继承此类必须实现的方法

    constructor (props: classItemType) {
        let { name, type, properties, functions, implementsInterfaces, extendsClass, namespace } = props;

        this.name = name;
        this.type = type;
        this.properties = properties;
        this.functions = functions;
        this.implements = implementsInterfaces;
        this.extends = extendsClass;
        this.namespace = namespace;
    }

    addFunction (_function:functionType) {
        this.functions.push(_function)
    }
}

export default classItem;