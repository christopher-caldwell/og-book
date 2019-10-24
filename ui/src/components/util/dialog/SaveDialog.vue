<template>
  <v-dialog v-model="showPopup" max-width="500px" persistent>
    <v-card>
      <v-card-title>How did you enjoy this book?</v-card-title>
      <v-card-text>
        <v-select :items="platforms" label="Media Types" v-model="platform"></v-select>
        <div class="section rating">
          <div class="body-1">How would you rate it?</div>
          <v-rating
            label="Rating"
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$vuetify.icons.ratingFull"
            half-increments
            hover
          ></v-rating>
        </div>
        <div class="section date">
          <div class="body-1">When did you read it?</div>
          <v-flex>
            <v-menu v-model="menu1" :close-on-content-click="false" full-width max-width="290">
              <template v-slot:activator="{ on }">
                <v-text-field :value="computedDateFormattedMomentjs" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="dateRead" :max="max" @change="menu1 = false"></v-date-picker>
            </v-menu>
          </v-flex>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" flat @click="closePopup('close')">Close</v-btn>
        <v-btn color="primary" flat @click="closePopup('save')">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    showPopup: Boolean
  },
  data() {
    return {
      platform: '',
      rating: 0,
      platforms: ['Audiobook', 'Physical Copy', 'Combination'],
      menu1: false,
      dateRead: new Date().toISOString().substr(0, 10),
      max: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    closePopup(event) {
      const { platform, rating, dateRead } = this
      this.$emit('closePopup', {
        action: event,
        platform,
        rating,
        dateRead
      })
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.dateRead
        ? moment(this.dateRead).format('dddd, MMMM Do YYYY')
        : ''
    }
  }
}
</script>

<style scoped>
.section {
  margin: 20px 0;
}
</style>
