<template lang='pug'>
  div
    v-navigation-drawer(v-model="drawer" app clipped)
      v-list.listing-listy.list(dense)
        v-subheader Home
        v-divider
        NavMenuItem(v-for="(route, index) in allowableRoutes" :key="index" :route="route")
      div.find-me
        v-switch(
          :value="darkMode"
          @change="changeDarkMode"
          label='Dark Mode'
          color='red'
          hide-details
        )
    v-app-bar(app clipped-left)
      v-app-bar-nav-icon( @click.stop="drawer = !drawer")
      v-toolbar-title.full-width
        v-row(justify='space-between')
          v-col SW Books
          v-col.flex-end(cols='2') {{ usersName }}
</template>

<script>
import { mapGetters } from 'vuex'
import NavMenuItem from '@/components/header/NavMenuItem.vue'

export default {
  components: {
    NavMenuItem
  },
  data() {
    return {
      drawer: null,
      darkMode: false
    };
  },
  methods: {
    changeDarkMode() {
      window.localStorage.setItem(
        "darkMode",
        JSON.stringify({ darkMode: !this.darkMode })
      );
      this.darkMode = !this.darkMode;
      this.$vuetify.theme.dark = this.darkMode;
    }
  },
  computed: {
    ...mapGetters(['allowableRoutes', 'usersName'])
  },
  mounted() {
    try {
      const isDarkMode = JSON.parse(window.localStorage.getItem("darkMode"))
        .darkMode;
      this.darkMode = isDarkMode;
      this.$vuetify.theme.dark = isDarkMode;
    } catch(error){
      // it's fine, theres no previous dark mode setting
    }
  }
};
</script>

<style lang='sass'>
.find-me
  height: 40px
  width: 130px
  position: absolute
  bottom: 2%
  right: 2%
</style>