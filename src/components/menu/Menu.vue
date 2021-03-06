<template>
  <div v-if="loading" class="text-center">
    <b-spinner
      style="width: 3rem; height: 3rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else>
    <b-navbar toggleable="lg" type="light" class="nav">
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse class="navbar-collapse" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="light">Productos</span>
            </template>

            <li
              class="list-group-item"
              v-for="item in categorias"
              :key="item.id"
            >
              <a class="buscador" @click="buscarProductoporCategoria(item)">{{
                item.nombre
              }}</a>
            </li>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="light">Emprendimientos</span>
            </template>
            <li
              class="list-group-item"
              v-for="item in emprendimientos"
              :key="item.id"
            >
              <a class="buscador" @click="buscarProductoporCategoria(item)">{{
                item.nombre
              }}</a>
            </li>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="light">Servicios</span>
            </template>
            <li
              class="list-group-item"
              v-for="item in servicios"
              :key="item.id"
            >
              <a class="buscador" @click="buscarProductoporCategoria(item)">{{
                item.nombre
              }}</a>
            </li>
          </b-nav-item-dropdown>
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
          <b-nav-item
            :to="{ name: 'misproductos' }"
            v-if="hasPermisos('MIS_PRODUCTOS')"
            >Mis Productos</b-nav-item
          >
        </b-navbar-nav>

        <div class="input-group">
          <b-form-input
            class="form-control form-text"
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

        <!--     
          <b-col class="buscarPs">
            <b-form-group class="mb-0">
              <b-input-group>
                <b-form-input
                  style="height: 30px"
                  @keyup.enter="buscarProducto(filterPrev)"
                  v-model="filterPrev"
                  placeholder="Buscar "
                ></b-form-input>
                <b-input-group-append>
                  <b-button size="sm" @click="buscarProducto(filterPrev)"
                    ><b-icon icon="search"></b-icon
                  ></b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col> -->

        <!-- Right aligned nav items -->
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
            <b-dropdown-item :to="{ name: 'login' }"
              >Iniciar sesion</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'Registrarse' }"
              >Crear cuenta</b-dropdown-item
            >
            <b-dropdown-item @click.prevent="logout">SALIR</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Header from "@/components/menu/Header.vue";
import CategoriasService from "@/services/CategoriasService";
import EmprendimientoService from "@/services/EmprendimientoService";
import ServiciosService from "@/services/ServiciosService";

import axios from "axios";
export default {
  name: "Menu",
  components: {
    Header,
  },
  data() {
    return {
      loading: false,
      filterPrev: null,
      filter: null,
      logeado: false,
      categorias: [],
      emprendimientos: [],
      servicios: [],
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
    async getEmprendimientos() {
      this.loading = true;
      try {
        const response = await EmprendimientoService.getEmprendimientos();
        this.emprendimientos = response.data.data;
        this.emprendimientos = this.ordenarDatos(this.emprendimientos);
      } catch (err) {
        this.emprendimientos =
          "ATENCION NO SE PUDIERON OBTENER LOS emprendimientos";
      } finally {
        this.loading = false;
      }
    },
    async getServicios() {
      this.loading = true;
      try {
        const response = await ServiciosService.getServicios();
        this.servicios = response.data.data;
        this.servicios = this.ordenarDatos(this.servicios);
      } catch (err) {
        this.servicios = "ATENCION NO SE PUDIERON OBTENER LOS servicios";
      } finally {
        this.loading = false;
      }
    },
    async getcategorias() {
      this.loading = true;
      try {
        const response = await CategoriasService.getCategorias();
        this.categorias = response.data.data;
        this.categorias = this.ordenarDatos(this.categorias);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      } finally {
        this.loading = false;
      }
    },
    ordenarDatos(categoria) {
      return categoria.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    },

    buscarProductoporCategoria(categoria) {
      const path = `/buscarProductos/${categoria.nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          query: {
            q: this.searchQuery,
            t: new Date().getTime(),
          },
          params: {
            producto: categoria.nombre,
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
  mounted() {
    axios
      .all([
        this.getcategorias(),
        this.getEmprendimientos(),
        this.getServicios(),
      ])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.Buscador {
  color: rgb(255, 206, 78);
  cursor: pointer;
}

.nav {
  background-color: #ffce4e;
}
</style>