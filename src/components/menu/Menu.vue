<template>
  <div class="text-center" v-if="loading">
    <span class="text-danger"> <b> Cargando</b></span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <b-navbar toggleable="lg" type="light" class="nav">
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>Categorias</b-nav-item>
          <b-nav-item>Ofertas</b-nav-item>
          <b-nav-item>Tiendas Oficiales</b-nav-item>
          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="light">Publicar</span>
            </template>           
            <b-dropdown-item :to="{ name: 'nuevoEmprendimiento' }">Emprendimiento</b-dropdown-item>
             <b-dropdown-item :to="{ name: 'nuevaPublicacion' }"
              >Producto</b-dropdown-item
            >
            <b-dropdown-item :to="{ name: 'nuevoServicio' }">Servicio</b-dropdown-item>
          </b-nav-item-dropdown>
            <b-nav-item :to="{ name: 'renovarContrato' }">Contratos</b-nav-item>

        </b-navbar-nav>
        <b-alert variant="success" show dismissible>
          Mercado Local aporta el 10% de los ingresos a asociaciones benéficas
          de Brandsen
        </b-alert>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
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
    <div style="background-color: #ffce4e !important">
      <b-col md="5" offset-md="3">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input
              style="height: 30px"
              @keyup.enter="buscarProducto(filterPrev)"
              v-model="filterPrev"
              placeholder="Buscar Servicios,emprendimientos o productos por nombre"
            ></b-form-input>
            <b-input-group-append>
              <b-button size="sm" @click="buscarProducto(filterPrev)"
                ><b-icon icon="search"></b-icon
              ></b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Header from "@/components/menu/Header.vue";

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
    },
  },
};
</script>

<style scoped>
.Buscador {
  width: 75%;
  background-color: #ffce4e;
  justify-content: center;
}

.buscar {
  width: 39%;
  height: 64%;
  border: 1px solid rgb(212, 40, 40);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 5px;
}

.nav {
  background-color: #ffce4e;
}
</style>