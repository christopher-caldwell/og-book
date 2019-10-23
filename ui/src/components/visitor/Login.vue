<template>
  <div class="login-cont">
    <h1 class="display-1">Login</h1>
    <form>
      <v-text-field
        v-model="username"
        v-validate="'required'"
        :error-messages="errors.collect('username')"
        label="Username"
        data-vv-name="username"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-validate="'required'"
        :error-messages="errors.collect('password')"
        label="Password"
        data-vv-name="password"
        required
        type="password"
      ></v-text-field>
      <v-btn type="submit" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Popup from './dialog/Popup';

export default {
  $_veeValidate: {
    validator: "new"
  },
  components: {
    Popup
  },
  data: () => ({
    username: "",
    password: "",
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        username: {
          required: () => "Name can not be empty"
          // custom messages
        },
        password: {
          required: () => "Password cannot be empty"
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize("en", this.dictionary);
  },

  methods: {
    submit(event) {
      event.preventDefault();
      const { state } = this.$store;
      const username = this.username;
      const password = this.password;
      this.$validator.validateAll().then(error => {
        if(error){

          this.$store.commit('toggleLoading');
          axios.post(`${state.apiUrl}/login`, { username, password })
            .then(res => {
              this.$store.commit('toggleLoading');
              this.$store.commit('loginUser', res.data)
              this.$router.push("/")
            })
            .catch(error => {
              console.log(error.response)
              this.$store.commit('toggleLoading');
              this.$store.commit('showPopup', {
                title: "Oops",
                content: "Something went wrong. \nPlease try again.",
                confirmation: "Okay"
                })
            })
        } else {
          console.log("oops");
        } 
      });
    },
    clear() {
      this.username = "";
      this.password = "";
      this.$validator.reset();
    },
  }
};
</script>

<style>
.login-cont {
  width: 50%;
  height: 70vh;
}
</style>
