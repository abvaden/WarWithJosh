<template>
    <div class="button" v-on:click.stop="handle_click">
        <div class="button-text">&rarr;</div>
        <span class="count-text">{{CurrentCount}} / {{TotalCount}}</span>
    </div>
</template>


<script lang="ts">
import Vue, {VNode} from "vue";

export default Vue.extend({
    props: {
        TotalCount: Number,
        CurrentCount: Number
    },
    methods: {
        handle_click(): void {
            this.$emit('click');
        }
    }
});
</script>



<style scoped>
.button-text {
    font-size: 3em;
    font-weight: bolder;
}
.count-text {
    font-size: 1em;
}
</style>