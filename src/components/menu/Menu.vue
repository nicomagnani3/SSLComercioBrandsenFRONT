<template>
  <div class="text-center" v-if="loading">
    <span class="text-danger"> <b> Cargando</b></span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <b-navbar toggleable="lg" type="light" variant="warning">
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>Categorias</b-nav-item>
          <b-nav-item>Ofertas</b-nav-item>
          <b-nav-item>Tiendas Oficiales</b-nav-item>
          <b-nav-item :to="{ name: 'nuevaPublicacion' }">Vender</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
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
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div style="background-color: #ffce4e !important">
      <b-col md="5" offset-md="3">
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input
              style="height: 51px"
              @keyup.enter="buscarProducto(filterPrev)"
              v-model="filterPrev"
              placeholder="Buscar productos por nombre o categoria "
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
    };
  },

  computed: {
    ...mapState("storeUser", ["username", "nombre", "grupos"]),
    ...mapGetters("storeUser", ["hasPermisos", "getGrupos"]),
  },
  methods: {
    buscarProducto(producto) {
      console.log("entro");
      this.$router.push({
        name: "buscarProductos",
        params: {
          producto: producto,
        },
      });
    },
    ...mapActions("storeUser", ["LOGOUT_REQUEST"]),
    logout() {
      this.LOGOUT_REQUEST().then(() => {
        this.$router.push("/");
      });
    },
  },
  /*   methods: {
    async getProductos() {
      try {
        const response = await ProductosService.getProductos();
        this.productos = response.data.data;
      } catch (err) {
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS NOVEDADES";
      }
    },
  },
  mounted() {
    this.getProductos().then(() => {
      this.loading = false;
    });
  }, */
};
</script>

<style scoped>
.Buscador {
  width: 75%;
  /* height: 60px; */
  background-color: #ffce4e;
  /* border-radius: 57px; */
  /* margin: 0px; */
  /* display: flex; */
  /* align-items: center; */
  justify-content: center;
}

.buscar {
  width: 39%;
  height: 64%;

  border: 1px solid rgb(212, 40, 40);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  margin: 5px;
}
</style>