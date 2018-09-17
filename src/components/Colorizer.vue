<template>
<div class="color-convert">
    <div class="comment">
        Convert and visualize colors
    </div>

    <div class="converter">
        <input type="text" id="color-input" v-model="input" class="fixed-width">

        <ul class="converted">
            <li>{{ hexARGB }}</li>
            <li>{{ hashRGB }}</li>
            <li>{{ rgbTriplet }}</li>
            <li>{{ cssRgbTriplet }}</li>
            <li>{{ rgbFloat }}</li>
        </ul>

        <div class="visualizer" :style="{backgroundColor: cssRgbTriplet}" />
        <div class="vis-strip" :style="{backgroundColor: 'rgb(' + parsed.red + ', 0, 0)', borderColor: 'red'}" />
        <div class="vis-strip" :style="{backgroundColor: 'rgb(0, ' + parsed.green + ', 0)', borderColor: 'green'}" />
        <div class="vis-strip" :style="{backgroundColor: 'rgb(0, 0, ' + parsed.red + ')', borderColor: 'blue'}" />
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export interface IColorizerData {

    input: string;
}

interface INormalizedColor {
    red: number;
    green: number;
    blue: number;
    alpha?: number;
}

export default Vue.extend({
    name: 'colorizer-convert',
    data: (): IColorizerData => {
        return {
            input: "",
        };
    },
    computed: {
        parsed(): INormalizedColor {
            let input = this.input;
            let ret: INormalizedColor = {
                red: 0,
                green: 0,
                blue: 0,
            };

            let preHexO = input.startsWith("0x");
            let preHash = input.startsWith("#");

            if (preHexO || preHash) {
                let trim = preHash ? input.substring(1) : input.substring(2);
                let iVal: number;
                if (trim.length == 3 && preHash) {
                    trim = [...trim].map((v) => v + "" + v).join('');
                }
                
                iVal = parseInt(trim, 16);
                ret.red = (iVal >> 16) & 0xFF;
                ret.green = (iVal >> 8) & 0xFF;
                ret.blue = (iVal & 0xFF);

                if (trim.length == 8) {
                    ret.alpha = (iVal >> 24) & 0xFF;
                }
            }

            return ret;
        },
        hexARGB(): string {
            let ret = "";
            let c = this.parsed;
            if (c.alpha != null) {
                ret = this.toHexByte(c.alpha);
            }

            return "0x" + ret + this.toHexByte(c.red) + this.toHexByte(c.green) + this.toHexByte(c.blue);
        },
        hashRGB(): string {
            let c = this.parsed;

            return "#" + this.toHexByte(c.red) + this.toHexByte(c.green) + this.toHexByte(c.blue);
        },
        rgbTriplet(): string {
            let c = this.parsed;
            let body = c.red + ", " + c.green + ", " + c.blue;
            if (c.alpha != null) {
                body += ", " + c.alpha;
            }

            return body;
        },
        cssRgbTriplet(): string {
            let c = this.parsed;
            let prefix = "rgb";
            let body = "(" + c.red + ", " + c.green + ", " + c.blue;
            if (c.alpha != null) {
                prefix = "rgba";
                body += ", " + this.toNiceFloat(c.alpha / 255);
            }

            return prefix + body + ")";
        },
        rgbFloat(): string {
            let c = this.parsed;
            let body = this.toNiceFloat(c.red / 255) + ", " + this.toNiceFloat(c.green / 255) + ", " + this.toNiceFloat(c.blue / 255);
            if (c.alpha != null) {
                body += ", " + this.toNiceFloat(c.alpha / 255);
            }

            return body;
        }
    },
    methods: {
        toHexByte(n: number): string {
            return ('00' + n.toString(16)).slice(-2);
        },
        toNiceFloat(n: number): string {
            return n.toLocaleString(undefined, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 3,
            });
        }
    }
});
</script>

<style lang="less" scoped>
@import "./../less/constants.less";

.color-convert {

    .converter {
        margin-top: 10px;

        .converted {
            margin: 8px 0;
        }

        .visualizer {
            margin-top: 10px;
            border: 1px solid black;
            height: 100px;
        }

        .vis-strip {
            margin-top: 2px;
            border-top: 4px solid;
            height: 10px;
        }
    }
}

</style>

