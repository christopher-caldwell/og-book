<template>
  <v-flex xs6 sm4 md3 lg2 class="book">
    <v-card class="book-card">
      <v-img :src="require(`../../assets/book-covers/${book.image}`)" aspect-ratio="1"></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="subheading mb-0 book-title">{{ book.title }}</h3>
          <div>{{ book.content }}</div>
        </div>
      </v-card-title>

      <v-card-actions class="book-actions">
        <router-link :to="`/books/${book.id}`">
          <v-btn flat color="orange">Explore</v-btn>
        </router-link>
        <v-btn flat color="orange">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    book: Object
  }
};
</script>

<style>
.book {
  padding: 1vh;
}
.book-card {
  height: 100%;
  position: relative;
}
.book-actions {
  position: absolute;
  bottom: 0;
  width: 80%;
}
.book-title {
  margin-bottom: 40px !important;
}
</style>

