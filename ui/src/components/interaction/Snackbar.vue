<template lang='pug'>
  v-snackbar(
      v-model="isShown"
      bottom
      :color="snackbarColor"
      :timeout="snackbarTimeout"
  ) {{ text }}
    v-btn(
      text
      @click="closeSnackBar"
    ) Close
</template>

<script>
export default {
  props: {
    snackbarColor: {
      type: String,
      required: false,
      default: 'error'
    },
    text: {
      type: String,
      required: true,
    },
    // default value from v-model
    value: {
      type: Boolean,
      required: true
    },
    snackbarTimeout: {
      type: Number,
      required: false,
      default: 3000
    },
  },
  computed: {
    isShown: {
      get() { return this.value },
      set(isShown) { this.$emit('input', isShown) }
    }
  },
  methods: {
    closeSnackBar() {
      this.$emit('input', false)
    }
  }
}
</script>
