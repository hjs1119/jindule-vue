<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="cancelSnack()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  computed: {
    snackbar () {
      return this.$store.state.snackbar
    },
    snackbarColor () {
      return this.$store.state.snackbarColor
    },
    text () {
      return this.$store.state.snackbarText
    }
  },
  methods: {
    cancelSnack () {
      this.$store.commit('SNACKBAR_TIMEOUT')
    }
  }
}
</script>
