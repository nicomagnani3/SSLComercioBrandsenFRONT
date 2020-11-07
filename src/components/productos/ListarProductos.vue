<template>
  <b-container class="ListadoProductos">
    <br />
    <div v-if="loading">
      <span class="text-danger"> <b> Cargando</b></span>
      <b-spinner variant="primary" label="Text Centered"></b-spinner>
    </div>
    <div v-else>
      <b-row class="pb-3">
        <b-col lg="2" sm="4" class="text-center"> </b-col>
        <b-col md="8" sm="6" class="text-left pt-3">
          <div>
            <p class="h4 text-center">Productos disponibles</p>
          </div>
        </b-col>
      </b-row>
      <transition
        name="fade"
        v-for="producto in productos"
        v-bind:key="producto.id"
      >
        <b-card
          :title="producto.nombre"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text> ${{ producto.precio }} </b-card-text>

          <b-button href="#" variant="primary">Comprar</b-button>
        </b-card>
      </transition>
    </div>
  </b-container>
</template>
<script>
import ProductosService from "@/services/ProductosService";
export default {
  name: "novedades",

  data() {
    return {
      productos: [],
      loading: true,
    };
  },
  methods: {
    async getProductos() {
      try {
        const response = await ProductosService.getProductos();
        this.productos = response.data.data;
        console.log(this.productos);
      } catch (err) {
        this.novedades = "ATENCION NO SE PUDIERON OBTENER LOS PRODUCTOS";
      }
    },
  },
  mounted() {
    this.getProductos().then(() => {
      this.loading = false;
    });
  },
};
</script>

<style>
</style>