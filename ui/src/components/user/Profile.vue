<template>
  <div class="profile-cont">
    <div class="profile-header">
      <h1 class="display-3">Profile</h1>
      <v-btn>Edit</v-btn>
    </div>
    <hr/>
    <div class="profile-content">
      <div class="row">
        <div>
          <h1 class="display-1">First Name:</h1>
          <p class="headline">{{user.name}}</p>
        </div>
        <div>
          <h1 class="display-1">Last Name:</h1>
          <p class="headline">{{user.name}}</p>
        </div>
      </div>
      <div class="row">
        <div>
          <h1 class="display-1">Username:</h1>
          <p class="headline">{{user.username}}</p>
        </div>
        <div>
          <h1 class="display-1">Email:</h1>
          <p class="headline">{{ user.email }}</p>
        </div>
      </div>
    </div>
      <hr/>
      <div class="row">
        <div/>
        <v-btn color="success">Save</v-btn>
      </div>
  </div>
</template>

<script>
export default {
  computed: {
    user(){
      return this.$store.state.loggedInUser
    } 
  },
  mounted(){
    
  }
}
</script>

<style scoped>

h1 {
  text-align: right;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.profile-cont {
  width: 85%;
  height: 75vh;
  padding: 10px; 
}
.profile-content {
  margin-top: 6vh;
  width: 80%;
}
.row {
  display: flex;
  justify-content: space-between;
  margin: 10vh 0;
}
</style>
