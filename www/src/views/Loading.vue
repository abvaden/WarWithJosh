<template>
    <div>
        Loading
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    mounted(): void {
        this.$nextTick(() => {
            this.$router.push("game");
        });
    }
});
</script>


<style scoped>

</style>
