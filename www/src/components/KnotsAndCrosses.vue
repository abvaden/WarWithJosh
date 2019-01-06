<template>
    <div class="knc-container">
        <div class="knc-box" v-for="(contents, i) in CellContents" :key="i">
            <template v-if="contents !== '-'">{{contents}}</template>
            
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        state: {
            type: String,
            default: "---------"
        }
    },
    computed: {
        CellContents(): string[] {
            return this.state.split("");
        }
    }
});
</script>


<style scoped>
.knc-container {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    display: grid;
    background-color: black;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-row-gap: 2px;
    grid-column-gap: 2px;
    padding: 2px;
}

.knc-box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-weight: bolder;
}
</style>
