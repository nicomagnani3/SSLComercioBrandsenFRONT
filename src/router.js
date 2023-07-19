import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";

/* INICIO */
import Login from "@/components/Inicio/Login.vue";
import Registrarse from "@/components/Inicio/Registrar.vue";
import RecuperarClave from "@/components/Inicio/RecuperarClave.vue";

/* Productos */
import BuscarProductos from "@/components/Home/BuscarProductos.vue";
import NuevaPublicacion from "@/components/publicaciones/NuevaPublicacion.vue";
import VerCategorias from "@/components/categorias/VerCategorias.vue";
import VerDestacados from "@/components/Home/VerDestacados.vue";
import verMarketPlace from "@/components/Home/verMarketPlace.vue";
import alquileres from "@/components/alquileres/alquileres.vue";
import nuevoAlquiler from "@/components/alquileres/nuevoAlquiler.vue";
import RentAction from "@/components/alquileres/RentAction.vue";

/* Emprendimiento */
import NuevoEmprendimiento from "@/components/emprendimientos/NuevoEmprendimiento.vue";
import VerEmprendimiento from "@/components/emprendimientos/VerEmprendimiento.vue";
import verProductosEmprendimientos from "@/components/emprendimientos/verProductosEmprendimientos.vue";

/* Servicio  Profesionales*/
import NuevoServicio from "@/components/servicios/NuevoServicio.vue";
import VerServicio from "@/components/servicios/VerServicio.vue";
import VerProfesionales from "@/components/servicios/VerProfesionales.vue";
import verProductosProfesionales from "@/components/servicios/verProductosProfesionales.vue";

/* Contratos  admin y empresas o comercios*/
import RenovarContrato from "@/components/contratos/RenovarContrato.vue";
import asignarContrato from "@/components/contratos/asignarContrato.vue";
import VencimientoContrato from "@/components/contratos/VencimientoContrato.vue";

/* misProductos */
import MisProductos from "@/components/usuarios/MisProductos.vue";
import VerProducto from "@/components/usuarios/VerProducto.vue";
/* Menu */
import container from "@/components/menu/Container.vue";
import home from "@/components/Home/Home.vue";
import utilidades from "@/components/Home/utilidades.vue";

/* Empreas - comcercios -rubros -curriculums*/
import VerEmpresas from "@/components/empresas/VerEmpresas.vue";
import crearEmpresa from "@/components/empresas/crearEmpresa.vue";
import crearNovedad from "@/components/novedades/crearNovedad.vue";
import crearPublicidad from "@/components/publicidad/CrearPublicidad.vue";
import verCurriculums from "@/components/contratos/verCurriculums.vue";

import verSoporte from "@/components/soporte/VerSoporte.vue";
import VerRubros from "@/components/empresas/VerRubros.vue";

/* Publicar mobile */
import publicarMobile from "@/components/publicacionMobile/NuevaPublicacion.vue";

import CrearPublicacion from "@/components/publicaciones/CrearPublicacion.vue";
import CrearContrato from "@/components/contratos/CrearContrato.vue";

/* Publicidades Home */
import PublicidadesHome from "@/components/publicidad/PublicidadesHome.vue";
import PersonalizarPlataforma from "@/components/plataforma/PersonalizarPlataforma.vue";


import VueMeta from "vue-meta";
Vue.use(VueMeta);

Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: container,
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: "/",
          name: "Home",
          component: home,
        },
        {
          path: "/nuevaPublicacion",
          name: "nuevaPublicacion",
          component: NuevaPublicacion,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/nuevoEmprendimiento",
          name: "nuevoEmprendimiento",
          component: NuevoEmprendimiento,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/nuevoServicio",
          name: "nuevoServicio",
          component: NuevoServicio,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/ver_curriculums",
          name: "ver_curriculums",
          component: verCurriculums,
          meta: {
            requireAuth: true,
          },
        },

        {
          path: "/productos/:producto",
          name: "productos",
          component: BuscarProductos,
          props: true,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/comercios",
          name: "comercios",
          component: VerEmpresas,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/verRubros",
          name: "verRubros",
          component: VerRubros,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/verSoporte",
          name: "verSoporte",
          component: verSoporte,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/vermarket",
          name: "vermarket",
          component: verMarketPlace,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/alquileres",
          name: "alquileres",
          component: alquileres,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/utilidades",
          name: "utilidades",
          component: utilidades,
          props: true,

          meta: {
            requireAuth: false,
          },
        },

        {
          path: "/verCategorias",
          name: "verCategorias",
          component: VerCategorias,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/verEmprendimiento",
          name: "verEmprendimiento",
          component: VerEmprendimiento,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/emprendedores",
          name: "emprendedores",
          component: verProductosEmprendimientos,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/profesionales",
          name: "profesionales",
          component: verProductosProfesionales,
          meta: {
            requireAuth: false,
          },
        },

        {
          path: "/verServicio",
          name: "verServicio",
          component: VerServicio,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/verProfesionales",
          name: "verProfesionales",
          component: VerProfesionales,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/crearPublicacion/publicacion:publicacion",
          name: "crearPublicacion",
          component: CrearPublicacion,
          props: true,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/crearContrato/publicacion:publicacion",
          name: "crearContrato",
          component: CrearContrato,
          props: true,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/verDestacados",
          name: "verDestacados",
          component: VerDestacados,
          props: true,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/nuevo_alquiler",
          name: "nuevoAlquiler",
          component: nuevoAlquiler,
          props: true,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/RentAction",
          name: "RentAction",
          component: RentAction,
          props: true,
          meta: {
            requireAuth: false,
          },
        },
        {
          path: "/renovarContrato",
          name: "renovarContrato",
          component: RenovarContrato,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/asignarContrato",
          name: "asignarContrato",
          component: asignarContrato,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/crearEmpresa",
          name: "crearEmpresa",
          component: crearEmpresa,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/crearPublicidad",
          name: "crearPublicidad",
          component: crearPublicidad,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/crearNovedad",
          name: "crearNovedad",
          component: crearNovedad,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/vencimientoContrato",
          name: "vencimientoContrato",
          component: VencimientoContrato,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/misproductos",
          name: "misproductos",
          component: MisProductos,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/crear_publicidad_home",
          name: "crear_publicidad_home",
          component: PublicidadesHome,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/personalizar_plataforma",
          name: "personalizar_plataforma",
          component: PersonalizarPlataforma,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: "/product/:tipo/:id/:nombre?",
          name: "verProducto",
          component: VerProducto,
          props: true,
          meta: {
            requireAuth: false
          }
        }   
      ],
    },
    {
      path: "/login",
      component: () => import("@/components/Inicio/BaseLogin.vue"),
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: "/login",
          name: "login",
          component: Login,
        },
        {
          path: "/registrar",
          name: "Registrarse",
          component: Registrarse,
        },
        {
          path: "/cambiarClave",
          name: "cambiarClave",
          component: RecuperarClave,
        },
      ],
    },
    {
      path: "/.well-known/acme-challenge/:file",
    },
    {
      path: "*",
      redirect: "/",
    },
    {
      path: "/publicarMobile",
      name: "publicarMobile",
      component: publicarMobile,
      meta: {
        requireAuth: false,
      },
    },    
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth);

  if (requireAuth && !store.getters["storeUser/isAuthenticated"]) {
    next("/login");
  } else if (store.getters["storeUser/isAuthenticated"] && to.name == "Login") {
    next("/");
  } else {
    if (!to.matched.length) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
