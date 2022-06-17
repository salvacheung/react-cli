import { propertieType } from "./propertie";
import { functionType, extendsFunctionsType } from "./function";
import { hex_md5 } from 'react-native-md5';

export enum classType {'interface', '_class', 'trait', 'final','abstract'}

export type classItemType = {
    name?: string;
    hash?: string,
    // 命名空间
    namespace?: string;                                                         
    type?: classType;              // 默认 class
    properties?: propertieType[];                                                // 对象下的属性
    functions?: functionType[];                                                  // 对象下的方法
    remark?: string;
    extends_functions?: extendsFunctionsType[]
}

class classItem
{
    // 哈希
    public hash: string;

    // 本类的类名
    public name?: string = null;
    
    // 类型
    public type: classType | undefined = classType._class;

    // 命名空间
    public namespace?: string = null;

    // 本类中的方法
    public functions?: functionType[] = [];
    
    // 继承的方法
    public extends_functions?: extendsFunctionsType[] = [];

    // 属性
    public properties?: propertieType[] = [];

    // 继承接口
    public interfaces?: classItemType[] = [];

    // 待实现的方法
    public unimplemented_functions?: functionType[] = [];

    // 接口中的方法
    public interfaces_functions?: functionType[] = [];

    // 下级类需要实现的方法
    public next_need_implement_functions?: functionType[] = [];

    // 继承类
    public extends?: classItemType = null;

    // 扩展类
    public traits?: classItemType[] = [];

    // 备注
    public remark?: string;

    // 构造函数接受传递的参数类型

    // 对外暴露的方法

    // 对外暴露的属性

    // 继承此类必须实现的方法

    constructor (props: classItemType) {
        let { name, type, properties, functions, namespace, remark } = props;

        this.name = name[0].toUpperCase() + name.substring(1);
        this.namespace = namespace;
        this.hash = hex_md5(this.namespace + '\\' + this.name)
        this.type = type;
        this.properties = properties;
        this.functions = functions;
        this.remark = remark;
    }

    /**
     * 增加实现接口
     * 
     * @param implement 
     * @returns 
     */
    addInterface (interface_: classItemType) {
        if (interface_.hash === this.hash) {
            return;
        }

        if (interface_.type !== classType.interface) {
            return;
        }
        if (this.type === classType.interface) {
            this.addExtends(interface_);
        } else {
            // 处理implement中的方法，添加入未实现
            this.interfaces.push(interface_)
        }
    }

    /**
     * 获取未实现的方法
     */
    private getUnimplementedFunctions (interface_: classItemType) {
        // 本接口方法和继承接口方法
    }

    /**
     * 增加继承类
     * 
     * @param extend 
     * @returns 
     */
    addExtends (extend: classItemType) {
        if (extend.hash === this.hash) {
            return;
        }

        if (extend.type === classType.final) {
            return;
        }
        if (extend.type === classType.trait && this.type !== classType.trait) {
            return;
        }
        if (extend.type === classType.interface && this.type !== classType.interface) {
            return;
        }
        // 判断在extend类的继承树中是否已经继承了本类，防止继承之间形成闭环

        // 遍历继承类方法（继承类自有方法+extends方法）
        this.extends_functions = this.loopExtendsFunctions(extend);
        

        this.extends = extend;
    }

    /**
     * 遍历继承过来的方法
     * 
     * @param extend 
     * @returns 
     */
    private loopExtendsFunctions (extend: classItemType) {
        let extend_functions = extend.functions;
        let extend_extend_functions = extend.extends_functions;

        if(extend_functions && extend_functions.length > 0) {
            let extend_info: extendsFunctionsType = {
                hash: extend.hash,
                namespace: extend.namespace,
                name: extend.name,
                functions: extend_functions
            }
    
            extend_extend_functions.unshift(extend_info)
        }
        return extend_extend_functions;
    }

    /**
     * 增加扩展类
     * 
     * @param trait 
     * @returns 
     */
    addTraits (trait: classItemType) {
        if (this.hash === trait.hash) {
            return;
        }

        if (trait.type !== classType.trait) {
            return;
        }

        if (this.type === classType.interface) {
            return;
        }

        this.traits.push(trait);
    }
    
    /**
     * 增加方法
     * 
     * @param class_function 
     */
    addFunction (class_function:functionType) {
        // 判断继承的方法中是否有final同名方法

        this.functions.push(class_function)
    }
}

export default classItem;