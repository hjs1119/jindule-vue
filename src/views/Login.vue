<template>
  <v-main class="mt-15">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="dark">
              <v-toolbar-title>LOGIN</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  name="login"
                  v-model="userInfo.id"
                  label="ID"
                  type="text"
                  :rules="[v => !!v || '필수 입력사항입니다.']"
                ></v-text-field>
                <v-text-field
                  id="password"
                  v-model="userInfo.pwd"
                  name="password"
                  label="Password"
                  type="password"
                  :rules="[v => !!v || '필수 입력사항입니다.']"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="!valid" :dark="valid" @click="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import api from '@/axios/index'

export default {
  name: 'Login',
  data: () => ({
    userInfo: {
      id: 'jindule',
      pwd: '0000'
    },
    valid: false
  }),
  methods: {
    login () {
      console.log(this.userInfo)
      api.login(this.userInfo).then(res => {
        if (res) {
          this.$store.commit('SNACKBAR', { text: '로그인 성공', color: 'green' })
          this.$store.commit('LOGIN', this.userInfo.id)
          this.$router.push('/home')
          return
        }
        this.$store.commit('SNACKBAR', { text: '로그인 실패!!!', color: 'red' })
      }).catch(err => {
        this.$store.commit('SNACKBAR', { text: '로그인 실패!!! - ' + err, color: 'red' })
      })
    }
  }
}
</script>
