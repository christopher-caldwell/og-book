<template lang="pug">
  v-app
    Header
    v-content
      router-view(v-if="applicationIsReady")
    Footer
</template>

<script>
import { mapActions } from 'vuex'
import Header from '@/components/header/Header.vue'
import Footer from '@/components/footer/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapActions(['boot'])
  },
  computed: {
    applicationIsReady() {
      return this.$store.state.applicationIsReady
    }
  },
  created() {
    this.boot()
  }
}
</script>

<style lang='sass'>
  @import '@/styles/main.sass'
</style>
