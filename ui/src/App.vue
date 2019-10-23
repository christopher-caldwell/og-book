<template>
  <v-app >
   <div class="progress-spinner" :id="shown ? 'shown': 'not-shown'">
     <Spinner/>
   </div>
   <Popup/>
   <main :class="shown ? 'app-cont' : ''">
    <v-toolbar app />
    <LoggedOut/>

    <div class="main-cont">
      <router-view/>
    </div>
   </main>
  </v-app>
</template>

<script>
import LoggedOut from "./components/header/LoggedOut";
import Spinner from "./components/util/Spinner";
import Popup from "./components/visitor/dialog/Popup";

export default {
  name: "App",
  components: {
    LoggedOut,
    Spinner,
    Popup
  },
  
  computed: {
    shown(){
      return this.$store.state.loading
    } 
  }
};
</script>

<style>
.app-cont {
  filter: blur(3px);
  position: relative;
  z-index: 3;
}
.main-cont {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
  color: black;
}
.progress-spinner {
  position: absolute;
  top: 46%;
  left: 46%;
  z-index: 100000;
  transition: all 0.3s;
  opacity: 0;
}
#shown {
  opacity: 1;
}

</style>
