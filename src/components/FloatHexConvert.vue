<template>
<div class="float-hex">
    <div class="comment">
        Convert floating point to/from hexadecimal
    </div>
    <div class="converter">
        <div class="fh-row">
            <div class="input-item checkbox">
                <input type="checkbox" id="little-endian-f" v-model="littleEndian" checked>
                <label for="little-endian-f">Little endian</label>
            </div>
            <div class="input-item">
                <label>Decimals</label>
                <input type="number" v-model="decimalPoints">
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

export interface IFloatHexData {
    input: string;

    littleEndian: boolean;

    decimalPoints: number;
}

export default Vue.extend({
    name: "float-hex-convert",
    data(): IFloatHexData {
        return {
            input: "",
            littleEndian: true,
            decimalPoints: 2,
        };
    },
    computed: {
        cleanInput(): string {
            return this.input.replace(/[\s+,]/, "");
        },
        result(): string {
            if (this.input === "") {
                return "N/A";
            } else if (this.input.startsWith("0x")) {
                return this.toFloat(this.cleanInput, this.littleEndian).toFixed(this.decimalPoints);
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
        toFloat(value: string, littleEndian: boolean): number {
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

            let rawVal = Number.parseInt(padVal, 16);

            let sign = (rawVal >>> 31) ? -1 : 1;
            let exp = (rawVal >>> 23 & 0xFF) - 127;

            let mant = ((rawVal & 0x7FFFFF) + 0x800000).toString(2);

            // Check for +/-Inf, NaN
            if ((rawVal >>> 23 & 0xFF) == 0xFF) {
                if ((rawVal & 0x7FFFFF) == 0) {
                    return sign * Infinity;
                }

                return NaN;
            }

            let f = 0;
            for (let i = 0; i < mant.length; ++i) {
                f += parseInt(mant[i]) ? Math.pow(2, exp) : 0;
                --exp;
            }

            return f * sign;
        },
        toHex(value: number, littleEndian: boolean): string {
            const toHex = (i: number) => ("00" + i.toString(16)).slice(-2);
            let view = new DataView(new ArrayBuffer(4));
            view.setFloat32(0, value);

            let hex = Array.apply(null, { length: 4 })
                .map((_: any, i: number) => toHex(view.getUint8(i)))
                .join("");

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

