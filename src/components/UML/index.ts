import { argType } from "./elements/argument";
import classItem, { classItemType, classType } from "./elements/class-item";
import { functionType, visibilityType } from "./elements/function";

function UML () {
    let addArga: argType = {
        name: 'a',
        valueType: 'number'
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
        type: classType.interface,
        namespace: 'App\\Home',
        functions: [
            add
        ]
    }
    let class_ = new classItem(homeInterface);

    console.log(class_)
}

export default UML;
