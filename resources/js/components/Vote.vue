<template>
    <div class="d-flex flex-column vote-controls">
        <a @click.prevent="voteUp" :title="title('up')" 
            class="vote-up" :class="classes">
            <i class="fa fa-caret-up fa-3x"></i>
        </a>
        
        <span class="votes-count">{{count}}</span>
        
        <a @click.prevent="voteDown" :title="title('down')" 
            class="vote-down" :class="classes">
            <i class="fas fa-caret-down  fa-3x"></i>
        </a>
        
        <favorite v-if="name==='question'" :question="model"></favorite>
        <accept v-if="name==='answer'" :answer="model"></accept>
    </div>
</template>

<script>
//Vue.component('favorite', () => import(/* webpackChunkName: "AnswerComponent" */ './components/Favorite.vue'));
//Vue.component('accept', () => import(/* webpackChunkName: "AnswerComponent" */ './components/Accept.vue'));
import Favorite from './Favorite.vue';
import Accept from './Accept.vue';

export default {
    props: ['name','model'],

    computed: {
        classes () {
            return this.signedIn ? '' : 'off';
        },
        endpoint () {
            return `/${this.name}s/${this.id}/vote`;
        },
    },

    components: {
        // Favorite: Favorite,
        // Accept: Accept
        Favorite,
        Accept
    },

    data () {
        return {
            count: this.model.votes_count,
            id: this.model.id,
            voteUpAllow: true,
            voteDownAllow: true,
            callInProgress: false,
            initialCount: this.model.votes_count
        }
    },

    methods: {
        title (voteType) {
            let titles = {
                up: `This ${this.name} is usefull`,
                down: `This ${this.name} is not usefull`
            };
            return titles[voteType];
        },

        voteUp () {
            if (this.voteUpAllow && !this.callInProgress){
                this._vote(1);
                this.voteUpAllow=false;
                this.voteDownAllow=true;
                this.callInProgress=true;
            }
            
        },

        voteDown () {
            if (this.voteDownAllow && !this.callInProgress){
                this._vote(-1);
                this.voteDownAllow=false;
                this.voteUpAllow=true;
                this.callInProgress=true;
            }
            
        },

        _vote (vote) {
            if (! this.signedIn){
                this.$toast.warning(`Please login to vote the ${this.name}`, "Warning", {
                    timeout:3000,
                    position: 'bottomLeft'
                });
                this.callInProgress=false;
                return;
            }
            axios.post(this.endpoint, {vote})
            .then(res => {
                this.$toast.success(res.data.message, "Success", {
                    timeout: 3000,
                    position: 'bottomLeft'
                });
                this.count = res.data.votesCount;
                this.callInProgress=false;
            })
        }
    }
}
</script>