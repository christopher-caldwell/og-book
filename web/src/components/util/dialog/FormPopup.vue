<template>
  <v-layout row justify-center>
    <v-dialog :value="open" persistent max-width="600px">
      <form>
        <v-card>
          <v-card-title>
            <span class="headline">Filter</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Title" v-model="title" autofocus></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Author" v-model="author"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select :items="eras" label="Era" v-model="era"></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-radio-group row label="Legends" class="legends" v-model="legends">
                    <v-radio label="Yes" value="yes"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                    <v-radio label="Both" value="both"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
            <v-btn color="blue darken-1" type="submit" flat @click="filter">Filter</v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </v-layout>
</template>

<script>
import FilterFields from './FilterFields'

export default {
  components: {
    FilterFields
  },
  computed: {
    open() {
      return this.$store.state.formPopup
    }
  },
  methods: {
    close(event) {
      this.$store.commit('toggleFormPopup', 'close')
    },
    filter(event) {
      event.preventDefault()
      this.$validator.validateAll().then(() => {
        const filter = {
          author: this.author,
          era: this.era,
          legends: this.legends,
          author: this.author,
          title: this.title
        }
        this.$emit('filter', filter)
        this.$store.commit('toggleFormPopup', 'close')
      })
    }
  },
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    era: '',
    eras: [
      'The Old Republic',
      'Prequel',
      'Clone Wars',
      'Early Empire',
      'Rebellion',
      'Post Endor',
      'New Republic'
    ],
    author: '',
    legends: '',
    title: '',
    dictionary: {
      custom: {
        select: {
          required: 'Select field is required'
        }
      }
    }
  }),

  mounted() {
    this.$validator.localize('en', this.dictionary)
  }
}
</script>

<style>
.legends label {
  width: 100%;
}
</style>
