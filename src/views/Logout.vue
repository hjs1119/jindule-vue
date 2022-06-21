<template>
  <div></div>
</template>

<script>

export default {
  beforeCreate () {
    this.$store.commit('SNACKBAR', { text: '로그아웃됨' })
    this.$store.commit('LOGOUT')
    this.$router.push('/login').catch((err) => { console.log('push error :', err) })
  }
}
</script>
