<template>
    <div class="i-form-item">
        <label v-if='label' :class="{ 'i-form-item-label-required': isRequired }">
            {{ `${label}：` }}
        </label>
        <div>
            <div>
                <slot></slot>                
            </div>
            <div v-if="validateState === 'error'" class="i-form-item-message">
                {{ validateMessage }}
            </div>
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
            validateMessage: '',  // 校验不通过时的提示信息
            isRequired: false, // 选项是否必填
            initialValue: ''
        }
    },
    computed: {
        // 从form 的model中动态得到当前表单组件的数据
        fieldValue() {
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
            // 如果当前校验规则中有必填项，则标记出来
            let rules = this.getRules()
            console.log(rules)
            this.isRequired = rules.some(rule => rule.required)

            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        },
        // 重置数据
        resetField () {
            this.validateState = '';
            this.validateMessage = '';
            this.form.model[this.prop] = this.initialValue
        } 
    },
    mounted() {
        if (this.prop) {
            this.dispatch('iForm', 'on-form-item-add', this);
            this.initialValue = this.fieldValue // 设置初始值，以便在重置时恢复默认值
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

<style scoped>

.i-form-item {
    display: flex;
}

.i-form-item .i-form-item-label-required {
    position: relative;
}

.i-form-item .i-form-item-label-required::before {
    content: "*";
    position: absolute;
    top: 0;
    left: -10px;
    color: #ed4014;
}

.i-form-item .i-form-item-message {
    color: #ed4014;
    text-align: left;
}
</style>