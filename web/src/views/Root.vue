<template lang='pug'>
  div.main-cont
    Crawl
</template>

<script>
import Crawl from '@/components/util/Crawl'

export default {
  components: {
    Crawl
  },
}
</script>

<style lang='sass' scoped>
.main-cont
  position: relative
  z-index: 1
  height: 92vh
  background-color: black
  overflow: hidden
.shown-menu
  background-color: white
  height: 100px
  width: 100px
</style>
