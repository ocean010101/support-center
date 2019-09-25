<template>
  <form @submit.prevent="submit"> <!--prevent: 阻止浏览器的默认行为-->
    <section class="content">
      <h2>{{ title }}</h2>
      <slot />

      <div class="actions">
        <slot name="actions" />
      </div>

      <div class="error" v-if="error">{{ error }}</div>
    </section>

    <transition name="fade">
      <Loading v-if="busy" class="overlay" />
    </transition>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    operation: { //提交表单时调用异步函数
      type: Function,
      required: true,
    },
    valid: { //防止表单在无效的时候操作
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      error: null, //错误消息
      busy: false, //切换加载动画的显示
    }
  },

  methods: {
    async submit () { //提交表单
      if (this.valid && !this.busy) {
        this.error = null
        this.busy = true
        try {
          await this.operation()
        } catch (e) {
          this.error = e.message
        }
        this.busy = false
      }
    },
  },
}
</script>
