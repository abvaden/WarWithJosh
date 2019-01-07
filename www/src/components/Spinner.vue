<template>
    <div id="progress" :style="style"></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    props: {
        radius: {
            type: Number,
            required: false,
            default: 150
        },
        stroke: {
            type: Number,
            required: false,
            default: 20
        },
    },
    computed: {
        style(): string {
            return `height: ${(this.radius - this.stroke).toFixed(0)}px; 
            width: ${(this.radius - this.stroke).toFixed(0)}px;
            border-width: ${this.stroke.toFixed(0)}px;`
        }
    }
});
</script>

<style scoped>
#progress {
    border: solid lightgray;
    border-top: solid #9FA8DA;
    border-radius: 50%;
    margin: auto;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
