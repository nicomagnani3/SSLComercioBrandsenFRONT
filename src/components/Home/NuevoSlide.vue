<template>
  <div>
    <b-row class="text-left">
      <b-col cols="1"></b-col>
      <b-col cols="8">
        <div class="h3 font-britannic text widget-title destacados">
          <h4 class="parraforTitProd">
            Productos destacados
            <a v-if="!loading" @click="verDestacados()" class="verMas">ver mas</a>
          </h4>
        </div>
      </b-col>
    </b-row>
    <br />
    <div v-if="loading" class="text-center">
      <b-spinner style="width: 4em; height: 4rem" variant="warning" label="Text Centered">
      </b-spinner>
    </div>
    <div v-else class="animated fadeIn">
      <b-row class="text-center">
        <b-col>
          <div class="d-none d-sm-none d-md-block">
            <b-icon @click="backPage()" :class="{ active: pagina() }" icon="arrow-left-circle-fill" id="iconright">
            </b-icon>
          </div>
        </b-col>
        <b-col cols="10">
          <section class="py-7">
            <div class="container-cards px-4 px-lg-5 mt-5">
              <div class="row gx-1 gx-lg-1 row-cols-1 row-cols-md-2 row-cols-xl-5 justify-content-left" itemscope
                itemtype="https://schema.org/Product">
                <div class="col mb-5" v-for="(producto, index) in currentPageClubs" :key="index">
                  <div class="card h-100 card-custom">
                    <!-- Product image-->
                    <div class="square-image">
                      <img :src="`data:image/png;base64, ${producto.imagen}`" alt="..." class="card-img-top" />
                    </div>
                    <!-- Product details-->
                    <div class="card-body">
                      <div class="text-center text-xs-left">
                        <!-- Product name-->
                        <h5 class="fw-bolder">{{ tituloAjustar(producto.titulo) }}</h5>
                        <!-- Product price-->
                        <p class="mb-0">{{ getImporte(producto.precio) }}</p>
                      </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div class="text-center">
                        <b-btn @click="verProducto(producto)" block class="btn btn btn--block card__btn btn-block">Ver más</b-btn>

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


          <div class="card-pagination">
            <div class="page-index" v-for="i in nbPages" :key="i" @click="goto(i)" :class="{ active: currentPage(i) }">
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="d-none d-sm-none d-md-block">
            <b-icon @click="nexPage()" :class="{ active: pagina() }" icon="arrow-right-circle-fill" id="iconright">
            </b-icon>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ProductosService from "@/services/ProductosService";
// import slider components

import { mapGetters } from "vuex";

export default {
  name: "NuevoSlide",
  props: {
    productos: {
      type: Array,
    },
    nuevaPublicacion: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      paginatedClubs: [],
      nbPages: 0,
      ubicaicon: 0,
      nbRowPerPage: 5,
      currentPageIndex: 0,
      indice: 1,
      loading: true,
    };
  },
  components: {},
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),

    currentPageClubs() {
      this.createPages();

      return this.paginatedClubs[this.currentPageIndex];
    },
  },
  created() {
    if (this.nuevaPublicacion) {
      this.getPorductos();
    }
  },
  methods: {
    verDestacados() {
      this.$router.push({
        name: "verDestacados",
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
      window.scrollTo(0, 800);
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
        const response = await ProductosService.getProductosDestacados();
        if (response.data.error == false) {
          this.productos = response.data.data;
          //this.getImporte(this.productos);
        }
      } catch (err) {
        this.loading = true;
        this.getPorductos();
        this.productos = "ATENCION NO SE PUDIERON OBTENER LAS PUBLICACIONES";
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

  mounted() {
    axios
      .all([
        /* this.getPorductos() */
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
.cortar {
  font-weight: 700;
  display: block;
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

