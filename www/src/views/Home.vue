<template>
    <div class="text-page-container">
        <div class="font-size-extra-large margin-bottom-large title">War With Josh</div>
        
        <!-- What is -->
        <div class="font-size-large secondary-title">
            <router-link to="#what" tag="a">What</router-link>
        </div>
        <div class="vertical-seperator"></div>
        <p clas="font-size-large font-color-secondary margin-bottom-large">
            War With Josh is a project to teach users basic principals of AI game design and
            the alogrithms behind some commonly used AI algorithms. Each AI type is presented
            along with a short description of how the algorithm for that AI funcation, along
            with some of the defining characteristics of that AI.
        </p>
        <div class="margin-bottom-large"></div>

        <!-- How -->
        <div class="font-size-large secondary-title">
            <router-link to="#how" tag="a">How</router-link>
        </div>
        <div class="vertical-seperator"></div>
        <p clas="font-size-large font-color-secondary">
            To initalize users an 
            <router-link to="/design" tag="a">introduction</router-link> to the design of game playing AI's is given.
            The introduction discusses at a high level many of the topics discussed throughout War With Josh, so no piror knowledge about AI design or other complex AI or Game Theory topics is necessary. 
            defining what an AI is and why it is necessary, going through some of the trade offs which
            must be made when desiging a AI, and finally <br />
            To teach users about the funcation of serval basic AI's War With Josh presents a simple card game called 
            <a  v-if="isOnline" href="https://en.wikipedia.org/wiki/Goofspiel">Game of Pure Strategy, Goffspiel or GOPS</a><template v-else>Game of Pure Strategy, Goffspiel or GOPS</template> for short.
            The game of GOPS is soley dependent on stragety which makes it ideal for demonstrating the algorithms of many game AI's. <br />
            A summary of the algorithm for each AI is given in detail, along with with some of the advantages and disadvantages of the given AI.
            Each of the AI's discussed have been made available for the user to play against, compare agaist other AI's, or see how they stack up against human players in a round of GOPS.

        </p>
        <div class="margin-bottom-large"></div>


        <!-- Why -->
        <div class="font-size-large secondary-title">
            <router-link to="#why" tag="a">Why</router-link>
        </div>
        <div class="vertical-seperator"></div>
        <p clas="font-size-large secondary-title">
            Some content about why this was made???
        </p>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    created(): void {
        window.addEventListener("online", this.handleWindowOnline);
        window.addEventListener("offline", this.handleWindowOffline);
        this.online = window.navigator.onLine
    },
    data() {
        return {
            online: false
        };
    },
    beforeDestroy(): void {
        window.removeEventListener("online", this.handleWindowOnline);
        window.removeEventListener("offline", this.handleWindowOffline);
    },
    methods: {
        handleWindowOnline(): void {
            this.online = true;
        },
        handleWindowOffline(): void {
            this.online = false;
        }
    },
    computed: {
        isOnline(): boolean {
            return this.online;
        }
    }
})
</script>


<style src="../assets/styles/margins.css"></style>
<style src="../assets/styles/text-style.css"></style>
<style src="../assets/styles/text-page-base.css"></style>
<style scoped>
</style>
