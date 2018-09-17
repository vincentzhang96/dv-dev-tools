<template>
<div class="card" :hoverable="hoverable">
    <div class="card-head">
        <slot name="head"/>
    </div>
    <div class="card-body">
        <slot/>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    props: ["hoverable"],
});
</script>


<style lang="less">
@import "./../less/style.less";

.card {
    display: inline-block;
    border: 1px solid @dv-c-outline;
    padding: 10px 16px 16px 16px;
    margin: 10px;
    background-color: @dv-c-background-card;
    box-shadow: 0 2px 6px rgba(0,0,0.1,0.12), 0 1px 2px rgba(0,0,0.1,0.24);

    &[hoverable] {
        background-color: red;
    }

    .card-head {
        padding-bottom: 8px;
        margin-bottom: 10px;
        border-bottom: 1px solid fade(@dv-c-outline, 60%);
        
        h3 {
            font-size: 16px;
            font-weight: normal;
            font-variant: normal;
            text-transform: uppercase;
            letter-spacing: 0.2em;
        }
    }

    .comment {
        font-style: italic;
        color: lighten(desaturate(@dv-c-body, 20%), 20%);
        border-left: 2px solid fade(@dv-c-accent-1, 50%);
        padding: 2px 0 4px 4px;
        font-size: 14px;
    }
}

</style>
