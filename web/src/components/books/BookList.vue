<template>
  <div class="book-list">
    <div class="book-header">
      <h1 class="display-3">All Books</h1>
      <div>
        <v-btn color="info" @click="openPopup">Filter</v-btn>
      </div>
    </div>
    <hr>
    <div class="book-content">
      <Book v-for="book in books" :key="book.title" :book="book"/>
      <v-flex v-if="books.length === 0" class="empty-cont" justify-center align-center>
        <div>uh</div>
      </v-flex>
    </div>
    <FormPopup @filter="secondFilter"/>
  </div>
</template>

<script>
import Book from '../util/Book'
import books from '../../staticData/books.js'
import FormPopup from './dialog/FormPopup'

export default {
  components: {
    Book,
    FormPopup
  },
  data() {
    return {
      books
    }
  },
  computed: {
    open() {
      return this.$store.state.formPopup
    }
  },
  methods: {
    openPopup() {
      this.$store.commit('toggleFormPopup', 'open')
    },
    filter(value) {
      // try recursion, passing a filtered array into the function
      const keys = Object.keys(value)
      const values = Object.values(value)
      const count = 0
      const returnedBooks = []
      values.forEach((value) => {
        if (value !== '') {
          books.forEach((book) => {
            if (JSON.stringify(book).includes(JSON.stringify(value))) {
              returnedBooks.push(book)
            }
          })
        }
      })

      this.books = returnedBooks
    },
    secondFilter(value) {
      const returnedBooks = []
      const keyPairs = Object.entries(value)
      keyPairs.forEach((pair) => {
        if (pair[1] !== '') {
          books.forEach((book) => {
            if (book[pair[0]].toLowerCase().includes(pair[1].toLowerCase())) {
              returnedBooks.push(book)
            }
          })
        }
      })
      // loop again accounting for legends

      this.books = returnedBooks
    }
  }
}
</script>

<style>
.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.book-list {
  height: 80vh;
  width: 90%;
}
.book-content {
  display: flex;
  flex-wrap: wrap;
}
.empty-cont {
  height: 60vh;
}
</style>
