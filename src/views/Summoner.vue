<template>
  <div class="mt-3">
    <v-data-table
        v-model="selected"
        item-key="gameId"
        :headers="headers"
        :items="items"
        :loading="loading"
        multi-sort
        hide-default-footer
        :items-per-page="itemsPerPage"
        class="elevation-1 my-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Summoner</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
              v-model="summoner.name"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
          <v-btn
              :disabled="!summoner.name"
              class="ml-4"
              :dark="!!summoner.name"
              @click="searchFunc">검색</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="">
          mdi-eye
        </v-icon>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-btn
          class="ma-2"
          color="orange darken-2"
          :dark="page > 1"
          small
          :disabled="page < 2"
          @click="getMatchList(--page)"
      ><v-icon dark>mdi-arrow-left</v-icon></v-btn>
      <v-chip class="ma-2" label>{{page}}</v-chip>
      <v-btn
          class="ma-2"
          color="orange darken-2"
          :dark="!(items.length < 1)"
          small
          :disabled="items.length < 1"
          @click="getMatchList(++page)"
      ><v-icon dark>mdi-arrow-right</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
import api from '@/axios/index'

export default {
  data: () => ({
    page: 1,
    itemsPerPage: 20,
    summoner: {
      name: '',
    },
    items: [],
    singleSelect: false,
    selected: [],
    loading: false,
    headers: [
      { text: 'timeAgo', value: 'timeAgo' },
      { text: 'gameId', align: 'start', value: 'gameId' },
      { text: 'gameMode', value: 'gameMode' },
      { text: 'platformId', value: 'platformId' },
      { text: 'victory', value: 'victory' },
      { text: 'Details', value: 'actions', sortable: false, filterable: false }
    ]
  }),
  mounted () {
  },
  methods: {
    sleep(ms) {
      return new Promise((r) => setTimeout(r, ms));
    },
    searchFunc() {
      this.loading = true
      this.page = 1
      const that = this
      this.items = []
      api.searchSummoner(encodeURI(this.summoner.name)).then(res => {
        this.summoner = {...res, name: that.summoner.name}
        this.getMatchList()
      }).catch(() => {
        this.loading = false
      })
    },
    getMatchList (page) {
      this.loading = true
      this.page = page || this.page // only when got page param, update this.page
      this.items = [] // clear before anything
      const puuid = this.summoner.puuid
      api.searchMatches(puuid, (this.page - 1) * 2, this.itemsPerPage).then(res => {
        this.sleep(1000).then(() => {
          if (res.length < 1) {
            this.loading = false
            this.$store.commit('SNACKBAR', {text: '대전 기록이 없습니다.', color: 'red'})
            return
          }
          res.forEach(matchId => {
            api.getMatchData(matchId).then(res2 => {
              const isWinner = res2.info.participants.find(v => v.puuid === puuid).win
              const timeAgo = this.timeCvt(res2.info.gameEndTimestamp)
              //push into items
              this.items.push({
                ...res2.metadata,
                ...res2.info,
                victory: isWinner ? '승' : '패',
                timeAgo
              })
            }).catch(() => {
              this.loading = false
            }).finally(() => {
              if(this.items.length === this.itemsPerPage) {
                this.loading = false
                this.items.sort((a,b) => b.gameEndTimestamp - a.gameEndTimestamp)
              }
            })
          })
        })
      }).catch(() => {
        this.loading = false
      })
    },
    // https://stackoverflow.com/questions/47253206/convert-milliseconds-to-timestamp-time-ago-59m-5d-3m-etc-in-javascript
    timeCvt(millsec) {
      const periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
      };

      const diff = Date.now() - millsec;
      if (diff > periods.month) {
        // it was at least a month ago
        return Math.floor(diff / periods.month) + "달 전";
      } else if (diff > periods.week) {
        return Math.floor(diff / periods.week) + "주 전";
      } else if (diff > periods.day) {
        return Math.floor(diff / periods.day) + "일 전";
      } else if (diff > periods.hour) {
        return Math.floor(diff / periods.hour) + "시간 전";
      } else if (diff > periods.minute) {
        return Math.floor(diff / periods.minute) + "분 전";
      }
      return "방금 전";
    }
  },
  computed: {
  },
  watch: {
  },
}
</script>
