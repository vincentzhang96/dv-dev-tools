<template>
<div class="ascii-convert">
    <div class="comment">
        Convert to/from ASCII strings
    </div>

    <div class="converter">
        <div class="fh-row">
            <div class="input-item checkbox">
                <input type="checkbox" id="is-ascii" v-model="inputIsText" checked>
                <label for="is-ascii">Text to ASCII</label>
            </div>
            <div class="input-item checkbox">
                <input type="checkbox" id="show-hex" v-model="showHex" checked>
                <label for="show-hex">Show as hex</label>
            </div>
        </div>
        
        <div class="input-block">
            <textarea v-model="text" rows="3" class="fixed-width" />
        </div>
        <div class="input-block">
            <textarea v-model="converted" rows="3" class="fixed-width" readonly />
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export interface IAsciiConvertData {

    text: string;

    inputIsText: boolean;

    showHex: boolean;
}

export default Vue.extend({
    name: "ascii-convert",
    data: (): IAsciiConvertData => {
        return {
            text: "",
            inputIsText: true,
            showHex: true,
        };
    },
    computed: {
        converted(): string {
            if (this.inputIsText) {
                return this.convertToAscii(this.text, this.showHex);
            }

            return "";
        }
    },
    methods: {
        convertToAscii(input: string, toHex: boolean): string {
            const toAscii = (a: string): number => a.charCodeAt(0);

            const breakdown = [...input].map(toAscii);

            let operator: (n: number) => string;
            if (toHex) {
                operator = (n) => ("00" + n.toString(16)).slice(-2);
            } else {
                operator = (n) => n.toString();
            }

            return breakdown.map(operator).join(" ");
        }
    }
});
</script>

<style lang="less" scoped>
@import "./../less/constants.less";

.ascii-convert {
    width: 100%;

    .converter {
        margin-top: 10px;
        
        .fh-row {
            display: flex;
            flex-direction: row;
            margin-bottom: 8px;

            &:last-child {
                margin-bottom: 0;
            }

            .input-item {
                padding-right: 8px;

                label {
                    margin-right: 8px;
                }
            }
        }

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

