export const visitorRoutes = [
  {
    path: '/Home',
    icon: 'mdi-account',
    title: 'Home',
  },
  {
    path: '/register',
    icon: 'mdi-account',
    title: 'Register',
  },
  {
    path: '/login',
    icon: 'mdi-account',
    title: 'Login',
  }
]

export const authenticatedRoutes = [
  {
    path: '/Home',
    icon: 'mdi-account',
    title: 'Home',
  },
  {
    divider: true,
    header: 'Create',
    path: ''
  },
  {
    path: '/home/search/policy',
    icon: 'mdi-check',
    title: 'Policy',
  },
  {
    divider: true,
    header: 'Profile',
    path: ''
  },
  {
    path: '/user/profile',
    icon: 'mdi-account-plus',
    title: 'Admin',
  },
]
export const regularAdminRoutes = [
  {
    path: '/home/search/institution',
    icon: 'mdi-bank',
    title: 'Institution',
  },
  {
    path: '/home/search/quote',
    icon: 'mdi-file-document',
    title: 'Quote',
  },
  {
    path: '/home/search/car',
    icon: 'mdi-car',
    title: 'Car',
  },
  {
    path: '/home/search/admin',
    icon: 'mdi-bank',
    title: 'Admin',
  },
  {
    path: '/home/search/payment',
    icon: 'mdi-currency-usd',
    title: 'Payment',
  },
  {
    path: '/home/search/user',
    icon: 'mdi-bank',
    title: 'User',
  },
  {
    path: '/home/search/policy',
    icon: 'mdi-check',
    title: 'Policy',
  },
]
