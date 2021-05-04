<template>
  <div v-if="loading" class="text-center">
    <b-spinner
      style="width: 3rem; height: 3rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <b-container class="nav" fluid v-else>
    <b-navbar toggleable="lg" type="light" class="">
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse class="navbar-collapse" id="nav-collapse" is-nav>
        <b-navbar-nav>
       <!--    <b-nav-item v-if="!this.logeado" :to="{ name: 'verCategorias' }"
            >Productos</b-nav-item
          >
          <b-nav-item v-if="!this.logeado" :to="{ name: 'verEmprendimiento' }"
            >Emprendimientos</b-nav-item
          >
          <b-nav-item v-if="!this.logeado" :to="{ name: 'verServicio' }"
            >Servicios</b-nav-item
          > -->
          <b-nav-item-dropdown >
            <template slot="button-content">
              <span class="light">Categorias</span>
            </template>
            <b-dropdown-item :to="{ name: 'verCategorias' }"
              >Productos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'verEmprendimiento' }"
              >Emprendimientos</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'verServicio' }"
              >Servicios</b-dropdown-item
            >
               <b-dropdown-item :to="{ name: 'verProfesionales' }"
            >Profesionales</b-dropdown-item
          >
          </b-nav-item-dropdown>
      
           <b-nav-item :to="{ name: 'verRubros' }"
            >Rubros</b-nav-item
          >
          <b-nav-item :to="{ name: 'verEmpresas' }"
            >Empresas–Comercios</b-nav-item
          >           
          <b-nav-item-dropdown v-if="hasPermisos('CREAR')">
            <template slot="button-content">
              <span class="light">Publicar</span>
            </template>
            <b-dropdown-item
              :to="{ name: 'nuevaPublicacion' }"
              v-if="hasPermisos('CREAR_PRODUCTO')"
              >Producto</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'nuevoEmprendimiento' }"
              v-if="hasPermisos('CREAR_EMPRENDIMIENTO')"
              >Emprendimiento</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'nuevoServicio' }"
              v-if="hasPermisos('CREAR_SERVICIO')"
              >Servicio</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="hasPermisos('MIS_CONTRATOS')"
            :to="{ name: 'renovarContrato' }"
          >
            <template slot="button-content">
              <span class="light">Contrato</span>
            </template>

            <b-dropdown-item
              :to="{ name: 'renovarContrato' }"
              v-if="hasPermisos('VER_CONTRATO')"
              >Ver</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="hasPermisos('ASIGNAR_CONTRATO')"
            :to="{ name: 'asignarContrato' }"
          >
            <template slot="button-content">
              <span class="light">Contrato</span>
            </template>
            <b-dropdown-item
              :to="{ name: 'asignarContrato' }"
              v-if="hasPermisos('ASIGNAR_CONTRATO')"
              >Nuevo</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'vencimientoContrato' }"
              v-if="hasPermisos('VENCIMIENTO_CONTRATO')"
              >Vencimientos</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'verSoporte' }">Soporte</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="">
          <b-navbar-nav v-if="logeado" class="ml-auto">
            <b-nav-item class="light mx-4 my-0 py-0">
              <b-icon icon="user" />Bienvenido,
              <b>{{ username }}</b>
              <div class="my-0 py-0 text-md-center">
                <b>{{ nombre }}</b>
              </div>
            </b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person-fill"></b-icon>
            </template>
            <b-dropdown-item
              :to="{ name: 'misproductos' }"
              v-if="hasPermisos('MIS_PRODUCTOS')"
              >Mis Productos</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'login' }"
              v-if="!hasPermisos('CAMBIAR_CLAVE')"
              >Iniciar sesion</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'Registrarse' }"
              v-if="!hasPermisos('CAMBIAR_CLAVE')"
              >Crear cuenta</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'cambiarClave' }"
              v-if="hasPermisos('CAMBIAR_CLAVE')"
              >Cambiar contraseña</b-dropdown-item
            >
            <b-dropdown-item
              v-if="hasPermisos('CAMBIAR_CLAVE')"
              @click.prevent="logout"
              >SALIR</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="contenedorBuscador">
      <div class="Bus input-group input-group-lg" style="max-width: 700px">
        <b-form-input
          type="text"
          size="15"
          maxlength="128"
          @keyup.enter="buscarProducto(filterPrev)"
          v-model="filterPrev"
          placeholder="Buscar "
        ></b-form-input>

        <b-button size="sm" @click="buscarProducto(filterPrev)"
          ><b-icon icon="search"></b-icon
        ></b-button>
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Header from "@/components/menu/Header.vue";


export default {
  name: "Menu",
  components: {
    Header,
  },
  props: {
    
  },
  data() {
    return {
      loading: false,
      filterPrev: null,
      filter: null,
      logeado: false,
    };
  },
  created() {
    if (this.getUserId != null) {
      this.logeado = true;
    }
  },
  computed: {
    ...mapState("storeUser", ["username", "nombre", "grupos"]),
    ...mapGetters("storeUser", ["hasPermisos", "getGrupos", "getUserId"]),
  },
  methods: {
    buscarProducto(producto) {
      const path = `/buscarProductos/${producto}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          params: {
            producto: producto,
          },
        });
    },
    ...mapActions("storeUser", ["LOGOUT_REQUEST"]),
    logout() {
      this.logeado = false;
      this.LOGOUT_REQUEST().then(() => {
        this.$router.push("/").catch({});
      });
      location.reload();
    },
  },
  mounted() {},
};
</script>

<style scoped>
.Buscador {
  color: rgb(255, 206, 78);
  cursor: pointer;
}

.nav {
  background-color: #ffce4e;
  display: flex;
  flex-direction: column;
}

.Bus {
  margin: 10px;
}

.contenedorBuscador {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
</style>