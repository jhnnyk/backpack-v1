const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WelcomePage.vue'),
        props: true,
      },
      { path: '/login', component: () => import('pages/LoginPage.vue') },
      { path: '/signup', component: () => import('pages/SignupPage.vue') },
      {
        path: '/forgotpassword',
        component: () => import('pages/ForgotPassword.vue'),
      },
      { path: 'page/:pageId', component: () => import('pages/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
