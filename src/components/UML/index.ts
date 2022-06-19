import { argType } from "./elements/argument";
import classItem, { classItemType, classType } from "./elements/class-item";
import FunctionItem, { functionType, visibilityType } from "./elements/function";

function UML () {
    let interface_arg: classItemType = {
        name: 'classArg',
        remark: '这是一个接口参数',
        type: classType.interface,
        namespace: 'App\\Interfaces',
    }
    let interface_arg2: classItemType = {
        name: 'classArg2',
        remark: '这是一个接口参数',
        type: classType.interface,
        namespace: 'App\\Interfaces',
    }
    let argInterfece = new classItem(interface_arg);
    let argInterfece2 = new classItem(interface_arg2);
    argInterfece.addExtends(argInterfece2)
    let addArga: argType = {
        name: 'a',
        valueType: argInterfece
    }
    let addArgb: argType = {
        name: 'b',
        valueType: 'int'
    }

    let add: functionType= {
        name: 'add',
        remark: '实现两个变量之间的加法',
        isAbstract: false,
        isStatic: false,
        visibility: visibilityType.public,
        isFinal: false,
        args: [
            addArga,
            addArgb
        ],
        returnType: 'int'
    }

    let addFunction = new FunctionItem(add);

    let homeClass: classItemType = {
        name: 'home',
        type: classType._class,
        namespace: 'App\\Home',
    }
    let some1Abstract: classItemType = {
        name: 'some1',
        type: classType.abstract,
        namespace: 'App\\Home',
    }
    let some1Interface: classItemType = {
        name: 'some1Interface',
        type: classType.interface,
        namespace: 'App\\Home'
    }
    let some1InterfaceFunction1: functionType = {
        name: 'some1interfunc',
        isAbstract: false,
        isStatic: false,
        returnType: 'int',
        remark: '测试方法'
    }
    let some2Interface: classItemType = {
        name: 'some2Interface',
        type: classType.interface,
        namespace: 'App\\Home'
    }
    let some2InterfaceFunction1: functionType = {
        name: 'some2interfunc',
        isAbstract: false,
        isStatic: false,
        returnType: 'int'
    }
    let some1InterfaceFunction1Item = new FunctionItem(some1InterfaceFunction1)
    let some2InterfaceFunction1Item = new FunctionItem(some2InterfaceFunction1)
    
    let class_ = new classItem(homeClass);
    let some1 = new classItem(some1Abstract);
    let some1InterfaceClass = new classItem(some1Interface);
    let some2InterfaceClass = new classItem(some2Interface);
    
    some2InterfaceClass.addFunction(some2InterfaceFunction1Item);
    some1InterfaceClass.addExtends(some2InterfaceClass)
    some1.addInterface(some1InterfaceClass)

    class_.addFunction(some1InterfaceFunction1Item);
    class_.addFunction(addFunction);
    
    console.log(some1)
    class_.addExtends(some1)
    console.log(JSON.stringify(class_))

    return class_;
}

export default UML;
