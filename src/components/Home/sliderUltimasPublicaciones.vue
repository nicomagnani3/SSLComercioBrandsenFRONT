<template>
  <div>
    <b-row class="text-left">
      <b-col cols="1"></b-col>
      <b-col cols="8">
        <div class="h2 font-britannic text widget-title destacados">
          <h2 class="parraforTitProd"> MarketPlace
            <a v-if="!loading" @click="verDestacados()" class="verMasServi">ver todos</a>
          </h2>
        </div>
      </b-col>
    </b-row>
    <br />
    <div v-if="loading" class="text-center">
      <b-spinner style="width: 4rem; height: 4rem" variant="warning" label="Text Centered">
      </b-spinner>
    </div>
    <div v-else>
      <section class="py-7">
        <div class="container-cards px-2 px-sm-3 px-md-4 px-lg-5 mt-6">
          <div class="row gx-5 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-left" itemscope
            itemtype="https://schema.org/Product">
            <div class="col mb-5" v-for="(producto, index) in currentPageClubs" :key="index">
              <div class="card h-100 card-custom">
                <!-- Product image-->
                <div class="square-image">
                  <img :src="`data:image/png;base64, ${producto.imagen}`" alt="..." class="card-img-top" />
                </div>
                <!-- Product details-->
                <div class="card-body">
                    <div class="text-md-center text-lg-left">
                      <!-- Product name -->
                      <h5 class="fw-bolder">{{ tituloAjustar(producto.titulo) }}</h5>
                      <!-- Product price -->
                      <p class="mb-0">{{ getImporte(producto.precio) }}</p>
                    </div>
                  </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center">
                    <b-btn @click="verProducto(producto)" block class="btn btn btn--block card__btn btn-block">Ver
                      más</b-btn>
                  </div>
                </div>
                <meta itemprop="description" :content="producto.titulo">
                <meta itemprop="url" :content="'/productos/' + producto.titulo">
                <meta itemprop="sku" content="SKU del producto">
                <meta itemprop="category" :content="producto.padre">
                <meta itemprop="subcategory" :content="producto.hijo">
                <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                  <meta itemprop="addressLocality" content="General Belgrano">
                  <meta itemprop="addressRegion" content="Provincia de Buenos Aires">
                  <meta itemprop="postalCode" content="B7223">
                  <meta itemprop="latitude" content="-35.766666666667">
                  <meta itemprop="longitude" content="-58.5">
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <br />
  </div>
</template>
<script>
import axios from "axios";
import ProductosService from "@/services/PublicacionService";
import { mapGetters } from "vuex";

export default {
  name: "NuevoSlide",
  props: {
    productos: {
      type: Array,
    },
    nuevaPublicacion: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 10,
      currentPageIndex: 0,
      indice: 1,
      loading: true,
    };
  },
  components: {},
  created() {
    console.log(this.nuevaPublicacion)
    if (this.nuevaPublicacion) {
      this.getPorductos()
    }
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
    currentPageClubs() {
      this.createPages();

      return this.paginatedClubs[this.currentPageIndex];
    },
  },

  methods: {
    verDestacados() {
      this.$router.push({
        name: "vermarket",
        query: {
          q: this.searchQuery,
          t: new Date().getTime(),
        },
        params: {
          productos: this.productos,
        },
      });
    },
    nexPage() {
      this.currentPageIndex = this.ubicaicon + 1;
      this.indice = this.ubicaicon + 1;
      if (++this.indice <= this.nbPages) {
        this.ubicaicon++;
      } else {
        this.currentPageIndex = 0;
        this.ubicaicon = 0;
      }
    },
    backPage() {
      if (this.ubicaicon == 0) {
        this.currentPageIndex = this.nbPages - 1;
        this.ubicaicon = this.nbPages - 1;
      } else {
        this.currentPageIndex = this.ubicaicon - 1;
        this.ubicaicon = this.ubicaicon - 1;
      }
    },
    pagina() {
      return this.ubicaicon - 1 === this.currentPageIndex;
    },
    goto(i) {
      this.currentPageIndex = i - 1;
    },
    currentPage(i) {
      this.ubicaicon = this.currentPageIndex;
      return i - 1 === this.currentPageIndex;
    },
    createPages() {
      let lengthAll = Object.keys(this.productos).length;
      this.nbPages = 0;

      for (let i = 0; i < lengthAll; i = i + this.nbRowPerPage) {
        this.paginatedClubs[this.nbPages] = this.productos.slice(
          i,
          i + this.nbRowPerPage
        );
        this.nbPages++;
      }
    },

    async getPorductos() {
      try {
        const response = await ProductosService.getUltimasPublicaciones();

        if (response.data.error == false) {
          this.productos = response.data.data;
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
        this.$router.push({
          name: "verProducto",
          params: {
            tipo: producto.tipo.toLowerCase(),
            id: producto.id,
            nombre: producto.titulo
          },
        });
      }
    },
  },
  mounted() {
    axios
      .all([/* this.getPorductos() */])
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
  height: 46px;
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
  font-family: EuclidSquareRegular, sans-serif !important;
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
  margin-left: 13px;
  text-decoration: none;
  color: #3483fa;
  cursor: pointer;
  font-size: 20px;
  -webkit-text-decoration: underline #676767;
  text-decoration: underline #676767;
  white-space: nowrap;
  text-decoration: none;
}

.verMasServi:hover {
  color: #1b4e9b;
}

#iconright {
  height: 29rem;
  width: 30px;
  cursor: pointer;
}

.destacados {
  color: rgb(109, 108, 108);
  white-space: nowrap;
}


</style>



