<template>
  <div>
    <div class="player-profile-picture" />
    <mmr-marker style="float: none" size="55" class="mmr-marker" :mmr="mmr" />
    <div class="player-flage w3-yellow-text">
      <div class="player-rank-label">Rank</div>
      <div class="player-rank spacing">{{ place.rank }}</div>
    </div>
    <br />
    <br />
    <xp-bar is-level-visible="true" :ranking="place" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ERaceEnum } from "@/store/typings";
import MmrMarker from "@/components/MmrMarker.vue";
import XpBar from "@/components/XpBar.vue";
import { Ranking } from "@/store/ranking/types";

@Component({
  components: { XpBar, MmrMarker }
})
export default class PlayerProfileAvatar extends Vue {
  @Prop() race!: ERaceEnum;
  @Prop() place!: Ranking;
  @Prop() mmr!: number;

  raceIcon() {
    return "race-icon-" + ERaceEnum[this.race];
  }
}
</script>

<style lang="scss" scoped>
.player-profile-picture {
  background-image: url("../assets/raceIcons/HUMAN_1.webp");
  width: 200px;
  height: 200px;
  border-top: 10px solid #bf9683;
  border-left: 10px solid #a8745e;
  border-bottom: 10px solid #885b5b;
  border-right: 10px solid #5e3333;
  outline: solid 2px #3f434b;
  background-position: center;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
}

.player-flage {
  margin-top: 2px;
  padding-top: 3em;
  height: 160px;
  width: 160px;
  background: rgba(2, 27, 112, 0.5);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  clip-path: polygon(0 0, 100% 0, 100% 81%, 50% 100%, 0 80%);
}

.player-rank-label {
  font-size: 1.3em;
  margin-top: 1.3em;
}
.player-rank {
  font-size: 2.3em;
  margin-top: 0.3em;
}

.mmr-marker {
  float: none;
  position: fixed;
  margin-left: 103px;
  margin-top: -11px;
  z-index: 10;
}
</style>
