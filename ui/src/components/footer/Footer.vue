<template lang='pug'>
  v-footer.footer
    div.flex-space-between.footer-container
      span &copy; SWBC
      a#primary-color Security
      a#primary-color Privacy
</template>

<style lang='sass' scoped>
  .footer
    position: fixed
    bottom: 0
    width: 100%
  .footer-container
    width: 100%
    & *
        font-size: 0.7em
</style>