<template>
  <div class="row">
    <input
      class="input"
      :class="inputClass"
      :name="name"
      :type="type"
      :value.prop="text"
      @input="update"
      :placeholder="placeholder" />
  </div>
</template>
<script>
export default {
    model: {
        prop: 'text',
        event: 'update',
    },

    props: {
        name: { //输入框的HTML 名称, 是让浏览器的自动补全功能生效所需要的
            type: String,
        },
        type: {
            type: String,
            default: 'text',
        },
        text: {
            required: true,
        },
        placeholder: {
            type: String,
        },
        invalid: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        inputClass() {
            return {
                'invalid': this.invalid,
            }
        },
    },

    methods: {
        update(event) {
            this.$emit('update', event.currentTarget.value)
        },
    },
}
</script>

<style lang="stylus" scoped>
.input {
  &.invalid {
    border-color: red;
  }
}
</style>
