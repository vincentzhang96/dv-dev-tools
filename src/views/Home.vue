<template>
  <div class="home">
    <Card>
      <template slot="head">
        <h3>IEEE 754 Float-Hex Converter</h3>
      </template>
      <float-hex-convert/>
    </Card>
    <Card>
      <template slot="head">
        <h3>Int-Hex Converter</h3>
      </template>
      <int-hex-convert/>
    </Card>
    <Card>
      <template slot="head">
        <h3>Ascii Convert</h3>
      </template>
      <ascii-convert/>
    </Card>
    <Card>
      <template slot="head">
        <h3>Color Convert</h3>
      </template>
      <colorizer-convert/>
    </Card>
    <Card>
      <template slot="head">
        <h3>Test card</h3>
      </template>
    </Card>
    <Card>
      <template slot="head">
        <h3>Test card</h3>
      </template>
    </Card>
    <Card>
      <template slot="head">
        <h3>Test card</h3>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import FloatHexConvert from "@/components/FloatHexConvert.vue";
import IntHexConvert from "@/components/IntHexConvert.vue";
import AsciiConvert from "@/components/AsciiConvert.vue";
import Colorizer from "@/components/Colorizer.vue";

export default Vue.extend({
  name: "home",
  components: {
    Card,
    FloatHexConvert,
    IntHexConvert,
    AsciiConvert,
    "colorizer-convert": Colorizer,
  },
});
</script>

<style lang="less" scoped>
@import "./../less/constants.less";

.home {
  column-width: 300px;
  column-gap: 60px;
  width: 80%;
  max-width: 1200px;
  margin: 0px auto;

  .card {
    margin-top: 0;
    margin-bottom: 20px;
    width: 100%;
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

</style>

