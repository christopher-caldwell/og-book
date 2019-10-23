<template>
  <div style="height: 0px">
    <v-btn class="menu-toggle" dark @click.stop="drawer = !drawer">Toggle</v-btn>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute dark temporary>
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="route in routes" :key="route.title" class="nav-item">
          <NavMenuItem :route="route"/>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import NavMenuItem from "./NavMenuItem";
import { loggedInRoutes, loggedOutRoutes } from "../../routes/staticRoutes.js";

export default {
  components: {
    NavMenuItem
  },
  computed: {
    routes() {
      return this.$store.state.loggedInUser ? loggedInRoutes : loggedOutRoutes;
    },
    user() {
      return this.$store.state.loggedInUser;
    }
  },
  mounted() {
    console.log(this.$store.state.loggedInUser);
  },
  data() {
    return {
      drawer: null,
      mini: false,
      right: null
    };
  }
};
</script>

<style scoped>
.menu-toggle {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.nav-item {
  margin: 20px;
}
</style>
