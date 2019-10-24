<template lang='pug'>
  div.splash-menu-inner-root.flex-centered(:class="menuClass")
    div.link-row.flex-centered
      v-row.link-row(justify='space-between')
        v-col(cols='5')
          div.link-container.flex-centered
            router-link.splash-link#login-link(to='/login') Login
        v-col(cols='5')
          div.link-container.flex-centered
            router-link.splash-link#register-link(to='/login') Register
</template>
<script>
  export default {
    name: 'SplashMenu',
    props: {
      isShown: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      menuClass(){
        return this.isShown ? 
          'show' :
          'hide'
      }
    }
  }
</script>

<style lang='sass' scoped>
  @import '@/styles/variables.sass'
  .splash-menu-inner-root
    width: 100%
    height: 30px
    transition: all 0.8s
  .link-row
    width: 80%
  .link-container
    width: 100%
    padding: 30px
    border: 3px $star-wars-yellow solid
    border-radius: 5%
  .splash-link
    color: $star-wars-yellow
    font-family: 'star-wars', arial
  .hide
    opacity: 0
  .show
    opacity: 1

</style>