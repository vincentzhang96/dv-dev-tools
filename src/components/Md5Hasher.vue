<template>
<div class="md5">
    <div class="comment">
        Calculate MD5 hash
    </div>
    <div class="converter">
        <div class="fh-row">
        </div>
        
        <div class="input-block">
            <textarea v-model="text" rows="3" class="fixed-width" />
        </div>
        <div class="result fixed-width">{{ hashed }}</div>
    </div>

</div>
</template>

<script lang="ts">
import Vue from "vue";
import md5 from "blueimp-md5";

interface IMd5Data {
    text: string;
}

export default Vue.extend({
    name: "md5-hash",
    data: (): IMd5Data => {
        return {
            text: "",
        }
    },
    computed: {
        hashed(): string {
            let txt = this.text;
            return md5(txt);
        }
    }
});
</script>

<style lang="less" scoped>
.md5 {
    .converter {
        margin-top: 10px;
        
        .input-block {
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
            textarea {
                width: 100%;
                box-sizing: border-box;
            }

        }
    }
}
</style>

