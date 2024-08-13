<template>
    <div>
        <input type="text" :value="currentValue" @input="handleInput" @blur="handleBlur">
    </div>
</template>

<script>
import emitter from '@/mixins/emitter'

export default {
    name: 'iInput',
    mixins: [emitter],
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        value() {
            this.currentValue = this.value
        }
    },
    methods: {
        handleInput(event) {
            const value = event.target.value
            this.currentValue = value
            this.$emit('input', value)
            this.dispatch('iFromItem', 'on-form-change', value)
        },
        handleBlur() {
            this.dispatch('iFromItem', 'on-form-blur', this.currentValue)
        }
    }
}
</script>