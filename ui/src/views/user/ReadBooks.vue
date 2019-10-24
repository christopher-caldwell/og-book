<template>
  <section class="read-books-cont">
    <div class="header">
      <div>
        <h1
          :class="mobile ? 'display-1' : 'display-3' "
        >Your {{ list !== "" ? list : "Read" }} Books</h1>
      </div>
      <div style="width: 30%">
        <v-select :items="lists" v-model="list" label="Lists"></v-select>
      </div>
      <div>
        <v-btn @click="refresh">Refresh</v-btn>
      </div>
    </div>
    <hr style="margin: 20px, color: gray">
    <v-card>
      <v-card-title>
        Books
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :headers="mobile ? mobileHeaders : headers" :items="books" :search="search">
        <template v-slot:items="props" v-if="books.length !== 0">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-right">{{ props.item.author }}</td>
          <td class="text-xs-right">{{ props.item.era }}</td>
          <td class="text-xs-right" v-if="!mobile">{{ props.item.legends ? "Yes" : "No" }}</td>
          <td class="text-xs-right" v-if="!mobile">{{ props.item.platform }}</td>
          <td class="text-xs-right" v-if="!mobile">
            <v-rating
              label="Rating"
              v-model="props.item.rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$vuetify.icons.ratingFull"
              half-increments
              readonly
              small
            ></v-rating>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </section>
</template>
<script>
import axios from 'axios'
import books from '../../staticData/books.js'

export default {
  data() {
    return {
      search: '',
      list: '',
      lists: ['Read', 'Wishlist', 'In Progress', 'Favorites'],
      mobile: false,
      mobileHeaders: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Author', value: 'author' },
        { text: 'Era', value: 'author' }
      ],
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Author', value: 'author' },
        { text: 'Era', value: 'carbs' },
        { text: 'Legends', value: 'protein' },
        { text: 'Platform', value: 'iron' },
        { text: 'Rating', value: 'iron' }
      ],
      books: []
    }
  },
  beforeMount() {
    if (window.innerWidth < 900) {
      this.mobile = true
    }
    const { apiUrl, loggedInUser } = this.$store.state
    this.refresh()
  },
  methods: {
    refresh() {
      const { apiUrl, loggedInUser } = this.$store.state
      axios
        .get(`${apiUrl}/book?username=${loggedInUser.username}&list=Read`)
        .then((res) => {
          const fetchedBooks = res.data.Items
          const readBooks = []
          fetchedBooks.forEach((fetchedBook) => {
            books.forEach((book) => {
              if (fetchedBook.BookId === String(book.id)) {
                readBooks.push({
                  ...fetchedBook,
                  ...book
                })
              }
            })
          })
          this.books = readBooks
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.read-books-cont {
  height: 75vh;
  padding: 0px 10px;
}

@media screen and (min-width: 500px) {
  .read-books-cont {
    padding: 10px;
  }
}
</style>
