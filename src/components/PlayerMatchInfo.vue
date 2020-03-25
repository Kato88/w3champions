<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <div :class="textClass">
        <player-icon :left="left" :race="player.race" :mmr="mmr" />
        <div>
          <a
            :class="won"
            v-on="on"
            @mouseover="lazyLoadProfile"
            @click="goToPlayer(name)"
          >
            <mmr-marker
              class="spacing-around-mmr-marker"
              :left="left"
              :mmr="mmr"
            />
            {{ nameWithoutBtag }}
            <span v-if="player.xpChange" :class="won">
              <span v-if="player.xpChange > 0">(+{{ player.xpChange }})</span>
              <span v-else>({{ player.xpChange }})</span>
            </span>
          </a>
        </div>
      </div>
    </template>
    <div v-if="profile.data">
      <p>
        {{ nameWithoutBtag }}#{{ btag }}
        <mmr-marker class="spacing-around-mmr-marker-popup" :mmr="mmr" />
      </p>
      <p />
      Wins: {{ profile.data.stats.total.wins }} | Losses:
      {{ profile.data.stats.total.losses }} | Total:
      {{ profile.data.stats.total.wins + profile.data.stats.total.losses }}
    </div>
    <div v-else>
      <p>
        {{ nameWithoutBtag }}#{{ btag }}
        <span v-if="left">
          <mmr-marker class="spacing-around-mmr-marker-popup" :mmr="mmr" />
        </span>
      </p>
      <p>Wins: ... | Losses: ... | Total: ...</p>
    </div>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { ERaceEnum } from "@/store/typings";
import PlayerIcon from "@/components/PlayerIcon.vue";
import { PlayerProfile } from "../store/player/types";
import MmrMarker from "@/components/MmrMarker.vue";

@Component({
  components: { MmrMarker, PlayerIcon }
})
export default class PlayerMatchInfo extends Vue {
  @Prop() public player!: {
    battleTag: string;
    race: ERaceEnum;
    bucket: number;
    won?: boolean;
    xpChange?: number;
  };

  @Prop() public left!: boolean;

  get won() {
    if (Object.prototype.hasOwnProperty.call(this.player, "won")) {
      return this.player.won ? "won" : "lost";
    }

    return "";
  }

  get mmr() {
    return this.player.bucket;
  }

  get textClass() {
    return this.left ? "text-end" : "text-start";
  }

  get name() {
    return this.player.battleTag;
  }

  get nameWithoutBtag() {
    return this.name.split("#")[0];
  }

  get btag() {
    return this.name.split("#")[1];
  }

  public profile = {} as PlayerProfile;

  private async lazyLoadProfile() {
    if (!this.profile.account) {
      this.profile = await this.$store.direct.getters.profileService.retrieveRawProfile(
        this.name
      );
    }
  }

  public goToPlayer(playerName: string) {
    const parts = playerName.split("#");

    this.$router
      .push({
        path: "/player/" + parts[0] + "/" + parts[1]
      })
      .catch(err => {
        return err;
      });
  }
}
</script>

<style lang="scss">
.btag {
  font-size: 10px;
}

.spacing-around-mmr-marker-popup {
  margin-right: 0.6em;
}
.spacing-around-mmr-marker {
  margin-left: 0.8em;
  margin-right: 0.8em;
}

.won {
  color: green !important;
}

.lost {
  color: red !important;
}
</style>
