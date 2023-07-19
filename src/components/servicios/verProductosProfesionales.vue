<template>
  <div>
    <div class="body">
      <div fluid class="categoria">
        <b-row class="pb-3">
          <b-col class="text-center pt-3">
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias">Profesionales</strong>
            </p>
          </b-col>
        </b-row>
      </div>
    </div>
    <br />
    <div v-if="loading" class="text-center">
      <b-spinner style="width: 4rem; height: 4rem" variant="warning" label="Text Centered">
      </b-spinner>
    </div>
    <div v-else style="margin: 1%">
      <div v-if="productos.length < 1" class="text-center">
        <img class="responsiveNotProducts" style="cursor: pointer"
          src="https://res.cloudinary.com/malambo/image/upload/v1659026568/Malambo/utilidades/PROFESIONALES_uaxlwk.jpg"
          @click="$router.push('login')" />
      </div>
      <div v-else>
        <section class="py-7">
          <div class="container-cards px-4 px-lg-5 mt-5">
            <div class="row gx-5 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
              <div class="col mb-5" v-for="(producto, index) in productos" :key="index">
                <div class="card h-100 card-custom">
                  <!-- Product image-->
                  <div class="square-image">
                    <img :src="`data:image/png;base64, ${producto.imagen}`" alt="..." class="card-img-top" />
                  </div>
                  <!-- Product details-->
                  <div class="card-body">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="fw-bolder">{{ tituloAjustar(producto.titulo) }}</h5>
                      <!-- Product price-->
                      <p class="mb-0">{{ getImporte(producto.precio) }}</p>
                    </div>
                  </div>
                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <b-btn @click="verProducto(producto)" block
                        class="btn btn btn--block card__btn btn-block">Ver más</b-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
        <div class="d-flex justify-content-center">
          <b-pagination pills v-model="currentPagePaginate" :per-page="perPage" :total-rows="totalRows"
            @change="nextPage"></b-pagination>
        </div>
        <br />
      </div>

    </div>

  </div>
</template>


<script>
import axios from "axios";
import ServiciosService from "@/services/ServiciosService";

import { mapGetters } from "vuex";

export default {
  name: "NuevoSlide",
  props: {},
  data() {
    return {
      totalRows: 0,
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 20,
      currentPageIndex: 0,
      indice: 1,
      loading: true,
      currentPagePaginate: 1,
      perPage: 20,
    };
  },
  components: {},
  created() { },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },

  methods: {
    async nextPage(page) {
      try {
        window.scrollTo(0, 200);
        this.loading = true;
        const response = await ServiciosService.get_ultimas_servicios_paginate(
          page
        );

        if (response.data.error == false) {
          this.productos = response.data.data;
          this.currentPagePaginate = page;
          this.loading = false;
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.getPorductos();
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },

    async getUltimosProductos() {
      try {
        const response = await ServiciosService.get_ultimas_servicios_paginate(
          1
        );
        console.log(response);
        if (response.data.error == false) {
          this.productos = response.data.data;
          this.totalRows = response.data.cantidad;
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.getPorductos();
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    getImporte(precio) {
      if (precio == null || precio <= 1) {
        return;
      }
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    tituloAjustar(titulo) {
      return this.primerMayuscula(titulo);
    },
    primerMayuscula(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    verProducto(producto) {
      if (producto != null) {
        const path = `/productos/${producto.titulo}`;
        if (this.$route.path !== path)
          this.$router.push({
            name: "productos",
            params: {
              producto: producto.titulo,
            },
          });
      }
    },
  },
  mounted() {
    axios
      .all([this.getUltimosProductos()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>






