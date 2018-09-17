<template>
<div id="app">
    <Nav-Bar/>
    <div class="content">
        <router-view/>
    </div>
</div>
</template>


<script lang="ts">
import Vue from "vue";
import NavBar from "@/components/NavBar.vue";

export default Vue.extend({
    components: {
        NavBar,
    },
});
</script>

<style lang="less">
// Reset
@import "./less/reset.less";

// Basic styles
@import "./less/style.less";

.content {
    margin: 10px 20px;
    padding-top: 60px;
}
</style>
