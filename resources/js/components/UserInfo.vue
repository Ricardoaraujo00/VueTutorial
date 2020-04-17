<template>
    <div>
        <span class="text-muted"> {{ postDate }}</span>
        <div class="media mt-2">
            <a :href="user.url" class="pr-2">
                <img :src="user.avatar">
            </a>
            <div class="media-body mt-4">
            <a :href="user.url"> {{user.name}}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['model','label'],

    computed: {
        postDate(){
            console.log(this.label, this.model.created_date)
            return this.label + " " + this.model.created_date;
        }
    },
    data(){
        return {
            user: this.model.user
        }
    }
}
</script>