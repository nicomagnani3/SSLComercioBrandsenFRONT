import Vue from 'vue'
import Router from 'vue-router'
//import store from './store.js'


/* INICIO */
import Login from '@/components/Inicio/Login.vue'
import Registrarse from '@/components/Inicio/Registrar.vue'
/* Productos */
import ListarProductos from '@/components/productos/ListarProductos.vue'
/* Menu */
import Container from '@/components/menu/Container.vue'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Container ,
    meta: { 
      requireAuth: false
    },
    children: [{
      path: '/',
      name: 'listar',
      component: ListarProductos,
      }, 
    ]
    },
    {
      path: '/login',    
      component: () => import('@/components/Inicio/BaseLogin.vue'), 
      meta: {
        requireAuth: false
      },
      children: [{
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/registrar',
          name: 'Registrarse',
          component: Registrarse
        },     
      ]
    },
    {
      path: '/.well-known/acme-challenge/:file'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})


/* router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requireAuth)

  if (requireAuth && !store.getters['storeUser/isAuthenticated']) {
    next('/')
  } else if (store.getters['storeUser/isAuthenticated'] && to.name == 'Login') {   
    next('/')
  } else {
    if (!to.matched.length) {     
      next('/');
    } else {     
      next();
    }
   
  }
}) */


export default router

