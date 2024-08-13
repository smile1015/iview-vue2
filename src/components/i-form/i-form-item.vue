<template>
    <div class="i-form-item">

        <label v-if='label'>{{ label }}</label>
        <div>
            <slot></slot>
        </div>
        <div>
            {{  validateMessage }}
        </div>
    </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from '@/mixins/emitter'

export default {
    name: 'iFormItem',
    mixins: [emitter],
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            validateState: '',  // 校验状态
            validateMessage: ''  // 校验不通过时的提示信息
        }
    },
    computed: {
        // 从form 的model中动态得到当前表单组件的数据
        field() {
            return this.form.model[this.prop];
        }
    },
    methods: {
        // 从form的rules属性中, 获取当前formItem的校验规则
        getRules() {
            let formRules = this.form.rules
            formRules = this.prop ? formRules[this.prop] : []
            return [].concat(formRules || [])
        },
        // 只支持blur和change, 所有过滤出符合要求的rule规则
        getFilterRules(trigger) {
            const rules = this.getRules()
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
        },
        validate(trigger, callback = () => { }) {
            const rules = this.getFilterRules(trigger)

            if (!rules || rules.length === 0) {
                return true;
            }

            // 设置状态为校验中
            this.validateState = 'validating'

            // 调用async-validator库的校验方法
            let descriptor = {};
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor)
            let model = {}
            model[this.prop] = this.fieldValue
            validator.validate(model, { firstFields: true }, errors => {
                console.log(errors)
                this.validateState = !errors ? 'success' : 'error'
                this.validateMessage = errors ? errors[0].message : ''

                callback(this.validateMessage)
            })
        },
        onFieldChange() {
            this.validate('change')
        },
        onFieldBlur() {
            this.validate('blur')
        },
        setRules() {
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        }
    },
    mounted() {
        if (this.prop) {
            this.dispatch('iForm', 'on-form-item-add', this);
            this.setRules()
        }
    },
    beforeDestroy() {
        if (this.prop) {
            this.dispatch('iForm', 'on-form-item-remove', this);
        }
    }
}
</script>