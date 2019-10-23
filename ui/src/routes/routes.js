import Splash from '../components/visitor/Splash.vue';
import Login from '../components/visitor/Login.vue';
import Register from '../components/visitor/Register.vue';
import Profile from '../components/user/Profile.vue';
import BookList from '../components/visitor/BookList.vue';
import DetailedBook from '../components/visitor/DetailedBook.vue';
import ReadBooks from '../components/user/ReadBooks.vue';
import VueRouter from 'vue-router';

export const routes = [{
    path: "/",
    component: Splash
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/books",
    component: BookList
  },
  {
    path: "/books/:id",
    component: DetailedBook
  },
  {
    path: "/mybooks/read",
    component: ReadBooks
  },
]

export const router = new VueRouter({
  mode: "history",
  routes
})