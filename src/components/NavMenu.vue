<template>
    <nav class="menu">
        <router-link :to="{name : 'home'}" exact>Home</router-link>
        <router-link :to="{name : 'faq'}">FAQ</router-link>
        <router-link :to="{name: 'tickets'}">Support tickets</router-link>
        <div class="spacer"></div>
        <!--会简单地使用css 的fl exbox 属性来占用菜单中所有可用的空间，以便把之后放人的任何
内容都推到右侧-->

        <template v-if="$state.user">
            <a>{{ $state.user.username }}</a>
            <a @click="logout">Logout</a>
        </template>
        <router-link v-else :to="{name: 'login'}">Login</router-link>
    </nav>
</template>
<script>
export default {
    methods: {
        async logout() {
            const result = await this.$fetch('logout')
            if (result.status === 'ok') {
                this.$state.user = null
            }
        },
    },
}
</script>
<style lang="stylus" scoped>
    @import '../style/imports';

    .router-link-active {
        border-bottom-color: $primary-color;
    }
</style>