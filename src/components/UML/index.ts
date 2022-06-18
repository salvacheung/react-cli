import { argType } from "./elements/argument";
import classItem, { classItemType, classType } from "./elements/class-item";
import { functionType, visibilityType } from "./elements/function";

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
        valueType: 'number'
    }

    let add: functionType= {
        name: 'add',
        remark: '实现两个变量之间的加法',
        isAbstract: false,
        isStatic: false,
        isInterface: false,
        visibility: visibilityType.public,
        isFinal: false,
        args: [
            addArga,
            addArgb
        ],
        returnType: 'int'
    }

    let homeInterface: classItemType = {
        name: 'home',
        type: classType._class,
        namespace: 'App\\Home',
        functions: [
            add
        ]
    }
    
    let class_ = new classItem(homeInterface);
    let some1Interface: classItemType = {
        name: 'some1',
        type: classType.trait,
        namespace: 'App\\Home',
        functions: [
            add
        ]
    }
    let some1 = new classItem(some1Interface);
    class_.addExtends(some1)
    console.log(class_)
}

export default UML;
