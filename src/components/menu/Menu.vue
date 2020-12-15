<template>
  <div class="text-center" v-if="loading">
    <span class="text-danger"> <b> Cargando</b></span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <b-navbar toggleable="lg" type="light" variant="warning">
      <b-navbar-brand :to="'/'"><Header/> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>      
        <b-navbar-nav>
                <b-nav-item >Categorias</b-nav-item>
                <b-nav-item >Ofertas</b-nav-item>
                <b-nav-item >Tiendas Oficiales</b-nav-item>
                <b-nav-item :to="{name:'nuevaPublicacion'}">Vender</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">         
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person-fill"></b-icon>
            </template>
            <b-dropdown-item :to="{name: 'login'}">Iniciar sesion</b-dropdown-item>
            <b-dropdown-item :to="{name: 'Registrarse'}">Crear cuenta</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>


import { mapActions, mapGetters, mapState } from "vuex";
import Header from '@/components/menu/Header.vue'

export default {
  name: "Index",

  components: {

    Header,
    
  },

  data() {
    return {
      novedades: [],
      loading: false,
    };
    
    
  },

  
   computed: {
    ...mapState("storeUser", ["username", "nombre", "grupos"]),
    ...mapGetters("storeUser", ["hasPermisos", "getGrupos"]),
  },
  methods: {
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

<style>


</style>