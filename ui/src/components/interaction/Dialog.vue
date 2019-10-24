<template lang='pug'>
  div.text-center
    v-dialog(:value="isDialogOpen" :width="windowWidth" @click:outside="emitCloseDialog('wait')")
      v-card
        v-card-title {{ title }}
        v-card-text.
         {{ content }}
        v-card-text {{ prompt }}
        v-divider
        v-card-actions
          div.flex-grow-1
          v-btn( color="primary" text @click="emitCloseDialog(false)") {{ cancelText }}
          v-btn( color="primary" text @click="emitCloseDialog(true)") {{ confirmationText }}
</template>

<script>
export default {
  props: {
    confirmationText: {
      type: String,
      required: false,
      default: 'Yes'
    },
    cancelText: {
      type: String,
      required: false,
      default: 'No'
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    prompt: {
      type: String,
    },
    isDialogOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    windowWidth: {
      type: String,
      required: false,
      default: '500'
    }
  },
  methods: {
    emitCloseDialog(determination) {
      this.$emit('closeDialog', determination)
    }
  }
}
</script>
