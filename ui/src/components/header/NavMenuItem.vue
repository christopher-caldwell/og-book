<template>
  <router-link :to="route.path" class="link">
    <v-list-tile-action>
      <v-icon>{{ route.icon }}</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title class="nav">{{ route.title }}</v-list-tile-title>
    </v-list-tile-content>
  </router-link>
</template>

<script>
export default {
  props: {
    route: Object
  }
};
</script>

<style scoped>
.link {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 20px 20px 20px 0;
}
.nav {
  color: white;
  font-size: 150%;
}
</style>
