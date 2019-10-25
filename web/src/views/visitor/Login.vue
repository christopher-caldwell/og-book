<template lang="pug">
  div.login-root.flex-centered#space
    div.stars
    div.stars
    div.stars
    div.stars
    div.stars
    div.stars
    div.stars
    div.stars
    div.stars
    Snackbar(
      v-model="showSnackbar"
      :text="snackbarText"
      :snackbarColor="snackbarColor"
      :snackbarTimeout="snackbarTimeout"
    )
    form.login-box
      v-row.login-header-row
        h1.star-wars-font#login-header Login
      v-row
        v-text-field(
          label="Email"
          outlined
          :clearable="true"
          :error-messages="inputErrorMessages"
          :value="emailAddress"
          @input="updateEmail"
          :disabled="isLoading"
          :loading="isLoading"
        )
      v-row
        v-text-field(
          :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          label="Password"
          outlined
          :type="showPass ? 'text' : 'password'"
          :clearable="true"
          :error-messages="passwordErrors"
          v-model="$v.password.$model"
          @click:append="showPass = !showPass"
          :disabled="isLoading"
          :loading="isLoading"
        )
      v-row
        router-link(:to={name: 'ForgotPassword'}) Forgot password?
      v-row(justify='end')
        v-btn(
          @click.prevent="submitEmail"
          type='submit'
          :disabled="isLoading"
        ) Login

</template>

<script>
import { mapActions } from 'vuex'
import { email, required } from 'vuelidate/lib/validators'
import Snackbar from '@/components/interaction/Snackbar.vue'

export default {
  name: 'Login',
  components: {
    Snackbar,
  },
  data() {
    return {
      showPass: false,
      snackbarText: '',
      showSnackbar: false,
      isInputErrors: false,
      inputErrorMessages: [],
      isLoading: false,
      snackbarColor: '',
      snackbarTimeout: 2000,
      emailAddress: '',
      password: ''
    }
  },
  validations: {
    emailAddress: {
      email,
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(['registerUser']),
    updateEmail(emailAddress) {
      this.emailAddress = emailAddress
    },
    submitEmail() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isInputErrors = true
        !this.$v.emailAddress.email && this.inputErrorMessages.push('Must be a valid email')
        !this.$v.emailAddress.required && this.inputErrorMessages.push('Field is required')
      } else {
        console.log('validation reset')
        this.$v.$reset
        this.inputErrorMessages = []
        this.isInputErrors = false
        this.login()
      }
    },
    async login() {
      this.isLoading = true
      try {
        setTimeout(() => {
          this.snackbarTimeout = 0
          this.snackbarColor = 'blue accent-2'
          this.snackbarText = 'Still loading..'
          this.showSnackbar = true
        }, 5000)
        await this.registerUser({ identifer: this.emailAddress, plainTextPassword: this.password })
        this.isLoading = false
        this.showSnackbar = false
        this.$router.push('/user/profile/')
      } catch (loginErr) {
        this.isLoading = false
        this.snackbarColor = 'error'
        this.snackbarText = 'There was a problem with your request'
        this.snackbarTimeout = 3000
        this.showSnackbar = true
      }
    }
  },
  computed: {
    passwordErrors() {
      const errorMessages = []
      if (!this.$v.password.$dirty) return errorMessages
      !this.$v.password.required && errorMessages.push('Field is required')
      return errorMessages
    },
  }
}
</script>

<style lang="sass">
@import '@/styles/starfield.sass'
#login-header
  letter-spacing: 3px
.login-root
  height: 100%
  width: 100%
.login-box
  width: 70%
  @media only screen and (min-width: 768px)
    width: 40%
.login-header-row
  margin-bottom: 5%
</style>
