import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'


/* INICIO */
import Login from '@/components/Inicio/Login.vue'
import Registrarse from '@/components/Inicio/Registrar.vue'
import RecuperarClave from '@/components/Inicio/RecuperarClave.vue'

/* Productos */
import BuscarProductos from "@/components/Home/BuscarProductos.vue"; 
import NuevaPublicacion from '@/components/publicaciones/NuevaPublicacion.vue'
/* Emprendimiento */
import NuevoEmprendimiento from '@/components/emprendimientos/NuevoEmprendimiento.vue'
/* Servicio */
import NuevoServicio from '@/components/servicios/NuevoServicio.vue'
/* Contratos  admin y empresas o comercios*/
import RenovarContrato from '@/components/contratos/RenovarContrato.vue'
import asignarContrato from '@/components/contratos/asignarContrato.vue'

/* misProductos */
import MisProductos from '@/components/usuarios/MisProductos.vue'
/* Menu */
import container from '@/components/menu/Container.vue'
import home from '@/components/Home/Home.vue'

import CrearPublicacion from '@/components/publicaciones/CrearPublicacion.vue'
import CrearContrato from '@/components/contratos/CrearContrato.vue'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: container ,
    meta: { 
      requireAuth: false
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: home               
       },
      {
        path: '/nuevaPublicacion',
        name: 'nuevaPublicacion',
        component: NuevaPublicacion,
        meta: {
          requireAuth: true
        },              
       },
       {
       path: '/nuevoEmprendimiento',
        name: 'nuevoEmprendimiento',
        component: NuevoEmprendimiento,
        meta: {
          requireAuth: true
        },              
       },
       {
       path: '/nuevoServicio',
       name: 'nuevoServicio',
       component: NuevoServicio,
       meta: {
         requireAuth: true
       },              
      },
       {
       path: '/buscarProductos/:producto',
        name: 'buscarProductos',
        component: BuscarProductos,   
        props: true,
        meta: {
          requireAuth: false
        }, 
      }, 
      { 
      path: '/crearPublicacion/publicacion:publicacion/tipo:tipo',
        name: 'crearPublicacion',
        component: CrearPublicacion,   
        props: true,    
        meta: {
          requireAuth: false
        }, 
      },
        {     
        path: '/crearContrato/publicacion:publicacion',
        name: 'crearContrato',
        component: CrearContrato,   
        props: true,    
        meta: {
          requireAuth: false
        },  
       },
       {
        path: '/renovarContrato',
         name: 'renovarContrato',
         component: RenovarContrato,
         meta: {
          requireAuth: true
        },  
        },
        {
          path: '/asignarContrato',
           name: 'asignarContrato',
           component: asignarContrato,
           meta: {
            requireAuth: true
          },  
          },
        {
          path: '/misproductos',
           name: 'misproductos',
           component: MisProductos,
           meta: {
            requireAuth: true
          },  
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
        {
          path: '/cambiarClave',
          name: 'cambiarClave',
          component: RecuperarClave
        }
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


 router.beforeEach((to, from, next) => {
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
}) 


export default router

