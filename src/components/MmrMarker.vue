<template>
  <span :class="alignment()" class="mmr-number" :style="paintMMR">
    {{mmr}}
  </span>
</template>

<script lang="ts">
  import Vue from "vue";
  import {Component, Prop} from "vue-property-decorator";

  @Component({})
export default class MmrMarker extends Vue {
  @Prop() mmr!: number;
  @Prop() left!: boolean;

  alignment() {
    return this.left ? "mmr-icon-align-right" : "mmr-icon-align-left";
  }

  get paintMMR() {
    switch (this.mmr) {
      case 1:
      case 2:
        return this.createStyle("#805A46");
      case 3:
      case 4:
        return this.createStyle("#909090");
      case 5:
      case 6:
        return this.createStyle("#ABA63A");
      case 7:
      case 8:
        return this.createStyle("#00A2ED");
      case 9:
      case 10:
        return this.createStyle("#ff6700");
      default:
        return this.createStyle("#805A46");
    }
  }

  private createStyle(color: string) {
    return (
      "background: url('https://api.iconify.design/mdi-shield.svg?color=%23" +
      color.substring(1) +
      "') no-repeat center center / contain;")
    }
  }
</script>

<style>
.mmr-number {
  vertical-align:middle;
  padding-bottom: 3px;
  width: 24px;
  color: #ffffff;
  text-align: center;
}

.mmr-icon-align-right {
  float: right;
}

.mmr-icon-align-left {
  float: left;
}

</style>
