<template>
  <div class="register-cont">
    <h1 class="display-1">Sign Up</h1>
    <form>
      <v-text-field
        v-model="name"
        v-validate="'required'"
        :error-messages="errors.collect('name')"
        label="Name"
        data-vv-name="name"
        required
      ></v-text-field>
      <v-text-field
        v-model="username"
        v-validate="'required|min:5'"
        :error-messages="errors.collect('username')"
        label="Username"
        data-vv-name="username"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
        brwoser-autocomplete
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-validate="'required|min:5'"
        :error-messages="errors.collect('password')"
        label="Password"
        data-vv-name="password"
        required
      ></v-text-field>
      <v-text-field
        v-model="passwordConfirm"
        v-validate="'required|min:5'"
        :error-messages="errors.collect('passwordConfirm')"
        label="Confirm Password"
        data-vv-name="passwordConfirm"
        required
      ></v-text-field>

      <v-btn type="submit" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
const bcrypt = require('bcrypt-nodejs');

export default {
  $_veeValidate: {
    validator: "new"
  },

  data: () => ({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",    
    dictionary: {
      attributes: {
        email: "E-mail Address"
        // custom attributes
      },
      custom: {
        name: {
          required: () => "Name can not be empty"
        },
        passwordConfirm: {
          required: () => "Password Confirm cannot be empty"
        },
        password: {
          required: () => "Password cannot be empty"
        },
        username: {
          required: () => "Username cannot be empty"
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
      const user = {
        "Username": this.username,
        "Password": bcrypt.hashSync(this.password),
        "Name": this.name,
        "Email": this.email
      };
      this.$validator.validateAll().then(error => {
        if (error) {
          if (this.passwordMatch()) {
            axios.post(`${this.$store.state.apiUrl}/register`, user)
            .then(res => {
              console.log(res);
            })
          } else {
            console.log("password fail");
          }
        } else {
          console.log("global fail");
        }
      });
    },
    passwordMatch() {
      return this.password === this.passwordConfirm;
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.passwordConfirm = "";
      this.$validator.reset();
    }
  }
};
</script>

<style>
.register-cont {
  height: 70vh;
  width: 80%;
}
</style>

