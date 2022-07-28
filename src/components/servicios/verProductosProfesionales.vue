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
      <b-spinner
        style="width: 4rem; height: 4rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else style="margin: 1%">
      <div v-if="productos.length < 1" class="text-center">
        <img
        class="responsiveNotProducts"
          style="cursor: pointer"
          src="https://res.cloudinary.com/malambo/image/upload/v1659026568/Malambo/utilidades/PROFESIONALES_uaxlwk.jpg"
           @click="$router.push('login')"
        />
      </div>
      <div v-else>
        <b-row class="text-center" cols="2" cols-sm="8" cols-md="8" cols-lg="5">
          <b-col
            v-for="(producto, index) in productos"
            :key="index"
            class="mb-2"
          >
            <b-card
              class="ItemProd"
              style="max-width: 250px"
              :img-src="`data:image/png;base64, ${producto.imagen}`"
              img-height="250px; max-height:100%;"
              alt="Responsive image"
            >
              <div class="cortar" @click="verProducto(producto)">
                <strong> {{ tituloAjustar(producto.titulo) }}</strong>
              </div>
              <div v-if="Number(producto.precio) > Number(0)">
                <p class="card-text">
                  {{ getImporte(producto.precio) }}
                </p>
              </div>
              <div v-else>
                <br />
              </div>
              <div slot="footer">
                <b-btn
                  @click="verProducto(producto)"
                  variant="warning"
                  block
                  class="btnMas"
                  >Ver mas</b-btn
                >
              </div>
            </b-card>
          </b-col>
        </b-row>
        <br />
        <div class="d-flex justify-content-center">
          <b-pagination
            pills
            v-model="currentPagePaginate"
            :per-page="perPage"
            :total-rows="totalRows"
            @change="nextPage"
          ></b-pagination>
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
  created() {},
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
        const path = `/buscarProductos/${producto.titulo}`;
        if (this.$route.path !== path)
          this.$router.push({
            name: "buscarProductos",
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


<style scoped>
.cortar {
  font-weight: 700;
  display: -webkit-box;

  margin: 0;
  /* text-align: left; */
  cursor: pointer;
  font-size: 13px;
  line-height: 18px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: -o-ellipsis-lastline;
  white-space: normal;
  padding-top: 10px;
  color: #2c354f;
  max-width: 191px;
}
.texto {
  color: rgb(226, 205, 199);
  font-family: "Poppins", sans-serif;
}
.vueperslide__title {
  font-size: 7em;
  opacity: 0.7;
}

.ItemProd img {
  object-fit: contain;
}

.item {
  box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.2);
}
.card-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.page-index {
  margin-left: 10px;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: #7d7d7d;
}
.active {
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
.verMasServi {
  margin-left: 12px;
  color: #676767;
  cursor: pointer;
  font-size: 20px;
  text-decoration: underline #676767;
  white-space: nowrap;
}
.btnMas {
  white-space: normal;
  background: #ffce4e;
  background: -moz-linear-gradient(
    45deg,
    #00ddf5 0%,
    #00d9d7 32%,
    #00d6ba 100%
  );
  background: -webkit-linear-gradient(
    45deg #00ddf5 0%,
    #00d9d7 32%,
    #ffce4e 100%
  );
  background: linear-gradient(45deg #00ddf5 0%, #00d9d7 32%, #ffce4e 100%);
  -moz-border-radius: 20px;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  margin: -3px 0 0 0;
  padding: 9px 7px 16px 8px;
  width: 88%;
  text-transform: none;
  font-size: 14px;
  line-height: 11px;
  color: #fff;
}
#iconright {
  height: 29rem;
  width: 30px;
  cursor: pointer;
}
.destacados {
  color: rgb(109, 108, 108);
}

</style>



