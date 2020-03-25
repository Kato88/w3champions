<template>
  <v-container class="profile">
    <v-row>
      <v-col cols="12">
        <v-card tile>
          <v-card-title>
            <span class="playerTag">
              {{ battleTag }}
            </span>
          </v-card-title>
          <v-tabs>
            <v-tabs-slider></v-tabs-slider>
            <v-tab class="profileTab" :href="`#tab-1`">Profile</v-tab>
            <v-tab class="profileTab" :href="`#tab-2`">Match History</v-tab>
            <v-tab-item :value="'tab-1'">
              <v-card-text v-if="!loadingProfile">
                <v-row>
                  <v-col cols="3">
                    <player-profile-avatar :mmr="mmr" :place="profile.ladder[0].rank"/>
                  </v-col>
                  <v-col cols="5">
                    <v-tabs>
                      <v-tabs-slider></v-tabs-slider>
                      <v-tab class="profileTab" :href="`#tab-1`">{{$t("gameModes.GM_1ON1")}}</v-tab>
                      <v-tab class="profileTab" :href="`#tab-2`">{{$t("gameModes.GM_2ON2")}}</v-tab>
                      <v-tab-item :value="'tab-1'">
                        <v-data-table
                          hide-default-footer
                          :headers="raceHeaders"
                          :items="profile.stats"
                        >
                          <template v-slot:item.race="{ item }">
                            <span>{{ $t("races." + raceEnums[item.race]) }}</span>
                          </template>
                          <template v-slot:item.wins="{ item }">
                            <span class="won">{{ item.wins }}</span>
                          </template>
                          <template v-slot:item.losses="{ item }">
                            <span class="lost">{{ item.losses }}</span>
                          </template>
                          <template v-slot:item.percentage="{ item }"
                            >{{ item.percentage }}%</template
                          >
                        </v-data-table>
                      </v-tab-item>
                    </v-tabs>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-text
                v-if="loadingProfile"
                style="min-height: 500px"
                class="text-center"
              >
                <v-progress-circular
                  style="margin-top: 180px;"
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-card-text>
            </v-tab-item>
            <v-tab-item :value="'tab-2'">
              <v-card-title>Match History</v-card-title>
              <matches-grid
                v-model="matches"
                :totalMatches="totalMatches"
                @pageChanged="onPageChanged"
                :itemsPerPage="15"
                :alwaysLeftName="battleTag"
                :only-show-enemy="true"
              ></matches-grid>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { PlayerProfile } from "../store/player/types";
import { EGameMode, ERaceEnum, Match } from "../store/typings";
import MatchListItem from "../components/MatchListItem.vue";
import MatchesGrid from "../components/MatchesGrid.vue";
import { Ranking } from "../store/ranking/types";
import XpBar from "../components/XpBar.vue";
import MmrMarker from "@/components/MmrMarker.vue";
import PlayerProfileAvatar from "@/components/PlayerProfileAvatar.vue";

@Component({
  components: {
    PlayerProfileAvatar,
    MmrMarker,
    MatchListItem,
    MatchesGrid,
    XpBar
  }
})
export default class PlayerView extends Vue {
  @Prop() public name!: string;
  @Prop() public tag!: string;

  public gameModeEnums = EGameMode;
  public raceEnums = ERaceEnum;

  public raceHeaders = [
    {
      text: "Race",
      align: "start",
      sortable: false,
      value: "race"
    },
    {
      text: "Wins",
      align: "start",
      sortable: false,
      value: "wins"
    },
    {
      text: "Losses",
      align: "start",
      sortable: false,
      value: "losses"
    },
    {
      text: "Winrate",
      align: "start",
      sortable: false,
      value: "percentage"
    }
  ];

  @Watch("battleTag")
  onBattleTagChanged() {
    this.init();
  }

  get profile(): PlayerProfile {
    return this.$store.direct.state.player.playerProfile;
  }

  get loadingMatches(): boolean {
    return this.$store.direct.state.player.loadingRecentMatches;
  }

  get loadingProfile(): boolean {
    return this.$store.direct.state.player.loadingProfile;
  }

  get battleTag(): string {
    return this.name + "#" + this.tag;
  }

  public getWinRate(rank: Ranking) {
    const winRate = (rank.wins * 100) / (rank.wins + rank.losses);

    if (isNaN(winRate)) {
      return 0;
    }

    return winRate;
  }
  onPageChanged(page: number) {
    this.getMatches(page);
  }

  get totalMatches(): number {
    return this.$store.direct.state.player.totalMatches;
  }

  get matches(): Match[] {
    return this.$store.direct.state.player.matches;
  }

  get mmr() {
    if (!this.profile.ladder) {
      return 0;
    }

    return this.profile.ladder.filter(x => x.mode === EGameMode.GM_1ON1)[0]
      .bucket;
  }

  public getMatches(page?: number) {
    this.$store.direct.dispatch.player.loadMatches(page);
  }

  mounted() {
    this.init();
  }

  private init() {
    this.$store.direct.commit.player.SET_BATTLE_TAG(this.battleTag);
    this.$store.direct.dispatch.player.loadProfile(this.battleTag);
    this.getMatches();
  }
}
</script>

<style lang="scss" scoped>
.profileTab {
  background-color: #f5f5f5;
}

.theme--dark {
  .profileTab {
    background-color: #2f2f2f;
  }
}

.playerTag {
  margin-left: 10px;
  text-transform: none;
}
</style>
