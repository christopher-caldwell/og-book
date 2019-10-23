<template>
  <v-layout row justify-center>
    <div class="big-book-cont">
      <div class="big-book-header">
        <div v-if="book === null"></div>
        <div v-else>
          <h1 class="display-3" style="text-align: center">{{book.title}}</h1>
        </div>
      </div>
      <hr style="margin-bottom: 20px">
      <div class="big-book-content">
        <v-layout row justify-center class="info-cont">
          <v-flex xs4>
            <div class="image-cont">
              <v-img
                :src="require(`../../assets/book-covers/${book.image}`)"
                aspect-ratio="0.8"
                contain
              ></v-img>
            </div>
          </v-flex>
          <v-flex xs8>
            <div class="book-info headline">
              Author:
              <a :href="book.authorLink" target="_blank">{{book.author}}</a>
            </div>
            <div class="book-info headline">Pages: {{book.pages}}</div>
            <div v-if="book.series !== 'N/A'" class="book-info headline">Series: {{book.series}}</div>
            <div class="book-info headline">Era: {{book.era}}</div>
            <div class="book-info headline">Release Date: {{book.releaseDate}}</div>
            <div class="book-info headline">Legends: {{book.legends}}</div>
            <div class="action-buttons-cont">
              <v-layout row justify-center>
                <v-flex xs3>
                  <v-btn color="success" @click="showSaveDialog = true">Save</v-btn>
                </v-flex>
                <v-flex xs3>
                  <v-btn color="info" @click="showListDialog = true">Add to..</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </div>
    <AddTo :showPopup="showListDialog" @closePopup="listDialogAction"/>
    <SaveDialog :showPopup="showSaveDialog" @closePopup="saveDialogAction"/>
  </v-layout>
</template>

<script>
import books from "../../staticData/books.js";
import AddTo from "./dialog/AddTo";
import SaveDialog from "./dialog/SaveDialog";
import moment from "moment";
import axios from "axios";

export default {
  components: {
    AddTo,
    SaveDialog
  },
  data() {
    return {
      book: null,
      showListDialog: false,
      showSaveDialog: false
    };
  },
  beforeMount() {
    let book = books.filter(
      book => book.id === Number(this.$route.params.id)
    )[0];
    book.releaseDate = moment(book.releaseDate).format("MMMM Do YYYY");
    book.legends = book.legends ? "Yes" : "No";

    this.book = book;
  },
  methods: {
    listDialogAction(event) {
      if (event.action === "close") {
        this.showListDialog = false;
      } else {
        const params = {};
        console.log(event.list);
        // add the book to the corresponding list
      }
    },
    saveDialogAction(event) {
      if (event.action === "close") {
        this.showSaveDialog = false;
      } else {
        const { rating, platform, dateRead } = event;
        axios
          .post(`${this.$store.state.apiUrl}/book`, {
            token: this.$store.state.loggedInUser.token,
            username: this.$store.state.loggedInUser.username,
            BookId: String(this.book.id),
            list: "Read",
            rating,
            platform,
            dateRead
          })
          .then(res => {
            this.$route.push("/");
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    }
  }
};
</script>

<style>
.big-book-header {
  margin-bottom: 30px;
}
.big-book-cont {
  height: 75vh;
  width: 80%;
}
.image-cont {
  height: 80vh;
}
.info-cont {
  height: 40vh;
}
.action-buttons-cont {
  margin-top: 10vh;
}
</style>
