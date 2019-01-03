<template>
    <div class="home-container">
        <div class="font-size-extra-large margin-bottom-large title">War With Josh</div>
        
        <!-- What is -->
        <div class="font-size-large secondary-title">
            What
        </div>
        <div class="vertical-seperator"></div>
        <div clas="font-size-large font-color-secondary margin-bottom-large">
            War With Josh is a project to teach users basic principals of AI game design and
            the alogrithms behind some commonly used AI algorithms. Each AI type is presented
            along with a short description of how the algorithm for that AI funcation, along
            with some of the defining characteristics of that AI.
        </div>
        <div class="margin-bottom-large"></div>

        <!-- How -->
        <div class="font-size-large secondary-title">
            How
        </div>
        <div class="vertical-seperator"></div>
        <div clas="font-size-large font-color-secondary">
            War With Josh is a project to teach users basic principals of AI game design and
            the alogrithms behind some commonly used AI algorithms. Each AI type is presented
            along with a short description of how the algorithm for that AI funcation, along
            with some of the defining characteristics of that AI.
        </div>
        <div class="margin-bottom-large"></div>


        <!-- Why -->
        <div class="font-size-large secondary-title">
            Why
        </div>
        <div class="vertical-seperator"></div>
        <div clas="font-size-large secondary-title">
            War With Josh is a project to teach users basic principals of AI game design and
            the alogrithms behind some commonly used AI algorithms. Each AI type is presented
            along with a short description of how the algorithm for that AI funcation, along
            with some of the defining characteristics of that AI.
        </div>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>


<style src="../assets/styles/margins.css"></style>
<style src="../assets/styles/text-style.css"></style>
<style scoped>
.home-container {
    display: flex;
    flex-direction: column;

    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;

    padding-left: 15px;
    padding-right: 15px;
    min-width: 350px;
    max-width: 500px;
}

.vertical-seperator {
    background-color: gray;
    height: 2px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.title {
    text-align: center;
    color: var(--blue-5);
}

.secondary-title {
    color: var(--blue-4);
}
</style>
