<template lang='pug'>
  router-view(v-if="isApplicationReady")
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['isApplicationReady'])
    }
  }
</script>