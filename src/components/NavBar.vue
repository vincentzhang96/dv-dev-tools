<template>
<div class="nav-bar">
    <div class="branding">
    </div>
    <div class="navs">
    <router-link :to="{name: 'home'}">
        <div class="nav-item">Home</div>
    </router-link>
    <router-link :to="{name: 'hexdump'}">
        <div class="nav-item">Hex Dump</div>
    </router-link>
    </div>
</div>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "nav-bar",
});
</script>

<style lang="less" scoped>
@import "./../less/constants.less";

.nav-bar {
    width: 100%;
    padding: 14px 10px 14px 10px;
    border-bottom: 1px solid @dv-c-outline;
    box-shadow: 0 1px 3px rgba(0,0,0.1,0.12), 0 1px 2px rgba(0,0,0.1,0.24);
    display: flex;
    flex-direction: row;
    background-color: @dv-c-background-card;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    .branding {
        padding-left: 72px;
        position: relative;
        color: @dv-c-foreground;
        padding-right: 10px;
        &::before {
        content: "DEV";
            letter-spacing: 0em;
            padding-right: 24px;
            font-size: 36px;
            position: absolute;
            bottom: -6px;
            left: 0px;
        }
    }

    .navs {
        display: flex;
        flex-direction: row;

        a {
            transition: background-color 0.125s ease-in;

            .nav-item {
                padding: 0 10px 4px 10px;
                border-right: 1px solid @dv-c-outline;
                font-weight: 200;
                letter-spacing: 0.05em;
                text-transform: uppercase;
            }

            &:last-child {
                .nav-item {
                    border-right: none;
                }
            }

            &:hover {
                background-color: lighten(@dv-c-foreground, 40%);
                color: @dv-c-accent-1;
            }
        }
    }
}

</style>
