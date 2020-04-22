<template>
    <div class="container">
        <question :question="question"></question>
        <answers :question="question"></answers> 
    </div>
</template>

<script>
import Question from '../components/Question.vue';
import answers from '../components/Answers.vue';

export default {
    components: { Question, answers},
    props: ['question']
}
</script>