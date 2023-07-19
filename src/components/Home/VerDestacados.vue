<template>
  <div>
    <section class="py-3">
      <div class="container-cards px-4 px-lg-4 mt-5">
        <div class="row gx-1 gx-lg-1 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-left">
          <div class="col mb-3" v-for="(producto, index) in productos" :key="index">
            <div class="card h-100 card-custom">
              <!-- Product image-->
              <div class="square-image">
                <img :src="`data:image/png;base64, ${producto.imagen}`" alt="..." class="card-img-top" />
              </div>
              <!-- Product details-->
              <div class="card-body">
                <div class="text-center">
                  <!-- Product name-->
                  <h5 class="fw-bolder">
                    <strong style="white-space: pre-wrap">{{ producto.titulo }} </strong>
                  </h5>
                  <!-- Product price-->
                  <strong class="parrafor">{{ producto.padre }}</strong>
                  <p class="mb-0" v-if="producto.precio">{{ getImporte(producto.precio) }}</p>
                </div>
              </div>
              <!-- Product actions-->
              <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center">
                  <b-btn @click="verProducto(producto)" block class="btn btn btn--block card__btn btn-block">Ver
                    detalle</b-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import { mapGetters } from "vuex";

//import axios from "axios";
export default {
  name: "VerDestacados",
  components: {

  },
  props: {
    productos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tipoPublicacion: "",
      verImagen: false,
      productoSeleccionado: [],
      perPage: 2,
      currentPage: 1,
      idPublicacionImagen: "",
    };
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  watch: {},
  methods: {
    acomodarCelular(telefono) {
      if (telefono[0] == 0) {
        return telefono.substr(1);
      }
      return telefono;
    },

    getImporte(precio) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    cantidadProductos() {
      return this.productos.length;
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
    verProducto(producto) {
      this.$router.push({
        name: "verProducto",
        params: {
          tipo: producto.tipo.toLowerCase(),
          id: producto.id,
          nombre: producto.titulo
        },
      });
    },

  },

};
</script>