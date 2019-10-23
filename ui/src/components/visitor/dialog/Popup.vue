<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="show"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ content }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="closePopup"
          >
            {{ confirmation }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    computed: {
      show(){
        return this.$store.state.popupShown
      },
      title(){
        return this.$store.state.popupInfo.title
      },
      content(){
        return this.$store.state.popupInfo.content
      },
      confirmation(){
        return this.$store.state.popupInfo.confirmation
      }
    },
    methods: {
      closePopup(){
        this.$store.commit('hidePopup')
      }
    }
  }
</script>