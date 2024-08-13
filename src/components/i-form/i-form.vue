<template>
    <div class="i-form">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'iForm',
    provide() {
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object,
            default: () => { }
        },
        rules: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            fields: []
        }
    },
    methods: {
        // 校验全部数据
        validate(callback) {
            return new Promise(resolve => {
                let valid = true
                let count = 0

                this.fields.forEach(field => {
                    field.validate('', errors => {
                        if (errors) {
                            valid = false
                        }
                        if (++count === this.fields.length) {
                            // 全部完成
                            resolve(valid)

                            if (typeof callback === 'function') {
                                callback(valid)
                            }
                        }
                    })
                })
            })
        },
        // 重置全部数据
        reset() {
            this.fields.forEach(field => {
                field.reset()
            })
        }
    },
    created() {
        this.$on('on-form-item-add', field => {
            this.fields.push(field);
        });
        this.$on('on-form-item-remove', field => {
            this.fields.splice(this.fields.indexOf(field), 1);
        });
    }
}
</script>