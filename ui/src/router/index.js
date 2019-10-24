import Vue from 'vue'
import VueRouter from 'vue-router'
const Root = () =>  import('@/views/Root.vue')
const Visitor = () =>  import('@/views/Visitor.vue')
const User = () =>  import('@/views/User.vue')
const Login = () =>  import('@/components/visitor/Login.vue')
const Register = () =>  import('@/components/visitor/Register.vue')
const Profile = () =>  import('@/components/user/Profile.vue')
const BookList = () =>  import('@/components/visitor/BookList.vue')
const DetailedBook = () =>  import('@/components/visitor/DetailedBook.vue')
const ReadBooks = () =>  import('@/components/user/ReadBooks.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'Root',
    component: Root,
    children: [
      {
        path: "visitor",
        name: 'Visitor',
        component: Visitor,
        children: [
          {
            path: "register",
            name: 'Register',
            component: Register
          },
          {
            path: "login",
            name: 'Login',
            component: Login
          },

        ]
      },
      {
        path: "user",
        name: 'User',
        component: User,
        beforeRouteEnter(to, from, next){
          console.log('to', to)
          next()
        },
        children: [
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
      },
    ]
  }
]

export default new VueRouter({
  mode: "history",
  routes
})