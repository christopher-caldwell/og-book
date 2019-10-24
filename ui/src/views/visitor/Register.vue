<template lang="pug">
  div.login-root.flex-centered
    Snackbar(
      v-model="showSnackbar"
      :text="snackbarText"
      :snackbarColor="snackbarColor"
      :snackbarTimeout="snackbarTimeout"
    )
    form.login-box
      v-row.login-header-row
        h1 Login
      v-row
        v-col
          v-text-field(
            label='First Name'
            outlined
            :clearable="true"
            :error-messages="firstNameErrors"
            v-model="firstName"
            :disabled="isLoading"
            :loading="isLoading"
          )
        v-col
          v-text-field(
            label='Last Name'
            outlined
            :clearable="true"
            :error-messages="lastNameErrors"
            v-model="lastName"
            :disabled="isLoading"
            :loading="isLoading"
          )
      v-row
        v-col
          v-text-field(
            label='Email'
            outlined
            :clearable="true"
            :error="isInputErrors"
            :error-messages="inputErrorMessages"
            :value="emailAddress"
            @input="updateEmail"
            :disabled="isLoading"
            :loading="isLoading"
          )
      v-row
        v-col
          v-text-field(
              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
              label="Password"
              outlined
              :type="showPass ? 'text' : 'password'"
              :clearable="true"
              :error="$v.password.$dirty && !$v.password.required"
              :error-messages="passwordErrors"
              v-model.lazy="$v.password.$model"
              @click:append="showPass = !showPass"
              :disabled="isLoading"
              :loading="isLoading"
            )
          v-text-field(
              :append-icon="showConfirmPass ? 'mdi-eye-off' : 'mdi-eye'"
              label='Confirm Password'
              outlined
              :type="showConfirmPass ? 'text' : 'password'"
              :clearable="true"
              :error-messages="confirmPasswordErrors"
              v-model.lazy="$v.confirmPassword.$model"
              @click:append="confirmPassword = !confirmPassword"
              :disabled="isLoading"
              :loading="isLoading"
            )
      v-row
        p.error--text {{ errorText }}
      v-row
        router-link(:to={name: 'ForgotPassword'}) Forgot password?
      v-row(justify='end')
        v-btn(
          @click.prevent="submitEmail"
          type='submit'
          :disabled="isLoading"
        ) Sign Up

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
      showConfirmPass: false,
      snackbarText: '',
      showSnackbar: false,
      isInputErrors: false,
      inputErrorMessages: [],
      isLoading: false,
      errorText: '',
      snackbarColor: '',
      snackbarTimeout: 2000,
      emailAddress: '',
      password: '',
      confirmPassword: '',
      firtName: '',
      lastName: ''
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
    confirmPassword: {
      required,
    },
    firtName: {
      required,
    },
    lastName: {
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
        if (!this.$v.emailAddress.email) {
          this.inputErrorMessages.push('Must be a valid email')
        }
        if (!this.$v.emailAddress.required) {
          this.inputErrorMessages.push('Field is required')
        }
      } else {
        this.$v.$reset
        this.inputErrorMessages = []
        this.isInputErrors = false
        this.verifyPassword()
      }
    },
    verifyPassword() {
      if (this.password === this.confirmPassword) {
        this.errorText = ''
        this.login()
      } else {
        this.errorText = 'Passwords do not match'
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
        this.$router.push('/home/search/')
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
    firstNameErrors() {
      const errorMessages = []
      if (!this.$v.firtName.$dirty) return errorMessages
      !this.$v.firtName.required && errorMessages.push('Field is required')
      return errorMessages
    },
    lastNameErrors() {
      const errorMessages = []
      if (!this.$v.password.$dirty) {
        return errorMessages
      }
      !this.$v.lastName.required && errorMessages.push('Field is required')
      return errorMessages
    },
    passwordErrors() {
      const errorMessages = []
      if (!this.$v.password.$dirty) return errorMessages
      !this.$v.password.required && errorMessages.push('Field is required')
      return errorMessages
    },
    confirmPasswordErrorsErrors() {
      const errorMessages = []
      if (!this.$v.confirmPassword.$dirty) return errorMessages
      !this.$v.confirmPassword.required && errorMessages.push('Field is required')
      return errorMessages
    },
  }
}
</script>

<style lang="sass">
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
