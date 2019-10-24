<template>
  <v-dialog v-model="showPopup" max-width="500px" persistent>
    <v-card>
      <v-card-title>Add this book to..</v-card-title>
      <v-card-text>
        <v-select :items="select" label="Lists" v-model="list"></v-select>
        <div v-if="list === 'Add New'">New stuff</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="closePopup('close')">Close</v-btn>
        <v-btn color="primary" flat @click="closePopup('save')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showPopup: Boolean
  },
  data() {
    return {
      list: '',
      select: ['Wishlist', 'In Progress', 'Favorites']
    }
  },
  methods: {
    closePopup(event) {
      this.$emit('closePopup', { action: event, list: this.list })
    }
  }
}
</script>
