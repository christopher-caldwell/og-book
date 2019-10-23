<template>
  <div class="main-cont">
    <Crawl/>
    <div v-if="showMenu" class="shown-menu">
      Showing the menu
    </div>
  </div>
</template>

<script>
import Crawl from "../util/Crawl";
export default {
  components: {
    Crawl
  },
  data(){
    return {
      showMenu: false
    }
  },
  mounted(){
    setTimeout(() => {
      this.showMenu = true
    }, 25000)
  },
};
</script>

<style scoped>
.main-cont {
  position: relative;
  z-index: 1;
  height: 100vh;
  background-color: black;
}
.shown-menu {
  background-color: white;
  height: 100px;
  width: 100px; 
}
</style>
