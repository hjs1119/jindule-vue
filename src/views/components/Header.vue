<template>
  <v-card>
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-3">
        {{ title }}
      </h1>
    </v-card-title>

    <v-tabs
      color="basil"
      grow
    >
      <v-tab
        v-for="item in loggedMenus"
        :key="item.id"
        :to="item.route"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>

  </v-card>
</template>

<script>

export default {
  data: () => ({
    menus: [{id: 1, route: 'home', name: 'LCK 일정'}, {id: 2, route: 'summoner', name: '소환사 검색'}],
    title: 'JINDULE'
  }),
  computed: {
    // 로그인 여부에 따라 탭 변경
    authTab () {
      return this.$store.getters.isAuth ? {id: 3, route: 'logout', name: '로그아웃'} : {id: 3, route: 'login', name: '로그인'}
    },
    loggedMenus () {
      return [...this.menus, this.authTab]
    }
  },
  methods: {
    movePage() {

    }
  }
}
</script>
