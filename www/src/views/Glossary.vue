<template>
    <div class="text-page-container">
        <div class="font-size-extra-large margin-bottom-large title">Glossary</div>
        
        <div v-for="definition in elements" :key="definition.name">
            <div class="font-size-large secondary-title">
                <router-link to="{name: 'glossary', params: {CurrentWord: definition.name}}" tag="a">{{definition.name}}</router-link>
            </div>
            <div class="vertical-seperator"></div>
            <p clas="font-size-large font-color-secondary margin-bottom-large" v-html="definition.Definition">
            </p>
            <div class="margin-bottom-large"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        CurrentWord: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            elements: [
                { 
                    name: "Decision Tree",
                    Definition: ""
                },
                {
                    name: "Game of Pure Stragety",
                    Definition: ""
                }
            ]
        };
    },
    watch: {
        highlightWord(): string {
            console.log(this.CurrentWord);
            return this.CurrentWord;
        }
    }
})
</script>

<style src="../assets/styles/margins.css"></style>
<style src="../assets/styles/text-style.css"></style>
<style src="../assets/styles/text-page-base.css"></style>
<style scoped>

</style>
