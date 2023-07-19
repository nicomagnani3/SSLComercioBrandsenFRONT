<template>
  <div>
    <div v-if="loading" class="text-center">
      <b-spinner style="width: 4rem; height: 4rem" variant="warning" label="Text Centered">
      </b-spinner>
    </div>
    <div v-else>
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
      <div class="d-flex justify-content-center">
        <b-pagination pills v-model="currentPagePaginate" :per-page="perPage" :total-rows="totalRows"
          @change="nextPage"></b-pagination>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import ProductosService from "@/services/PublicacionService";
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
      perPage: 15,
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
        const response = await ProductosService.getUltimosProductos(page);

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
        const response = await ProductosService.getUltimosProductos(1);
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

