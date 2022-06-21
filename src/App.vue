<template>
  <v-app>
    <Header/>
    <v-main height="auto">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
      </transition>
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Header from './views/components/Header'
import Snackbar from './views/components/Snackbar'

export default {
  name: 'App',
  components: {
    Header,
    Snackbar
  }
}
</script>
