<template>
    <popup :popup_open="true">
        <template slot="header">
            <div class="popup-title-text">Loading</div>
        </template>
        <template slot="body">
            <spinner :radius="150" :storke="25"/>
        </template>
    </popup>
</template>

<script lang="ts">
import Vue from 'vue'
import Popup from "../components/Popup.vue"
import Spinner from "../components/Spinner.vue"
import { setTimeout } from 'timers';

export default Vue.extend({
    components: {
        Popup,
        Spinner
    },
    mounted(): void {
        this.$nextTick(() => {
            this.$router.push("/home");
        });
    }
});
</script>


<style src="../assets/styles/text-style.css"></style>
<style scoped>
</style>
