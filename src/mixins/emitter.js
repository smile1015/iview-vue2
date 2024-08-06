
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params))
        } else {
            // 递归调用
            broadcast.apply(child, [componentName, eventName].concat[params])
        }
    })
}

export default {
    methods: {
        // 派发
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            // 存在父级节点, 且存在name值的场景下name的值不等于要查找的组件名称, 就继续获取父级节点的父级节点, 相等表示找到了要派发时间的组件节点
            while(parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                
                if(parent) {
                    name = parent.$options.name;
                }
            }

            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        // 广播
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params)
        }
    }
}