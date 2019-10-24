<template lang="pug">
  v-app
    Header
    v-content
      router-view
    Footer
</template>

<script>
import Header from "@/components/header/Header.vue";
const Footer = () => import("@/components/footer/Footer.vue");

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang='sass'>
  @import '@/styles/main.sass'
</style>
