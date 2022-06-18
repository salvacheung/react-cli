import { propertieType } from "./propertie";
import FunctionItem, { extendsFunctionsType } from "./function";
import { hex_md5 } from 'react-native-md5';

export enum classType {'interface', '_class', 'trait', 'final','abstract'}

export type classItemType = {
    name?: string;
    hash?: string;
    // 命名空间
    namespace?: string;                                                         
    type?: classType;              // 默认 class
    properties?: propertieType[];                                                // 对象下的属性
    functions?: FunctionItem[];                                                  // 对象下的方法
    remark?: string;
    extends_functions?: extendsFunctionsType[];
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
    private functions?: FunctionItem[] = [];
    
    // 继承的方法
    public extends_functions?: extendsFunctionsType[] = [];

    // 属性
    public properties?: propertieType[] = [];

    // 继承接口
    public interfaces?: classItem[] = [];

    // 接口中的方法
    public interfaces_functions?: extendsFunctionsType[] = [];

    // 继承类
    public extends?: classItem = null;

    // 扩展类
    public traits?: classItem[] = [];

    // 备注
    public remark?: string;

    // 构造函数接受传递的参数类型

    // 对外暴露的方法

    // 对外暴露的属性

    // 继承此类必须实现的方法

    constructor (props: classItemType) {
        let { name, type, properties, namespace, remark } = props;

        this.name = name[0].toUpperCase() + name.substring(1);
        this.namespace = namespace;
        this.hash = hex_md5(this.namespace + '\\' + this.name)
        this.type = type;
        this.properties = properties;
        this.remark = remark;
    }

    /**
     * 增加实现接口
     * 
     * @param implement 
     * @returns 
     */
    addInterface (interface_: classItem) {
        if (interface_.hash === this.hash) {
            return;
        }

        if (interface_.type !== classType.interface) {
            return;
        }
        if (this.type === classType.interface) {
            this.addExtends(interface_);
        } else {
            // 判断是否已经添加过该接口

            // 处理implement中的方法，添加入未实现
            this.interfaces_functions = this.extendsFunctions(interface_);
            this.interfaces.push(interface_)
        }
    }

    /**
     * 待实现的方法(下级类需要实现的方法)
     */
    unimplementsFunctions () {
        let extends_abstract_unimplements_functions = [];
        if (this.extends && this.extends.type === classType.abstract) {
            extends_abstract_unimplements_functions = this.extends.unimplementsFunctions();
        }

        // 接口


        // 抽象类

        return extends_abstract_unimplements_functions;
    }

    /**
     * 增加继承类
     * 
     * @param extend 
     * @returns 
     */
    addExtends (extend: classItem) {
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
        this.extends_functions = this.extendsFunctions(extend);
        
        this.extends = extend;
    }

    /**
     * 遍历继承过来的方法
     * 
     * @param extend 
     * @returns 
     */
    private extendsFunctions (extend: classItem) {
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
    addTraits (trait: classItem) {
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
    addFunction (class_function:FunctionItem) {
        // 判断继承的方法中是否有final同名方法
        // if (this.haveExistFunction(class_function)) {
        //     return;
        // }
        // if (class_function.isAbstract && this.type !== classType.abstract) {
        //     return;
        // } 
        class_function.setClass(this)
        this.functions.push(class_function)
    }

    getFunctions () {
        return this.functions;
    }

    haveExistFunction(class_function: FunctionItem) {
        // 判断functions中是否存在
        let functions = this.functions;
        if (functions && functions.length > 0) {
            let exist = functions.filter((function_) => {
                return function_.name.toLowerCase() === class_function.name.toLowerCase();
            })
            if (exist) {
                return true;
            }
        }
        // 判断继承类中是否有final同名方法
        let extends_functions = this.extends_functions;
        if (extends_functions && extends_functions.length > 0) {
            let exist_final = extends_functions.filter((extend_class) => {
                let extend_class_functions = extend_class.functions;
                return extend_class_functions.filter((extend_function) => {
                    return extend_function.name.toLowerCase() === class_function.name.toLowerCase() && extend_function.isFinal;
                })
            })
            if (exist_final) {
                return true;
            }
        }

        return false;
    }
}

export default classItem;