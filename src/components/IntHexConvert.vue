<template>
<div class="float-hex">
    <div class="comment">
        Convert int to/from hexadecimal
    </div>
    <div class="converter">
        <div class="fh-row">
            <div class="input-item checkbox">
                <input type="checkbox" id="little-endian-i" v-model="littleEndian" checked>
                <label for="little-endian-i">Little endian</label>
            </div>
            <div class="input-item checkbox">
                <input type="checkbox" id="unsigned" v-model="unsigned" checked>
                <label for="unsigned">Unsigned</label>
            </div>
        </div>
        
        <div class="fh-row">
            <div class="num-in">
                <input type="text" id="input-text" v-model="input" class="fixed-width">
                <div class="overlay">{{ displayLength }}</div>
            </div>
            <div class="mid-icon"><v-icon name="arrow-right" /></div>
            <div class="result fixed-width">{{ result }}</div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";

export interface IIntHexData {
    input: string;

    littleEndian: boolean;

    unsigned: boolean;
}

export default Vue.extend({
    name: "int-hex-convert",
    data(): IIntHexData {
        return {
            input: "",
            littleEndian: true,
            unsigned: false,
        };
    },
    computed: {
        cleanInput(): string {
            return this.input.replace(/[\s+,]/, "");
        },
        result(): string {
            if (this.input === "") {
                return "N/A";
            } else if (this.cleanInput.startsWith("0x")) {
                return String(this.toInt(this.cleanInput, this.littleEndian, this.unsigned));
            } else {
                return this.toHex(Number(this.cleanInput), this.littleEndian);
            }
        },
        displayLength(): number {
            let ret = this.cleanInput.length;
            if (this.cleanInput.startsWith("0x")) {
                ret -= 2;
            }

            return ret;
        }
    },
    methods: {
        swapHexPairs(val: string): string {
                let a = val.substr(0, 2);
                let b = val.substr(2, 2);
                let c = val.substr(4, 2);
                let d = val.substr(6, 2);
                return d + c + b + a;
        },
        toInt(value: string, littleEndian: boolean, unsigned: boolean): number {
            if (value.startsWith("0x")) {
                value = value.substring(2);
            }

            let padVal = value;
            if (littleEndian) {
                padVal = padVal.padEnd(8, "0");
                padVal = this.swapHexPairs(padVal);
            } else {
                padVal = padVal.padStart(8, "0");
            }

            let ret = Number.parseInt(padVal, 16);

            if (!unsigned && (ret & 0x80000000) != 0) {
                ret = -(0xFFFFFFFF - ret + 1);
            }

            return ret;
        },
        toHex(value: number, littleEndian: boolean): string {
            if (value < 0) {
                value = 0xFFFFFFFF + value + 1;
            }
            
            let hex = value.toString(16);

            if (littleEndian) {
                hex = hex.padEnd(8, "0");
                hex = this.swapHexPairs(hex);
            } else {
                hex = hex.padStart(8, "0");
            }

            return "0x" + hex;
        }
    }
});
</script>

<style lang="less" scoped>
@import "./../less/constants.less";

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

        .mid-icon {
            padding: 3px 4px 0;
        }

        .result {
            padding-top: 1px;
        }

        .num-in {
            position: relative;

            .overlay {
                text-align: right;
                position: absolute;
                right: 8px;
                top: 2px;
                color: fade(@dv-c-accent-3, 50%);
            }
        }
    }
}

</style>

