<template>
    <main class="faq">
        <h1>Frequently Asked Questions</h1>
         <Loading v-if="remoteDataBusy" />

        <div class="error" v-if="hasRemoteErrors">
            Can't load the questions
        </div>

        <section class="list">
            <article v-for="question of questionList" :key="question._id">
                <h2 v-html="question.title"></h2>
                <p v-html="question.content"></p>
            </article>
        </section>
    </main>
</template>
<script>
import RemoteData from '../minxis/RemoteData'
export default {
    mixins: [
        RemoteData({
            questionList: 'questions'
        })
    ],
/*     data() {
        return {
            questions: [],
            error: null,
            loading: false,
           remoteDataLoading: 42
        }
    },
    async created() {
        this.loading = true;
        try {
            this.questions = await this.$fetch('questions')
        } catch (e) {
            this.error = e
        }
        this.loading = false;
    } */
}
</script>