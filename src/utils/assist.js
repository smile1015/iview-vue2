
// 由一个组件, 向上找到最近的指定组件
function findComponentUpward(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;

    while(parent && (!name || [componentName].indexOf(name) < 0)) {
        parent = parent.$parent;

        if (parent) {
            name = parent.$options.name;
        }
    }

    return parent;
}

// 由一个组件, 向上找到所有的指定组件
function findComponentsUpward(context, componentName) {
    let parents = []
    const parent = context.$parent // 获取父级组件
    if (parent) {
        if (parent.$options.name === componentName) {
            parents.push(parent)
        } 

        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        // 递归的出口
        return [] 
    }
}

// 由一个组件, 向下找到最近的指定组件
function findComponentDownward(context, componentName) {
    const children = context.$children;
    let child = null;

    if (children.length) {
        for (const childItem of children) {

            const name = childItem.$options.name

            if (name === componentName) {
                child = childItem;
                break;
            } else {
                children = findComponentDownward(child, componentName);
                
                if (children) {
                    break
                }
            }
        }
    }

    return children
}

// 由一个组件, 向下找到所有指定的组件
function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) {
            components.push(child);
        } 

        const foundChildren = findComponentsDownward(child, componentName);
        return components.concat(foundChildren)
    }, [])
}


// 由一个组件, 找到指定组件的兄弟组件
function findBrothersComponents(context, componentName, expectMe = true) {
    let res = context.$parent.$children.filter(child => {
        return child.$options.name === componentName;
    })

    if (expectMe) {
        let index = res.findIndex(item => item._uid === context._uid);
        res.splice(index, 1);
    }

    return res;
}

export {findComponentUpward, findComponentsUpward, findComponentDownward, findComponentsDownward, findBrothersComponents}

