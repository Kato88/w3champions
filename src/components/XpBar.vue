<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-progress-linear
        v-on="on"
        :value="(ranking.level - Math.floor(ranking.level)) * 100"
        height="15"
        :color="barColor ? barColor : color"
      >
        <template>
          <span class="span-color" v-if="isLevelVisible">
            Level {{ Math.floor(ranking.level) }}
          </span>
        </template>
      </v-progress-linear>
    </template>
    <div>
      <span class="level">XP: {{ ranking.xp }}</span>
    </div>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Ranking } from "@/store/ranking/types";

@Component({})
export default class XpBar extends Vue {
  @Prop() public ranking!: Ranking;
  @Prop() public isLevelVisible!: boolean;
  @Prop() public barColor!: string;

  get color() {
    return this.$store.direct.state.darkMode ? "grey" : "black";
  }
}
</script>

<style type="text/css" scoped>
.span-color {
  color: #c6cfc7;
}
</style>
