<template>
    <div class="i-form">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'iForm',
    provide: {
        form: this
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